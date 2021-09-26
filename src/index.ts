import * as _ from 'lodash';

function component() {
    const element = document.createElement('pre');

    element.innerHTML = [
        'Hello webpack!!',
        '5 cubed is equal to '
    ].join('\n\n');
    console.log(_);
    return element;
}

document.body.appendChild(component());