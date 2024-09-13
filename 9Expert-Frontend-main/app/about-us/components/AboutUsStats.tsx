'use client'

import { AddUserIcon, LikeIcon, MorePeopleIcon, SharpStarIcon, StudentIcon } from "@/app/icons/PortfolioIcon"
import { containerBreakpoints } from "@/config/theme"
import { Center, Container, Divider, Grid, HStack, SimpleGrid, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { CountUpOptions } from "countup.js"
import { motion } from "framer-motion"
import { useRef } from "react"

const MotionText = motion(Text)

const CountUp = ({ number, option }: { number: number, option?: CountUpOptions }) => {
    const countupRef = useRef(null)
    let countUpAnim

    async function initCountUp() {
        try {
            const countUpModule = await import('countup.js');
            // TODO: refactor this to use the new import syntax
            countUpAnim = new countUpModule.CountUp(countupRef?.current as unknown as string, number, option)
            if (!countUpAnim.error) {
                countUpAnim.start();
            } else {
                console.error(countUpAnim.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <MotionText
            display='flex'
            fontSize={{ base: '2rem', lg: '3rem' }}
            textColor='#19B5FE'
            ref={countupRef}
            whileInView={() => initCountUp()}
            viewport={{ once: true }}
        >
        </MotionText>
    )
}

const DividerLine = () => (<Divider
    border='2px'
    borderRadius='10px'
    orientation='vertical'
    h='140px'
    borderColor='#56BDF9'
/>)

interface StatCardProps {
    icon: JSX.Element;
    count: number;
    decimalPlaces: number;
    label: string;
    suffix?: string;
    prefix?: JSX.Element;
    fontColor: string;
}

const StatCard = ({ icon, count, decimalPlaces, label, suffix, prefix, fontColor }: StatCardProps) => (
    <Stack
        w='100%'
        flexShrink={0}
        align='center'
        justify='center'
        direction='row'
        spacing={{ base: '1rem', lg: '1.5rem' }}
    >
        <Center
            flexShrink={0}
            w='84px'
            h='84px'
            bg='#0B345D'
            borderRadius='full'
        >
            {icon}
        </Center>
        <Stack
            align='start'
            justify='center'
            bg={fontColor}
            backgroundClip='text'
            spacing='0'
        >
            <HStack spacing='0'>
                {prefix && (prefix)}
                <CountUp number={count} option={{ decimalPlaces }} />
                {suffix && (
                    <Text
                        display='flex'
                        fontSize={{ base: '2rem', lg: '2.5rem' }}
                        textColor='#19B5FE'
                    >
                        {suffix}
                    </Text>
                )}
            </HStack>
            <Text
                fontSize={{ base: '1.5rem', lg: '1.5rem' }}
                textColor='transparent'
            >
                {label}
            </Text>
        </Stack>
    </Stack>
);


export const AboutUsStats = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const fontColor = useColorModeValue('linear-gradient(180deg, #4091F4, #56BDF9)', 'white')

    return isDesktop ? (
        <Stack
            as="section"
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <SimpleGrid w='100%' columns={{ base: 2, lg: 4 }} spacing={4}>
                    <Stack direction="row" align="center" w='100%' >
                        <StatCard icon={<MorePeopleIcon w='44px' h='44px' color='white' />} count={1.5} decimalPlaces={1} label='องค์กร' suffix='K+' fontColor={fontColor} />
                        <DividerLine />
                    </Stack>
                    <Stack direction="row" align="center" w='100%'>
                        <StatCard icon={<StudentIcon w='44px' h='44px' color='white' />} count={100} decimalPlaces={0} label='ผู้เรียน' suffix='K+' fontColor={fontColor} />
                        <DividerLine />
                    </Stack>
                    <Stack direction="row" align="center" w='100%'>
                        <StatCard icon={<LikeIcon w='44px' h='44px' color='white' />} count={4.8} decimalPlaces={1} label='รีวิว' prefix={<SharpStarIcon w='34px' h='34px' mr='8px' color='#FED66F' />} fontColor={fontColor} />
                        <DividerLine />
                    </Stack>
                    <Stack direction="row" align="center" w='100%'>
                        <StatCard icon={<AddUserIcon w='44px' h='44px' color='white' />} count={200} decimalPlaces={0} label='ผู้ติดตาม' suffix='K+' fontColor={fontColor} />
                    </Stack>
                </SimpleGrid>
            </Container >
        </Stack >
    ) : (<></>)
}