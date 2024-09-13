'use client'

import { TFaq } from "@/app/admin/interface/CreateFaqInterface"
import { ContentAccordionItems } from "@/app/faq/components/FAQAccordion"
import { DeleteIcon, EditIcon } from "@/app/icons/AdminIcon"
import { deleteFaqById, getFaq } from "@/libs/AdminAPI"
import { AddIcon } from "@chakra-ui/icons"
import { Stack, Container, Heading, Divider, Accordion, Button, HStack, ListItem, OrderedList, Image, IconButton, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export const FaqMainPage = () => {

    const [faq, setFaq] = useState<TFaq[]>([])
    const [update, setUpdate] = useState(false)

    const toast = useToast()

    useEffect(() => {
        getFaq((data: TFaq[], error: unknown) => {
            if (error) {
                return console.log(error)
            }

            setFaq(data)
        })
    }, [update])

    const handleDeleteFaq = async (id: string) => {
        await deleteFaqById(id, (data: TFaq, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: "ไม่สามารถลบคำถามได้",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: 'ลบคำถามสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setUpdate(!update)
        })
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
            <Container
                maxW='95%'
                h='100%'
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='start'
                    justify='center'
                    mt='30px'
                    mb='60px'
                    spacing='34px'
                    bg='white'
                    borderRadius='20px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='space-between'
                        direction='row'
                        px='30px'
                        pt='30px'
                    >
                        <Heading
                            fontSize='1.5rem'
                            fontWeight='600'
                        >
                            {`คำถามที่พบบ่อย`}
                        </Heading>
                        <Button
                            as={Link}
                            href='/admin?tab=setting&sub=faq&action=create'
                            leftIcon={<AddIcon w='14px' h='14px' color='white' />}
                            textColor='white'
                            bg='exBlue'
                        >
                            {`สร้างคำถามย่อย`}
                        </Button>
                    </Stack>
                    <Divider w='100%' />
                    <Stack
                        w='100%'
                        h='100%'
                        p='30px'
                        spacing='20px'
                        direction={{ base: 'column', '2xl': 'row' }}
                        justify='space-between'
                        flexWrap='wrap'
                    >
                        {
                            faq.map((data, index) => (
                                <Stack
                                    key={index}
                                    w={{ base: '100%', lg: '50%' }}
                                    h='max-content'
                                    p={{ base: '20px', lg: '39px' }}
                                    bg='white'
                                    align='center'
                                    justify='start'
                                    borderRadius='20px'
                                    shadow='lg'
                                    border='1px'
                                    borderColor='#817F7F80'
                                    flex='0 0 48%'
                                >
                                    <HStack
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='space-between'
                                    >
                                        <HStack
                                            w='100%'
                                            align='center'
                                            justify='start'
                                        >
                                            <Image src={data.icon} w='33px' h='33px' />
                                            <Heading
                                                fontSize='1.5rem'
                                                fontWeight='700'
                                            >
                                                {data.title}
                                            </Heading>
                                        </HStack>
                                        <HStack
                                            w='100%'
                                            h='100%'
                                            align='center'
                                            justify='end'
                                        >
                                            <IconButton
                                                as={Link}
                                                href={`/admin?tab=setting&sub=faq&action=edit&id=${data._id}`}
                                                aria-label='edit'
                                                icon={<EditIcon w='24px' h='24px' color='#7A04DD' />}
                                                variant='ghost'
                                            />
                                            <IconButton
                                                aria-label='delete'
                                                icon={<DeleteIcon w='24px' h='24px' color='#FF3A3A' />}
                                                variant='ghost'
                                                onClick={() => handleDeleteFaq(data._id as string)}
                                            />
                                        </HStack>
                                    </HStack>
                                    <Accordion
                                        defaultIndex={[0]}
                                        allowToggle
                                        display='flex'
                                        flexDirection='column'
                                        w='100%'
                                        gap='30px'
                                        mt='53px'
                                    >
                                        {
                                            data.question.map((q, i) => (
                                                <ContentAccordionItems 
                                                    key={i}
                                                    title={q.title}
                                                >
                                                    <OrderedList
                                                        pt='22px'
                                                        px='48px'
                                                        spacing='20px'
                                                    >
                                                        {
                                                            q.description.map((d, j) => (
                                                                <ListItem
                                                                    key={j}
                                                                >
                                                                    {d}
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </OrderedList>
                                                </ContentAccordionItems>
                                            ))
                                        }
                                    </Accordion>
                                </Stack>
                            ))
                        }
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}