'use client'

import { WorkshopIcons, CertificateIcon } from "@/app/icons/CardIcons"
import { Stack, Image, Box, Divider, HStack, Tag, useColorModeValue, VStack, Text } from "@chakra-ui/react"
import { CourseLevel } from "./CourseLevel"
import { TCertificateUser } from "@/app/admin/interface/CreateCertificate"
import { useEffect, useState } from "react"
import { TCertificateCard, } from "./Card"
import { getCourseCertificateCard } from "@/services/api/course"

export const CertificateCard = ({ courseId, user }: { courseId: string, user: TCertificateUser }) => {

    const [course, setCourse] = useState<TCertificateCard>({
        _id: '',
        courseId: '',
        courseName: '',
        courseColor: [],
        courseTeaser: '',
        courseTeaserAbbr: '',
        technologyArea: '',
        courseGroupName: '',
        courseGroupNameAbbr: '',
        difficultLevel: '',
        workshop: false,
        certificate: false,
        skills: [],
    })

    const iconColor = useColorModeValue('exBlue', '#282828')

    useEffect(() => {
        async function fetchData() {
            const data = await getCourseCertificateCard(courseId);
            setCourse(data)
        }
        fetchData();
    }, [courseId]);


    return (
        <Stack
            w='375px'
            h='523px'
            align='center'
            justify='center'
            borderRadius='20px'
            shadow='lg'
        >
            <Image
                alt="certificate"
                w='375px'
                h='265px'
                src={user.certificate}
                borderTopRadius='30px'
            />
            <VStack id="card-detail" m='1rem' align='start' >
                <HStack
                    justify='space-between'
                    w='100%'
                >
                    <HStack
                        id="card-tag"
                        h='100%'
                    >
                        <Tag
                            as='h4'
                            bg={course.courseColor[0]}
                            color={course.courseColor[1]}
                            borderRadius='20px'
                        >
                            {course.courseGroupNameAbbr}
                        </Tag>
                        <Tag
                            as='h4'
                            bg={course.courseColor[0]}
                            color={course.courseColor[1]}
                            borderRadius='20px'
                        >
                            {course.skills[0]}
                        </Tag>
                    </HStack>
                    <CourseLevel level={course.difficultLevel} courseName={course.courseName} />
                </HStack>
                <HStack
                    minH='60px'
                >
                    <Box
                        w='4px'
                        h='50px'
                        bg=''
                        borderRadius='full'
                    ></Box>
                    <Text as='h3' fontSize='xl' fontWeight='extrabold' noOfLines={2} >{course.courseName}</Text>
                </HStack>
                <Text noOfLines={1} fontSize='sm' textColor='exGray' minH='42px' >{course.courseTeaserAbbr}</Text>
                <Divider my='0.5rem' borderTop='1px' borderColor='exGray' />
                <HStack justify='space-between' w='100%' mt='0.25rem'>
                    {
                        course.workshop && (
                            <HStack spacing='1rem'>
                                <WorkshopIcons color={iconColor} w='22px' h='22px' />
                                <Text as='h4' fontWeight='bold' fontSize='sm' textColor='exGray' >{`Workshop`}</Text>
                            </HStack>
                        )
                    }
                    {
                        course.certificate && (
                            <HStack spacing='1rem' >
                                <CertificateIcon color={iconColor} w='22px' h='22px' />
                                <Text as='h4' fontWeight='bold' fontSize='sm' textColor='exGray' >{`เรียนจบได้ certificate`}</Text>
                            </HStack>
                        )
                    }
                </HStack>
            </VStack>
        </Stack>
    )
}