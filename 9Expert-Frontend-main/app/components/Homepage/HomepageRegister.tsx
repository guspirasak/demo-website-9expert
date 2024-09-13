import { Stack, Text, Heading, Button, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"

export const HomepageRegister = () => {
    const bgColor = useColorModeValue('#3A86FF', '#2F363C')
    const buttonColor = useColorModeValue('#29BB33', '#186BE2')
    const hoverColor = useColorModeValue('#38d143', '#19B5FE')

    return (
        <Stack
            w='100%'
            h='500px'
            align='center'
            justify='center'
            position='relative'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bg={bgColor}
            color='#ffffff'
            spacing='2rem'
        >
            <Heading fontSize={{ base: '2rem', lg: '3rem' }} maxW='65ch' textAlign='center'>หากท่านสนใจจัดอบรมภายในองค์กรของท่าน<br /> ขอแนะนำโปรแกรม Inhouse training</Heading>
            <Text fontSize={{ base: '1.25rem', lg: '1.5rem' }} maxW='65ch' textAlign='center'>เหมาะสำหรับองค์กรที่ต้องการให้วิทยากร ไปอบรมที่บริษัทของท่าน หรือ ตามสถานที่อื่นๆ ที่ท่านติดต่อไว้</Text>
            <Button
                as={Link}
                href='/register/inhouse'
                fontSize={{ base: '1.25rem', lg: '1.5rem' }}
                w={{ base: '200px', lg: '444px' }}
                h={{ base: '50px', lg: '80px' }}
                bg={buttonColor}
                textColor='white'
                borderRadius='20px'
                _hover={{
                    bg: hoverColor,
                }}
                _active={{
                    bg: hoverColor,
                }}
            >
                <Text>ลงทะเบียนอบรม</Text>
            </Button>
        </Stack>)
}

