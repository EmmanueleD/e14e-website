/// <reference path="../.astro/types.d.ts" />

// This helps TypeScript recognize HTML elements in Astro files
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}