import { DisplayRenderWay, DisplayRenderPixelScreenMatrix } from '../types';
import { singleton } from 'tsyringe';

@singleton()
export class DisplaySimpleWay implements DisplayRenderWay {
  public draw(screen: DisplayRenderPixelScreenMatrix): void {
    document.querySelector('#app .container')!.innerHTML = `
        <pre>
        ${screen.map((el) => el.join(' ')).join('\r')}
        </pre>
        `;
  }
}
