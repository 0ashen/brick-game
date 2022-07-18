import { singleton } from 'tsyringe';
import { DisplayMatrix20x10 } from '~/@types';
import { cookEmptyScreen } from '~/utils';
import { DisplayRenderWay } from './types';

@singleton()
export class DisplaySimpleWay implements DisplayRenderWay {
  private score: string = '000000';
  private screenMatrix: DisplayMatrix20x10 = cookEmptyScreen();

  public drawMatrix(matrix: DisplayMatrix20x10): void {
    this.renderData(matrix)
  }

  public drawScore(score: number): void {
    this.renderData(undefined, score)
  }

  private renderData(matrix?: DisplayMatrix20x10, score?: number): void {
    if (matrix) {
      this.screenMatrix = matrix;
    }
    if (score) {
      const repeatCount = 6 - score.toString().length;
      this.score = '0'.repeat(repeatCount) + score.toString();
    }

    document.querySelector('#app')!.innerHTML =
      `<div class="container"><pre>${this.screenMatrix.map((el) => el.join(' ')).join('\r')}</pre></div>
       <div class="score">${this.score.split('').map((letter) => `<span>${letter}</span>`)}</div> 
       `;
  }
}
