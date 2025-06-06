<script lang="ts">
  import { createEventDispatcher, onMount, type SvelteComponent } from 'svelte';
  import type OpenSeadragon from 'openseadragon';
  import type { DrawingMode, DrawingToolOpts, Shape, Transform } from '@annotorious/annotorious';

  const dispatch = createEventDispatcher<{ create: Shape }>();

  /** Props **/
  export let drawingMode: DrawingMode;
  export let opts: DrawingToolOpts | undefined;
  export let target: SVGGElement;
  export let tool: typeof SvelteComponent;
  export let transform: Transform;
  export let viewer: OpenSeadragon.Viewer
  export let viewportScale: number;

  let toolComponent: SvelteComponent;

  $: if (toolComponent) toolComponent.$set({ transform });
  $: if (toolComponent) toolComponent.$set({ viewportScale });

  onMount(() => {
    const svg = target.closest('svg');

    const cleanup: Function[] = [];

    const addEventListener = (name: string, handler: (evt: Event) => void, capture?: boolean) => {
      // Attach to SVG element
      svg?.addEventListener(name, handler, capture);
      cleanup.push(() => svg?.removeEventListener(name, handler, capture));

      if (name === 'pointerup' || name === 'dblclick') {
        // OpenSeadragon, by design, stops the 'pointerup' event. In order to capture pointer up events,
        // we need to listen to the canvas-click event instead
        const osdHandler = (event: OpenSeadragon.CanvasClickEvent | OpenSeadragon.CanvasDoubleClickEvent) => {
          const { originalEvent } = event;
          handler(originalEvent as PointerEvent);
        }

        const osdName = name === 'pointerup' ? 'canvas-click' : 'canvas-double-click';

        viewer.addHandler(osdName, osdHandler);
        cleanup.push(() => viewer.removeHandler(osdName, osdHandler));
      } else if (name === 'pointermove') {
        const dragHandler = (event: OpenSeadragon.CanvasDragEvent) => {
          const { originalEvent } = event;
          handler(originalEvent as PointerEvent);
        }

        viewer.addHandler('canvas-drag', dragHandler);
        cleanup.push(() => viewer.removeHandler('canvas-drag', dragHandler));
      }
    }

    toolComponent = new tool({
      target,
      props: { 
        addEventListener,
        drawingMode,
        opts,
        transform, 
        viewportScale,
        svgEl: svg
      }
    });

    toolComponent.$on('create', 
      event => dispatch('create', event.detail));

    return () => {
      cleanup.forEach(fn => fn());
      toolComponent.$destroy();
    }
  });
</script>