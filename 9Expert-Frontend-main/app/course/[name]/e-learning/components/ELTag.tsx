'use client'

import { Stack, Text } from "@chakra-ui/react"
import { TELTag } from "../interface/ELTag"

export const ELTag = ({ color, bg, children }: TELTag) => {
    
    return (
        <Stack
            p='16px'
            w='max-content'
            h='50px'
            bg={bg}
            borderRadius='100px'
            align='center'
            justify='center'
        >
            <Text
                fontSize='16px'
                textColor={color}
            >
                {children}
            </Text>
        </Stack>
    )
}