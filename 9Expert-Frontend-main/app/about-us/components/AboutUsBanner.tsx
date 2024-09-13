"use client";

import {
    Heading,
    Stack,
    Highlight,
    Container,
    Text,
    Image,
    useBreakpointValue,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { containerBreakpoints } from "@/config/theme";
import { instructors } from "@/config/about-us";

const MotionStack = motion(Stack);

export const ProfileBanner = ({
    name,
    title,
    image,
}: {
    name: string;
    title: string;
    image: string;
}) => {
    const [hover, setHover] = useState(false);
    const transformSize = { base: "", lg: "scale(1.2, 1.2)" }

    return (
        <Stack
            w="100%"
            h="100%"
            align="center"
            justify="center"
            spacing="1.5rem"
        >
            <Stack
                w="274px"
                h="394px"
                borderRadius="152px"
                bg="linear-gradient(180deg, #2E2E2E52, #0B345D)"
                align="center"
                justify='end'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                _hover={{
                    transform: transformSize,
                    bg: "linear-gradient(180deg, #345FA6, #0B345D)",
                    borderRadius: "300px",
                }}
                transition="transform 0.2s ease-in-out"
            >
                <Image
                    src={image}
                    alt="professor"
                    borderRadius={hover ? "300px" : "152px"}

                />
            </Stack>
            <Stack mt='1rem' spacing="0.5rem">
                <Text
                    textColor="white"
                    fontSize="1.25rem"
                    textAlign="center"
                >
                    {name}
                </Text>
                <Text textColor="#C5DCFA" fontSize="1rem" textAlign="center">
                    {title}
                </Text>
            </Stack>
        </Stack>
    );
};

export const AboutUsBanner = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    return (
        <Stack
            as="section"
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            minH="100vh"
            bgImage="/aboutus/about_us_banner.png"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w="100%"
                    h="100%"
                    align="center"
                    justify="space-between"
                    spacing={{ base: "2rem", lg: "14rem" }}
                >
                    <MotionStack
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        w="100%"
                        align="center"
                        justify="center"
                    >
                        <Heading
                            as='h1'
                            mt={{ base: "0px", "2xl": "200px" }}
                            fontSize={{ base: "2rem", lg: '6rem', "2xl": "6rem" }}
                            textColor="white"
                        >
                            <Highlight
                                query="9EXPERT"
                                styles={{
                                    fontWeight: 700,
                                    bg: "linear-gradient(180deg, #A8E3FF, #19B5FE)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                เกี่ยวกับ 9EXPERT
                            </Highlight>
                        </Heading>
                        <Text
                            fontSize={{ base: "1.5rem", lg: "2rem" }}
                            textAlign={{ base: "center", lg: "start" }}
                            textColor="#C5DCFA"
                        >
                            สอนแบ่งปันความรู้ เทคโนโลยีเพื่อ &quot;ขับเคลื่อนประเทศไทย&quot;
                        </Text>
                    </MotionStack>
                    {isDesktop ? (
                        <Stack
                            direction="row"
                            spacing="1rem"
                            w="100%"
                            pb={{ base: 0, lg: '3rem' }}
                            align="center"
                            justify="center"
                        >
                            {instructors.map((instructor) => (
                                <ProfileBanner
                                    key={instructor.id}
                                    name={instructor.name}
                                    title={instructor.title}
                                    image={instructor.image}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <Box
                            as={Swiper}
                            w="100%"
                            h="100%"
                            minH="550px"
                            slidesPerView="auto"
                            spaceBetween={50}
                            centeredSlides={true}
                            initialSlide={2}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                        >
                            {instructors.map((instructor) => (
                                <SwiperSlide
                                    key={instructor.id}
                                    style={{
                                        width: "fit-content",
                                        paddingTop: "1rem"
                                    }}
                                >
                                    <ProfileBanner
                                        name={instructor.name}
                                        title={instructor.title}
                                        image={instructor.image}
                                    />
                                </SwiperSlide>
                            ))}
                        </Box>
                    )}
                </Stack>
            </Container>
        </Stack>
    );
};
