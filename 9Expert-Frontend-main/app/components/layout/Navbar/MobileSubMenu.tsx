'use client'

import { Accordion, AccordionItem, AccordionButton, Button, AccordionPanel, Stack, Text, useColorModeValue, Link, AccordionIcon } from "@chakra-ui/react"
import { useState } from "react"

type MenuItem = {
    href: string,
    label: string,
}

export const MobileSubMenu = ({ title, items }: { title: string, items: MenuItem[] }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const fontColor = useColorModeValue('#77808B', '#ffffff')

    return (
        <Accordion
            as="a"
            w='100%'
            allowToggle
            onChange={() => setExpanded(!expanded)}
        >
            <AccordionItem border='0'>
                <AccordionButton
                    as={Button}
                    w='100%'
                    variant='ghost'
                    borderRadius='0'
                    textColor={fontColor}
                    _focus={{ bg: 'transparent' }}
                    _hover={{ bg: 'transparent' }}
                    _expanded={{
                        bg: 'transparent',
                        borderBottom: '2px',
                        borderColor: 'exMidBlue',
                        color: 'exMidBlue',
                    }}
                >
                    <Text
                        w='100%'
                        textAlign='start'
                        fontSize="1rem"
                        fontWeight={400}
                    >
                        {title}
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p="1rem">
                    <Stack>
                        {items.map(({ href, label }, idx) => (<Button
                            key={idx}
                            as={Link}
                            href={href}
                            w='100%'
                            textAlign='start'
                            variant='ghost'
                            borderRadius='8px'
                            _active={{
                                textDecoration: 'none',
                            }}
                            _hover={{
                                textDecoration: 'none',
                            }}
                        >
                            <Text
                                w='100%'
                                textAlign='start'
                                fontSize='1rem'
                                fontWeight={400}
                                textColor={fontColor}
                            >
                                {label}
                            </Text>
                        </Button>))}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}