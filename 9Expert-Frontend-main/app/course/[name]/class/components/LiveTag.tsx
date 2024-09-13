'use client'

import { Stack, Text } from "@chakra-ui/react"
import { TLiveTag } from "../interface/LiveTag"

export const LiveTag = ({ color, bg, children }: TLiveTag) => {
    
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