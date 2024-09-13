'use client'
import { HamburgerIcon } from "@chakra-ui/icons"
import { Container, HStack, Text, Heading, IconButton, Avatar, Stack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export const AdminNavbar = () => {

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        router.push('/admin/login')
    }

    return (
        <>
            <Container
                maxW='95%'
                h='100%'
            >
                <HStack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                >
                    <Stack
                        align={{ base: 'center', md: 'start' }}
                        justify={{ base: 'start', md: 'center' }}
                        direction={{ base: 'row', md: 'column' }}
                        h='100%'
                    >
                        <IconButton 
                            aria-label="menu"
                            display={{ base: 'block', md: 'none' }}
                            icon={<HamburgerIcon />}
                            variant='ghost'
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                        />
                        <Text fontSize='sm' display={{ base: 'none', md: 'block' }} >{`สวัสดี คุณประภัสสร`}</Text>
                        <Heading
                            w={{ base: '65%', md: '100%' }}
                            size={{ base: 'sm', md: 'md' }} 
                        >{`ยินดีต้อนรับสู่ 9Expert Training !`}</Heading>
                    </Stack>
                    <HStack>
                        <Menu>
                            <MenuButton as={Avatar} cursor={'pointer'} >
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </HStack>
            </Container>
        </>
    )
}