import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { RenderPixelMatrix, RenderPixelRow } from '../../types';
import clsx from 'clsx';

export type ScreenState = null | RenderPixelMatrix;

export const Layout = (
  setToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void,
) => {
  return () => {
    const [state, setState] = useState<ScreenState>(null);

    const updateState: Dispatch<SetStateAction<ScreenState>> = (state) => {
      setState(state);
    };
    useEffect(() => {
      setToClass(updateState);
    }, [setState]);
    return (
      <>
        {state?.map((el, idx) => (
          <RenderRow row={el} key={idx}/>
        ))}
      </>
    );
  };
};
const RenderRow = ({ row }: { row: RenderPixelRow }) => {
  return (
    <>
      {row.map((el, idx) => (
        <div className={clsx('pixel', el && 'is-active')} key={idx}/>
      ))}
    </>
  );
};

export function initReact(
  setToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void,
) {
  const Template = Layout(setToClass);
  ReactDOM.render(<Template/>, document.querySelector('#app .container'));
}
