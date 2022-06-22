import { container, singleton } from 'tsyringe';
import { Display } from '~/@types';
import { cookEmptyScreen } from '~/utils';
import { DisplayReactWay } from './display-react-way';
import { DisplaySimpleWay } from './display-simple-way';
import { DisplayRenderPixelScreenMatrix, DisplayRenderWay } from './types';

@singleton()
export class DisplayService implements Display {
  private screen: Array<Array<0 | 1>> = cookEmptyScreen();

  private renderMethodList: Array<new() => DisplayRenderWay> = [
    DisplayReactWay,
    DisplaySimpleWay,
  ];

  private currentRenderMethod: DisplayRenderWay = container.resolve(this.renderMethodList[0]);

  public draw(newScreen: DisplayRenderPixelScreenMatrix) {
    if (this.screen === newScreen) return;
    this.screen = newScreen;
    this.currentRenderMethod.draw(this.screen);
  }
}
