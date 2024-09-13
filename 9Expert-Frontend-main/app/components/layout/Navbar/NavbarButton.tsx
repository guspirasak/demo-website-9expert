'use client'

import { ArrowDownIcon } from "@/app/icons/PortfolioIcon"
import { Button, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import { UrlObject } from "url"

export const NavbarButton = ({ children, href }: { children: React.ReactNode, href?: string | UrlObject }) => {
    const textColor = useColorModeValue('#3B3B3B', '#ffffff')

    return (
        <Button
            as={Link}
            color={textColor}
            fontSize='1rem'
            fontWeight={400}
            href={href || '#'}
            h='100%'
            _hover={{
                bg: 'transparent',
                color: 'exBlue',
                borderBottom: '1px',
                borderBottomColor: 'exBlue',
                borderRadius: '0'
            }}
            _active={{
                bg: 'transparent'
            }}
            _focus={{ boxShadow: "none" }}
        >
            {children}
        </Button>
    )
}

export const NavbarMenuItem = ({ children, href, target, textColor }: { children: React.ReactNode, href: string, target?: string, textColor: string }) => {
    return (
        <MenuItem
            as={Link}
            href={href}
            target={target}
            color={textColor}
            bg='transparent'
            fontSize='1rem'
            fontWeight={400}
            borderRadius='8px'
            _hover={{
                bg: '#19B5FE',
                color: '#ffffff'
            }}
            _active={{
                bg: '#19B5FE',
                color: '#ffffff'
            }}
            _focus={{
                bg: '#19B5FE',
                color: '#ffffff'
            }}
        >
            {children}
        </MenuItem>
    )
}

export const NavbarMenu = ({ children, title, columns, textColor }: { children: React.ReactNode, title: string, columns?: number, textColor: string }) => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Menu
            isOpen={isOpen}
            onClose={onClose}
        >
            <MenuButton
                as={Button}
                color={textColor}
                onClick={onOpen}
                onMouseOver={onOpen}
                onMouseOut={onClose}
                fontSize='1rem'
                fontWeight={400}
                rightIcon={<ArrowDownIcon w='8px' h='8px' />}
                h='100%'
                _hover={{
                    bg: 'transparent',
                    color: 'exBlue',
                    borderBottom: '1px',
                    borderBottomColor: 'exBlue',
                    borderRadius: '0'
                }}
                _active={{
                    bg: 'transparent'
                }}
                _focus={{ bg: 'transparent', boxShadow: 'none' }}
            >
                {title}
            </MenuButton>
            <MenuList
                as={SimpleGrid}
                columns={columns || 2}
                onMouseOver={onOpen}
                onMouseOut={onClose}
                w='100%'
                h='100%'
                mt='-1.75rem'
                p='1.25rem'
                border='0'
                borderRadius='20px'
                spacingX='1.25rem'
                spacingY='1rem'
                zIndex={100}
                backdropFilter='blur(20px)'
                bg={useColorModeValue('#ffffffb3', '#3B3B3Bd9')}
                shadow='sm'
            >
                {children}
            </MenuList>
        </Menu>
    )
}