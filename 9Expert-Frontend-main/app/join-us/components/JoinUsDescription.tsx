'use client'

import { jobDescription } from "@/config/join-us"
import { containerBreakpoints } from "@/config/theme"
import { Button, Container, Heading, ListItem, Stack, Text, UnorderedList, useBreakpointValue, useColorModeValue, } from "@chakra-ui/react"
import Link from "next/link"

export const JoinUsDescription = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const buttonBg = useColorModeValue('#1CA7EC', '#03418D')
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')

    return (
        <Stack
            as="section"
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bgImage='/join_us/join_us_description.png'
            bgRepeat='no-repeat'
            bgPosition='center'
            bgSize='cover'
        >
            <Container
                p={0} maxW={containerBreakpoints}
            >
                <Stack
                    w='100%'
                    align='center'
                    justify='center'
                    pb={{ base: '1rem', lg: '2.25rem' }}
                    // spacing='5.25rem'
                    textColor={fontColor}
                >
                    <Heading
                        fontSize={{ base: '2rem', lg: '3rem' }}
                        mb={{ base: '1rem', lg: '5.25rem' }}
                        textAlign='center'
                    >Work at 9EXPERT TRAINING</Heading>
                    {
                        !isDesktop &&
                        <Text
                            fontSize={{ base: '1rem', lg: '1.125rem' }}
                            textAlign='center'
                        >
                            วิดีโอ Key Influencer นี้จะช่วยให้คุณเข้าใจลักษณะของตัวละครจาก Marvel ได้อย่างละเอียดและน่าสนใจ ด้วยการวิเคราะห์ข้อมูลและระบุตัวชี้วัดหลักที่มีผลต่อลักษณะของตัวละคร รวมถึงการแสดงผลข้อมูลในรูปแบบ dashboard สีสันสวยงาม...
                        </Text>
                    }
                    <Stack
                        w='100%'
                        h='100%'
                        align={{ base: 'start', lg: 'center' }}
                        justify='space-between'
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={{ base: '1rem', lg: '2rem' }}
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align='start'
                            justify='start'
                            spacing={{ base: '1rem', lg: '2rem' }}
                        >
                            {
                                isDesktop &&
                                <Text
                                    maxW="60ch"
                                    fontSize={{ base: '1rem', lg: '1.125rem' }}
                                >
                                    วิดีโอ Key Influencer นี้จะช่วยให้คุณเข้าใจลักษณะของตัวละครจาก Marvel ได้อย่างละเอียดและน่าสนใจ ด้วยการวิเคราะห์ข้อมูลและระบุตัวชี้วัดหลักที่มีผลต่อลักษณะของตัวละคร รวมถึงการแสดงผลข้อมูลในรูปแบบ dashboard สีสันสวยงาม...</Text>
                            }
                            <Stack>
                                <Text
                                    fontSize='1.5rem'
                                >
                                    ไฮไลท์เด่นของงาน
                                </Text>
                                <UnorderedList
                                    spacing='0'
                                >
                                    <ListItem>
                                        <Text
                                            fontSize={{ base: '1rem', lg: '1.125rem' }}
                                        >
                                            มีมนุษยสัมพันธ์ดี สามารถทำงานร่วมกับผู้อื่นได้
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text
                                            fontSize={{ base: '1rem', lg: '1.125rem' }}
                                        >
                                            มีประสบการณ์ด้าน Graphic Design
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text
                                            fontSize={{ base: '1rem', lg: '1.125rem' }}
                                        >
                                            มีประสบการณ์การทำงานมากกว่า 2 ปี
                                        </Text>
                                    </ListItem>
                                </UnorderedList>
                            </Stack>
                            <Stack>
                                <Text
                                    fontSize='1.125rem'
                                >
                                    Job Description
                                </Text>

                                <UnorderedList
                                    spacing='0'
                                >
                                    {
                                        jobDescription.map((job, index) => (
                                            <ListItem
                                                key={index}
                                            >
                                                <Text
                                                    key={index}
                                                    fontSize={{ base: '1rem', lg: '1.125rem' }}
                                                >
                                                    {job}
                                                </Text>
                                            </ListItem>
                                        ))
                                    }
                                </UnorderedList>
                            </Stack>
                        </Stack>
                        <Stack
                            w='100%'
                            align='center'
                            justify='center'
                            spacing='2rem'
                        >
                            <Text
                                maxW="60ch"
                                fontSize={{ base: '1rem', lg: '1.125rem' }}
                                textColor={fontColor}
                                textAlign='center'
                            >
                                ปัจจุบันมีเทคโนโลยีต่าง ๆ เข้ามาช่วยในการทำงานมากมาย ไม่ได้เกี่ยวข้องแค่ทาง IT แต่เกี่ยวกับทุก ๆ คน หลายเทคโนโลยี/เครื่องมือ ช่วยลดต้นทุน เพิ่มประสิทธิภาพการทำงาน แต่เราอาจจะยังใช้ไม่เต็มศักยภาพ การพัฒนาบุคคลากร สร้างทักษะและความเข้าใจในเทคโนโลยีใหม่เป็นสิ่งที่จำเป็นในการรักษาตำแหน่งและเติบโตในธุรกิจและอุตสาหกรรมในยุคสมัยใหม่
                            </Text>
                            <Button
                                as={Link}
                                href='/about-us'
                                variant="solid"
                                mx="auto"
                                w="fit-content"
                                h="fit-content"
                                px="5.875rem"
                                py="1rem"
                                bg={buttonBg}
                                borderRadius="20px"
                                fontSize={{ base: '1.5rem', lg: '1.5rem' }}
                                textColor={fontColor}
                                _hover={{
                                    color: '#ffffff',
                                    bg: '#19B5FE'
                                }}
                            >
                                เกี่ยวกับเรา
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Container >
        </Stack >
    )
}