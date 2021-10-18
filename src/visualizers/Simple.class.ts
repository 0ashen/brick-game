import { Visualizer } from './Visualizer.interface';
import { BGScreen } from '../Render.class';

export class SimpleRender extends Visualizer {
    public render(screen: BGScreen): void {
        document.querySelector('#app')!.innerHTML = `<pre>${screen.map(el => el.join(' ')).join('\r')}</pre>`;
    }
}