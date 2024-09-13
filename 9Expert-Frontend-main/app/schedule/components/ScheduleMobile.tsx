'use client'

import { HStack, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import commaNumber from 'comma-number'
import { ScheduleIcon } from "@/app/icons/AdminIcon"
import moment from "moment"
import { TableStatus } from "./ScheduleTable"
import { TCourseScheduleGroup } from "../components/SchedulePage"

export const ScheduleMobile = ({ courseGroup }: { courseGroup: TCourseScheduleGroup }) => {
    const color = courseGroup.courseGroupColor.length === 1 ? [courseGroup.courseGroupColor[0], courseGroup.courseGroupColor[0]] : courseGroup.courseGroupColor
    const fontColor = useColorModeValue('#2E2E2E', '#FFFFFF')
    return (
        <Stack
            w='100%'
            h='100%'
            align='center'
            justify='center'
            position='relative'
            borderRadius='10px'
            spacing='0'
        >
            <Stack
                w='100%'
                h='78px'
                align='center'
                justify='center'
                borderTopRadius='10px'
                bg={useColorModeValue(`linear-gradient(180deg, ${color[0]} 0%, ${color[1]} 100%)`, '#323232')}
                direction='row'
            >
                <Image
                    w='30px'
                    h='30px'
                    src={courseGroup.courseGroupIcon}
                    alt="Course Group Icon"
                />
                <Text
                    fontSize='20px'
                    fontWeight='700'
                    textColor='white'
                >
                    {courseGroup.courseGroupName}
                </Text>
            </Stack>
            {
                courseGroup.course.map((c, index) => (
                    <Stack
                        key={index}
                        w='100%'
                        h='100%'
                        minH='187px'
                        px='45px'
                        py='30px'
                        spacing='0'
                        bg={useColorModeValue(index % 2 === 0 ? `${color[0]}40` : `${color[1]}20`, index % 2 === 0 ? '#3F4144' : `#4F5155`)}
                        borderBottomRadius='10px'
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            minH='96px'
                            py='15px'
                            borderTopRadius='20px'
                            align='center'
                            justify='center'
                            bg={index % 2 === 1 ? `${color[0]}40` : `${color[1]}20`}
                            spacing='0'
                        >
                            <Text
                                maxW='80%'
                                textAlign='center'
                                fontSize='20px'
                                fontWeight='600'
                                textColor={fontColor}
                            >
                                {c.courseName}
                            </Text>
                            <Text
                                maxW='80%'
                                textAlign='center'
                                fontSize='18px'
                                fontWeight='400'
                                textColor={fontColor}
                            >
                                {`${c.days} วัน (${c.hours} ชั่วโมง) ราคา ${commaNumber(c.price)}.-`}
                            </Text>
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            minH='96px'
                            py='18px'
                            px='20px'
                            borderBottomRadius='20px'
                            align='center'
                            justify='center'
                            bg='white'
                            spacing='0'
                        >
                            {
                                c.classSchedule.map((cs, i) => (
                                    <HStack
                                        key={i}
                                        w='100%'
                                        h='100%'
                                        spacing='14px'
                                    >
                                        <ScheduleIcon w='25px' h='25px' color={color[0]} />
                                        <Text
                                            fontSize='20px'
                                            fontWeight='600'
                                            textColor={fontColor}
                                            cursor='pointer'
                                            _hover={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {`${moment(cs.classStartDate).format('MMM')} ${moment(cs.classStartDate).format('DD')} - ${moment(cs.classStartDate).format('MMM')} ${moment(cs.classEndDate).format('DD')}`}
                                        </Text>
                                        <Stack
                                            w='fit-content'
                                            h='fit-content'
                                            ml='auto'
                                        >
                                            <TableStatus status={cs.classType} />
                                        </Stack>
                                    </HStack>
                                ))
                            }
                        </Stack>
                    </Stack>
                ))
            }
        </Stack>
    )
}