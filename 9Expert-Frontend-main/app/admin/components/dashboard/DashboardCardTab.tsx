'use client'

import { MoveUpIcon } from "@/app/icons/AdminIcon"
import { HStack, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"

type TDashboardCard = {
    isActive?: boolean,
    isLink?: boolean,
    href?: string,
    title: string,
    icon?: JSX.Element
}

export const DashboardCardTab = ({ isActive = false, isLink = false, href, title, icon }: TDashboardCard) => {

    const stackProps = isLink ? { as: Link, href } : {};
    
    return (
        <Stack
            bg={isActive? 'exBlue' : 'white'}
            h='90px'
            w='100%'
            align='center'
            justify='start'
            px='1.5rem'
            py='3.5rem'
            borderRadius='20px'
            direction='row'
            gap='1rem'

            {...stackProps}
        >
            <Stack
                // minH={55}
                h='56px'
                aspectRatio={1}
                bg={!isActive? 'exBlue' : 'white'}
                borderRadius='full'
                align='center'
                justify='center'
                padding={2}
            >
                {icon}
            </Stack>
            <Stack
                w='max-content'
                direction='column'
            >
                <Text fontSize='md' >{title}</Text>
            </Stack>
        </Stack>
    )
}