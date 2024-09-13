'use client';

import { containerBreakpoints } from '@/config/theme';
import {
    Button,
    Container,
    Divider,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionStack = motion(Stack);
const MotionButton = motion(Button);

export const AboutUsJoin = () => {
    const buttonBg = useColorModeValue('#1CA7EC', '#186BE2')
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')

    return (
        <Stack
            as="section"
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bgImage="/aboutus/joinus.png"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w="100%"
                    py="2rem"
                    spacing={{ base: '2rem', lg: '4rem' }}>
                    <MotionStack
                        w="100%"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        justify="center"
                        align="center"
                    >
                        <Heading
                            textColor="white"
                            fontSize={{ base: '2rem', lg: '3rem' }}
                        >
                            ร่วมงานกับเรา
                        </Heading>
                        <Text
                            textColor="white"
                            textAlign="center"
                            fontSize={{ base: '1.5rem', lg: '2rem' }}
                        >
                            9Expert เปิดรับบุคคลากรที่มีความสามารถและความมุ่งมั่น มาร่วมเป็นส่วนหนึ่งของเรา
                        </Text>
                        <Divider
                            w="50%"
                            border="2px"
                            borderColor="#FFFFFF"
                            borderRadius="10px"
                        />
                    </MotionStack>
                    <MotionButton
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        as={Link}
                        href='/join-us'
                        variant="solid"
                        mx="auto"
                        w="fit-content"
                        h="fit-content"
                        p="1.5rem"
                        bg={buttonBg}
                        borderRadius="20px"
                        fontSize={{ base: '1.5rem', lg: '2rem' }}
                        textColor={fontColor}
                        _hover={{
                            color: '#ffffff',
                            bg: '#19B5FE'
                        }}
                    >
                        <HStack spacing="1rem">
                            <Image w="32px" h="32px" src="/aboutus/5.png" alt="icon recruit" />
                            <Text>
                                สนใจสมัครงาน
                            </Text>
                        </HStack>
                    </MotionButton>
                </Stack>
            </Container>
        </Stack >
    );
};
