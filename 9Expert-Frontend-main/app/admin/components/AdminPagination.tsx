/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { HStack, IconButton, Button, Text, Stack, useBreakpointValue } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export type TPagination = {
    count: number
    page: number
    url: string
    length: number
    textColor?: string
    itemsPerPage?: number
}

export const AdminPagination = ({ count, page, length, url, textColor, itemsPerPage }: TPagination) => {

    const paginationStyle = {
        w: '45px',
        h: '38px',
        bg: '#FFFFFF',
        color: '#9499A1',
        _hover: {
            bg: 'exGray'
        },
        _active: {
            bg: '#19B5FE',
            color: 'white'
        }
    }

    const numOfPages = Math.ceil(count / (itemsPerPage ? itemsPerPage as number : 5))

    const numOfButtons: number[] = [];
    for (let i = 1; i <= numOfPages; i++) {
        numOfButtons.push(i);
    }

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState<any>([])
    const [currentPage, SetCurrentPage] = useState<any>((page || 1))

    const dotsInitial = '...'
    const dotsLeft = '... '
    const dotsRight = ' ...'

    const bp = useBreakpointValue({
        base: [1, 2, dotsInitial, numOfButtons.length],
        md: [1, 2, 3, dotsInitial, numOfButtons.length],
        xl: [1, 2, 3, 4, dotsInitial, numOfButtons.length],
    })

    useEffect(() => {

        let tempNumberOfButtons: any = [...arrOfCurrButtons]

        if (numOfButtons.length < 6) {
            tempNumberOfButtons = numOfButtons
        } else if ((page || 1) >= 1 && (page || 1) <= 3) {
            tempNumberOfButtons = bp
        } else if ((page || 1) === 4) {
            const sliced = numOfButtons.slice(0, 5)
            tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length]
        } else if ((page || 1) > 4 && (page || 1) < numOfButtons.length - 2) {
            // from 5 to 8 -> (10 - 2)
            const sliced1 = numOfButtons.slice((page || 1) - 2, (page || 1))
            // sliced1 (5-2, 5) -> [4,5] 
            const sliced2 = numOfButtons.slice((page || 1), (page || 1) + 1)
            // sliced1 (5, 5+1) -> [6]
            tempNumberOfButtons = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numOfButtons.length])
            // [1, '...', 4, 5, 6, '...', 10]
        } else if ((page || 1) > numOfButtons.length - 3) {
            // > 7
            const sliced = numOfButtons.slice(numOfButtons.length - 4)
            // slice(10-4) 
            tempNumberOfButtons = ([1, dotsLeft, ...sliced])
        } else if (currentPage === dotsInitial) {
            // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
            // arrOfCurrButtons[3] = 4 + 1 = 5
            // or 
            // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
            // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
            SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
        } else if (currentPage === dotsRight) {
            SetCurrentPage(arrOfCurrButtons[3] + 2)
        } else if (currentPage === dotsLeft) {
            SetCurrentPage(arrOfCurrButtons[3] - 2)
        }

        setArrOfCurrButtons(tempNumberOfButtons);

    }, [currentPage, numOfPages, page])

    return (
        <Stack
            my='3rem'
            px='2rem'
            w='100%'
            align={{ base: 'end', 'xl': 'center' }}
            justify='space-between'
            direction={{ base: 'column', 'xl': 'row' }}
        >
            <HStack>
                <Text fontSize='14px' textColor={textColor || '#9499A1'} >{`Showing:`}</Text>
                <Text fontSize='14px' textColor={textColor || '#3D475C'} >{`${length ? Math.min((5 * (page ? page : 1)), count) : 1} of ${count}`}</Text>
            </HStack>
            <HStack>
                <IconButton
                    aria-label='prev'
                    as={Link}
                    href={`${url}${(page || 1) && Number(page) - 1 < 1 ? 1 : Number(page) - 1}`}
                    icon={<ChevronLeftIcon w='20px' h='20px' />}
                    {...paginationStyle}
                />
                {
                    arrOfCurrButtons.map((data: any, index: number) => <Button
                        aria-label={`page ${index + 1}`}
                        as={Link}
                        isActive={(page || 1) === Number(data)}
                        href={`${url}${isNaN(Number(data)) ? 1 : data}`}
                        key={`page ${index + 1}`}
                        {...paginationStyle}
                    >{data}</Button>)
                }
                <IconButton
                    as={Link}
                    href={`${url}${page ? Number(page) + 1 > Math.ceil(count / 5) ? 1 : Number(page) + 1 : 2}`}
                    aria-label='next'
                    icon={<ChevronRightIcon w='20px' h='20px' />}
                    {...paginationStyle}
                />
            </HStack>
        </Stack>
    )
}