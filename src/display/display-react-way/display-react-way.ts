import _ from 'lodash';
import React from 'react';
import { singleton } from 'tsyringe';
import { DisplayMatrix20x10 } from '~/@types';
import { DisplayRenderWay } from '../types';
import { initReact, ScreenState } from './init-react';

@singleton()
export class DisplayReactWay implements DisplayRenderWay {
  private _setState?: React.Dispatch<React.SetStateAction<ScreenState>>;
  private lastScreen?: DisplayMatrix20x10;

  constructor() {
    initReact(this.hookDispatch);
  }

  public draw(screen: DisplayMatrix20x10): void {
    this.lastScreen = _.cloneDeep(screen);
    if (this._setState) {
      this._setState(this.lastScreen);
    } else {
      console.log('setState not set');
    }
  }

  private hookDispatch = (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => {
    this._setState = hookDispatch;
    if (this.lastScreen) {
      this.draw(this.lastScreen);
    }
  };
}
