'use client'

import { StudentIcon } from "@/app/icons/CardIcons"
import { useColorModeValue, Text, HStack } from "@chakra-ui/react"

export const CourseLevel = ({ level, courseName }: { level: string, courseName: string }) => {
    

    const levelRender = () => {
        if (level === 'Beginner') {
            return (
                <HStack
                    id={`card-level-beginner-${courseName}`}
                    justify='start'
                    h='100%'
                >
                    <StudentIcon color={useColorModeValue('#5BE0A2', 'white')} transform='scaleX(-1)' />
                    <Text as='h4' textColor={useColorModeValue('#5BE0A2', 'white')} >{level}</Text>
                </HStack>
                
            )
        } else if (level === 'Intermediate') {
            return (
                <HStack
                    id={`card-level-intermediate-${courseName}`}
                    justify='start'
                    h='100%'
                >
                    <StudentIcon color={useColorModeValue('#998BFF', 'white')} transform='scaleX(-1)' />
                    <Text as='h4' textColor={useColorModeValue('#998BFF', 'white')} >{level}</Text>
                </HStack>
            )
        } else if (level === 'Advance') {
            return (
                <HStack
                    id={`card-level-advance-${courseName}`}
                    justify='start'
                    h='100%'
                >
                    <StudentIcon color={useColorModeValue('#FEC84B', 'white')} transform='scaleX(-1)' />
                    <Text as='h4' textColor={useColorModeValue('#FEC84B', 'white')} >{level}</Text>
                </HStack>
            )
        } else if (level === 'Expert') {
            return (
                <HStack
                    id={`card-level-expert-${courseName}`}
                    justify='start'
                    h='100%'
                >
                    <StudentIcon color={useColorModeValue('#EF6C00', 'white')} transform='scaleX(-1)' />
                    <Text as='h4' textColor={useColorModeValue('#EF6C00', 'white')} >{level}</Text>
                </HStack>
            )
        } else {
            return (
                <HStack
                    id={`card-level-other-${courseName}`}
                    justify='start'
                    h='100%'
                >
                    <StudentIcon color={useColorModeValue('#5BE0A2', 'white')} transform='scaleX(-1)' />
                    <Text as='h4' textColor={useColorModeValue('#5BE0A2', 'white')} >{level}</Text>
                </HStack>
            )
        }
    }

    return (
        levelRender()
    )
}