import { container, singleton } from 'tsyringe';
import { RenderMethod, RenderPixelMatrix } from './types';
import { cookEmptyScreen } from '~/utils';
import { RenderSimpleInsert2Dom, RenderWithReact } from './render-methods';
import { Draw } from '~/@types';

@singleton()
export class Render implements Draw {
  private screen: RenderPixelMatrix;
  private currentRenderMethod: RenderMethod;

  private renderMethodList: Array<RenderMethod> = [
    // todo refactor
    container.resolve(RenderWithReact),
    container.resolve(RenderSimpleInsert2Dom),
  ];


  constructor() {
    this.screen = cookEmptyScreen();
    this.currentRenderMethod = this.renderMethodList[0];
  }

  public draw(newScreen: RenderPixelMatrix) {
    if (this.screen === newScreen) return;
    this.screen = newScreen;
    this.currentRenderMethod.render(this.screen);
  }
}
