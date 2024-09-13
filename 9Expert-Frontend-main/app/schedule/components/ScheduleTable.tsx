'use client'

import { HStack, Image, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, forwardRef, useColorModeValue } from "@chakra-ui/react"
import moment from "moment"
import { useMemo } from "react"
import React from "react"
import Link from "next/link"
import commaNumber from "comma-number"
import { useRouter } from "next/navigation"
import { TCourseScheduleGroup, Course, ClassSchedule } from "../components/SchedulePage"

export const TableStatus = forwardRef(({ status }: { status: string }, ref) => {

    const classTypeBg = () => {
        if (status.toLowerCase() === 'classroom') {
            return useColorModeValue('#8BF47A80', '#2E5C0E')
        }

        if (status.toLowerCase() === 'live') {
            return useColorModeValue('#FADEDE80', '#EB6969')
        }

        if (status.toLowerCase() === 'hybrid') {
            return useColorModeValue('#DEE0FA80', '#6974EB')
        }

        return useColorModeValue('#8BF47A80', '#2E5C0E')
    }

    const classTypeTextColor = () => {
        if (status.toLowerCase() === 'classroom') {
            return useColorModeValue('#2E5C0E', '#FFFFFF')
        }

        if (status.toLowerCase() === 'live') {
            return useColorModeValue('#E85353', '#FFFFFF')
        }

        if (status.toLowerCase() === 'hybrid') {
            return useColorModeValue('#535FE8', '#FFFFFF')
        }

        return useColorModeValue('#2E5C0E', '#FFFFFF')
    }

    if (status === 'Classroom') {
        return (
            <Stack
                ref={ref}
                w='max-content'
                h='30px'
                px='10px'
                align='center'
                justify='center'
                borderRadius='47px'
                bg={classTypeBg()}
            >
                <Text
                    fontSize='16px'
                    textColor={classTypeTextColor()}
                >
                    {`Classroom`}
                </Text>
            </Stack>
        )
    }

    if (status === 'Live') {
        return (
            <Stack
                ref={ref}
                w='max-content'
                h='30px'
                px='10px'
                align='center'
                justify='center'
                borderRadius='47px'
                bg={classTypeBg()}
            >
                <Text
                    fontSize='16px'
                    textColor={classTypeTextColor()}
                >
                    {`Live`}
                </Text>
            </Stack>
        )
    }

    if (status === 'Hybrid') {
        return (
            <Stack
                ref={ref}
                w='max-content'
                h='30px'
                px='10px'
                align='center'
                justify='center'
                borderRadius='47px'
                bg={classTypeBg()}
            >
                <Text
                    fontSize='16px'
                    textColor={classTypeTextColor()}
                >
                    {`Hybrid`}
                </Text>
            </Stack>
        )
    }
})

export const ScheduleTable = ({ courseGroup }: { courseGroup: TCourseScheduleGroup }) => {

    const color = courseGroup.courseGroupColor.length === 1 ? [courseGroup.courseGroupColor[0], courseGroup.courseGroupColor[0]] : courseGroup.courseGroupColor

    const theadBg = useColorModeValue(`${color[0]}`, '#323232')
    const textColor = useColorModeValue('#2E2E2E', '#ffffff')
    const borderColor = useColorModeValue(color[0], '#ffffff')
    const router = useRouter()

    const handleRegister = (id: string) => {
        router.push(`/register/public?id=${id}`)
    }

    const getNextFourMonths = (start: moment.Moment): string[] => {
        const months: string[] = [start.format('MMM')]
        const arr = [...Array(4)]

        arr.map(() => {
            months.push(start.add(1, 'month').format('MMM'))
        })

        return months

    }

    const months = useMemo(() => getNextFourMonths(moment()), [])

    const renderSchedule = (item: Course, month: string) => {
        const newS: ClassSchedule[] = []

        item.classSchedule.map((schedule) => {
            if (moment(schedule.classStartDate).format('MMM').toLowerCase() === month.toLowerCase()) {
                if (newS.length > 0) {
                    newS.map((s) => {
                        if (moment(s.classStartDate).format('MMM').toLowerCase() !== moment(schedule.classStartDate).format('MMM').toLowerCase()) {
                            newS.push(schedule)
                            return
                        }
                    })
                    return
                }
                newS.push(schedule)
                return
            }
        })

        return newS
    }

    return (
        <TableContainer
            w='100%'
            borderRadius='15px'
        >
            <Table>
                <Thead
                    h='100px'
                >
                    <Tr
                        bg={theadBg}
                        gap='0'
                    >
                        <Th>
                            <HStack
                                w='100%'
                                h='100%'
                                color='white'
                                fontSize='18px'
                                textStyle='extrabold'
                                spacing='20px'
                            >
                                <Image alt={courseGroup.courseGroupName} w='50px' h='50px' src={courseGroup.courseGroupIcon} />
                                <Text>{courseGroup.courseGroupName}</Text>
                            </HStack>
                        </Th>
                        <Th
                            textAlign='center'
                            color='white'
                            fontSize='18px'
                            textStyle='extrabold'
                        >
                            {`วัน`}
                        </Th>
                        <Th
                            textAlign='center'
                            color='white'
                            fontSize='18px'
                            textStyle='extrabold'
                        >
                            {`ราคา`}
                        </Th>
                        {
                            months.map((month, index) => (
                                <Th
                                    key={index}
                                    textAlign='center'
                                    color='white'
                                    fontSize='18px'
                                    textStyle='extrabold'
                                >
                                    {month}
                                </Th>
                            ))
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courseGroup.course.map((item, index) => (
                            <Tr
                                key={index}
                                bg={useColorModeValue(index % 2 === 0 ? `${color[0]}40` : `${color[1]}20`, index % 2 === 0 ? '#3F4144' : `#4F5155`)}
                                minH='30px'
                                h='max-content'
                            >
                                <Td
                                    fontSize='18px'
                                    textColor={textColor}
                                    borderY='0'
                                    maxW='35rem'
                                    w='35rem'
                                    h='max-content'
                                    whiteSpace='pre-line'
                                    lineHeight='2.5rem'
                                    _hover={{
                                        textDecoration: 'underline',
                                    }}
                                >
                                    <Tooltip
                                        w='15rem'
                                        bg='#2E2E2E'
                                        hasArrow
                                        textAlign='center'
                                        label='คลิกเพื่อดูรายละเอียดหลักสูตรนี้ ตารางอบรมและลงทะเบียน'
                                        borderRadius='5px'
                                        py='13px'
                                        px='20px'
                                        textColor={useColorModeValue('#ffffff', 'white')}
                                    >
                                        <Link
                                            href={`/course/${item.courseUrl}`}
                                        >
                                            {item.courseName}
                                        </Link>
                                    </Tooltip>
                                </Td>
                                <Td
                                    textAlign='center'
                                    fontSize='18px'
                                    textColor={textColor}
                                    borderX='1px'
                                    borderY='0'
                                    borderColor={borderColor}
                                >
                                    {item.days}
                                </Td>
                                <Td
                                    textAlign='center'
                                    fontSize='18px'
                                    textColor={textColor}
                                    borderX='1px'
                                    borderY='0'
                                    borderColor={borderColor}
                                >
                                    {
                                        item.price === 0 ?
                                            <Tooltip
                                                w='fit-content'
                                                bg='#2E2E2E'
                                                hasArrow
                                                textAlign='center'
                                                textColor={useColorModeValue('#ffffff', 'white')}
                                                label='ช่องทางการติดต่อ 02-219-4304 หรือ training@9expert.co.th'
                                                borderRadius='5px'
                                                py='13px'
                                            >
                                                <Text
                                                    textColor={textColor}
                                                    fontWeight='500'
                                                >
                                                    {`Call`}
                                                </Text>
                                            </Tooltip>
                                            :
                                            commaNumber(item.price)
                                    }
                                </Td>
                                {
                                    months.map((month, mi) => {
                                        if (item.classSchedule.length === 0) {
                                            return (
                                                <Td
                                                    key={mi}
                                                    borderX='1px'
                                                    borderY='0'
                                                    borderColor={borderColor}
                                                >
                                                    <Stack
                                                        w='100%'
                                                        h='100%'
                                                        align='center'
                                                        justify='center'
                                                        spacing='16px'
                                                    >

                                                    </Stack>
                                                </Td>
                                            )
                                        }

                                        return (
                                            <React.Fragment key={mi}>
                                                {
                                                    renderSchedule(item, month).map((schedule, _i) => (
                                                        <Td
                                                            key={_i}
                                                            w='fit-content'
                                                            borderX='1px'
                                                            borderY='0'
                                                            borderColor={borderColor}
                                                            p='0'
                                                            py='3px'
                                                            px='16px'
                                                            onClick={() => handleRegister(schedule._id)}
                                                        >
                                                            <Tooltip
                                                                bg='#2E2E2E'
                                                                hasArrow
                                                                label='ลงทะเบียนอบรมรอบนี้'
                                                                borderRadius='5px'
                                                                px='20px'
                                                                py='13px'
                                                                textColor={useColorModeValue('#ffffff', 'white')}
                                                            >
                                                                <Stack
                                                                    w='100%'
                                                                    h='100%'
                                                                    py='9px'
                                                                    px='0'
                                                                    align='center'
                                                                    justify='center'
                                                                    spacing='16px'
                                                                    cursor='pointer'
                                                                    textColor={textColor}
                                                                    _hover={{
                                                                        bg: 'white',
                                                                        borderRadius: '1rem',
                                                                        color: 'black',
                                                                    }}
                                                                >
                                                                    <TableStatus status={schedule.classType} />
                                                                    <Text
                                                                        textAlign='center'
                                                                        fontSize='1rem'
                                                                    >
                                                                        {`${moment(schedule.classStartDate).format('DD MMM')} - ${moment(schedule.classEndDate).format('DD MMM')}`}
                                                                    </Text>
                                                                </Stack>
                                                            </Tooltip>
                                                        </Td>
                                                    ))
                                                }
                                                {
                                                    renderSchedule(item, month).length === 0 && (
                                                        <Td
                                                            borderX='1px'
                                                            borderY='0'
                                                            borderColor={borderColor}
                                                        >
                                                            <Stack
                                                                w='100%'
                                                                h='100%'
                                                                align='center'
                                                                justify='center'
                                                                spacing='1rem'
                                                            >

                                                            </Stack>
                                                        </Td>
                                                    )
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}