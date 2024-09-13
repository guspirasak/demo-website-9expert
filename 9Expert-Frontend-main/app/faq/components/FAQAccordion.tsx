'use client'

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, Text, useColorModeValue } from "@chakra-ui/react"

export const BannerAccordionItems = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const textColor = useColorModeValue('#3B3B3B', '#FFFFFF')

    return (
        <AccordionItem
            w='100%'
            border='0'
        >
            <AccordionButton
                w='100%'
                h='100%'
                display='flex'
                textAlign='start'
                justifyContent='space-between'
                fontSize={{ base: '1rem', lg: '1.25rem' }}
                textColor={textColor}
                py='1rem'
                borderBottom='1px'
                borderColor='#DDDDDD99'
                _hover={{
                    bg: 'none'
                }}
                _expanded={{
                    bg: 'none'
                }}
            >
                {title}
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
                textColor={textColor}
                fontSize={{ base: '1rem', lg: '1.125rem' }}
                lineHeight={{ base: '1.75rem', lg: '2.25rem' }}
            >
                {children}
            </AccordionPanel>
        </AccordionItem>
    )
}

export const ContentAccordionItems = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const headerBg = useColorModeValue('#19B5FE', '#4E4E4E')
    const contentBg = useColorModeValue('#19B5FE20', '#646464')
    const fontColor = useColorModeValue('#626262', '#ffffff')

    return (
        <AccordionItem
            w='100%'
            border='0'
        >
            <Heading
                as='h2'
                borderTopRadius='20px'
                borderRadius='20px'
                display='flex'
                justifyContent='space-between'
                fontSize='1rem'
                textColor='#ffffff'
            >
                <AccordionButton
                    bg={headerBg}
                    borderRadius='20px'
                    _expanded={{
                        borderTopRadius: '20px',
                        borderBottomRadius: '0'
                    }}
                    _hover={{
                        bg: headerBg
                    }}
                    _focus={{
                        bg: headerBg
                    }}
                >
                    <Box
                        as='span'
                        flex='1'
                        textAlign='left'
                        p='0.5rem'
                    >
                        <Text
                            fontSize='1.25rem'
                        >
                            {title}
                        </Text>
                    </Box>
                    <AccordionIcon w='24px' h='24px' />
                </AccordionButton>
            </Heading>
            <AccordionPanel
                bg={contentBg}
                borderBottomRadius='20px'
                textColor={fontColor}
            >
                {children}
            </AccordionPanel>
        </AccordionItem>
    )
}
