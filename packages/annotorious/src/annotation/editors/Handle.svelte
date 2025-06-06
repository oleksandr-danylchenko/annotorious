<script lang="ts">
  import { isTouch } from '../utils';

  /** props **/
  export let x: number;
  export let y: number;
  export let scale: number;
  export let selected: Boolean | undefined = undefined;

  let touched = false;

  const onPointerDown = (evt: PointerEvent) => {
    if (evt.pointerType === 'touch')
      touched = true;
  }

  const onPointerUp = () =>
    touched = false;

  $: handleRadius = 4 / scale;
</script>

{#if isTouch}
  <g class="a9s-touch-handle">
    <circle 
      cx={x} 
      cy={y} 
      r={handleRadius * 10}
      class="a9s-touch-halo"
      class:touched={touched} />
   
    <circle 
      cx={x} 
      cy={y} 
      r={handleRadius + 10 / scale}
      class="a9s-handle-buffer"
      on:pointerdown
      on:pointerup
      on:pointerdown={onPointerDown} 
      on:pointerup={onPointerUp} /> 

    <circle 
      class="a9s-handle-dot"
      cx={x}
      cy={y}
      r={handleRadius + 2 / scale} />
  </g>
{:else}
  <g class={`a9s-handle ${$$props.class || ''}`.trim()}>
    <circle 
      class="a9s-handle-buffer"
      cx={x}
      cy={y}
      r={handleRadius + (6 / scale)} 
      on:pointerenter
      on:pointerleave
      on:pointerdown
      on:pointerdown={onPointerDown}
      on:pointerup
      on:pointerup={onPointerUp} />

    {#if selected}
      <circle 
        class="a9s-handle-selected"
        cx={x} 
        cy={y} 
        r={handleRadius + (8 / scale)} />
    {/if}

    <circle 
      class={`a9s-handle-dot${selected ? ' selected': ''}`}
      cx={x}
      cy={y}
      r={handleRadius} />
  </g>
{/if}

<style>
  .a9s-touch-halo {
    fill: transparent;
    pointer-events: none;
    stroke-width: 0;
    transition: fill 150ms;
  }

  .a9s-touch-halo.touched {
    fill: rgba(255, 255, 255, 0.4);
  }

  .a9s-handle-buffer {
    fill: transparent;
  }

  .a9s-handle-dot {
    fill: #fff;
    pointer-events: none;
    stroke: rgba(0, 0, 0, 0.35);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }

  .a9s-handle-dot.selected {
    fill: #1a1a1a;
    stroke: none;
  }

  .a9s-handle-selected {
    animation: dash-rotate 350ms linear infinite reverse;
    fill: rgba(255, 255, 255, 0.25);
    stroke: rgba(0, 0, 0, 0.9);
    stroke-dasharray: 2 2;
    stroke-width: 1px;
    pointer-events: none;
    vector-effect: non-scaling-stroke;
  }

  @keyframes dash-rotate {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 4; /* Sum of dash + gap */
    }
  }
</style>