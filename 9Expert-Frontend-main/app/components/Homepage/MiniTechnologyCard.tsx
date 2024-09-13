'use client'

import { Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"

type TMiniTechnologyCardProps = {
    icon: JSX.Element | string
    children: React.ReactNode
}

export const MiniTechnologyCard = ({ icon, children }: TMiniTechnologyCardProps) => {

    const bgColor = useColorModeValue('white', '#3B3B3B')

    return (
        <Stack
            w='290px'
            h='230px'
            align='center'
            justify='center'
            bg={bgColor}
            shadow='md'
            borderRadius='20px'
        >
            {
                typeof icon === 'string' &&
                (
                    <Image
                        alt="technology icon"
                        src={icon}
                        w='90px'
                        h='80px'
                        borderRadius='10px'
                    />
                )
            }
            {
                typeof icon === 'object' && icon
            }
            <Text as='h3' fontSize='1.25rem' >{children}</Text>
        </Stack>
    )
}