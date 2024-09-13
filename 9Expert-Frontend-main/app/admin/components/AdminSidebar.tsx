import { AdminCertificateIcon, BlogIcon, DashboardIcon, GearIcon, PlusCircleIcon, StackIcon } from "@/app/icons/AdminIcon"
import { Button, ButtonOptions, VStack, Text, TypographyProps, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react"
import Link from "next/link"
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import { useState } from "react"
import { URL } from "url"

interface ISidebarButtonProps {
    id: string
    children: React.ReactNode
    leftIcon: ButtonOptions["leftIcon"]
    fontStyle?: TypographyProps["fontStyle"]
    href: URL | string
}

export const SidebarButton = ({ children, leftIcon, fontStyle, href, id }: ISidebarButtonProps) => {

    const tab = useSearchParams().get('tab')

    return (
        <Button
            as={Link}
            href={href}
            bg={tab === id ? 'exBlue' : 'transparent'}
            color={tab === id ? 'white' : 'exGray.500'}
            pl='2rem'
            h='48px'
            w='100%'
            justifyContent='start'
            borderRadius='0'
            leftIcon={leftIcon}
            _hover={{
                bg: tab === id ? 'exBlue' : 'transparent',
            }}
            _active={{
                bg: tab === id ? 'exBlue' : 'transparent',
            }}
        >
            <Text fontStyle={fontStyle} >
                {children}
            </Text>
        </Button>
    )
}

export const AdminSidebar = () => {

    const [ isOpen, setIsOpen ] = useState(false)

    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    const isSearchParams = (text: string[]) => text.indexOf(searchParams.get('tab') as string) > -1 || text.indexOf(searchParams.get('sub') as string) > -1

    const settingParams = isSearchParams(['banner', 'portfolio', 'group', 'review', 'faq'])


    return (
        <VStack
            w='100%'
            align='start'
            textAlign='start'
            spacing='20px'
            mt='2rem'
        >
            <SidebarButton
                id='dashboard'
                href='/admin?tab=dashboard'
                leftIcon={<DashboardIcon mr='0.5rem' w='30px' h='30px' />}
                fontStyle='english'
            >
                {`Dashboard`}
            </SidebarButton>
            <Accordion
                allowToggle
                w='100%'
                border='0'
                bg='transparent'
                _hover={{
                    bg: 'transparent',
                }}
                _active={{
                    bg: 'transparent',
                }}
            >
                <AccordionItem
                    w='100%'
                    border='0'
                >
                    <AccordionButton
                        as={Button}
                        w='100%'
                        bg={isSearchParams(['normal-course', 'elearning-course']) && isOpen ? 'exBlue' : 'transparent'}
                        color={isSearchParams(['normal-course', 'elearning-course']) && isOpen ? 'white' : 'exGray.500'}
                        pl='2rem'
                        h='48px'
                        justifyContent='start'
                        leftIcon={<PlusCircleIcon mr='0.5rem' w='30px' h='30px' />}
                        border='0'
                        borderRadius='0'
                        onClick={() => setIsOpen(!isOpen)}
                        _hover={{
                            bg: isSearchParams(['normal-course', 'elearning-course']) && isOpen ? 'exBlue' : 'transparent',
                        }}
                        _active={{
                            bg: isSearchParams(['normal-course', 'elearning-course']) && isOpen ? 'exBlue' : 'transparent',
                        }}
                    >
                        <Text>
                            {`สร้างหลักสูตร`}
                        </Text>
                    </AccordionButton>
                    <AccordionPanel
                        bg='rgba(196, 196, 196, 0.1)'
                    >
                        <VStack>
                            <Button
                                as={Link}
                                href='/admin?tab=normal-course'
                                bg='transparent'
                                color={isSearchParams(['normal-course']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`หลักสูตรธรรมดา`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=elearning-course'
                                bg='transparent'
                                color={isSearchParams(['elearning-course']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`หลักสูตร E-learnning`}
                            </Button>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <SidebarButton
                id="article"
                href='/admin?tab=article'
                leftIcon={<BlogIcon mr='0.5rem' w='30px' h='30px' />}
            >
                {`บทความ`}
            </SidebarButton>
            <Accordion
                allowToggle
                w='100%'
                border='0'
                bg='transparent'
                _hover={{
                    bg: 'transparent',
                }}
                _active={{
                    bg: 'transparent',
                }}
            >
                <AccordionItem
                    w='100%'
                    border='0'
                >
                    <AccordionButton
                        as={Button}
                        w='100%'
                        bg={isSearchParams(['pm', 'bundle']) && isOpen ? 'exBlue' : 'transparent'}
                        color={isSearchParams(['pm', 'bundle']) && isOpen ? 'white' : 'exGray.500'}
                        pl='2rem'
                        h='48px'
                        justifyContent='start'
                        leftIcon={<StackIcon mr='0.5rem' w='30px' h='30px' />}
                        border='0'
                        borderRadius='0'
                        onClick={() => setIsOpen(!isOpen)}
                        _hover={{
                            bg: isSearchParams(['pm', 'bundle']) && isOpen ? 'exBlue' : 'transparent',
                        }}
                        _active={{
                            bg: isSearchParams(['pm', 'bundle']) && isOpen ? 'exBlue' : 'transparent',
                        }}
                    >
                        <Text>
                            {`โปรโมชั่นหลักสูตร`}
                        </Text>
                    </AccordionButton>
                    <AccordionPanel
                        bg='rgba(196, 196, 196, 0.1)'
                    >
                        <VStack>
                            <Button
                                as={Link}
                                href='/admin?tab=promotion&sub=pm'
                                bg='transparent'
                                color={isSearchParams(['pm']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`โปรโมชั่น`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=promotion&sub=bundle'
                                bg='transparent'
                                color={isSearchParams(['bundle']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`หลักสูตร Bundle`}
                            </Button>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <SidebarButton
                id="certificate"
                href='/admin?tab=certificate'
                leftIcon={<AdminCertificateIcon mr='0.5rem' w='30px' h='30px' />}
            >
                {`Certificate System`}
            </SidebarButton>
            <Accordion
                allowToggle
                w='100%'
                border='0'
                bg='transparent'
                _hover={{
                    bg: 'transparent',
                }}
                _active={{
                    bg: 'transparent',
                }}
            >
                <AccordionItem
                    w='100%'
                    border='0'
                >
                    <AccordionButton
                        as={Button}
                        w='100%'
                        bg={settingParams ? 'exBlue' : 'transparent'}
                        color={settingParams  ? 'white' : 'exGray.500'}
                        pl='2rem'
                        h='48px'
                        justifyContent='start'
                        leftIcon={<GearIcon mr='0.5rem' w='30px' h='30px' />}
                        border='0'
                        borderRadius='0'
                        onClick={() => setIsOpen(!isOpen)}
                        _hover={{
                            bg: settingParams  ? 'exBlue' : 'transparent',
                        }}
                        _active={{
                            bg: settingParams  ? 'exBlue' : 'transparent',
                        }}
                    >
                        <Text>
                            {`ตั้งค่า`}
                        </Text>
                    </AccordionButton>
                    <AccordionPanel
                        bg='rgba(196, 196, 196, 0.1)'
                    >
                        <VStack>
                            <Button
                                as={Link}
                                href='/admin?tab=setting&sub=banner'
                                bg='transparent'
                                color={isSearchParams(['banner']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`จัดการส่วน Banner`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=setting&sub=group'
                                bg='transparent'
                                color={isSearchParams(['group']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`จัดการกลุ่มหลักสูตร`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=setting&sub=review'
                                bg='transparent'
                                color={isSearchParams(['review']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`จัดการรีวิว`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=setting&sub=portfolio'
                                bg='transparent'
                                color={isSearchParams(['portfolio']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`ผลงานด้านการฝึกอบรม`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=setting&sub=recruitment'
                                bg='transparent'
                                color={isSearchParams(['recruitment']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`รับสมัครพนักงาน`}
                            </Button>
                            <Button
                                as={Link}
                                href='/admin?tab=setting&sub=faq'
                                bg='transparent'
                                color={isSearchParams(['faq']) ? '#6DC9FE' : 'exGray.500'}
                                h='48px'
                                w='100%'
                                pl='2rem'
                                justifyContent='start'
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            >
                                {`คำถามที่พบบ่อย`}
                            </Button>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            {/* <SidebarButton
                id="setting"
                href='/admin?tab=setting'
                leftIcon={<GearIcon mr='0.5rem' w='30px' h='30px' />}
            >
                {`ตั้งค่า`}
            </SidebarButton> */}
        </VStack>
    )
}