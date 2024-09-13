'use client'

import { whyUsReasons } from "@/config/about-us";
import { containerBreakpoints } from "@/config/theme";
import { Box, Container, Heading, Highlight, Image, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export const WhyUsCard = ({ image, header, text, cardBgColor }: { image: string, header: string, text: string, cardBgColor: string }) => {
    return (
        <Stack
            w='100%'
            h={{ base: '140px', lg: '340px' }}
            p={{ base: '1rem', lg: '2rem' }}
            borderRadius='20px'
            bg={cardBgColor}
            align={{ base: 'center', lg: 'start' }}
            justify={{ base: 'center', lg: 'start' }}
            spacing='0.5rem'
        >
            <Image
                alt='icon'
                src={image}
                w={{ base: '32px', lg: '64px' }}
                h={{ base: '32px', lg: '64px' }}
                mb={{ base: 0, lg: '1rem' }}
            />
            <Heading
                as='h3'
                textAlign={{ base: 'center', lg: 'start' }}
                textColor='#19B5FE'
                fontSize={{ base: '1.25rem', lg: '1.5rem' }}
            >
                {header}
            </Heading>
            <Box display={{ base: 'none', lg: 'block' }}>
                <Text
                    as="p"
                    textAlign={{ base: 'center', lg: 'start' }}
                    textColor='#ffffff'
                    noOfLines={{ base: 3, md: 4, lg: 5 }}
                    fontSize={{ base: '1rem', lg: '1rem' }}
                >
                    {text}
                </Text>
            </Box>
        </Stack>
    )
}

export const AboutUsWhyUs = () => {
    const bgColor = useColorModeValue('linear-gradient(180deg, #2E2E2E, #0B345D)', '#193148')
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')
    const cardBgColor = useColorModeValue('#013274', '#0C345D')
    return (
        <Stack
            as="section"
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            align="center"
            justify="center"
            bg={bgColor}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <MotionStack
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    w="100%"
                    gap={0}
                    align="center"
                    justify="center"
                >
                    <Heading
                        textAlign="center"
                        textColor={fontColor}
                        fontSize={{ base: "2rem", lg: "3rem" }}
                    >
                        <Highlight
                            query="9Expert?"
                            styles={{
                                textColor: '#19B5FE',
                            }}
                        >
                            ทำไมต้องเลือก 9Expert?
                        </Highlight>
                    </Heading>
                    <SimpleGrid
                        w="100%"
                        pt='2rem'
                        columns={{ base: 2, md: 3, lg: 3, '2xl': 4 }}
                        gap={{ base: '1rem', lg: '2rem' }}
                    >
                        {whyUsReasons.map((data, index) => (
                            <WhyUsCard
                                key={index}
                                image={data.image}
                                header={data.header}
                                text={data.text}
                                cardBgColor={cardBgColor}
                            />
                        ))}
                    </SimpleGrid>
                </MotionStack>
            </Container>
        </Stack>
    );
}