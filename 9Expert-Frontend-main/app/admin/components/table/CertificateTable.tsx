'use client'

import { DeleteIcon, EditIcon, MoreIcon } from "@/app/icons/AdminIcon"
import { Checkbox, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Td, Text, Tr } from "@chakra-ui/react"
import { TArticle } from "../../interface/CreateArticleInterface"
import Link from "next/link"

export const CertificateTable = ({ certificate }: { certificate: TArticle }) => {

    return (
        <Tr>
            <Td
                maxW={{ base: '270px', lg: 'none' }}
                whiteSpace={{ base: 'pre', lg: 'normal' }}
            >
                <HStack>
                    <Checkbox />
                    <Text
                        ml='0.5rem'
                    >{certificate.articleTitle}</Text>
                </HStack>
            </Td>
            <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                <Text color='exGray.300' >{`30/11/66`}</Text>
            </Td>
            <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                <Text>{certificate.articleType.toLowerCase() === 'article' ? `ข้อความ` : 'วิดีโอ'}</Text>
            </Td>
            <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                <Text as='b' >{`9Expert`}</Text>
            </Td>
            <Td display={{ base: 'none', lg: 'table-cell' }} textAlign='center'>
                <Tag colorScheme="green" >{certificate.status?.toLowerCase() === 'public' ? `สาธารณะ` : 'ไม่สาธารณะ'}</Tag>
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
                        href={`/admin?tab=article&action=edit&id=${certificate._id}`}
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
                                href={`/admin?tab=article&action=edit&id=${certificate._id}`}
                            >Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Td>
        </Tr>
    )
}