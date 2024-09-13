'use client'

import { CourseImageUploadIcon } from "@/app/icons/AdminIcon"
import { TImageToBase64Result, imageToBase64 } from "@/libs/ImageToBase64"
import { Stack, Text, Image, AspectRatio, Button, Input, VStack, useToast } from "@chakra-ui/react"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { useRef } from "react"
import { TCourseInputRef } from "../../interface/AdminInterface"
import { ICreateCourseValidateContext, useValidateCreateCourse } from "../../context/ValidateCreateCourse"

export const CreateCourseImage = () => {

    const { state, setState }: ICreateCourseContext = useCreateCourse() 
    const { validate, setValidate }: ICreateCourseValidateContext = useValidateCreateCourse()

    const toast = useToast()

    // Ref
    const courseImageRef = useRef<TCourseInputRef>()

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {



        imageToBase64(event.target.files?.[0], (result: TImageToBase64Result) => {

            if (result.error) {
                return toast({
                    title: 'กรุณาเลือกรูปภาพ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setState({ ...state, courseImage: result.file as string })
            setValidate({ ...validate, isCourseImage: false })
        })
    }
    
    return (
        <Stack
            w='100%'
            h='100%'
        >
            <Text fontSize='lg' fontWeight='bold' >{`ภาพขนาดย่อของหลักสูตร *`}</Text>
            {
                validate.isCourseImage && 
                <Text fontSize='md' fontWeight='bold' color='red' >{`กรุณาอัพโหลดภาพ`}</Text>
            }
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                h={{ base: 'min-content', lg: '289px' }}
                w='100%'
                spacing='1.5rem'
            >
                <AspectRatio w='100%' maxW='480px' ratio={480 / 289}>
                    <Image
                        alt="Course Image"
                        w='480px'
                        fit='cover'
                        objectPosition='top'
                        src={
                            state.courseImage || "https://res.cloudinary.com/dzz6rgxkl/image/upload/v1702450992/9expert/public/h5owwu5ca7hdhmzhwgia.png"
                        }
                    />
                </AspectRatio>
                <VStack
                    align='start'
                    spacing='1.5rem'
                    h={{ base: 'min-content', md: '289px' }}
                >
                    <Text
                        noOfLines={3}
                        maxW={{ base: '100%', md: '60%' }}
                        textColor='exGray.500'
                    >
                        {
                            `อัพโหลดภาพขนาดย่อของหลักสูตรของคุณที่นี่ 
                                     ขนาดภาพที่แนะนำ : 960x578 px
                                     รูปแบบที่รองรับ: .jpg, .jpeg หรือ .png`
                        }
                    </Text>
                    <Button
                        bg='exLightBlue'
                        color='exBlue'
                        leftIcon={<CourseImageUploadIcon w='16px' h='16px' />}
                        onClick={() => courseImageRef.current?.click()}
                        _hover={{
                            bg: 'exBlue',
                            color: 'white'
                        }}
                        _active={{
                            bg: 'exBlue',
                            color: 'white'
                        }}
                    >
                        {`Upload image`}
                    </Button>
                    <Input type="file" ref={courseImageRef} onChange={handleUploadImage} display='none' accept="image/png, image/jpeg, image/jpg, image/webp" />
                </VStack>
            </Stack>
        </Stack>
    )
}