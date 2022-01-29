import { Visualizer } from './Visualizer.interface';
import { Screen } from '../Render.class';
import { injectable } from 'tsyringe';

@injectable()
export class SimpleRender extends Visualizer {
    public render(screen: Screen): void {
        document.querySelector('#app')!.innerHTML = `<pre>${screen
            .map((el) => el.join(' '))
            .join('\r')}</pre>`;
    }
}
