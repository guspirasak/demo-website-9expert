'use client'

import { createContext, useContext, useState } from 'react'
import { TFaq } from '../interface/CreateFaqInterface';

export interface ICreateFaqContext {
    state: TFaq
    setState: React.Dispatch<React.SetStateAction<TFaq>>;
}

const defaultValue: ICreateFaqContext = {
    state: {
        title: '',
        icon: '',
        question: [],
    },
    setState: () => { }
}

const CreateFaqContext = createContext<ICreateFaqContext>(defaultValue)

export const useCreateFaq = (): ICreateFaqContext => {
    const context = useContext(CreateFaqContext)
    return context
}

export const CreateFaqProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TFaq>({
        title: '',
        icon: '',
        question: [{
            title: '',
            description: [],
        }],
    })

    return (
        <CreateFaqContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </CreateFaqContext.Provider>
    )
}