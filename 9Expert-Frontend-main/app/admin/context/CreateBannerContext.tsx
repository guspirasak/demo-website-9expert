'use client'

import { createContext, useContext, useState } from 'react'
import { TCreateBanner } from '../interface/CreateBanner';

export interface ICreateBannerContext {
    state: TCreateBanner
    setState: React.Dispatch<React.SetStateAction<TCreateBanner>>;
}

const defaultValue: ICreateBannerContext = {
    state: {
        type: '',
        url: '',
        name: '',
        page: '',
        file: {
            name: '',
            size: 0
        }
    },
    setState: () => { }
}

const CreateBannerContext = createContext<ICreateBannerContext>(defaultValue)

export const useCreateBanner = (): ICreateBannerContext => {
    const context = useContext(CreateBannerContext)
    return context
}

export const CreateBannerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TCreateBanner>({
        type: 'image',
        url: '',
        name: '',
        page: 'homepage',
        file: {
            name: '',
            size: 0
        }
    })

    return (
        <CreateBannerContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </CreateBannerContext.Provider>
    )
}