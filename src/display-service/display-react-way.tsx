import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { singleton } from 'tsyringe';
import { DisplayMatrix20x10 } from '~/@types';
import { cookEmptyScreen } from '~/utils';
import { DisplayRenderWay } from './types';

export const Layout: React.FC<{ matrix: DisplayMatrix20x10, score: string }> = (props) =>
  (
    <>
      <div className={'container'}>
        {props.matrix?.map((row) => (
          row.map((pixel, idx) => (
            <div className={clsx('pixel', pixel && 'is-active')} key={idx}/>
          ))
        ))}
      </div>
      <div className="score">
        {props.score}
      </div>
    </>
  );

@singleton()
export class DisplayReactWay implements DisplayRenderWay {
  private screenMatrix: DisplayMatrix20x10 = cookEmptyScreen();
  private score: string = '000000';

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

    let cookedScore = this.score ?? score;

    ReactDOM.render(<Layout matrix={matrix ?? this.screenMatrix}
                            score={cookedScore}/>,
      document.querySelector('#app'));
  }
}


