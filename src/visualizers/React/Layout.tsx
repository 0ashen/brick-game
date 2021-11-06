import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Screen, PixelRow } from '../../Render.class';
import clsx from 'clsx';

export type ScreenState = null | Screen;

export const Layout = (
    setToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void
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
                    <RenderRow row={el} key={idx} />
                ))}
            </>
        );
    };
};

const RenderRow = ({ row }: { row: PixelRow }) => {
    return (
        <>
            {row.map((el, idx) => (
                <div className={clsx('pixel', el && 'is-active')} key={idx} />
            ))}
        </>
    );
};
