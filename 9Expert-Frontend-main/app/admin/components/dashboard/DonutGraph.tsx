'use client'

import { Box } from "@chakra-ui/react"

type ViewerStatistics = {
    ageLessThan20: number
    age20to39: number
    ageGreaterThan40: number
}

export const DonutGraph = ({ data }: { data: ViewerStatistics }) => {
    JSON.stringify(data)
    
    const portion = {
        w: '100%',
        h: '100%',
        borderRadius: '50%',
    }

    const circle = {
        w: '100%',
        h: '100%',
        borderRadius: '50%',
        style: {
            clip: 'rect(0px, 150px, 300px, 0px)'
        }
    }

    return (
        <Box
            w='300px'
            h='300px'
            position='relative'
            borderRadius='full'
            bg='white'
        >
            <Box
                {...portion}
                id='1'
                position='absolute'
                bg='exGraphBlue.500'
                transform='rotate(270deg)'
                style={{
                    clip: 'rect(0px, 300px, 150px, 150px)'
                }}
            >
                <Box
                    {...circle}
                    position='absolute'
                >

                </Box>
            </Box>
            <Box
                {...portion}
                id='3'
                position='absolute'
                bg='exGraphBlue.100'
                transform='rotate(340deg)'
                style={{
                    clip: 'rect(0px, 300px, 300px, 150px)'
                }}
            >
                <Box
                    {...circle}
                    position='absolute'
                >

                </Box>
            </Box>
            <Box
                {...portion}
                id='2'
                position='absolute'
                bg='exGraphBlue.300'
                transform='rotate(90deg)'
                style={{
                    clip: 'rect(0px, 300px, 300px, 150px)'
                }}
            >
                <Box
                    {...circle}
                    position='absolute'
                >

                </Box>
            </Box>
            <Box
                w='150px'
                h='150px'
                bg='white'
                top='0'
                left='0'
                right='0'
                bottom='0'
                borderRadius='full'
                position='absolute'
                m='auto'
                p='15% 0 0'
            >

            </Box>
        </Box>
    )
}