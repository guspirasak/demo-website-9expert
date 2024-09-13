'use client'

import { StarIcon } from "@/app/icons/AdminIcon"
import { Avatar, Box, Button, Container, Heading, Stack, Stat, StatLabel, StatNumber, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { THomepageReview } from "./interfaces/Homepage"
import Link from "next/link"
import { CountUpOptions } from "countup.js"
import { motion } from "framer-motion"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { getReview } from "@/services/api/home"
import { containerBreakpoints } from "@/config/theme"

const MotionStack = motion(Stack);

export const StatusBox = ({ number, status, label, icon, option }: { number: number, status: string, label: string, icon?: JSX.Element, option?: CountUpOptions }) => {

    const countupRef = useRef(null)
    let countUpAnim

    async function initCountUp() {
        try {
            const countUpModule = await import('countup.js');
            // TODO: refactor this to use the new import syntax
            countUpAnim = new countUpModule.CountUp(countupRef?.current as unknown as string, number, option)
            if (!countUpAnim.error) {
                countUpAnim.start();
            } else {
                console.error(countUpAnim.error)
            }
        } catch (error) {
            // TODO: debug this import error at runtime
            console.error(error)
        }
    }

    return (
        <MotionStack
            p='1rem'
            w='160px'
            h='160px'
            border='2px'
            borderRadius='20px'
            borderColor='exBlue'
            whileInView={() => {
                initCountUp()
            }}
            viewport={{ once: true }}
        >
            <Stat
                w='100%'
                h='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                <Stack
                    direction='row'
                    align='center'
                    justify='center'
                >
                    {icon}
                    <StatNumber
                        textAlign='center'
                        display='flex'
                        fontSize='2rem'
                        fontWeight='900'
                        textColor='#4091F4'
                    >
                        <Text ref={countupRef}></Text>
                        {status}
                    </StatNumber>
                </Stack>
                <StatLabel fontSize='1.5rem' fontWeight='black' textAlign='center' bg='linear-gradient(45deg, #4091F4, #56BDF9)' bgClip='text'  >{label}</StatLabel>
            </Stat>
        </MotionStack>
    )
}

export const AnimatedCommentCard = ({
    active,
    fullname,
    description,
    image,
    opacity,
    index,
    reviews,
    setReviews
}: {
    active: boolean;
    fullname: string;
    description: string;
    image: string;
    opacity: number;
    index: number;
    reviews: THomepageReview[]
    setReviews: Dispatch<SetStateAction<THomepageReview[]>>
}) => {

    const bgColor = useColorModeValue(
        active ? 'exBlue' : 'white',
        active ? 'white' : '#BBBBBB'
    );
    const textColor = useColorModeValue(active ? 'white' : 'black', 'black');
    const avatarColor = useColorModeValue(
        active ? 'white' : 'exBlue',
        active ? '#BBBBBB' : 'white'
    );

    const MTStack = motion(Stack);

    const variants = {
        enter: () => {
            if (active) {
                return {
                    opacity: opacity,
                    y: -300,
                    x: 0
                }
            } else if (!active && index === 0) {
                return {
                    opacity: 0,
                    x: 200
                }
            } else if (!active && index === 1) {
                return {
                    opacity: 1,
                    y: -300,
                    x: 0
                }
            } else if (!active && index === 2) {
                return {
                    opacity: opacity,
                    y: -300,
                    x: 100
                }
            } else {
                return {
                    opacity: opacity,
                    y: -300
                }
            }
        },
        initial: () => {
            if (active) {
                return {
                    opacity: opacity,
                    y: 250,
                    x: 100
                }
            } else if (!active && index === 0) {
                return {
                    opacity: 1,
                    x: 100
                }
            } else if (!active && index === 1) {
                return {
                    opacity: opacity,
                    y: 250,
                    x: -100
                }
            } else if (!active && index === 2) {
                return {
                    opacity: opacity,
                    y: 250,
                    x: 100
                }
            } else {
                return {
                    opacity: 0,
                    y: 250
                }
            }
        },
        exit: () => {
            return {
                opacity: 0,
                duration: 0.5
            }
        }
    }

    return (
        <MTStack
            ml={{ base: '0', '2xl': active ? '0' : '5rem' }}
            bg={bgColor}
            color={textColor}
            direction="row"
            align="center"
            p={{ base: '1rem', lg: '2rem' }}
            w={{ base: '100%', lg: '40rem' }}
            h="200px"
            spacing="2rem"
            borderRadius="16px"
            shadow={active ? '2xl' : 'none'}
            opacity={opacity}
            variants={variants}
            initial='initial'
            animate='enter'
            transition={{
                duration: 1.5,
            }}
            onAnimationComplete={() => {
                const newComment = [...reviews]
                newComment.push(reviews[0])
                const rw = newComment.slice(1, newComment.length)

                setTimeout(() => {
                    setReviews(rw)
                }, 5000)
            }}
        >
            <Stack p="0.5rem" bg={avatarColor} borderRadius="full">
                <Avatar
                    w={{ base: '65px', lg: '100px' }}
                    h={{ base: '65px', lg: '100px' }}
                    src={image}
                    name={fullname}
                />
            </Stack>
            <Stack spacing={{ base: '0', lg: '1rem' }}>
                <Stack spacing={{ base: '0', lg: '0.25rem' }}>
                    <Heading size="md">{fullname} {index}</Heading>
                </Stack>
                <Text
                    noOfLines={4}
                    fontSize={{ base: 'sm', lg: 'md' }}
                >{description}</Text>
            </Stack>
        </MTStack>
    );
};

export const CommentCard = ({
    active,
    fullname,
    description,
    image,
    opacity,
}: {
    active: boolean;
    fullname: string;
    description: string;
    image: string;
    opacity: number;
    index: number;
    reviews: THomepageReview[]
    setReviews: Dispatch<SetStateAction<THomepageReview[]>>
}) => {

    const bgColor = useColorModeValue(
        active ? 'exBlue' : 'white',
        active ? 'white' : '#BBBBBB'
    );
    const textColor = useColorModeValue(active ? 'white' : 'black', 'black');
    const avatarColor = useColorModeValue(
        active ? 'white' : 'exBlue',
        active ? '#BBBBBB' : 'white'
    );

    return (
        <Stack
            ml={{ base: '0', '2xl': active ? '0' : '5rem' }}
            bg={bgColor}
            color={textColor}
            direction="row"
            align="center"
            p={{ base: '1rem', lg: '2rem' }}
            w='100%'
            h="140px"
            spacing={{ base: '1rem', lg: '2rem' }}
            borderRadius="20px"
            shadow={active ? '2xl' : 'none'}
            opacity={opacity}
        >
            <Stack bg={avatarColor} borderRadius="full">
                <Avatar
                    w={{ base: '65px', lg: '100px' }}
                    h={{ base: '65px', lg: '100px' }}
                    src={image}
                    name={fullname}
                />
            </Stack>
            <Stack spacing={{ base: '0', lg: '1rem' }}>
                <Stack spacing={{ base: '0', lg: '0.25rem' }}>
                    <Heading size="md">{fullname}</Heading>
                </Stack>
                <Text
                    noOfLines={4}
                    fontSize={{ base: 'sm', lg: 'md' }}
                >{description}</Text>
            </Stack>
        </Stack>
    );
};

const AnimationComment = ({ comment }: { comment: THomepageReview[] }) => {
    const [reviews, setReviews] = useState<THomepageReview[]>([])

    const swiperRef = useRef<SwiperClass>()

    useEffect(() => {
        setReviews(comment)
    }, [comment])

    useEffect(() => {
        swiperRef.current?.autoplay.start()
    }, [swiperRef])

    return (
        <MotionStack
            as="h3"
            w="100%"
            h='fit-content'
            align={{ base: 'center', '2xl': 'start' }}
            spacing={{ base: '1rem', lg: '2rem' }}
            position='relative'
        >
            {
                useBreakpointValue({ base: (
                    <Stack
                        w='100%'
                        h='100%'
                        position='absolute'
                        top='0'
                        left='0'
                        zIndex={useBreakpointValue({ base: 100, xl: -1 })}
                        display={{ base: 'block', xl: 'none' }}
                    >

                    </Stack>
                ), xl: <></> })
            }
            <Swiper
                onSwiper={(swiper: SwiperClass) => swiperRef.current = swiper}
                direction='vertical'
                slidesPerView={3}
                centeredSlides={true}
                initialSlide={0}
                speed={3000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                style={{
                    width: '100%',
                    maxHeight: '700px',
                }}
                modules={[Autoplay]}
                {...useBreakpointValue({ sm: { allowTouchMove: false }, xl: {} })}
            >
                {reviews.map((item, index) => (
                    <SwiperSlide
                        key={`comment-${index}`}
                        style={{
                            width: '100%',
                            height: '80px',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {({ isActive }) => (
                            <CommentCard
                                active={isActive}
                                fullname={item.name}
                                description={item.description}
                                image={item.image}
                                opacity={1}
                                index={index}
                                setReviews={setReviews}
                                reviews={reviews}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </MotionStack>
    )
}

export const HomepageComment = () => {
    const [reviews, setReviews] = useState<THomepageReview[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await getReview();
            setReviews(data.result);
        }
        fetchData()
    }, []);

    return (
        <Stack
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack w="100%" spacing={{ base: '2rem', lg: '4rem' }}>
                    <Stack w="100%" align="center" spacing='1rem' textAlign="start">
                        <Heading
                            as="h2"
                            size={{ base: 'lg', lg: '2xl' }}
                            textAlign='center'
                        >
                            ส่วนหนึ่ง<br />
                            ของความภาคภูมิใจ
                        </Heading>
                        <Text
                            fontSize={{ base: '1rem', lg: '1.25rem' }}
                            textAlign='center'
                            maxW='65ch'
                        >{`9Expert Training  เราจะเป็นส่วนของการ สนับสนุนให้กับบุคคลและองค์กรในการปรับตัวตามความเปลี่ยนแปลงของเทคโนโลยีในยุคสมัยใหม่ เพื่อนำมาใช้เพิ่มประสิทธิภาพการทำงานสร้างความได้เปรียบในการทำงาน ให้เหนือคู่แข่ง`}</Text>
                    </Stack>
                    <Stack
                        direction={{ base: 'column', '2xl': 'row' }}
                        w="100%"
                    >
                        <Stack
                            as="h3"
                            w="100%"
                            spacing={{ base: '1rem', lg: '4rem' }}
                            align="center"
                            justify="center"
                        >
                            <Stack
                                direction="row"
                                spacing={{ base: '1rem', lg: '4rem' }}
                            >
                                <StatusBox
                                    number={1.5}
                                    status="K+"
                                    label="องค์กร"
                                    option={{
                                        decimalPlaces: 1,
                                    }}
                                />
                                <StatusBox
                                    number={100}
                                    status="K+"
                                    label="ผู้เรียน"
                                />
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={{ base: '1rem', lg: '4rem' }}
                            >
                                <StatusBox
                                    number={4.8}
                                    status=""
                                    label="รีวิว"
                                    icon={
                                        <StarIcon
                                            color="exStarYellow"
                                            w="30px"
                                            h="30px"
                                        />
                                    }
                                    option={{
                                        decimalPlaces: 1,
                                    }}
                                />
                                <StatusBox
                                    number={200}
                                    status="K+"
                                    label="ผู้ติดตาม"
                                />
                            </Stack>
                            <Button
                                mt='2rem'
                                as={Link}
                                href={'/portfolio'}
                                w="250px"
                                h="75px"
                                bg="linear-gradient(135deg, #4091F4, #56BDF9)"
                                cursor="pointer"
                                color="white"
                                fontSize={{ base: '1.25rem', lg: '1.5rem' }}
                                _hover={{
                                    bg: 'linear-gradient(135deg, #4091F4, #56BDF9)',
                                    position: 'relative',
                                    top: '-5px',
                                }}
                                _active={{
                                    bg: 'linear-gradient(135deg, #4091F4, #56BDF9)',
                                }}
                            >
                                ดูทั้งหมด
                            </Button>
                        </Stack>
                        <AnimationComment comment={reviews} />
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    );
}