'use client'

import { Box, HStack, Text } from "@chakra-ui/react"

export const MaximumLine = ({ value }: { value: number }) => {

    return (
        <HStack>
            <Box
                w='100vw'
                h='0'
                border='1px'
                borderColor='exBlue'
                borderStyle='dashed'
            />
            <Text color='exBlue' >{`${value}`}</Text>
        </HStack>
    )
}