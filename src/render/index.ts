import { RenderMethodListInjectKey } from './render-method-list-inject-key';
import { container } from 'tsyringe';
import { RenderMethod } from './types';
import { RenderSimpleInsert2Dom, RenderWithReact } from './render-methods';

// container
//   .register<Array<RenderMethod>>(RenderMethodListInjectKey, {
//     useValue: [
//       container.resolve(RenderWithReact),
//       container.resolve(RenderSimpleInsert2Dom),
//     ],
//   });

export { Render } from './render'
export { RenderPixelRow, RenderPixelMatrix } from './types'



