import { singleton } from 'tsyringe';
import { DisplayMatrix20x10 } from '~/@types';
import { DisplayRenderWay } from './types';

@singleton()
export class DisplaySimpleWay implements DisplayRenderWay {
  public drawMatrix(screen: DisplayMatrix20x10): void {
    console.log(screen)
    document.querySelector('#app')!.innerHTML =
      `<div class="container"><pre>${screen.map((el) => el.join(' ')).join('\r')}</pre></div>`;
  }
}
