import { RenderMethod, RenderPixelMatrix } from '../../types';
import { initReact, ScreenState } from './init-react';
import _ from 'lodash';
import { singleton } from 'tsyringe';
import React from 'react';

@singleton()
export class RenderWithReact implements RenderMethod {
  private _setState?: React.Dispatch<React.SetStateAction<ScreenState>>;
  private lastScreen?: RenderPixelMatrix;

  constructor() {
    initReact(this.hookDispatch);
  }

  public render(screen: RenderPixelMatrix): void {
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
      this.render(this.lastScreen);
    }
  };
}
