'use client'

import { Box } from "@chakra-ui/react"

type MainBarProps = {
    value?: number | string
}


export const MainBar = ({ value }: MainBarProps) => {

    const BarH = ( Number(value) / 100 ) * 175

    return (
        <Box
            position='relative'
        >
            <Box
                bg='exBlue'
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