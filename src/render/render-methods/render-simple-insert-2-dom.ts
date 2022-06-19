import { RenderMethod, RenderPixelMatrix } from '../types';
import { singleton } from 'tsyringe';

@singleton()
export class RenderSimpleInsert2Dom implements RenderMethod {
  public render(screen: RenderPixelMatrix): void {
    document.querySelector('#app .container')!.innerHTML = `
        <pre>
        ${screen.map((el) => el.join(' ')).join('\r')}
        </pre>
        `;
  }
}
