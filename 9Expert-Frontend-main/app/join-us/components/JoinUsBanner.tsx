'use client'

import { BagIcon, LibaryIcon, PCIcon, PeoplesIcon } from "@/app/icons/PortfolioIcon"
import { containerBreakpoints } from "@/config/theme";
import { Center, Container, Heading, Stack, Text, useBreakpointValue, useColorModeValue, Wrap, WrapItem } from "@chakra-ui/react"
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export const JoinUsBannerCard = ({ icon, bgIcon, title, text, fontColor }: { icon: JSX.Element, bgIcon: string, title: string, text: string, fontColor: string }) => {
    const cardBgColor = useColorModeValue('#F1F9FE', '#FFFFFF11')
    const descriptionColor = useColorModeValue('#6D7394', '#FFFFFF')
    return (
        <Center
            w={{ base: '180px', '2xl': '200px' }}
            h={{ base: '180px', '2xl': '180px' }}
            borderRadius='20px'
            bg={cardBgColor}
            backdropFilter='blur(20px)'
            gap='0.55rem'
            flexDirection='column'
            flexShrink={0}
        >
            <Center
                w='54px'
                h='54px'
                bg={bgIcon}
                borderRadius='10px'
            >
                {icon}
            </Center>
            <Center flexDirection='column'>
                <Text
                    fontSize={'1.125rem'}
                    textColor={fontColor}
                >
                    {title}
                </Text>
                <Text
                    fontSize={'14px'}
                    textColor={descriptionColor}
                >
                    {'( '}{text}{' )'}
                </Text>
            </Center>
        </Center>
    )
}

const JoinUsBannerCardList = (iconBg: string) => {
    return [
        {
            id: 1,
            icon: <LibaryIcon w='34px' h='34px' color={iconBg} />,
            bgIcon: '#ECA315',
            title: `ทัศนคติที่ดี`,
            text: `Attitude`
        },
        {
            id: 2,
            icon: <PeoplesIcon w='34px' h='34px' color={iconBg} />,
            bgIcon: '#15D2EC',
            title: `บริการแบบมืออาชีพ`,
            text: `Professional`
        },
        {
            id: 3,
            icon: <PCIcon w='34px' h='34px' color={iconBg} />,
            bgIcon: '#159EEC',
            title: `รับผิดชอบใส่ใจ`,
            text: `Responsibility`
        },
        {
            id: 4,
            icon: <BagIcon w='34px' h='34px' color={iconBg} />,
            bgIcon: '#4AE9A6',
            title: `มีประสิทธิภาพ`,
            text: `Efficiency`
        },
        {
            id: 5,
            icon: <PeoplesIcon w='34px' h='34px' color={iconBg} />,
            bgIcon: '#15D2EC',
            title: `ทำงานเป็นทีม`,
            text: `Teamwork`
        },
    ]
}

export const JoinUsBanner = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const iconBg = useColorModeValue('#ffffff', '#0D0D0D')
    const fontColor = useColorModeValue('#242D62', '#ffffff')
    const fontColorSubtitle = useColorModeValue('#6D7394', '#ffffff')

    return (
        <Stack
            as="section"
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bgImage={{
                base: '/join_us/join_us_banner_mobile_bg.png',
                lg: '/join_us/join_us_banner_bg.png',
            }}
            bgPosition={{ base: 'top', lg: 'center' }}
            bgRepeat='no-repeat'
            bgSize='cover'
        >
            <Container p={0} maxW={containerBreakpoints}>
                <MotionStack
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    align='start'
                    justify='center'
                    position='relative'
                    spacing='2rem'
                >
                    <Stack
                        w="100%"
                        align="start"
                        justify="center"
                        position="relative"
                        spacing='1rem'
                    >
                        <Heading
                            as='h1'
                            textColor={fontColor}
                            fontSize={{ base: '2rem', lg: '3rem' }}
                        >
                            ร่วมงานกับเรา
                        </Heading>
                        <Text
                            textColor={fontColorSubtitle}
                            fontWeight={'100'}
                            maxW={{ base: '20ch', lg: '32ch' }}
                            fontSize={{ base: '1.5rem', lg: '1.5rem' }}
                        >
                            เราจะเป็นองค์กรสร้างความรู้คุณภาพสูงเพื่อความพึงพอใจสูงสุดของลูกค้า
                        </Text>
                    </Stack>
                    <Stack
                        w="100%"
                        align="start"
                        justify="center"
                        position="relative"
                        flexWrap="wrap"
                        direction={{ base: 'column', lg: 'row' }}
                        gap="2rem"
                    >
                        {isDesktop ? (
                            <>
                                <Stack
                                    w="100%"
                                    h="100%"
                                    flexDirection="row"
                                    gap="2rem"
                                    ml='10%'
                                >
                                    {JoinUsBannerCardList(iconBg).slice(0, 2).map(
                                        (item) => (
                                            <JoinUsBannerCard
                                                key={item.id}
                                                bgIcon={item.bgIcon}
                                                fontColor={fontColor}
                                                icon={item.icon}
                                                title={item.title}
                                                text={item.text}
                                            />
                                        )
                                    )}
                                </Stack>
                                <Stack
                                    w="100%"
                                    flexDirection="row"
                                    gap="2rem"
                                >
                                    {JoinUsBannerCardList(iconBg).slice(2).map(
                                        (item) => (
                                            <JoinUsBannerCard
                                                key={item.id}
                                                bgIcon={item.bgIcon}
                                                fontColor={fontColor}
                                                icon={item.icon}
                                                title={item.title}
                                                text={item.text}
                                            />
                                        )
                                    )}
                                </Stack>
                            </>
                        ) : (
                            <Wrap
                                w="100%"
                                justify="center"
                                spacing="2rem"
                            >
                                {JoinUsBannerCardList(iconBg).map(
                                    (item) => (
                                        <WrapItem key={item.id}>
                                            <JoinUsBannerCard
                                                bgIcon={item.bgIcon}
                                                fontColor={fontColor}
                                                icon={item.icon}
                                                title={item.title}
                                                text={item.text}
                                            />
                                        </WrapItem>
                                    )
                                )}
                            </Wrap>
                        )}
                    </Stack>
                </MotionStack>
            </Container>
        </Stack>

    );
}