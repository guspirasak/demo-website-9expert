'use client'

import { MagnifyingGlassIcon } from "@/app/icons/HomeIcons"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, IconButton, Image, ResponsiveValue, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"

import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { TCourseDrawer } from "@/app/course/interface/CourseInterface"
import { contactUsMenu, promotionMenu } from "@/config/menu"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { Property } from "csstype"
import Link from "next/link"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { MobileCourseMenu } from "./MobileCourseMenu"
import { MobileSubMenu } from "./MobileSubMenu"
import { useRouter } from "next/navigation"

export const DrawerButton = ({ course }: { course: TCourseDrawer }) => {
    return (
        <Button
            as={Link}
            href={`/course/${course.courseName.replaceAll(' ', '_')}`}
            w='100%'
            variant='ghost'
            textAlign='start'
            borderRadius='8px'
            p={0}
            _hover={{
                bg: 'transparent',
            }}
            _active={{
                bg: 'transparent',
            }}
        >
            <Text
                w='100%'
                fontSize='1rem'
            >
                {course.courseName}
            </Text>
        </Button>
    )
}

export const MobileMenu = ({ href, title }: { href: string, title: string }) => {
    const textColor = useColorModeValue('#77808B', 'white')
    return (<Button
        as={Link}
        href={href}
        w='100%'
        variant='ghost'
        borderRadius='0'
        textColor={textColor}
        _hover={{
            bg: 'transparent',
            color: 'exMidBlue',
        }}
    >
        <Text
            w='100%'
            fontSize="1rem"
            fontWeight={400}
        >
            {title}
        </Text>
    </Button>)
}

export const MobileDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const courseGroup: TCourseGroup[] = useSelector(getCourseGroup)
    const bgColor = useColorModeValue('#ffffff', '#282828')
    const ArticleMenu = useMemo(() => {
        const menu = {
            label: 'บทความทั้งหมด',
            href: '/article'
        }

        const coursesGroup = courseGroup.map((item) => {
            return {
                label: item.courseGroupName,
                href: `/article?technology=${item.courseGroupName.replaceAll(' ', '_')}`
            }
        })

        return [menu, ...coursesGroup]
    }, [courseGroup])

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent
                bg={bgColor}>
                <DrawerCloseButton position="absolute" size="lg" width="24px" height="24px" left='20px' top='20px' />
                <DrawerBody mt='4rem'>
                    <Stack
                        as="nav"
                        w='100%'
                        spacing='20px'
                    >
                        <MobileCourseMenu />
                        <MobileMenu title="ตารางฝึกอบรม" href="/schedule" />
                        <MobileSubMenu title="โปรโมชั่น" items={promotionMenu} />
                        <MobileSubMenu title="บทความ" items={ArticleMenu} />
                        <MobileMenu title="ผลงานของเรา" href="/portfolio" />
                        <MobileSubMenu title="ติดต่อเรา" items={contactUsMenu} />
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export const MobileNavbar = ({ display }: { display?: ResponsiveValue<Property.Display> }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const logoSrc = useColorModeValue('/logo/9expert.png', '/logo/9expert_dark.png')
    const router = useRouter()

    return (<>
        <Box
            as='nav'
            w='100%'
            top={0}
            display={display}
            alignItems='center'
            justifyContent='space-between'
        >
            <IconButton
                aria-label='mobile drawer'
                variant='ghost'
                icon={<HamburgerIcon w='24px' h='24px' />}
                onClick={onOpen}
            />
            <Box onClick={() => router.push('/')} cursor='pointer' >
                <Image w="133px" h="45px" fit="contain" loading="lazy" src={logoSrc} alt='9expert mobile logo' />
            </Box>
            <IconButton
                as={Link}
                href="/search"
                aria-label='search'
                variant='ghost'
                icon={<MagnifyingGlassIcon w='24px' h='24px' />}

            />
        </Box>
        <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </>
    )
}