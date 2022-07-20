import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { singleton } from 'tsyringe';
import { DisplayRenderWay } from './types';

export const Layout: React.FC<{ matrix: Array<Array<0 | 1>>, score: string }> = (props) =>
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
        {props.score.split('').map((letter, idx) => <span
          key={idx}>{letter}</span>)}
      </div>
      <div className="pause">pause</div>
      <div className="game-over">game over</div>
    </>
  );

@singleton()
export class DisplayReactWay implements DisplayRenderWay {
  public render(matrix: Array<Array<0 | 1>>, score: string) {
    ReactDOM.render(
      (
        <Layout matrix={matrix}
                score={score}
        />
      ),
      document.querySelector('#app'),
    );
  }
}


