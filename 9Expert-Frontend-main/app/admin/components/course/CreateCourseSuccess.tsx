'use client'

import { GreenSuccessWithCircleIcon } from "@/app/icons/RegisterIcons"
import { Center, Heading } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const CreateCourseComplete = () => {

    const router = useRouter()
    const tab = useSearchParams().get('tab')
    const course = useSearchParams().get('course')

    useEffect(() => {
        setTimeout(() => {
            router.push(`/admin?tab=${tab}`)
        }, 5000);
        
    }, [])

    return (
        <Center
            w='100%'
            h='100%'
            py='130px'
            px='40px'
            bg={tab === 'elearning-course' ? '#0B345D' : ''}
        >
            <Center
                w='100%'
                h='100%'
                minH='768px'
                flexDirection='column'
                gap='60px'
                bg='white'
                borderRadius='20px'
            >
                <Center
                    w={{ base: '200px', lg: '400px' }}
                    h={{ base: '200px', lg: '400px' }}
                    bg='#F2FCF2'
                    borderRadius='full'
                >
                    <Center
                        w={{ base: '100px', lg: '200px' }}
                        h={{ base: '100px', lg: '200px' }}
                        bg='#CFF3CE'
                        borderRadius='full'
                    >
                        <GreenSuccessWithCircleIcon w={{ base: '50px', lg: '100px' }} h={{ base: '50px', lg: '100px' }} />
                    </Center>
                </Center>
                <Center
                    flexDirection='column'
                    gap='24px'
                >
                    <Heading
                        fontSize='48px'
                        textColor='#2E2E2E'
                        textAlign='center'
                    >
                        {`${course ? 'แก้ไข' : 'สร้าง'}หลักสูตร${tab === 'normal-course' ? 'ธรรมดา' : ' E-learnning '}สำเร็จ!`}
                    </Heading>
                </Center>
            </Center>
        </Center>
    )
}