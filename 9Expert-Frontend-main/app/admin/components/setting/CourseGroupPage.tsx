'use client'

import { AspectRatio, Button, Input, Stack, Text, VStack, useToast, Image, Container } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { TCourseGroup } from "../../interface/CreateCourseInterface"
import { CourseImageUploadIcon } from "@/app/icons/AdminIcon"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { TCourseInputRef } from "../../interface/AdminInterface"
import { createCourseGroup } from "@/libs/AdminAPI"

export const AddCourseGroup = () => {

    const [ courseGroup, setCourseGroup ] = useState<TCourseGroup>({
        courseGroupId: '',
        courseGroupName: '',
        courseGroupNameAbbr: '',
        courseGroupBanner: '',
        courseGroupIcon: '',
        courseGroupTeaser: '',
        courseGroupTeaserAbbr: '',
        courseGroupColor: [],
        note: ''
    })

    const [ imageUrl, setImageUrl ] = useState('')

    const courseImageRef = useRef<TCourseInputRef>()
    const toast = useToast()

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

            const newResult = {
                file: result.file,
                image_url: result.image_url as string
            }

            setCourseGroup(prev => ({
                ...prev,
                courseGroupIcon: newResult.file as string
            }))

            setImageUrl(newResult.image_url)
        })
    }

    const CreateCourseGroup = async () => {
        await createCourseGroup(courseGroup, (data: TCourseGroup, error: string) => {
            if (error) {
                console.log(error)
            } else {
                console.log(data)
            }
        })
    }

    return (
        <Stack
            spacing='30px'
            w='100%'
            align='center'
            my='50px'
        >
            <Container 
                maxW='80%'
                bg='white'
                p='30px'
            >
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
                                imageUrl || "https://res.cloudinary.com/dzz6rgxkl/image/upload/v1702450992/9expert/public/h5owwu5ca7hdhmzhwgia.png"
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
                                     ขนาดภาพที่แนะนำ : 480x289 px
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
                        <Input type="file" ref={courseImageRef} onChange={handleUploadImage} display='none' accept="image/*" />
                    </VStack>
                </Stack>

                <Stack>
                    <Text>courseGroupId</Text>
                    <Input 
                        placeholder='Input courseGroupId'
                        onChange={(e) => setCourseGroup(prev => ({ ...prev, courseGroupId: e.target.value }))}
                    />
                </Stack>
                <Stack>
                    <Text>courseGroupName</Text>
                    <Input 
                        placeholder='Input courseGroupName' 
                        onChange={(e) => setCourseGroup(prev => ({ ...prev, courseGroupName: e.target.value }))}
                    />
                </Stack>
                <Stack>
                    <Text>courseGroupNameAbbr</Text>
                    <Input 
                        placeholder='Input courseGroupNameAbbr'
                        onChange={(e) => setCourseGroup(prev => ({ ...prev, courseGroupNameAbbr: e.target.value }))}
                    />
                </Stack>
                <Stack>
                    <Text>courseGroupTeaser</Text>
                    <Input 
                        placeholder='Input courseGroupTeaser' 
                        onChange={(e) => setCourseGroup(prev => ({ ...prev, courseGroupTeaser: e.target.value }))}
                    />
                </Stack>
                <Stack>
                    <Text>courseGroupTeaserAbbr</Text>
                    <Input 
                        placeholder='Input courseGroupTeaserAbbr' 
                        onChange={(e) => setCourseGroup(prev => ({ ...prev, courseGroupTeaserAbbr: e.target.value }))}
                    />
                </Stack>
                <Stack>
                    <Text>note</Text>
                    <Input 
                        placeholder='Input note' 
                        onChange={(e) => setCourseGroup(prev => ({ ...prev, note: e.target.value }))}
                    />
                </Stack>
                <Stack
                    w='100%'
                    align='end'
                    justify='end'
                    mt='30px'
                >
                    <Button
                        w='90px'
                        onClick={CreateCourseGroup}
                    >
                        Add
                    </Button>
                </Stack>
            </Container> 
        </Stack>
    )

}