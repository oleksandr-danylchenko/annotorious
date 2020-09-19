import { Selection } from '@recogito/recogito-client-core';
import { SVG_NAMESPACE } from '../../SVG';
import { 
  drawRect, 
  drawRectMask,
  setRectSize, 
  setRectMaskSize,
  toRectFragment 
} from '../../annotations/selectors/RectFragment';

/**
 * A 'rubberband' selection tool for creating a rectangle by
 * clicking and dragging.
 */
export default class RubberbandRect {

  constructor(anchorX, anchorY, g) {
    this.anchor = [ anchorX, anchorY ];
    this.opposite = [ anchorX, anchorY ];

    this.group = document.createElementNS(SVG_NAMESPACE, 'g');
    
    this.mask = drawRectMask(anchorX, anchorY, 2, 2);
    this.mask.setAttribute('class', 'a9s-selection-mask');

    this.shape = drawRect(anchorX, anchorY, 2, 2);
    this.shape.setAttribute('class', 'a9s-selection');

    // We make the selection transparent to 
    // pointer events because it would interfere with the 
    // rendered annotations' mouseleave/enter events
    this.group.style.pointerEvents = 'none';

    // Additionally, selection remains hidden until 
    // the user actually moves the mouse
    this.group.style.display = 'none';

    this.group.appendChild(this.mask);
    this.group.appendChild(this.shape);
    g.appendChild(this.group);
  }

  get bbox() {
    const w = this.opposite[0] - this.anchor[0];
    const h = this.opposite[1] - this.anchor[1];

    return {
      x: w > 0 ? this.anchor[0] : this.opposite[0],
      y: h > 0 ? this.anchor[1] : this.opposite[1],
      w: Math.max(1, Math.abs(w)), // Negative values
      h: Math.max(1, Math.abs(h)) 
    };
  }

  dragTo = (oppositeX, oppositeY) => {
    // Make visible
    this.group.style.display = null;

    this.opposite = [ oppositeX, oppositeY ];
    const { x, y, w, h } = this.bbox;

    setRectMaskSize(this.mask, x, y, w, h);
    setRectSize(this.shape, x, y, w, h);
  }

  getBoundingClientRect = () => 
    this.shape.getBoundingClientRect();

  toSelection = () => {
    const { x, y, w, h } = this.bbox;
    return new Selection(toRectFragment(x, y, w, h));
  }

  destroy = () => {
    this.group.parentNode.removeChild(this.group);

    this.mask = null;
    this.shape = null;
    this.group = null;
  }

}