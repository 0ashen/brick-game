import { container, singleton } from 'tsyringe';
import { Display, DisplayMatrix20x10 } from '~/@types';
import { cookEmptyScreen } from '~/utils';
import { DisplayReactWay } from './display-react-way';
import { DisplaySimpleWay } from './display-simple-way';
import { DisplayRenderWay } from './types';

@singleton()
export class DisplayService implements Display {
  private renderMethodList: Array<new() => DisplayRenderWay> = [
    DisplayReactWay,
    DisplaySimpleWay,
  ];
  private currentRenderMethod: DisplayRenderWay = container.resolve(this.renderMethodList[0]);
  private score: string = '000000';
  private screen: DisplayMatrix20x10 = cookEmptyScreen();

  public drawMatrix(matrix: DisplayMatrix20x10) {
    if (this.screen === matrix) {
      return;
    }
    this.screen = matrix;
    this.renderData()
  }

  public drawScore(score: number) {
    const repeatCount = 6 - score.toString().length;
    this.score = '0'.repeat(repeatCount) + score.toString();
    this.renderData();
  }
  public pause(status: boolean) {

  }

  private renderData(): void {
    this.currentRenderMethod.render(this.screen, this.score)
  }
}
