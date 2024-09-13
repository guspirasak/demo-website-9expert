'use client'

import { Box, Button, ButtonGroup, HStack, IconButton, ResponsiveValue, Stack, useColorModeValue, Image } from "@chakra-ui/react"
import { ColorModeSwitch } from "./ColorModeSwitch"

import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { MagnifyingGlassIcon } from "@/app/icons/HomeIcons"
import { contactUsMenu } from '@/config/menu'
import { promotioTitle } from '@/config/promotion'
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { Property } from "csstype"
import Link from "next/link"
import { useSelector } from "react-redux"
import { NavbarButton, NavbarMenu, NavbarMenuItem } from "./NavbarButton"
import { useRouter } from "next/navigation"

export const DesktopNavbar = ({ display }: { display?: ResponsiveValue<Property.Display> }) => {
    const courseGroup = useSelector(getCourseGroup)
    const logo = useColorModeValue('/logo/9expert.png', '/logo/9expert_dark.png')
    const textColor = useColorModeValue('#3B3B3B', '#ffffff')

    const buttonBg = useColorModeValue('#1CA7EC', '#EBEBEB')
    const buttonText = useColorModeValue('#FFFFFF', '#3B3B3B')

    const router = useRouter()

    return (
        <Box h='100%' justifyContent="space-around" display={display} >
            <Stack
                tabIndex={0}
                justify="center"
                align="center"
                title="9Expert"
                onClick={() => router.push("/")}
                cursor={'pointer'}
            >
                <Image
                    src={logo}
                    fetchPriority='high'
                    objectFit='contain'
                    alt="9expert logo"
                    width={140}
                    height={47}
                    loading="lazy"
                />
            </Stack>
            <HStack
                h='100%'
                justify={{ base: 'center', xl: 'end', 'xl-1': 'center' }}
                align='end'
            >
                <ButtonGroup
                    as='nav'
                    variant='ghost'
                    h='100%'
                >
                    <NavbarMenu title='หลักสูตร' textColor={textColor}>
                        <NavbarMenuItem href={`/course`} textColor={textColor}>หลักสูตรทั้งหมด</NavbarMenuItem>
                        {courseGroup.length > 0 && courseGroup.map((item: TCourseGroup) => <NavbarMenuItem key={item._id} textColor={textColor} href={`/group/${item.courseGroupName.replaceAll(' ', '-')}`}>{item.courseGroupName}</NavbarMenuItem>)}
                    </NavbarMenu>
                    <NavbarButton
                        href="/schedule"
                    >
                        ตารางฝึกอบรม
                    </NavbarButton>
                    <NavbarMenu columns={1} title='โปรโมชั่น' textColor={textColor}>
                        <NavbarMenuItem href={`/promotion`} textColor={textColor}>{promotioTitle}</NavbarMenuItem>
                    </NavbarMenu>
                    <NavbarMenu title='บทความ' textColor={textColor}>
                        <NavbarMenuItem href={`/article`} textColor={textColor}>บทความทั้งหมด</NavbarMenuItem>
                        {courseGroup.length > 0 && courseGroup.map((item: TCourseGroup, i: number) => <NavbarMenuItem key={item._id} textColor={textColor} href={`/article?group=${item.courseGroupName.replaceAll(' ', '_')}`}>{item.courseGroupName}</NavbarMenuItem>)}
                    </NavbarMenu>
                    <NavbarButton href="/portfolio">ผลงานของเรา</NavbarButton>
                    <NavbarMenu columns={1} title='ติดต่อเรา' textColor={textColor}>
                        {contactUsMenu.map((item) => <NavbarMenuItem key={item.id} textColor={textColor} href={item.href}>{item.label}</NavbarMenuItem>)}
                    </NavbarMenu>
                </ButtonGroup>
            </HStack>
            <HStack align='center'>
                <IconButton
                    aria-label='navbar-search'
                    as={Link}
                    href={'/search'}
                    icon={<MagnifyingGlassIcon w='32px' h='32px' />}
                    variant='ghost'
                    _hover={{
                        color: '#19B5FE',
                        bg: 'transparent'
                    }}
                />
                <Button
                    as={Link}
                    variant='solid'
                    display={{ base: 'none', 'xl-1': 'inline-flex' }}
                    href='/course'
                    bg={buttonBg}
                    color={buttonText}
                    w='148px'
                    h='40px'
                    fontWeight={400}
                    _hover={{
                        color: '#ffffff',
                        bg: '#19B5FE'
                    }}
                >
                    ดูหลักสูตรทั้งหมด
                </Button>
                <ColorModeSwitch />
            </HStack>
        </Box>
    )
}