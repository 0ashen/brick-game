import { DisplayRenderWay, DisplayRenderPixelScreenMatrix } from '../types';
import { initReact, ScreenState } from './init-react';
import _ from 'lodash';
import { singleton } from 'tsyringe';
import React from 'react';

@singleton()
export class DisplayReactWay implements DisplayRenderWay {
  private _setState?: React.Dispatch<React.SetStateAction<ScreenState>>;
  private lastScreen?: DisplayRenderPixelScreenMatrix;

  constructor() {
    initReact(this.hookDispatch);
  }

  public draw(screen: DisplayRenderPixelScreenMatrix): void {
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
