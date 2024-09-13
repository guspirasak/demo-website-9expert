'use client'

import { Button, useColorModeValue } from "@chakra-ui/react"

type TFilterButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    isActive?: boolean
}

export const FilterButton = ({ children, onClick, isActive }: TFilterButtonProps) => {

    const textColor = useColorModeValue('exTechnologyArea', 'white')
    const activeTextColor = useColorModeValue('white', '#23262A')
    const bgColor = useColorModeValue('white', 'transparent')

    return (
        <Button
            m='0'
            borderRadius='100px'
            variant='outline'
            color={textColor}
            borderColor={textColor}
            w='fit-content'
            h='36px'
            bg={bgColor}
            isActive={isActive}
            onClick={onClick}
            _hover={{
                bg: bgColor
            }}
            _active={{
                bg: textColor,
                color: activeTextColor
            }}
        >
            {children}
        </Button>
    )
}

export const ArticleFilterButton = ({ children, onClick, isActive }: TFilterButtonProps) => {

    const textColor = useColorModeValue('exBlue', 'white')
    const activeTextColor = useColorModeValue('white', '#23262A')
    const bgColor = useColorModeValue('white', 'transparent')

    return (
        <Button
            m='0'
            onClick={onClick}
            isActive={isActive}
            borderRadius='100px'
            variant='outline'
            color={textColor}
            borderColor={textColor}
            w='min-content'
            h='36px'
            bg={bgColor}
            _hover={{
                bg: bgColor
            }}
            _active={{
                bg: textColor,
                color: activeTextColor
            }}
        >
            {children}
        </Button>
    )
}

export const ProgramFilterButton = ({ children, onClick, isActive }: TFilterButtonProps) => {

    const textColor = useColorModeValue('#0B345D', 'white')
    const activeTextColor = useColorModeValue('white', '#23262A')
    const bgColor = useColorModeValue('white', 'transparent')

    return (
        <Button
            m='0'
            onClick={onClick}
            isActive={isActive}
            borderRadius='100px'
            variant='outline'
            color={textColor}
            borderColor={textColor}
            w='min-content'
            h='36px'
            bg={bgColor}
            _hover={{
                bg: bgColor
            }}
            _active={{
                bg: textColor,
                color: activeTextColor
            }}
        >
            {children}
        </Button>
    )
}

