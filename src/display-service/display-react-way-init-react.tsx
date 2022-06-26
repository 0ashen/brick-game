import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DisplayMatrix20x10 } from '~/@types';

export type ScreenState = null | DisplayMatrix20x10;

export const Layout = (
  setUpdateStateToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void,
) => {
  return () => {
    const [state, setState] = useState<ScreenState>(null);

    const updateState: Dispatch<SetStateAction<ScreenState>> = (state) => {
      setState(state);
    };
    useEffect(() => {
      setUpdateStateToClass(updateState);
    }, [setState]);
    return (
      <div className={'container'}>
        {state?.map((el, idx) => (
          <RenderRow row={el} key={idx}/>
        ))}
      </div>
    );
  };
};
const RenderRow = ({ row }: { row: Array<0 | 1> }) => {
  return (
    <>
      {row.map((el, idx) => (
        <div className={clsx('pixel', el && 'is-active')} key={idx}/>
      ))}
    </>
  );
};

export function displayReactWayInitReact(
  setToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void,
) {

  const Template = Layout(setToClass);
  ReactDOM.render(<Template/>, document.querySelector('#app'));
}
