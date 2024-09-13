'use client'

import { Box } from "@chakra-ui/react"

type SubBarProps = {
    value?: number | string
}


export const SubBar = ({ value }: SubBarProps) => {

    const BarH = (Number(value) / 100) * 175

    return (
        <Box
            position='relative'
        >
            <Box
                bg='#B6E7FF'
                w='24px'
                h={`${BarH}px`}
                maxH='175px'
                borderRight='1px'
                borderColor='white'
                borderTopRadius='5px'
            >

            </Box>
        </Box>
    )
}