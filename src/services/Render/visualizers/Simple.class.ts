import { Visualizer } from '../../../interfaces/Visualizer.interface';
import { Screen } from '../Render';
import { singleton } from 'tsyringe';
import { config } from '../../../config';

@singleton()
export class SimpleRender extends Visualizer {
    public render(screen: Screen): void {
        document.querySelector(config.injectAppSelector)!.innerHTML = `
        <pre>
        ${
            screen
                .map((el) => el.join(' '))
                .join('\r')
        }
        </pre>
        `;
    }
}
