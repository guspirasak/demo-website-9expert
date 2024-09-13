'use client'

import { Container, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import ContactButtomGroup from "./Footer/ContactButtonGroup"
import CourseList from "./Footer/CourseList"
import SocialButtomGroup from "./Footer/SocialButtonGroup"
import { companyFullNameEN } from "@/config/contact"
import { containerBreakpoints } from "@/config/theme"

export const Footer = () => {
    const breakpoints = useBreakpointValue({
        base: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 1,
        '2xl': 1,
    })

    const bgColor = useColorModeValue(
        'linear-gradient(137.85deg, #4091F4 10.64%, #56BDF9 81.52%)',
        'linear-gradient(137.85deg, #0B345D 10.64%, #0C3B66 81.52%)'
    )

    const textColor = useColorModeValue('#ffffff', '#EBEBEB')

    return (
        <Stack
            justify="center"
            bg={bgColor}
            color={textColor}
            as="footer"
        >
            <Container
                maxW={containerBreakpoints}
                px={{ base: '3rem', lg: '0' }}
                py={{ base: '3rem', lg: '3rem', '2xl': '3.375rem' }}
            >
                <Stack
                    p={{ base: '0', lg: '3rem', '2xl': '3.375rem' }}
                    justify={{ base: 'center', lg: 'space-between' }}
                    borderTop="1px"
                    borderColor="#ffffff33"
                    direction="row"
                    position="relative"
                    pt="1.5rem"
                    spacing="3rem"
                >
                    <Stack
                        as="section"
                        w="100%"
                        spacing="1.25rem"
                    >
                        <Heading
                            fontSize="1.25rem"
                            textAlign={{ base: 'center', md: 'left' }}
                        >
                        หลักสูตรทั้งหมด
                        </Heading>
                        <CourseList />
                    </Stack>
           
                    <Stack as="section" w="100%" spacing="1.25rem" display={{ base: 'none', '2xl': 'flex' }}>
                        <Heading fontSize="1.25rem" fontWeight="600">
                        ที่อยู่สำนักงาน
                        </Heading>
                        <Stack>
                            <Text fontSize="1rem" fontWeight="600">
                                {companyFullNameEN}
                            </Text>
                            <Text fontSize="1rem">
                            เลขที่ 318 อาคารเอเวอร์กรีน เพลส ชั้น 4 ห้อง 4A-1
                            </Text>
                            <Text fontSize="1rem">
                            ซอยวรฤทธิ์ ถนนพญาไท แขวงถนนเพชรบุรี
                            </Text>
                            <Text fontSize="1rem">
                            เขตราชเทวี กรุงเทพฯ 10400
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        as="section"
                        display={{ base: 'none', xl: 'flex' }}
                        w="100%"
                        spacing="1.25rem"
                    >
                        <Heading fontSize="1.25rem" fontWeight="600">
                        ติดต่อเรา
                        </Heading>
                        <ContactButtomGroup />
                        <SocialButtomGroup />
                    </Stack>
                </Stack>
                {breakpoints === 0 && <SocialButtomGroup />}
            </Container>
        </Stack>
    )
}