'use client'

import { Image, Button, Stack, useColorModeValue } from "@chakra-ui/react"
import { TELTab } from "../interface/ELTab"
import { TLiveRef } from "../../class/interface/LiveTab"
import { useSingleCourse } from "@/app/course/context/SingleCourseContext"
const ELTabButton = ({ children, target, leftIcon, image }: TELTab) => {

    return (
        <Button
            h='65px'
            w='331px'
            p='34px'
            bg='transparent'
            justifyContent='start'
            borderRadius='20px'
            leftIcon={leftIcon}
            onClick={() => target?.current?.scrollIntoView({ behavior: 'smooth' })}
            color={'white'}
            fontSize='18px'
            _hover={{
                bg: 'white',
                fontStyle: 'bold',
                color: useColorModeValue('#19B5FE', 'black'),
            }}
            _active={{
                bg: 'white',
                fontStyle: 'bold',
                color: useColorModeValue('#19B5FE', 'black'),
            }}
        >
            <Image
                w='30px'
                h='30px'
                mr='30px'
                src={image}
                alt='E-learning tab image'
                loading="lazy"
            />
            {children}
        </Button>
    )
}

export const ELTab = ({ tabRef }: { tabRef: TLiveRef }) => {

    const { state } = useSingleCourse()
    
    return (
        <Stack
            w='361px'
            h='100%'
            align='center'
            justify='center'
            borderRadius='20px'
            mt='2rem'
            px='15px'
            py='33px'
            display={{ base: 'none', '2xl': 'flex' }}
            bg={useColorModeValue('#0F467D', '#3A9DFF33')}
        >
            <Stack
                w='100%'
                gap='15px'
            >
                {
                    state.courseObjective.length > 0 && (
                        <ELTabButton
                            target={tabRef.objective}
                            image='/course/flag.png'
                        >
                            {`วัตถุประสงค์`}
                        </ELTabButton>
                    )
                }
                {
                    state.courseBenefit.length > 0 && (
                        <ELTabButton
                            target={tabRef.benefit}
                            image='/course/target.png'
                        >
                            {`หลักสูตรนี้เหมาะสำหรับ`}
                        </ELTabButton>
                    )
                }
                {
                    state.courseRequirement.length > 0 && (
                        <ELTabButton
                            target={tabRef.requirement}
                            image='/course/system.png'
                        >
                            {`ความต้องการของระบบ`}
                        </ELTabButton>
                    )
                }
                {
                    state.relatedCourse?.length > 0 && (
                        <ELTabButton
                            target={tabRef.related}
                            image='/course/certificate.png'
                        >
                            {`หลักสูตรที่เกี่ยวข้อง`}
                        </ELTabButton>
                    )
                }
                {
                    state.note && (
                        <ELTabButton
                            target={tabRef.note}
                            image='/course/note.png'
                        >
                            {`หมายเหตุ`}
                        </ELTabButton>
                    )
                }
            </Stack>
        </Stack>
    )
}