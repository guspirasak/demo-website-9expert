'use client'

import { ArrowDownIcon } from "@/app/icons/PortfolioIcon"
import { Stack, HStack, Text, Image, Center, Heading, Accordion, AccordionItem, AccordionPanel, UnorderedList, AccordionButton, Button, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"

const MobilePromotionCard = ({ title, subtitle, image, children }: { title: string, subtitle: string, image: string, children?: React.ReactElement }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const lightBgColor = expanded ? 'linear-gradient(180deg, #4091F4 0%, #19B5FE 100%)' : 'linear-gradient(180deg, #19B5FE 0%, #5D8BF4 100%)'
    const bgColor = useColorModeValue(lightBgColor, '#EBEBEB')
    const fontColor = useColorModeValue('#ffffff', '#2E2E2E')

    return (
        <Stack
            w='100%'
            h='100%'
            p='1.25rem'
            align='start'
            justify='center'
            borderRadius='20px'
            color={fontColor}
            bg={bgColor}
        >
            <HStack
                spacing='1rem'
                align='start'
            >
                <Center
                    bg={fontColor}
                    borderRadius='20px'
                    border='0'
                    w='85px'
                    h='85px'
                    flexShrink={0}
                >
                    <Image 
                        w='50px'
                        h='50px'
                        src={image}
                        alt="promotion icon"
                    />
                </Center>
                <Stack spacing="0.25rem" pt="0.25rem">
                    <Heading
                        fontSize='xl'
                        fontWeight={700}
                    >
                        {title}
                    </Heading>
                    <Text
                        fontSize='sm'
                        fontWeight={400}
                    >
                        {subtitle}
                    </Text>
                </Stack>
            </HStack>
            <Accordion
                w='100%'
                allowToggle
                onChange={() => setExpanded(!expanded)}
            >
                <AccordionItem border='0'>
                    <AccordionPanel p={0}>
                        {children}
                    </AccordionPanel>
                    <AccordionButton
                        mt="0.5rem"
                        p={0}
                        _hover={{ bg: 'transparent' }}
                        _focus={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    >
                        <Stack
                            w='100%'
                            align='end'
                        >
                            <Button
                                rightIcon={<ArrowDownIcon w='8px' h='8px' transform={expanded ? 'rotate(180deg)' : 'rotate(0deg)'} />}
                                variant='link'
                                textColor={fontColor}
                                fontWeight={400}
                                _hover={{ bg: 'transparent' }}
                                _focus={{ bg: 'transparent' }}
                                _active={{ bg: 'transparent' }}
                            >
                                {expanded ? 'ย่อลง' : 'อ่านเพิ่มเติม'}
                            </Button>
                        </Stack>
                    </AccordionButton>
                </AccordionItem>
            </Accordion>
        </Stack>
    )
}

export default MobilePromotionCard