'use client'

import { Box } from "@chakra-ui/react"

export const BackgroundLine = () => {
    return (
        <>
            {
                [...Array(5)].map((_, index) => (
                    <Box
                        key={index}
                        w='100%'
                        h='37px'
                        borderBottom='1px'
                        borderStyle='dashed'
                        borderColor='exGray.100'
                    >

                    </Box>
                )) 
            }
        </>
    )
}