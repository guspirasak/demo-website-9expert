import React from 'react';
import { Stack, Accordion, AccordionItem, AccordionButton, HStack, Image, Text, AccordionPanel, Heading, UnorderedList, ListItem, useColorModeValue } from '@chakra-ui/react';
import { TRecruit } from './JoinUsFullTime';

const JobAccordion = ({ job }: { job: TRecruit }) => {
    const bgColor = '#19B5FE';
    const fontColor = '#ffffff';
    const headerBg = useColorModeValue('#19B5FE', '#03418D')

    return (
        <Accordion w='100%' h='100%' allowToggle>
            <AccordionItem border='0'>
                <AccordionButton
                    p="1rem"
                    w='100%'
                    bg={bgColor}
                    textColor={fontColor}
                    borderRadius='20px'
                    _expanded={{
                        borderTopRadius: '20px',
                        borderBottomRadius: '0'
                    }}
                    _hover={{
                        bg: headerBg
                    }}
                >
                    <HStack w='100%' spacing='1.5rem'>
                        <Image ml={{base:'0.25rem', lg:'1.55rem'}} src={job.icon} alt={job.role} w={{ base: '34px' }} h={{ base: '34px' }} />
                        <Text fontSize={{ base: '1.25rem', lg: '1.75rem' }}>
                            {job.role}
                        </Text>
                    </HStack>
                </AccordionButton>
                <AccordionPanel
                    bg={'white'}
                    textColor='#0B345D'
                    borderBottomRadius='20px'
                    _expanded={{
                        borderTopRadius: '0',
                        borderBottomRadius: '20px'
                    }}
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={{ base: '1rem', lg: '2rem' }}
                    >
                        <Stack>
                            <Heading fontSize={{ base: '1rem', lg: '1.5rem' }} >
                                บทบาทและความรับผิดชอบ
                            </Heading>
                            <UnorderedList>
                                {job.description.split('\n').map((responsibility, index) => (
                                    <ListItem key={index}>
                                        {responsibility}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Stack>
                        <Stack>
                            <Heading fontSize={{ base: '1rem', lg: '1.5rem' }} >
                                คุณสมบัติ
                            </Heading>
                            <UnorderedList>
                                {job.requirement.split('\n').map((qualification, index) => (
                                    <ListItem key={index}>
                                        {qualification}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Stack>
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
export default JobAccordion;