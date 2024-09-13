'use client'

import { AdminVerticalMenuIcon, EditIcon, FilterIcon, SortIcon } from "@/app/icons/AdminIcon"
import { ArrowUpIcon, DeleteIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Container, HStack, Heading, Button, IconButton, VStack, Input, TableContainer, Table, Thead, Tr, Th, Checkbox, Tbody, Text, Stack, Td, useToast, Center, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { deleteBundle, deleteMultipleBundle, getAllBundle } from "@/libs/AdminAPI"
import { useSearchParams } from "next/navigation"
import { AdminPagination } from "../../AdminPagination"
import { allValuesExist } from "@/libs/ArrayManage"
import moment from "moment"
import { TBundle } from "@/app/admin/interface/BundleInterface"
import { useDebounce } from "@/utils/useDebounce"
import commaNumber from "comma-number"

const renderStatus = (bundle: TBundle) => {

    if (bundle.isActive) {
        return (
            <Center
                w='150px'
                h='50px'
                bg='#D4F0B066'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#2BAC47' >{`กำลังใช้งาน`}</Text>
            </Center>
        )
    } else {
        return (
            <Center
                w='150px'
                h='50px'
                bg='#F65A5A33'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#F65A5A' >{`ไม่เปิดใช้งาน`}</Text>
            </Center>
        )
    }

}


export const BundleTablePage = () => {

    const page = useSearchParams().get('page')
    const toast = useToast()

    const [bundles, setBundles] = useState<TBundle[]>([])
    const [count, setCount] = useState(0)
    const [selected, setSelected] = useState<string[]>([])
    const [update, setUpdate] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const debounceSearch = useDebounce(search, 1000)

    const [sort, setSort] = useState<{ price: string, createAt: string }>({
        price: '',
        createAt: ''
    })

    useEffect(() => {
        getAllBundle(page as string, (data: { result: TBundle[], count: number }, error: unknown) => {
            if (error) console.log(error)

            setBundles(data.result)
            setCount(data.count)
        }, search, sort)
    }, [page, update, debounceSearch, sort])

    const handleDeleteBundle = async (id: string) => {
        await deleteBundle(id, (item: TBundle, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบ Bundle ไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setUpdate(!update)
            toast({
                title: 'ลบ Bundle สําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setSelected([])
        })
    }

    const deleteMultiBundle = async (id: string[]) => {
        await deleteMultipleBundle(id, (item: TBundle, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: `ลบ ${id.length} Bundle ไม่สําเร็จ`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setUpdate(!update)
            toast({
                title: `ลบ ${id.length} Bundle สําเร็จ`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setSelected([])
        })
    }

    return (
        <>
            <Stack
                w='100%'
                h='100%'
            >
                <Container
                    mt='2rem'
                    p='0'
                    maxW='95%'
                    bg='white'
                    h='max-content'
                    borderRadius='20px'
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
                        <Heading fontSize='1.5rem'>{`หลักสูตร Bundle`}</Heading>
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
                                href='/admin?tab=promotion&sub=bundle&action=create'
                                color='white'
                                bg='exBlue'
                                _hover={{
                                    bg: 'exBlue'
                                }}
                                _active={{
                                    bg: 'exBlue'
                                }}
                            >
                                {`สร้างหลักสูตร Bundle`}
                            </Button>
                        </HStack>
                    </HStack>
                    <VStack
                        p='1rem'
                    >
                        <HStack
                            align='center'
                            justify='space-between'
                            w='100%'
                            h='100px'
                            px={{ base: '0.75rem', lg: '2rem' }}
                            py='0'
                        >
                            <Input
                                id='search' w={{ base: '10rem', lg: '20rem' }}
                                borderColor='#817F7F'
                                placeholder='ค้นหา...'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {
                                selected.length > 0 &&
                                <HStack
                                    spacing='1rem'
                                >
                                    <Text fontSize='sm' textColor='exGray.300' >{`เลือก ${selected.length} Bundle`}</Text>
                                    <Button
                                        display={{ base: 'none', lg: 'block' }}
                                        variant='outline'
                                        colorScheme="red"
                                        size='sm'
                                        onClick={() => deleteMultiBundle(selected)}
                                    >{`ลบ Bundle`}</Button>
                                    <IconButton
                                        display={{ base: 'block', lg: 'none' }}
                                        variant='ghost'
                                        colorScheme="red"
                                        size='sm'
                                        aria-label="Delete"
                                        icon={<DeleteIcon w='20px' h='20px' />}
                                        onClick={() => deleteMultiBundle(selected)}
                                    />
                                </HStack>
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
                                        <Th w={{ base: '50%', lg: '25%' }} >
                                            <HStack>
                                                <Checkbox
                                                    mr='0.5rem'
                                                    isChecked={allValuesExist(bundles.map(p => p._id as string), selected)}
                                                    onChange={() => {
                                                        if (selected.length > 0) {
                                                            return setSelected([])
                                                        }

                                                        setSelected(bundles.map(b => b._id as string))
                                                    }}
                                                />
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ชื่อหลักสูตร Bundle`}</Text>
                                            </HStack>
                                        </Th>
                                        <Th
                                            display={{ base: 'none', lg: 'table-cell' }}
                                            w='10%'
                                            textAlign='center'
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ราคาสินค้ารวม`}</Text>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <HStack justify='center'>
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ราคาขาย`}</Text>
                                                {
                                                    sort.price === '' && (
                                                        <SortIcon
                                                            w='24px'
                                                            h='24px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ createAt: '', price: 'asc' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.price === 'asc' && (
                                                        <ArrowDownIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ createAt: '', price: 'desc' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.price === 'desc' && (
                                                        <ArrowUpIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ createAt: '', price: '' })}
                                                        />
                                                    )
                                                }
                                            </HStack>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <HStack justify='center'>
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`วันที่สร้าง`}</Text>
                                                {
                                                    sort.createAt === '' && (
                                                        <SortIcon
                                                            w='24px'
                                                            h='24px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ createAt: 'asc', price: '' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.createAt === 'asc' && (
                                                        <ArrowDownIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ createAt: 'desc', price: '' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.createAt === 'desc' && (
                                                        <ArrowUpIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ createAt: '', price: '' })}
                                                        />
                                                    )
                                                }
                                            </HStack>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{``}</Text>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        bundles.map((bundle: TBundle, index: number) => (
                                            <Tr key={index}>
                                                <Td
                                                    w={{ base: '50%', lg: '25%' }}
                                                >
                                                    <HStack>
                                                        <Checkbox
                                                            mr='0.5rem'
                                                            isChecked={selected.includes(bundle._id as string)}
                                                            onChange={() => {
                                                                if (selected.includes(bundle._id as string)) {
                                                                    return setSelected(selected.filter(c => c !== bundle._id as string))
                                                                }

                                                                setSelected(prev => [...prev, bundle._id as string])
                                                            }}
                                                        />
                                                        <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{bundle.name}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{commaNumber(bundle.totalPrice)}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{commaNumber(bundle.sellPrice)}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{moment(bundle.createAt).format('DD/MM/YYYY')}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <HStack
                                                        justify='center'
                                                    >
                                                        {/* {renderStatus(bundle)} */}
                                                        <Menu
                                                            closeOnSelect={true}
                                                        >
                                                            <MenuButton
                                                                aria-label="options"
                                                                as={IconButton}
                                                                icon={<AdminVerticalMenuIcon w='30px' h='30px' />}
                                                                variant='ghost'
                                                            />
                                                            <MenuList>
                                                                <MenuItem
                                                                    as={Link}
                                                                    icon={<EditIcon w='16px' h='16px' />}
                                                                    href={`/admin?tab=promotion&sub=bundle&action=edit&id=${bundle._id}`}
                                                                >
                                                                    {`แก้ไข`}
                                                                </MenuItem>
                                                                {/* <AreaEditModal area={t} setUpdate={setUpdate} /> */}
                                                                <MenuItem
                                                                    icon={<DeleteIcon w='16px' h='16px' />}
                                                                    color='#F65A5A'
                                                                    onClick={() => handleDeleteBundle(bundle._id as string)}
                                                                >
                                                                    {`ลบ`}
                                                                </MenuItem>
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
                </Container>
                <AdminPagination
                    page={Number(page)}
                    count={count}
                    url={`/admin?tab=promotion&sub=bundle&page=`}
                    length={bundles.length}
                />
            </Stack>
        </>
    )
}