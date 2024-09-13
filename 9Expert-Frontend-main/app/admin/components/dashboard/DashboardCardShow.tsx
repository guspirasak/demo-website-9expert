'use client'

import { HStack, Stack, Text } from "@chakra-ui/react"

type TDashboardCard = {
    title: string,
    number: number | string,
    icon?: JSX.Element
}

export const DashboardCardShow = ({  title, number, icon }: TDashboardCard) => {

    
    return (
        <Stack
            bg='white'
            h='90px'
            w='100%'
            align='center'
            justify='start'
            px='1.5rem'
            py='3.5rem'
            borderRadius='20px'
            direction='row'
            gap='1rem'

        >
            <Stack
                minH={55}
                flex={1}
                aspectRatio={1}
                bg='exBlue'
                borderRadius='full'
                align='center'
                justify='center'
                padding={2}
            >
                {icon}
            </Stack>
            <Stack
                flex={5}
                w='max-content'
                direction='column'
            >
                <Text fontSize='md' >{title}</Text>
                <HStack
                    w='100%'
                    justify='space-between'
                >
                    <Text fontWeight='bold' fontSize='xl' >{number} ท่าน</Text>
                </HStack>
            </Stack>
        </Stack>
    )
}