'use client'

import { AspectRatio, Heading, Stack, Image, Text } from "@chakra-ui/react"


export const MiniRecommandCourseCard = () => {
    return (
        <Stack
            w='100%'
            h='97px'
            direction='row'
            justify='space-between'
            spacing='36px'
        >
            <AspectRatio
                ratio={148 / 97}
                w='148px'
                minW='148px'
            >
                <Image
                    alt='cover'
                    w='148px'
                    src='/card/article.png'
                />
            </AspectRatio>
            <Stack
                w='100%'
                h='100%'
            >
                <Text textColor='#747474' >{`Microsoft Excel ระดับเริ่มต้นที่สามารถไปต่อ.....`}</Text>
                <Heading fontSize='14px'>{`Power Automate (Desktop) for Business Automation`}</Heading>
            </Stack>
        </Stack>
    )
}

export const RecommandedCourse = () => {
    return (
        <Stack
            w='100%'
            h='100%'
            p='40px'
            align='start'
            justify='center'
            border='1px'
            borderRadius='10px'
            borderColor='#F2F5FA'
            shadow='md'
        >
            <Heading
                fontSize='24px'
            >
                {`หลักสูตรแนะนำ`}
            </Heading>
            <Stack
                w='100%'
                mt='39px'
                mb='66px'
                align='center'
                justify='center'
            >
                {/* <MiniSearchCourseCard image='' /> */}
            </Stack>
            <Stack
                w='100%'
                align='center'
                justify='center'
                spacing='36px'
            >
                <MiniRecommandCourseCard />
                <MiniRecommandCourseCard />
            </Stack>
        </Stack>
    )
}