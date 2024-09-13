'use client'

import { Button, ButtonGroup, HStack, Stack, Image, useColorModeValue } from "@chakra-ui/react"
import { TLiveRef, TLiveTab } from "../interface/LiveTab"
import { useSingleCourse } from "@/app/course/context/SingleCourseContext"
const LiveTabButton = ({ children, leftIcon, target, image }: TLiveTab) => {

    return (
        <HStack
            w='100%'
            h='100%'
        >
            <Button
                h='65px'
                w='331px'
                p='34px'
                bg='transparent'
                justifyContent='start'
                borderRadius='20px'
                leftIcon={leftIcon}
                onClick={() => target?.current?.scrollIntoView({ behavior: 'smooth' })}
                isActive={target?.current?.id === `${target?.current?.id}-focus`}
                color={useColorModeValue('black', 'white')}
                fontSize='18px'
                _hover={{
                    bg: useColorModeValue('#BAE9FF', 'white'),
                    color: useColorModeValue('white', 'black'),
                    fontStyle: 'bold'
                }}
                _active={{
                    bg: useColorModeValue('#BAE9FF', 'white'),
                    color: useColorModeValue('white', 'black'),
                    fontStyle: 'bold'
                }}
            >
                <Image
                    w='30px'
                    h='30px'
                    mr='30px'
                    src={image}
                    alt='side tab icon'
                    loading="lazy"
                />
                {children}
            </Button>
        </HStack>
    )
}

export const LiveTab = ({ tabRef }: { tabRef: TLiveRef }) => {
    
    const { state } = useSingleCourse()

    return (
        <Stack
            w={{ base: '361px', '2xl': '100%' }}
            h='min-content'
            align='center'
            justify='start'
            shadow={useColorModeValue('exBlue', 'none')}
            borderRadius='20px'
            bg={useColorModeValue('white', '#3A9DFF33')}
            mt='2rem'
            px='15px'
            py='33px'
            display={{ base: 'none', '2xl': 'flex' }}
        >
            <ButtonGroup
                w='100%'
                flexDirection='column'
                gap='15px'
                spacing='0'
            >
                <LiveTabButton
                    target={tabRef.objective}
                    image='/course/flag.png'
                >
                    {`วัตถุประสงค์`}
                </LiveTabButton>
                <LiveTabButton
                    target={tabRef.benefit}
                    image='/course/target.png'
                >
                    {`หลักสูตรนี้เหมาะสำหรับ`}
                </LiveTabButton>
                <LiveTabButton
                    target={tabRef.requirement}
                    image='/course/system.png'
                >
                    {`ความต้องการของระบบ`}
                </LiveTabButton>
                {
                    state.courseRoadmapPrevious && state.courseRoadmapNext && (
                        <LiveTabButton
                            target={tabRef.roadmap}
                            image='/course/roadmap.png'
                        >
                            {`Road Map`}
                        </LiveTabButton>
                    )
                }
                {
                    state.relatedCourse.length > 0 && (
                        <LiveTabButton
                            target={tabRef.related}
                            image='/course/certificate.png'
                        >
                            {`หลักสูตรที่เกี่ยวข้อง`}
                        </LiveTabButton>
                    )
                }
                {
                    state.note && (
                        <LiveTabButton
                            image='/course/note.png'
                        >
                            {`หมายเหตุ`}
                        </LiveTabButton>
                    )
                }
            </ButtonGroup>
        </Stack>
    )
}