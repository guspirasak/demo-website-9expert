'use client'

import { AverageStars } from "@/app/components/AverageStar";
import { GlobeWithHandIcon } from "@/app/icons/PortfolioIcon";
import { portfolioTopics } from "@/config/portfolio";
import { containerBreakpoints } from "@/config/theme";
import { AspectRatio, Avatar, Box, Button, Container, HStack, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from "next/link";

const MotionStack = motion(Stack);

const RegisterButton = ({ buttonBg, fontSize, fontColor, borderRadius = '10px' }: { buttonBg: string, fontColor: string, fontSize: string, borderRadius: string }) => {
    return (<Button
        as={Link}
        href='/register/inhouse'
        variant="solid"
        w="fit-content"
        h="fit-content"
        p="1.5rem"
        bg={buttonBg}
        borderRadius={borderRadius}
        fontSize={fontSize}
        fontWeight={400}
        textColor={fontColor}
        _hover={{
            color: '#ffffff',
            bg: '#19B5FE'
        }}>ลงทะเบียนจองฝึกอบรม</Button>)
}

const QuoteCard = ({ labelColor, fontColor }: { labelColor: string, fontColor: string }) => {
    return (<Stack
        w="172px"
        h="128px"
        bg={fontColor}
        p="1.25rem"
        align="center"
        justify="center"
        borderRadius="20px"
        position="absolute"
        top="-30px"
        left="-10px"
    >
        <GlobeWithHandIcon w="60px" h="60px" />
        <Text
            fontSize="0.875rem"
            color={labelColor}
            fontWeight="700"
        >
            พัฒนาความรู้ให้องค์กร
        </Text>
    </Stack>)
}

const CustomerReview = ({ labelColor, fontColor }: { labelColor: string, fontColor: string }) => {
    return (<Stack
        w="fit-content"
        h="fit-content"
        bg={fontColor}
        p="1.25rem"
        borderRadius="20px"
        position="absolute"
        bottom="-30px"
        right={{ base: '0%', lg: '-10%' }}
        direction="row"
        spacing="1rem"
    >
        <Avatar w="48px" h="48px" />
        <Stack>
            <HStack
                align="center"
                justify="start"
                spacing="4px"
            >
                {AverageStars(5)}
            </HStack>
            <Heading
                fontSize="0.875rem"
                color={labelColor}
                fontWeight="600"
            >
                สอนดีมากค่า เรียนสนุกเข้าใจง่าย
            </Heading>
            <Text fontSize="0.75rem" textColor="#7A7A8F">
                บริษัท เน็ตแรง จำกัด
            </Text>
        </Stack>
    </Stack>)
}

const PortfolioTopic = ({ src, label, fontColor }: { src: string, label: string, fontColor: string }) => (
    <HStack spacing="1rem" maxW="700px">
        <Image
            w={{ base: '24px', lg: '48px' }}
            h={{ base: '24px', lg: '48px' }}
            src={src}
            alt="portfolio icon"
        />
        <Text
            fontSize={{ base: '1rem', lg: '1rem' }}
            textColor={fontColor}
            textShadow="4px 4px 4px 0px #00000040"
        >
            {label}
        </Text>
    </HStack>
);

export const PortfolioBanner = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const buttonBg = useColorModeValue('#1CA7EC', '#186BE2')
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')
    const labelColor = '#2E2E2E'

    return (
        <Stack
            as="section"
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bgImage="/portfolio/portfolio_banner_bg.png"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    align="center"
                    justify="center"
                    spacing={{ base: '2rem', lg: '4rem' }} pb={{ base: '1rem', lg: '2rem' }}>
                    <Heading
                        as="h1"
                        textAlign="center"
                        textColor={fontColor}
                        fontSize={{ base: '2rem', lg: '3rem' }}
                        fontWeight={600}>
                        ผลงานด้านการฝึกอบรม
                    </Heading>
                    <MotionStack
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        w="100%"
                        justify="space-between"
                        direction={{ base: 'column-reverse', lg: 'row' }}
                        spacing={{ base: '4rem' }}
                    >
                        {!isDesktop && (
                            <Stack w="100%" justify="center" align="center">
                                <RegisterButton buttonBg={buttonBg} fontSize="1rem" fontColor={fontColor} borderRadius="20px" />
                            </Stack>
                        )}
                        <Stack
                            w="100%"
                            h="100%"
                            align="center"
                            justify="center"
                            position="relative"
                        >
                            <AspectRatio
                                ratio={{ base: 306 / 380, lg: 458 / 568 }}
                                w={{ base: '90%', lg: '458px' }}
                                h={{ base: '90%', lg: '568px' }}
                            >
                                <Image
                                    borderRadius="20px"
                                    w={{ base: '100%', lg: '458px' }}
                                    src="/portfolio/portfolio_cover.jpg"
                                    fit="contain"
                                    alt="portfilio cover"
                                />
                            </AspectRatio>
                            <QuoteCard labelColor={labelColor} fontColor={fontColor} />
                            <CustomerReview labelColor={labelColor} fontColor={fontColor} />
                        </Stack>
                        <Stack
                            w="100%"
                            h="100%"
                            align="start"
                            alignSelf="center"
                            spacing={{ base: '1rem', lg: '2rem' }}
                        >
                            <HStack spacing="1rem">
                                <Box
                                    w="4px"
                                    h="48px"
                                    bg="linear-gradient(180deg, #2198FF 0%, #114FD0 100%)"
                                    borderRadius="10px"
                                ></Box>
                                <Heading
                                    fontWeight={400}
                                    fontSize={{ base: '1.5rem', lg: '2rem' }}
                                    textColor={fontColor}
                                >
                                    หลักสูตร Inhouse
                                </Heading>
                            </HStack>
                            {portfolioTopics.map(topic => (
                                <PortfolioTopic
                                    fontColor={fontColor}
                                    key={topic.id}
                                    label={topic.label}
                                    src={topic.src}
                                />
                            ))}
                            {isDesktop && (
                                <Stack
                                    w="100%"
                                    mt="1rem"
                                    align="center"
                                    justify="center"
                                >
                                    <RegisterButton buttonBg={buttonBg} fontColor={fontColor} fontSize="1.5rem" borderRadius="20px" />
                                </Stack>
                            )}
                        </Stack>
                    </MotionStack>
                </Stack>
            </Container>
        </Stack>
    );
}