'use client'

import { MiniSearchCourseCard } from "@/app/components/ContentCard/MiniSearchCourseCard"
import { Box, Center, HStack, Heading, Image, Stack, Text, Wrap, WrapItem, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { useGroup } from "../context/GroupContext"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export const GroupClassroom = () => {

    const { state } = useGroup()

    const headerColor = useColorModeValue(state.courseGroup.courseGroupColor[1], 'white')
    const mainHeaderColor = useColorModeValue('#2E2E2E', 'white')
    const textColor = useColorModeValue('#888888', 'white')

    const breakpoint = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <>
            <Stack
                w='100%'
                h='100%'
                pt='80px'
            >
                <Heading
                    w='100%'
                    h='100%'
                    pb='30px'
                    mb='90px'
                    textAlign={{ base: 'center', lg: 'end' }}
                    fontSize='56px'
                    borderBottom={{ base: '0px', lg: '2px' }}
                    borderColor={headerColor}
                    color={headerColor}
                >
                    {`สอนสด`}
                </Heading>
                <HStack
                    w='100%'
                    align='center'
                    justify='center'
                >   
                    <Image 
                        alt={state.courseGroup.courseGroupName + ' logo'}
                        src={state.courseGroup.courseGroupIcon}
                        w='60px'
                        h='60px'
                    />
                    <Text
                        fontSize='48px'
                        color={mainHeaderColor}
                        fontWeight='800'
                    >
                        {state.courseGroup.courseGroupName}
                    </Text>
                </HStack>
                <Stack
                    w='100%'
                    spacing='30px'
                >
                    <Text
                        textAlign='center'
                        fontSize='24px'
                        color={textColor}
                    >
                        {state.courseGroup.courseGroupTeaser}
                    </Text>
                </Stack>
                {
                    !breakpoint ?
                        <Box
                            w='100%'
                            h='650px'
                            position='relative'
                            pb='100px'
                        >
                            <Box
                                as={Swiper}
                                className='boxSwiperOfflineCourse'
                                w='100%'
                                h='100%'
                                py='1rem'
                                px={{ base: '0rem', lg: '0.5rem' }}
                                mt='5rem'
                                slidesPerView={'auto'}
                                spaceBetween={30}
                                centeredSlides={true}
                                initialSlide={4}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                    snapOnRelease: true
                                }}
                                modules={[Scrollbar]}
                            >
                                {state.course.filter((cc) => cc.courseType === 'Offline').map((c, index) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: '340px' }}
                                    >
                                        <Center>
                                            <MiniSearchCourseCard course={c} />
                                        </Center>
                                    </SwiperSlide>
                                ))}
                            </Box>
                        </Box>
                        :
                        <Stack
                            mt='72px'
                            pb='184px'
                        >
                            <Wrap
                                spacingX='35px'
                                spacingY='65px'
                            >
                                {
                                    state.course.filter((cc) => cc.courseType === 'Offline').map((c, index) => (
                                        <WrapItem
                                            key={index}
                                        >
                                            <MiniSearchCourseCard course={c} />
                                        </WrapItem>
                                    ))
                                }
                            </Wrap>
                        </Stack >
                }
            </Stack>
        </>
    )
}