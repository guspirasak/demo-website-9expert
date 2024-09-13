'use client'

import { Box, Container, useBreakpointValue, useColorModeValue, Stack } from "@chakra-ui/react"
import { useEffect, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { setCourseGroup } from "@/redux/courseGroupSlide"
import { setTechnologyAreas } from "@/redux/technologyAreasSlide"
import NavbarBanner from "./Navbar/NavbarBanner"
import { DesktopNavbar } from "./Navbar/DesktopNavbar"
import { MobileNavbar } from "./Navbar/MobileNavbar"
import { containerBreakpoints } from "@/config/theme"
import { getGroups, getTechAreas } from "@/services/api/course"

export const Navbar = () => {
    const dispatch = useDispatch()
    const fetchGroupData = useCallback(async () => {
        const data = await getGroups()

        data.sort((a, b) => {
            if (a.courseGroupName === 'Other') return 1
            if (b.courseGroupName === 'Other') return -1
            return a.courseGroupNameAbbr.localeCompare(b.courseGroupNameAbbr)
        })

        dispatch(setCourseGroup(data) as any)
    }, [])

    const fetchTechAreaData = useCallback(async () => {
        const data = await getTechAreas()
        data.sort((a, b) => {
            if (a.technologyName === 'Other') return 1
            if (b.technologyName === 'Other') return -1
            return a.order - b.order
        })
        dispatch(setTechnologyAreas(data) as any)
    }, [])

    useEffect(() => {
        const s = localStorage.getItem('show_banner')
        setShow(s || 'true')
        fetchGroupData()
        fetchTechAreaData()
    }, [])

    const [show, setShow] = useState('true')
    const bgColor = useColorModeValue('#ffffff', '#3B3B3B')
    const NavbarComponent = useBreakpointValue({ base: true, sm: false, lg: true })

    return (
        <Stack
            w='100%'
            position='sticky'
            top='0'
            zIndex={200}
            spacing='0'
        >
            {
                show === 'true' && <NavbarBanner />
            }
            <Box
                as='header'
                w='100%'
                h={{ base: '76px', lg: '94px' }}
                bg={bgColor}
                shadow={{ base: 'lg', lg: 'none' }}
            >
                <Container
                    maxW={containerBreakpoints}
                    h='100%'
                >
                    <Stack
                        justifyContent="center"
                        w='100%'
                        h='100%'
                    >
                        {NavbarComponent ? <DesktopNavbar display='flex' /> : <MobileNavbar display='flex' />}
                    </Stack>
                </Container>
            </Box>
        </Stack>
    )
}