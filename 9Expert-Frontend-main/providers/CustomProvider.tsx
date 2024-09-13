'use client'

import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/theme'
import { store } from '@/store'
import { Suspense } from 'react'
import { Loading } from '@/app/components/Loading/Loading'

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store} >
            <ChakraProvider theme={theme} >
                <Suspense fallback={<><Loading /></>}>
                    {children}
                </Suspense>
            </ChakraProvider>
        </Provider>
    )
}