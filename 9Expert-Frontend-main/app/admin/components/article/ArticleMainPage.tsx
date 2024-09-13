'use client'

import { DeleteIcon, EditIcon, FilterIcon, MoreIcon } from "@/app/icons/AdminIcon"
import { Button, Checkbox, Container, HStack, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, VStack, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { TArticle } from "../../interface/CreateArticleInterface"
import { deleteArticelByMultipleId, deleteArticle, getAllArticles } from "@/libs/AdminAPI"
import { useSearchParams } from "next/navigation"
import { AdminPagination } from "../AdminPagination"
import { allValuesExist } from "@/libs/ArrayManage"
import moment from "moment"
import { useDebounce } from "@/utils/useDebounce"


export const ArticlaMainPage = () => {

    const [ articles, setArticles ] = useState<TArticle[]>([])
    const [ count, setCount ] = useState(0)
    const [selected, setSelected] = useState<string[]>([])
    const [search, setSearch] = useState<string>('')

    const debounceSearch = useDebounce(search, 1000)

    const page = useSearchParams().get('page')
    const toast = useToast()

    useEffect(() => {
        getAllArticles( page as string, (data: { result: TArticle[], count: number }, error: string) => {

            if (error) {
                console.log(error)
            }

            setArticles(data.result)
            setCount(data.count)
        }, search)
    }, [page, debounceSearch])

    const handleDeleteArticle = async (id: string) => {
        await deleteArticle(id, (item: TArticle, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบบทความไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: 'ลบบทความสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            
        })
    }

    const handleDeleteArticleByMultiple = async () => {
        await deleteArticelByMultipleId(selected, (item: TArticle, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบบทความไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: `ลบ ${selected.length} บทความสําเร็จ`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    return (
        <>
            <Container
                mt='2rem'
                p='0'
                maxW='95%'
                h='max-content'
                borderRadius='20px'
            >
                <Stack
                    w='100%'
                    h='100%'
                    bg='white'
                >
                    <HStack
                        borderBottom='1px'
                        borderColor='exGray.100'
                        w='100%'
                        // h='130px'
                        py='1.688rem'
                        align='center'
                        justify='space-between'
                        px={{ base: '1.5rem', lg: '3rem' }}
                        m='0'
                    >
                        <Heading fontSize='1.5rem'>{`บทความ`}</Heading>
                        <HStack>
                            {/* <Button
                                display={{ base: 'none', lg: 'block' }}
                                color='exGray.300'
                                leftIcon={<FilterIcon w='20px' h='20px' />}
                                variant='ghost'
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            >
                                {`Filter`}
                            </Button>
                            <IconButton
                                display={{ base: 'block', lg: 'none' }}
                                color='exGray.300'
                                aria-label="Filter"
                                icon={<FilterIcon w='20px' h='20px' />}
                                variant='ghost'
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            /> */}
                            <Button
                                as={Link}
                                href='/admin?tab=article&action=create'
                                color='white'
                                bg='exBlue'
                                _hover={{
                                    bg: 'exBlue'
                                }}
                                _active={{
                                    bg: 'exBlue'
                                }}
                            >
                                {`สร้างบทความ`}
                            </Button>
                        </HStack>
                    </HStack>
                    <VStack
                        p='1rem'
                    >
                        <HStack
                            align='center'
                            justify='space-between'
                            borderBottom='1px'
                            borderColor='exGray.100'
                            w='100%'
                            h='100%'
                            px={{ base: '0.75rem', lg: '2rem' }}
                            pt='0'
                            pb='2rem'
                        >
                            <Input 
                                id='search'
                                w={{ base: '10rem', lg: '20rem' }} 
                                placeholder='ค้นหา...'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {
                                selected.length > 0 && (
                                    <HStack
                                        spacing='1rem'
                                    >
                                        <Text fontSize='sm' textColor='exGray.300' >{`เลือก ${selected.length} บทความ`}</Text>
                                        <Button
                                            display={{ base: 'none', lg: 'block' }}
                                            variant='outline'
                                            colorScheme="red"
                                            size='sm'
                                            onClick={handleDeleteArticleByMultiple}
                                        >{`ลบบทความ`}</Button>
                                        <IconButton
                                            display={{ base: 'block', lg: 'none' }}
                                            variant='ghost'
                                            colorScheme="red"
                                            size='sm'
                                            aria-label="Delete"
                                            onClick={handleDeleteArticleByMultiple}
                                            icon={<DeleteIcon w='20px' h='20px' />}
                                        />
                                    </HStack>
                                )
                            }
                        </HStack>
                        <TableContainer
                            w='100%'
                            px={{ base: '0', lg: '0.5rem' }}
                        >
                            <Table
                                w='100%'
                            >
                                <Thead>
                                    <Tr>
                                        <Th w={{ base: '50%', lg: '25%' }} fontSize='md' >
                                            <Checkbox 
                                                mr='0.5rem'
                                                isChecked={allValuesExist(articles.map(a => a._id as string), selected)}
                                                onChange={() => {
                                                    if (selected.length > 0) {
                                                        return setSelected([])
                                                    }

                                                    setSelected(articles.map(a => a._id as string))
                                                }}
                                            />
                                            <Text as='b' fontSize='md' >{`ชื่อบทความ`}</Text>
                                        </Th>
                                        <Th
                                            display={{ base: 'none', lg: 'table-cell' }}
                                            w='15%'
                                            textAlign='center'
                                        >
                                            <Text as='b' fontSize='md' >{`วันที่`}</Text>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text as='b' fontSize='md' >{`ประเภทบทความ`}</Text>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text as='b' fontSize='md' >{`เขียนโดย`}</Text>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text as='b' fontSize='md' >{`สถานะ`}</Text>
                                        </Th>
                                        <Th w={{ base: '50%', lg: '15%' }} >
                                            <Text as='b' fontSize='md' >{`ตั้งค่า`}</Text>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        articles && articles.length && articles.map((article: TArticle, index) => (
                                            <Tr key={index}>
                                                <Td
                                                    maxW={{ base: '270px', lg: 'none' }}
                                                    whiteSpace={{ base: 'pre', lg: 'normal' }}
                                                >
                                                    <HStack>
                                                        <Checkbox 
                                                            isChecked={selected.includes(article._id as string)}
                                                            onChange={() => {
                                                                if (selected.includes(article._id as string)) {
                                                                    return setSelected(selected.filter(c => c !== article._id as string))
                                                                }

                                                                setSelected(prev => [...prev, article._id as string])
                                                            }}
                                                        />
                                                        <Text
                                                            as={Link}
                                                            href={`/admin?tab=article&action=edit&id=${article._id}`}
                                                            ml='0.5rem'
                                                            fontSize='md'
                                                            noOfLines={2}
                                                            _hover={{ textDecoration: 'underline' }}
                                                        >{article.articleTitle}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                                                    <Text color='exGray.300' fontSize='md' >{moment(article.createAt).format(`DD/MM/YYYY`)}</Text>
                                                </Td>
                                                <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                                                    <Text fontSize='md' >{article.articleType.toLowerCase() === 'article' ? `ข้อความ` : 'วิดีโอ'}</Text>
                                                </Td>
                                                <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                                                    <Text fontSize='md' >{`9Expert`}</Text>
                                                </Td>
                                                <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                                                    <Tag 
                                                        justifyContent='center'
                                                        rounded='full'
                                                        w='145px'
                                                        h='45px'
                                                        colorScheme="green" >{article.status?.toLowerCase() === 'public' ? `สาธารณะ` : 'ไม่สาธารณะ'}</Tag>
                                                </Td>
                                                <Td
                                                    w='100%'
                                                >
                                                    <HStack
                                                        display={{ base: 'none', lg: 'table-cell' }}
                                                        w='100%'
                                                        justify='end'
                                                        align='center'
                                                    >
                                                        <IconButton
                                                            as={Link}
                                                            href={`/admin?tab=article&action=edit&id=${article._id}`}
                                                            aria-label="Edit"
                                                            colorScheme='purple'
                                                            size='sm'
                                                            icon={<EditIcon w='18px' h='18px' />}
                                                            variant='ghost'
                                                            _hover={{ bg: 'transparent' }}
                                                            _active={{ bg: 'transparent' }}
                                                        />
                                                        <IconButton
                                                            aria-label="Delete"
                                                            colorScheme='red'
                                                            size='sm'
                                                            icon={<DeleteIcon w='18px' h='18px' />}
                                                            variant='ghost'
                                                            onClick={() => handleDeleteArticle(article._id as string)}
                                                            _hover={{ bg: 'transparent' }}
                                                            _active={{ bg: 'transparent' }}
                                                        />
                                                    </HStack>
                                                    <HStack
                                                        display={{ base: 'table-cell', lg: 'none' }}
                                                        w='100%'
                                                        justify='end'
                                                        align='center'
                                                    >
                                                        <Menu>
                                                            <MenuButton
                                                                as={IconButton}
                                                                aria-label="Options"
                                                                icon={<MoreIcon w='18px' h='18px' />}
                                                                variant='ghost'
                                                                _hover={{ bg: 'transparent' }}
                                                                _active={{ bg: 'transparent' }}
                                                            >

                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem>View</MenuItem>
                                                                <MenuItem
                                                                    as={Link}
                                                                    href={`/admin?tab=article&action=edit&id=${article._id}`}
                                                                >Edit</MenuItem>
                                                                <MenuItem>Delete</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </Stack>
                <AdminPagination 
                    count={debounceSearch ? articles.length : count} 
                    page={Number(page)} 
                    url={`/admin?tab=article&page=`} 
                    length={articles.length} 
                />
            </Container>
        </>
    )
}