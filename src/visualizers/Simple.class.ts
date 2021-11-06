import { Visualizer } from './Visualizer.interface';
import { Screen } from '../Render.class';

export class SimpleRender extends Visualizer {
    public render(screen: Screen): void {
        document.querySelector('#app')!.innerHTML = `<pre>${screen
            .map((el) => el.join(' '))
            .join('\r')}</pre>`;
    }
}
