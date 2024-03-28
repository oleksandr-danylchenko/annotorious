import type { DrawingStyleExpression } from '@annotorious/core';
import type { ImageAnnotation } from '../../model';

export const computeStyle = (
  annotation: ImageAnnotation, 
  style?: DrawingStyleExpression<ImageAnnotation>
) => {
  const computed = typeof style === 'function' ? style(annotation) : style;

  if (computed) {
    const { fill, fillOpacity } = computed;

    let css = '';
    
    if (fill)
      css += `fill:${fill};stroke:${fill};`;
    
    css += `fill-opacity:${fillOpacity || '0.25'};`;

    return css;
  }
}