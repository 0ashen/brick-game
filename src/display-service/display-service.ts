import { container, singleton } from 'tsyringe';
import { Display, DisplayMatrix20x10 } from '~/@types';
import { cookEmptyScreen } from '~/utils';
import { DisplayReactWay } from './display-react-way';
import { DisplaySimpleWay } from './display-simple-way';
import { DisplayRenderWay } from './types';

@singleton()
export class DisplayService implements Display {
  private screen: DisplayMatrix20x10 = cookEmptyScreen();

  private renderMethodList: Array<new() => DisplayRenderWay> = [
    DisplayReactWay,
    DisplaySimpleWay,
  ];

  private currentRenderMethod: DisplayRenderWay = container.resolve(this.renderMethodList[0]);

  public drawMatrix(matrix: DisplayMatrix20x10) {
    if (this.screen === matrix) {
      return;
    }
    this.screen = matrix;
    this.currentRenderMethod.drawMatrix(this.screen);
  }

}
