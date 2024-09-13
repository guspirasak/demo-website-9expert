'use client'

import { useCreateArticle } from "@/app/admin/context/CreateArticleContext"
import { TSelectArticleRelateModal } from "@/app/admin/interface/ArticleInterface"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { SortIcon } from "@/app/icons/AdminIcon"
import { getArticleByCourseGroup } from "@/libs/AdminAPI"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { AddIcon } from "@chakra-ui/icons"
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, Center, Checkbox, Container, HStack, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useSelector } from "react-redux"

export const SelectArticleRelateAccordionPanelItem = ({ article }: { article: TSelectArticleRelateModal }) => {

    const { state, setState } = useCreateArticle()

    const toast = useToast()

    return (
        <Stack
            w='100%'
            h='80px'
            align='center'
            justify='start'
            direction='row'
            bg='white'
        >
            <Stack
                w='100%'
                h='100%'
                align='start'
                justify='start'
                direction='row'
                spacing='1rem'
            >
                <Stack
                    w='20%'
                    h='100%'
                    align='center'
                    justify='center'
                    direction='row'
                    spacing='15px'
                >
                    <Center
                        h='50px'
                        border='1px'
                        borderColor='#1CA7EC'
                        borderStyle='dashed'
                        position='relative'
                    >
                        <Center
                            bg='#1CA7EC'
                            w='7px'
                            h='7px'
                            position='absolute'
                            borderRadius='full'
                            bottom='-3px'
                        >

                        </Center>
                    </Center>
                    <Checkbox
                        w='30px'
                        h='30px'
                        textColor='#3D475C'
                        onChange={() => {
                            if (state.articleRelated.includes(article._id as string)) {
                                return setState(prev => ({
                                    ...prev,
                                    articleRelated: state.articleRelated.filter(id => id !== article._id as string)
                                }))
                            }
                            if (state.articleRelated.length >= 5) {
                                return toast({
                                    title: 'คุณสามารถเลือกได้ไม่เกิน 5 บทความ',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'top-right'
                                })
                            }
                            setState(prev => ({
                                ...prev,
                                articleRelated: state.articleRelated.includes(article._id as string) ? state.articleRelated.filter(id => id !== article._id as string) : [...prev.articleRelated, article._id as string]
                            }))
                        }}
                        isChecked={state.articleRelated.includes(article._id as string)}
                    />
                </Stack>
                <Stack
                    w='80%'
                    h='100%'
                    align='center'
                    justify='start'
                    direction='row'
                    spacing='15px'
                >
                    <Text
                        fontSize='24px'
                        fontWeight='600'
                        textColor='#3D475C'
                    >
                        {article.articleTitle}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export const SelectArticleRelateAccordion = ({ courseGroup, index }: { courseGroup: TCourseGroup, index: number }) => {

    const [article, setArticle] = useState<TSelectArticleRelateModal[]>([])

    const handleClick = async () => {
        await getArticleByCourseGroup(courseGroup._id as string, (data: TSelectArticleRelateModal[], error: unknown) => {
            if (error) console.log(error)
            if (data) setArticle(data.sort((a, b) => a.articleTitle.localeCompare(b.articleTitle)))
        })
    }

    return (
        <AccordionItem
            w='100%'
        >
            <AccordionButton
                w='100%'
                h='80px'
                p='0'
                onClick={handleClick}
            >
                <Stack
                    w='100%'
                    h='80px'
                    align='center'
                    justify='start'
                    direction='row'
                    bg='#19B5FE1A'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='start'
                        direction='row'
                        spacing='1rem'
                    >
                        <Stack
                            w='20%'
                            h='100%'
                            align='center'
                            justify='center'
                            direction='row'
                        >
                            <Text
                                fontSize='24px'
                                fontWeight='600'
                                textColor='#3D475C'
                            >
                                {`${(index + 1).toString().length === 1 ? `0${index + 1}` : index + 1}`}
                            </Text>
                            <IconButton
                                aria-label="sort"
                                w='24px'
                                h='24px'
                                icon={<SortIcon w='24px' h='24px' color='#3D475C' />}
                                bg='transparent'
                            />
                        </Stack>
                        <Stack
                            w='80%'
                            h='100%'
                            align='center'
                            justify='start'
                            direction='row'
                            spacing='15px'
                        >
                            <Text
                                fontSize='24px'
                                fontWeight='600'
                                textColor='#3D475C'
                            >
                                {courseGroup.courseGroupName}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </AccordionButton>
            <AccordionPanel
                w='100%'
                h='100%'
                p='0'
            >
                {
                    article.length > 0 && article.map((a, i) => (
                        <SelectArticleRelateAccordionPanelItem key={i} article={a} />
                    ))
                }
            </AccordionPanel>
        </AccordionItem>
    )
}

export const SelectArticleRelateModal = () => {

    const CourseGroup = useSelector(getCourseGroup)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { state, setState } = useCreateArticle()

    return (
        <>
            <Button
                w='299px'
                h='80px'
                minW='299px'
                leftIcon={<AddIcon w='16px' h='16px' />}
                bg='#4091F4'
                textColor='white'
                fontSize='20px'
                onClick={() => onOpen()}
            >
                {`เพิ่มบทความที่เกี่ยวข้อง`}
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size='6xl'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        borderBottom='1px'
                        borderColor='#817F7F80'
                    >
                        <HStack
                            w='100%'
                            align='center'
                            justify='space-between'
                        >
                            <Text
                                fontSize='36px'
                                textColor='#2E2E2E'
                            >
                                {`บทความที่เกี่ยวข้องกับบทความ`}
                            </Text>
                            <Text
                                fontSize='36px'
                                textColor='#2E2E2E'
                            >
                                {`( ${state.articleRelated.length} /5 )`}
                            </Text>
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <Container
                            maxW='90%'
                        >
                            <Stack
                                w='100%'
                                h='600px'
                                overflowY='auto'
                                align='start'
                                justify='start'
                                borderRadius='20px'
                                my='40px'
                                spacing='0'
                            >
                                <Stack
                                    w='100%'
                                    h='80px'
                                    minH='80px'
                                    align='center'
                                    justify='start'
                                    direction='row'
                                    bg='#4091F4'
                                    borderTopRadius='20px'
                                >
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='start'
                                        justify='start'
                                        direction='row'
                                        spacing='1rem'
                                    >
                                        <Stack
                                            w='20%'
                                            h='100%'
                                            align='center'
                                            justify='center'
                                            direction='row'
                                        >
                                            <Text
                                                fontSize='24px'
                                                fontWeight='600'
                                                textColor='white'
                                            >
                                                {`ID`}
                                            </Text>
                                            <IconButton
                                                aria-label="sort"
                                                w='24px'
                                                h='24px'
                                                icon={<SortIcon w='24px' h='24px' color='white' />}
                                                bg='transparent'
                                            />
                                        </Stack>
                                        <Stack
                                            w='80%'
                                            h='100%'
                                            align='center'
                                            justify='start'
                                            direction='row'
                                        >
                                            <Text
                                                fontSize='24px'
                                                fontWeight='600'
                                                textColor='white'
                                            >
                                                {`Course Group`}
                                            </Text>
                                            <IconButton
                                                aria-label="sort"
                                                w='24px'
                                                h='24px'
                                                icon={<SortIcon w='24px' h='24px' color='white' />}
                                                bg='transparent'
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Accordion
                                    allowToggle
                                    w='100%'
                                    h='100%'
                                >
                                    {
                                        CourseGroup.map((courseGroup: TCourseGroup, index: number) => (
                                            <SelectArticleRelateAccordion key={index} courseGroup={courseGroup} index={index} />
                                        ))
                                    }
                                </Accordion>
                            </Stack>
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='space-between'
                                direction='row'
                                mt='60px'
                                mb='37px'
                            >
                                <Button
                                    w='300px'
                                    h='70px'
                                    variant='outline'
                                    borderColor='#817F7F'
                                    textColor='#817F7F'
                                    fontSize='24px'
                                    fontWeight='600'
                                    onClick={() => {
                                        setState(prev => ({ ...prev, articleRelated: [] }))
                                        onClose()
                                    }}
                                >
                                    {`ยกเลิก`}
                                </Button>
                                <Button
                                    w='300px'
                                    h='70px'
                                    bg='#19B5FE'
                                    textColor='white'
                                    fontSize='24px'
                                    fontWeight='600'
                                    onClick={onClose}
                                >
                                    {`เพิ่มบทความที่เกี่ยวข้อง`}
                                </Button>
                            </Stack>
                        </Container>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}