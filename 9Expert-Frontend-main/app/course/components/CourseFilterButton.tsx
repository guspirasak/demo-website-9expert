'use client'

import { useColorModeValue, Button, Checkbox, Text } from "@chakra-ui/react"
import { TFilterButtonProps, TFilterButtonGroup, TFilterCheckBox } from "./course"


export const CourseTechnologyFilterButton = ({ children, display, onClick, isActive }: TFilterButtonProps) => {
    
    const textColor = useColorModeValue('#3A86FF', 'white')
    const activeTextColor = useColorModeValue('white', '#23262A')
    const bgColor = useColorModeValue('#E7F6FD', 'transparent')

    return (
        <Button
            m='0'
            isActive={isActive}
            display={display}
            borderRadius='100px'
            color={textColor}
            borderColor={textColor}
            variant={useColorModeValue('solid', 'outline')}
            onClick={onClick}
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

export const CourseProgramFilterButton = ({ children, display, onClick, isActive }: TFilterButtonProps) => {

    const textColor = useColorModeValue('#5D8BF4', 'white')
    const activeTextColor = useColorModeValue('white', '#23262A')
    const bgColor = useColorModeValue('rgba(93, 139, 244, 0.1)', 'transparent')

    return (
        <Button
            m='0'
            display={display}
            isActive={isActive}
            borderRadius='100px'
            color={textColor}
            borderColor={textColor}
            variant={useColorModeValue('solid', 'outline')}
            w='min-content'
            h='36px'
            bg={bgColor}
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

export const FilterButtonGroup = ( { children, display, textColor, activeTextColor, bgColor, activeBgColor, onClick, isActive }: TFilterButtonProps & TFilterButtonGroup) => {

    return (
        <Button
            m='0'
            onClick={onClick}
            isActive={isActive}
            display={display}
            borderRadius='100px'
            color={textColor}
            borderColor={textColor}
            variant='ghost'
            w='min-content'
            h='50px'
            bg={bgColor}
            _hover={{
                bg: bgColor
            }}
            _active={{
                bg: activeBgColor || textColor,
                color: activeTextColor
            }}
        >
            {children}
        </Button>
    )
}

export const CourseFilterCheckbox = ({ children, display, onChange, isChecked }: TFilterCheckBox) => {
    
    return (
        <Checkbox
            alt={`${children} checkbox`}
            m='0'
            display={display}
            onChange={onChange}
            isChecked={isChecked}
        >
            <Text as='b' >{children}</Text>
        </Checkbox>
    )
}