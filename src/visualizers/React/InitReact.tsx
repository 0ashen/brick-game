import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, ScreenState } from './Layout';

export function initReact(
    setToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void
) {
    const Template = Layout(setToClass);
    ReactDOM.render(<Template />, document.getElementById('app'));
}
