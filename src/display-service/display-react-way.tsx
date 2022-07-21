import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { singleton } from 'tsyringe';
import { DisplayRenderWay } from './types';

type LayoutProps = {
  matrix: Array<Array<0 | 1>>,
  score: string,
  pause: boolean,
}
export const Layout: React.FC<LayoutProps> = (props) =>
  (
    <>
      <div className={'container'}>
        {props.matrix?.map((row) => (
          row.map((pixel, idx) => (
            <div className={clsx('pixel', pixel && 'is-active')} key={idx} />
          ))
        ))}
      </div>
      <div className='score'>
        {props.score.split('').map((letter, idx) => <span
          key={idx}>{letter}</span>)}
      </div>
      <div className={clsx('pause', props.pause && 'active')}>pause</div>
      <div className='game-over'>game over</div>
      <div className='clover'>
        <img src='/clover.svg' alt='clover' />
      </div>
    </>
  );

@singleton()
export class DisplayReactWay implements DisplayRenderWay {
  public render(matrix: Array<Array<0 | 1>>, score: string, pause: boolean) {
    ReactDOM.render(
      (
        <Layout matrix={matrix}
                score={score}
                pause={pause}
        />
      ),
      document.querySelector('#app')
    );
  }
}


