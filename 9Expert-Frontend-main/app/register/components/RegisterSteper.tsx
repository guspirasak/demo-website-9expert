'use client'

import { SteperNoneIcon, SteperRightIcon } from "@/app/icons/RegisterIcons"
import { Heading, Stack } from "@chakra-ui/react"

export const RegisterSteper = ({ step }: { step: number }) => {

    
    return (
        <Stack
            w='100%'
            mx='auto'
            pb='2rem'
            align='center'
            justify='center'
            direction='row'
            spacing='1rem'
        >
            <Stack
                display={
                    step === 1 ? { base: 'flex', lg: 'flex' } : { base: 'none', lg: 'flex' }
                }
                justify='end'
                align='center'
                direction='row'
                spacing='1rem'
                w='100%' flexWrap='nowrap'
            >
                <SteperRightIcon w='40px' h='40px' />
                <Heading fontSize={{ base: '1.25rem', lg: '1.5rem' }} color='#19B5FE' >กรอกข้อมูล</Heading>
            </Stack>
            <Stack
                display={{ base: 'none', lg: 'flex' }}
                w='100%'
                h='0'
                border='2px'
                borderColor='#19B5FE'
                borderRadius='10px'
                align='center'
                justify='center'
                borderStyle={step < 2 ? 'dashed' : 'solid'}
            >
            </Stack>
            <Stack
                display={
                    step === 2 ? { base: 'flex', lg: 'flex' } : { base: 'none', lg: 'flex' }
                }
                justify='center'
                align='center'
                direction='row'
                spacing='1rem'
                w='100%' flexWrap='nowrap'
            >
                {step >= 2  ? <SteperRightIcon w='40px' h='40px' /> : <SteperNoneIcon w='40px' h='40px' />}
                <Heading fontSize={{ base: '1.25rem', lg: '1.5rem' }} color={step >= 2 ? '#19B5FE' : '#817F7F'} >{`ยืนยันข้อมูล`}</Heading>
            </Stack>
            <Stack
                display={{ base: 'none', lg: 'flex' }}
                w='100%'
                h='0'
                border='2px'
                borderColor={step >= 2 ? '#19B5FE' : '#C7C8CA'}
                borderRadius='10px'
                align='center'
                justify='center'
                borderStyle={step === 3 ? 'solid' : step >= 2 ? 'dashed' : 'solid'}
            >
            </Stack>
            <Stack
                display={
                    step === 3 ? { base: 'flex', lg: 'flex' } : { base: 'none', lg: 'flex' }
                }
                justify='start'
                align='center'
                direction='row'
                spacing='1rem'
                w='100%' flexWrap='nowrap'
            >
                {step === 3 ? <SteperRightIcon w='40px' h='40px' /> : <SteperNoneIcon w='40px' h='40px' />}
                <Heading  fontSize={{ base: '1.25rem', lg: '1.5rem' }} color={step === 3 ? '#19B5FE' : '#817F7F'} >{`เสร็จสิ้น`}</Heading>
            </Stack>
        </Stack>
    )
}