import { singleton } from 'tsyringe';
import { DisplayRenderWay } from './types';

@singleton()
export class DisplaySimpleWay implements DisplayRenderWay {
  public render(screen: Array<Array<0 | 1>>, score: string) {
    document.querySelector('#app')!.innerHTML =
      `<div class="container"><pre>${screen.map((el) => el.join(' ')).join('\r')}</pre></div>
       <div class="score">${score.split('').map((letter) => `<span>${letter}</span>`)}</div> 
       `;
  }
}
