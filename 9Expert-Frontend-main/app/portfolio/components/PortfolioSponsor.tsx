'use client'

import { AspectRatio, Box, Container, Heading, Image, Stack, Text, Wrap, WrapItem, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { TPortfolio } from './Portfolio';
import { sponsorsList } from '@/config/portfolio';
import { containerBreakpoints } from '@/config/theme';
import { getPortfolio } from "@/services/api/portfolio";

const MotionStack = motion(Stack);
const duration = 5000;

const ImageSlide = ({ images, slideBgColor }: { images: TPortfolio[], slideBgColor: string }) => {
    return (<Stack
        position="relative"
        w="100%">
        <AspectRatio
            ratio={{
                base: 350 / 234,
                lg: 626 / 386,
            }}
            w={{ base: '100%', lg: '626px' }}
            h={{ base: '100%', lg: '386px' }}
        >
            <Box
                w={{
                    base: '100%',
                    lg: '626px',
                }}
                h={{
                    base: '100%',
                    lg: '386px',
                }}
                borderRadius="40px"
                bg={slideBgColor}
                transform={{
                    base: 'rotate(-8deg)',
                    lg: 'rotate(-4deg)',
                }}
                position="absolute"
                zIndex="-1"
            ></Box>
        </AspectRatio>
        <Box
            as={Swiper}
            pagination={true}
            loop={true}
            autoplay={{
                delay: duration,
                disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            centeredSlides={true}
            w={{ base: '100%', lg: '626px' }}
            h={{ base: '100%', lg: '386px' }}
            position="absolute"
            mt={{ base: '3rem', xl: '0' }}
        >
            {images.map((item, index) => (
                <SwiperSlide key={index}>
                    <AspectRatio
                        ratio={{
                            base: 350 / 234,
                            lg: 626 / 386,
                        }}
                    >
                        <Image
                            src={item.imageUrl}
                            alt="sponsor"
                            borderRadius="40px"
                        />
                    </AspectRatio>
                </SwiperSlide>
            ))}
        </Box>
    </Stack>
    )
}

const CustomerSuccessLabel = ({ fontColor }: { fontColor: string }) => {
    return <Stack
        w="100%"
        align="center"
        justify="center"
        mt={{ base: '1rem', lg: '4rem' }}
    >
        <Text
            fontSize={{ base: '1.5rem', lg: '2rem' }}
            textColor={fontColor}
            textAlign="center"
        >ได้รับความไว้วางใจจากบริษัทชั้นนำมากกว่า 100+ แห่งทั่วประเทศ
        </Text>
    </Stack>
}

export const PortfolioSponsor = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const fontColor = useColorModeValue('#0B345D', '#EBEBEB')
    const bodyColor = useColorModeValue('#4B4B4B', '#EBEBEB')
    const slideBgColor = useColorModeValue('linear-gradient(180deg, #71BCFD 0%, #114FD0 100%)', '#EBEBEB')
    const [images, setImages] = useState<TPortfolio[]>([
        {
            type: 'portfolio',
            imageUrl: '/portfolio/default.jpg',
            createAt: '',
            isDeleted: false,
        }
    ]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPortfolio();
            setImages(data.result);
        }
        fetchData();
    }, []);

    return (
        <Stack
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            align="center"
            justify="center"
            position="relative"
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w="100%"
                    align="center"
                    justify="space-between"
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '2rem', lg: '4rem' }}
                >
                    <MotionStack
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        w="100%"
                        h="100%"
                        align={{ base: 'center', lg: 'start' }}
                        justify="center"
                    >
                        <Heading
                            textColor={fontColor}
                            fontSize={{ base: '2rem', lg: '2.5rem' }}
                            fontWeight={600}
                            textAlign={{ base: 'center', lg: 'start' }}
                        >
                            ส่วนหนึ่งจากองค์กร
                        </Heading>
                        <Heading
                            textColor={fontColor}
                            fontSize={{ base: '2rem', lg: '2.5rem' }}
                            fontWeight={600}
                            textAlign={{ base: 'center', lg: 'start' }}
                        >
                            ชั้นนำที่ไว้วางใจพวกเรา
                        </Heading>
                        <Text
                            fontSize={{ base: '1rem', lg: '1.25rem' }}
                            fontWeight={400}
                            textColor={bodyColor}
                            mt="1.25rem"
                            maxW='50ch'
                            align={{ base: 'center', lg: 'start' }}
                        >
                            ปัจจุบันมีเทคโนโลยีต่างๆ เข้ามาช่วยในการทำงานมากมาย ไม่ได้เกี่ยวข้องแค่ทาง IT แต่เกี่ยวกับทุก ๆ คน หลายเทคโนโลยี/เครื่องมือ ช่วยลดต้นทุน เพิ่มประสิทธิภาพ การทำงาน แต่เราอาจจะยังใช้ไม่เต็มศักยภาพ การพัฒนาบุคคลากร สร้างทักษะ และความเข้าใจในเทคโนโลยีใหม่เป็นสิ่งที่จำเป็นในการรักษาตำแหน่งและเติบโตในธุรกิจและอุตสาหกรรมในยุคสมัยใหม่
                        </Text>
                    </MotionStack>
                    <ImageSlide images={images} slideBgColor={slideBgColor} />
                </Stack>
                {!isDesktop && <Stack mt="4rem" spacing="2rem">
                    <CustomerSuccessLabel fontColor={fontColor} />
                    <Wrap
                        w="100%"
                        h="100%"
                        align="center"
                        justify="center"
                        spacing='1rem'
                    >
                        {sponsorsList.slice(0, 8).map((sponsor, index) => {
                            return (
                                <WrapItem key={index}>
                                    <Image
                                        h="32px"
                                        src={`/sponsors/${sponsor}`}
                                        alt={sponsor}
                                    />
                                </WrapItem>
                            );
                        })}
                    </Wrap>
                </Stack>}
                {isDesktop && (<>
                    <Stack
                        w="100%"
                        mx="auto"
                        mt={{ base: '2rem', lg: '4rem' }}
                        align="center"
                        spacing="4rem"
                    >
                        <Wrap
                            w="100%"
                            h="100%"
                            align="center"
                            justify="space-around"
                        >
                            {sponsorsList.slice(0, 6).map((sponsor, index) => {
                                return (
                                    <WrapItem key={index}>
                                        <Image
                                            h="42px"
                                            src={`/sponsors/${sponsor}`}
                                            alt={sponsor}
                                        />
                                    </WrapItem>
                                );
                            })}
                        </Wrap>
                        <Wrap
                            w="100%"
                            h="100%"
                            align="center"
                            justify="space-around"
                        >
                            {sponsorsList.slice(6).map((sponsor, index) => {
                                return (
                                    <WrapItem key={index}>
                                        <Image
                                            h="42px"
                                            src={`/sponsors/${sponsor}`}
                                            alt={sponsor}
                                        />
                                    </WrapItem>
                                );
                            })}
                        </Wrap>
                    </Stack>
                    <CustomerSuccessLabel fontColor={fontColor} />
                </>)}
            </Container>
        </Stack>
    );
}