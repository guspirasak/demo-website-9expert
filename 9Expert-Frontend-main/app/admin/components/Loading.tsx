'use client'

import { Stack, Spinner } from "@chakra-ui/react"

export const Loading = () => {
    return (
        <Stack
            w='100%'
            h='100%'
            bg='gray.300'
            opacity='0.5'
            align='center'
            justify='center'
            position='absolute'
            top='0'
            zIndex='100'
        >
            <Spinner size='xl' color='exBlue' thickness="4px" />
        </Stack>
    )
}