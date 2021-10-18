import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BGScreen } from '../../Render.class';

export type ScreenState = null | BGScreen;

export const Layout = (setToClass: (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => void) => {
    return () => {
        const [state, setState] = useState<ScreenState>(null);

        const updateState: Dispatch<SetStateAction<ScreenState>> = (state) => {
            setState(state);
        };
        useEffect(()=> {
            setToClass(updateState);
        }, [setState])

        return <div>
        </div>;
    };
};
