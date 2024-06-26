export * from './osd';

export { default as MouseOverTooltip } from './MouseOverTooltip.svelte';

// Essential re-exports from @annotorious/core
export type {
  Annotation,
  AnnotationBody,
  AnnotationTarget,
  Annotator,
  AnnotatorState,
  Appearance,
  AppearanceProvider,
  Color,
  DrawingStyle,
  Filter,
  FormatAdapter,
  HoverState,
  LifecycleEvents,
  ParseResult,
  PresentUser,
  Selection,
  SelectionState,
  Store,
  StoreChangeEvent,
  StoreObserver,
  SvelteAnnotator,
  SvelteAnnotatorState,
  User,
  W3CAnnotation,
  W3CAnnotationBody,
  W3CAnnotationTarget
} from '@annotorious/core';

import {
  createAnonymousGuest as _createAnonymousGuest, 
  createBody as _createBody,
  defaultColorProvider as _defaultColorProvider,
  Origin as _Origin,
  PointerSelectAction as _PointerSelectAction
} from '@annotorious/core';

export { _createAnonymousGuest as createAnonymousGuest };
export { _createBody as createBody };
export { _defaultColorProvider as defaultColorProvider };
export { _Origin as Origin };
export { _PointerSelectAction as PointerSelectAction };

// Essential re-exports from @annotorious/annotorious 
export type {
  AnnotoriousOpts,
  DrawingMode,
  DrawingTool,
  ImageAnnotator as AnnotoriousImageAnnotator,
  ImageAnnotation,
  ImageAnnotator,
  ImageAnnotatorState,
  Polygon,
  PolygonGeometry,
  Rectangle,
  RectangleGeometry,
  Shape
} from '@annotorious/annotorious';

import {   
  createImageAnnotator as _createImageAnnotator,
  ShapeType as _ShapeType,
  W3CImageFormat as _W3CImageFormat
} from '@annotorious/annotorious';

export const createImageAnnotator = _createImageAnnotator;
export const ShapeType = _ShapeType;
export const W3CImageFormat = _W3CImageFormat;

// Essential re-exports from @annotorious/openseadragon 
export type {
  OpenSeadragonAnnotator as AnnotoriousOpenSeadragonAnnotator
} from '@annotorious/openseadragon';

export type { Viewer } from 'openseadragon';
