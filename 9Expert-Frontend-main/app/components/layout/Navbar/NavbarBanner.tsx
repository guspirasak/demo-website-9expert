import { CloseWithCircleIcon } from "@/app/icons/HomeIcons"
import { promotioTitle } from "@/config/promotion"
import { Center, IconButton, Text } from "@chakra-ui/react"
import Link from "next/link"

const NavbarBanner = () => {
    return (
        <Center
            h={{ base: '48px' }}
            w='100%'
            bg='#2575FC'
            fontSize={{ base: '1rem', lg: '1.25rem' }}
            fontWeight='600'
            position='relative'
            color='white'
        >
            <Text
                as={Link}
                textDecoration='underline'
                href='/promotion'
            >
                ดูรายละเอียด {promotioTitle} 🎉
            </Text>
            <IconButton
                aria-label='close'
                icon={<CloseWithCircleIcon
                    w='24px'
                    h='24px'
                    color='white'
                />}
                position='absolute'
                right='0.75rem'
                bg='transparent'
                onClick={() => localStorage && localStorage.setItem('show_banner', 'false')}
                _hover={{
                    bg: 'transparent'
                }}
                _active={{
                    bg: 'transparent'
                }}
            />
        </Center>)
}

export default NavbarBanner