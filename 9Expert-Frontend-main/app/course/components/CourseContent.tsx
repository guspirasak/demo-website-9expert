'use client'

import { Heading, Stack, Text, Box, Center, useColorModeValue, Button, HStack, Image, useBreakpoint, SimpleGrid, Wrap } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper/modules"
import { OfflineCard } from "@/app/components/ContentCard/OfflineCard"
import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { getBundleByMultiCourseId } from "@/libs/UserAPI"
import { TBundleCard } from "@/app/admin/interface/BundleInterface"
import { BundleCard } from "@/app/components/ContentCard/BundleCard"
import { calculateCards } from "@/libs/CalculateCard"

export const CourseContent = ({ course, courseGroup }: { course: TCourseCard[], courseGroup: TCourseGroup }) => {

    const breakpoint = useBreakpoint()

    const borderColor = useColorModeValue('rgba(24, 90, 53, 0.15)', 'white')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiper2Ref = useRef<any>()

    const [bundle, setBundle] = useState<TBundleCard[]>([])

    const [numofCards, setNumofCards] = useState(0)

    useEffect(() => {
        if (course.filter((c) => c.courseType === 'Online').length > 0) {
            getBundleByMultiCourseId(course.map((c) => c._id as string), (data: TBundleCard[], error: unknown) => {
                if (error) console.log(error)
                if (data) setBundle(data)
            })
        }
    }, [course])

    useEffect(() => {
        setNumofCards(calculateCards(window.innerWidth))
    }, [breakpoint])

    return (
        <Stack
            w='100%'
            h='100%'
            py='3rem'
            align='center'
            spacing='2rem'
        >
            <Stack
                id={`course-${courseGroup.courseGroupNameAbbr}`}
                w='100%'
                h='100%'
                minH={{ base: 'min-content', lg: 'fit-content' }}
                align='center'
            >
                <HStack
                    spacing='10px'
                >
                    <Image
                        alt="course icon"
                        w='60px'
                        h='60px'
                        src={courseGroup.courseGroupIcon}
                    />
                    <Heading as='h2' size='2xl' >{courseGroup.courseGroupNameAbbr}</Heading>
                </HStack>
                {
                    course.filter((c) => c.courseType === 'Offline').length > 0 &&
                    <>
                        <Stack
                            w='100%'
                            mt={{ base: '1rem', lg: '3rem' }}
                            align='end'
                            justify='end'
                        >
                            <Stack
                                id={`${courseGroup.courseGroupNameAbbr}-public-course`}
                                w='100%'
                                borderBottom='1px'
                                borderColor={borderColor}
                                align='end'
                                justify='end'
                            >
                                <Text fontSize='3xl' fontWeight='bold' >{`สอนสด`}</Text>
                            </Stack>
                        </Stack>
                        {
                            course.length < numofCards ?
                                <Wrap
                                    w='100%'
                                    spacing='30px'
                                    h='100%'
                                    py='1rem'
                                    pb='100px'
                                    px={{ base: '0rem', lg: '0.5rem' }}
                                    mt={{ base: '1rem', lg: '3rem' }}
                                    justify='center'
                                >
                                    {course.filter((c) => c.courseType === 'Offline').map((cc, i) => (
                                        <OfflineCard
                                            key={i}
                                            course={cc}
                                        />
                                    ))}
                                </Wrap>
                                :
                                <Box
                                    as={Swiper}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onSwiper={(swiper: any) => swiperRef.current = swiper}
                                    className='boxSwiperOfflineCourse'
                                    w='100%'
                                    h='100%'
                                    py='1rem'
                                    pb='100px'
                                    px={{ base: '0rem', lg: '0.5rem' }}
                                    mt={{ base: '1rem', lg: '3rem' }}
                                    slidesPerView='auto'
                                    spaceBetween={30}
                                    initialSlide={0}
                                    scrollbar={{
                                        hide: false,
                                        draggable: true,
                                        snapOnRelease: true
                                    }}
                                    modules={[Scrollbar]}
                                >
                                    {course.filter((c) => c.courseType === 'Offline').map((cc, i) => (
                                        <SwiperSlide
                                            key={i}
                                            style={{ width: '340px' }}
                                        >
                                            <Center>
                                                <OfflineCard
                                                    course={cc}
                                                />
                                            </Center>
                                        </SwiperSlide>
                                    ))}
                                    <Button
                                        position='absolute'
                                        h='32px'
                                        w='48px'
                                        bg='#EEF2FF'
                                        color='#19B5FE'
                                        borderRadius='32px'
                                        left={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '13%' }}
                                        bottom='0'
                                        onClick={() => swiperRef.current.slidePrev()}
                                        zIndex='10'
                                        _hover={{
                                            bg: '#19B5FE',
                                            color: 'white'
                                        }}
                                    >
                                        {`<`}
                                    </Button>
                                    <Button
                                        position='absolute'
                                        h='32px'
                                        w='48px'
                                        bg='#EEF2FF'
                                        color='#19B5FE'
                                        borderRadius='32px'
                                        right={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '13%' }}
                                        bottom='0'
                                        onClick={() => swiperRef.current.slideNext()}
                                        zIndex='10'
                                        _hover={{
                                            bg: '#19B5FE',
                                            color: 'white'
                                        }}
                                    >
                                        {`>`}
                                    </Button>
                                </Box>
                        }
                    </>
                }
            </Stack>
            {
                course.length > 0 && course.filter((c) => c.courseType === 'Online').length > 0 &&
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                >
                    <Stack
                        w='100%'
                        mt='3rem'
                        align='end'
                        justify='end'
                    >
                        <Stack
                            id="course-elearning"
                            w='100%'
                            borderBottom='1px'
                            borderColor={borderColor}
                            align='end'
                            justify='end'
                        >
                            <Text fontSize='3xl' fontWeight='bold' >{`e-Learning`}</Text>
                        </Stack>
                    </Stack>
                    {
                        course.length < numofCards ?
                            <Wrap
                                w='100%'
                                spacing='30px'
                                h='100%'
                                py='1rem'
                                pb='100px'
                                px={{ base: '0rem', lg: '0.5rem' }}
                                mt={{ base: '1rem', lg: '3rem' }}
                                justify='center'
                            >
                                {course.filter((c) => c.courseType === 'Online').map((cc, i) => (
                                    <OnlineCard
                                        key={i}
                                        course={cc}
                                    />
                                ))}
                            </Wrap>
                            :
                            <Box
                                as={Swiper}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onSwiper={(swiper: any) => swiper2Ref.current = swiper}
                                className='boxSwiperOfflineCourse'
                                w='100%'
                                h='100%'
                                py='1rem'
                                pb='100px'
                                px={{ base: '0rem', lg: '0.5rem' }}
                                mt={{ base: '1rem', lg: '3rem' }}
                                slidesPerView='auto'
                                spaceBetween={30}
                                initialSlide={course.length < numofCards ? Math.floor(course.length / 2) + 1 : 0}
                                centeredSlides={course.length < numofCards ? true : false}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                    snapOnRelease: true
                                }}
                                modules={[Scrollbar]}
                            >
                                {course.filter((c) => c.courseType === 'Online').map((cc, i) => (
                                    <SwiperSlide
                                        key={i}
                                        style={{ width: '340px' }}
                                    >
                                        <Center
                                            as={Link}
                                            href={cc.courseUrl ? `${window.origin}/course/${cc.courseUrl}_online` : `/course/${cc.courseName.replaceAll(' ', '_')}_online`}
                                        >
                                            <OnlineCard
                                                course={cc}
                                            />
                                        </Center>
                                    </SwiperSlide>
                                ))}
                                {bundle.map((bd, i) => (
                                    <SwiperSlide
                                        key={i}
                                        style={{ width: '340px' }}
                                    >
                                        <Center >
                                            <BundleCard bundle={bd} />
                                        </Center>
                                    </SwiperSlide>
                                ))}
                                <Button
                                    position='absolute'
                                    h='32px'
                                    w='48px'
                                    bg='#EEF2FF'
                                    color='#19B5FE'
                                    borderRadius='32px'
                                    left={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '13%' }}
                                    bottom='0'
                                    onClick={() => swiper2Ref.current.slidePrev()}
                                    zIndex='10'
                                    _hover={{
                                        bg: '#19B5FE',
                                        color: 'white'
                                    }}
                                >
                                    {`<`}
                                </Button>
                                <Button
                                    position='absolute'
                                    h='32px'
                                    w='48px'
                                    bg='#EEF2FF'
                                    color='#19B5FE'
                                    borderRadius='32px'
                                    right={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '13%' }}
                                    bottom='0'
                                    onClick={() => swiper2Ref.current.slideNext()}
                                    zIndex='10'
                                    _hover={{
                                        bg: '#19B5FE',
                                        color: 'white'
                                    }}
                                >
                                    {`>`}
                                </Button>
                            </Box>
                    }
                </Stack>
            }
        </Stack>
    )
}