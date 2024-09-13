'use client'

import { Stack, Spinner } from "@chakra-ui/react"

export const Loading = () => {
    return (
        <Stack
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="110vh"
            position='fixed'
            zIndex={9999}
            bg="rgba(255, 255, 255, 0.5)"
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Stack>
    )
}