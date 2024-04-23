export * from './Annotorious';

// Essential re-exports from @annotorious/core
export type {
  Annotation,
  AnnotationBody,
  AnnotationState,
  AnnotationTarget,
  Annotator,
  AnnotatorState,
  Color,
  DrawingStyle,
  DrawingStyleExpression,
  FormatAdapter,
  HoverState,
  Selection,
  SelectionState,
  Store,
  StoreChangeEvent,
  StoreObserver,
  ParseResult,
  User,
  W3CAnnotation,
  W3CAnnotationBody,
  W3CAnnotationTarget
} from '@annotorious/core';

import { 
  createBody as _createBody,
  defaultColorProvider as _defaultColorProvider,
  PointerSelectAction as _PointerSelectAction
} from '@annotorious/core'; 

export const defaultColorProvider = _defaultColorProvider;
export const PointerSelectAction = _PointerSelectAction;
export const createBody = _createBody;

// Essential re-exports from @annotorious/annotorious 
export type {
  AnnotoriousOpts,
  DrawingMode,
  DrawingTool,
  FragmentSelector,
  ImageAnnotator as AnnotoriousImageAnnotator,
  ImageAnnotation,
  ImageAnnotator,
  ImageAnnotatorState,
  Polygon,
  PolygonGeometry,
  Rectangle,
  RectangleGeometry,
  Shape,
  SVGSelector,
  W3CImageAnnotation,
  W3CImageAnnotationTarget
} from '@annotorious/annotorious';

import {   
  createImageAnnotator as _createImageAnnotator,
  ShapeType as _ShapeType,
  W3CImageFormat as _W3CImageFormat
} from '@annotorious/annotorious';

export const createImageAnnotator = _createImageAnnotator;
export const ShapeType = _ShapeType;
export const W3CImageFormat = _W3CImageFormat;
