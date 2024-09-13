'use client'

import { Box, Stack, Text } from "@chakra-ui/react"
import { MainBar } from "./MainBar"
import { SubBar } from "./SubBar"

type BarProps = {
    value: number | string | number[] | string[]
    lebel?: string
}

export const Bar = ({ value, lebel }: BarProps) => {

    return (
        <Stack
            w='40px'
            maxW='40px'
            align='center'
            position='relative'
        >
            <Stack
                position='relative'
            >
                {
                    typeof value !== 'string' && typeof value !== 'number' &&
                    <Box
                        position='absolute'
                        bottom='0'
                        left='-6px'
                        // display={{ base: 'none', md: 'block' }}
                    >
                        <SubBar value={value[1]} />
                    </Box>
                }
                {
                    typeof value !== 'string' && typeof value !== 'number' ?
                        <Box
                            position='absolute'
                            bottom='0'
                            right='-6px'
                        >
                            <MainBar value={value[0]} />
                        </Box>
                        :
                        <Box
                            position='absolute'
                            bottom='0'
                            right='-6px'
                        >
                            <MainBar value={value} />
                        </Box>
                }
            </Stack>
            <Text
                position='absolute'
                bottom='-1.5rem'
                w='40px'
                maxW='40px'
                textAlign='center'
                color='black'
            >
                {lebel}
            </Text>
        </Stack>
    )
}