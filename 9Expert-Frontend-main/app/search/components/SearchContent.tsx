'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { MiniSearchCourseCard } from "@/app/components/ContentCard/MiniSearchCourseCard"
import { SearchArticleCard } from "@/app/components/ContentCard/SearchArticleCard"
import { Stack, Heading, Center, Text, Wrap, WrapItem, Box, useBreakpointValue, HStack, Button } from "@chakra-ui/react"
import { Pagination } from "swiper/modules"
import { SwiperSlide, Swiper } from "swiper/react"

export const SearchCourseContent = ({ courses, count, onPageChange, currentPage }: { courses: TCourseCard[], count: number, onPageChange: Function, currentPage: number }) => {

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    return (

        <Stack
            w='100%'
            h='100%'
            align='start'
        >
            <Stack
                w='100%'
                align='center'
                justify={{ base: 'center', lg: 'space-between' }}
                direction='row'
                borderBottom={{ base: '2px', lg: 'none' }}
                borderColor='exBlue'
                spacing={{ base: '1rem', lg: '2rem' }}
            >
                <Heading
                    w='fit-content'
                    minW='fit-content'
                    fontSize={{ base: '24px', lg: '50px' }}
                    fontWeight='extrabold'
                    textAlign={{ base: 'center', lg: 'start' }}
                >
                    {`หลักสูตร`}
                </Heading>
                {
                    breakpoint &&
                    <Box
                        w='100%'
                        ml='75px'
                        h='0px'
                        border='2px'
                        borderColor='#4185E7'
                        borderRadius='full'
                    >

                    </Box>
                }
            </Stack>
            <Box
                as={Swiper}
                w='100%'
                h='100%'
                py='1rem'
                pb='4rem'
                px={{ base: '0rem', lg: '0.5rem' }}
                mt='1rem'
                slidesPerView='auto'
                spaceBetween={46}
                centeredSlides={true}
                initialSlide={2}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
            >
                {
                    courses.map((course, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: '340px' }}
                        >
                            <Center>
                                <MiniSearchCourseCard course={course} />
                            </Center>
                        </SwiperSlide>
                    ))
                }
            </Box>
        </Stack>
    )
}

export const SearchCourseWithFilterContent = ({ courses, count, onPageChange, currentPage, itemsPerPage }: { courses: TCourseCard[], count: number, onPageChange: Function, currentPage: number, itemsPerPage: number }) => {

    const totalItems = count;
    
    const renderPageNumbers = () => {
        // const maxPagination = Math.ceil(totalItems / itemsPerPage);
        const totalPages = Math.ceil(totalItems / itemsPerPage); // Ensure these values are correctly calculated from props or state
        const pageNumbers = [];
        const maxPagesToShow = 5; // Or make this dynamic
        const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
        const adjustedStartPage = Math.max(endPage - maxPagesToShow + 1, 1);
      
        if (adjustedStartPage > 1) {
            pageNumbers.push(
                <Button
                    key={1}
                    onClick={() => onPageChange(1)}
                    colorScheme="gray"
                    aria-label="Go to first page"
                >
                    1
                </Button>
            );
            if (adjustedStartPage > 2) {
                pageNumbers.push(<Box key="start-ellipsis">...</Box>);
            }
        }


        <Button
            onClick={() => onPageChange(2)}
            colorScheme={"blue"}
        >
            2
        </Button>
      
        for (let i = adjustedStartPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    onClick={() => onPageChange(i)}
                    colorScheme={i === currentPage ? "blue" : "gray"}
                    disabled={i === currentPage}
                    aria-label={`Go to page ${i}`}
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<Box key="end-ellipsis">...</Box>);
            }
            pageNumbers.push(
                <Button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    colorScheme="gray"
                    aria-label="Go to last page"
                >
                    {totalPages}
                </Button>
            );
        }
      
        return pageNumbers;
    };

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    return (

        <Stack
            w='100%'
            h='100%'
            align='start'
        >
            <Stack
                w='100%'
                h='100%'
                spacing='32px'
            >
                <Stack
                    w='100%'
                    align='center'
                    justify={{ base: 'center', lg: 'space-between' }}
                    direction='row'
                    borderBottom={{ base: '2px', lg: 'none' }}
                    borderColor='exBlue'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >

                    <Heading
                        w='fit-content'
                        minW='fit-content'
                        fontSize={{ base: '24px', lg: '50px' }}
                        fontWeight='extrabold'
                        textAlign={{ base: 'center', lg: 'start' }}
                    >
                        {`หลักสูตร`}
                    </Heading>
                    {
                        breakpoint &&
                        <Box
                            w='100%'
                            ml='75px'
                            h='0px'
                            border='2px'
                            borderColor='#4185E7'
                            borderRadius='full'
                        >

                        </Box>
                    }
                </Stack>
                <Text fontSize='20px'>{`แสดง 1 - ${courses.length} จาก ${count} รายการ`}</Text>
            </Stack>
            <Wrap
                w='100%'
                h='100%'
                display='flex'
                align='start'
                justify={{ base: 'center', lg: 'start' }}
                spacing='40px'
            >
                {
                    courses.map((course, index) => (
                        <WrapItem
                            h='fit-content'
                            key={index}
                        >
                            <MiniSearchCourseCard course={course} />
                        </WrapItem>
                    ))
                }
            </Wrap>

            <HStack mb='40px' spacing={2} mt={4} justifyContent="center">
                {renderPageNumbers()}
            </HStack>
        </Stack>
    )
}

export const SearchArticleContent = ({ articles, count, onPageChange, currentPage, itemsPerPage }: { articles: TArticle[], count: number, onPageChange: Function, currentPage: number, itemsPerPage: number }) => {
    // const itemsPerPage = 10;

    const totalItems = count;
    
    const renderPageNumbers = () => {
        // const maxPagination = Math.ceil(totalItems / itemsPerPage);
        const totalPages = Math.ceil(totalItems / itemsPerPage); // Ensure these values are correctly calculated from props or state
        const pageNumbers = [];
        const maxPagesToShow = 5; // Or make this dynamic
        const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
        const adjustedStartPage = Math.max(endPage - maxPagesToShow + 1, 1);
      
        if (adjustedStartPage > 1) {
            pageNumbers.push(
                <Button
                    key={1}
                    onClick={() => onPageChange(1)}
                    colorScheme="gray"
                    aria-label="Go to first page"
                >
                    1
                </Button>
            );
            if (adjustedStartPage > 2) {
                pageNumbers.push(<Box key="start-ellipsis">...</Box>);
            }
        }


        <Button
            onClick={() => onPageChange(2)}
            colorScheme={"blue"}
        >
            2
        </Button>
      
        for (let i = adjustedStartPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    onClick={() => onPageChange(i)}
                    colorScheme={i === currentPage ? "blue" : "gray"}
                    disabled={i === currentPage}
                    aria-label={`Go to page ${i}`}
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<Box key="end-ellipsis">...</Box>);
            }
            pageNumbers.push(
                <Button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    colorScheme="gray"
                    aria-label="Go to last page"
                >
                    {totalPages}
                </Button>
            );
        }
      
        return pageNumbers;
    };

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='1rem'
            align='start'
        >
            <Stack
                w='100%'
                h='100%'
                spacing='32px'
            >
                <Stack
                    w='100%'
                    align='center'
                    justify={{ base: 'center', lg: 'space-between' }}
                    direction='row'
                    borderBottom={{ base: '2px', lg: 'none' }}
                    borderColor='exBlue'
                >
                    <Heading
                        w='fit-content'
                        minW='fit-content'
                        fontSize={{ base: '24px', lg: '50px' }}
                        fontWeight='extrabold'
                        textAlign={{ base: 'center', lg: 'start' }}
                    >
                        {`บทความ`}
                    </Heading>
                    {
                        breakpoint &&
                        <Box
                            w='100%'
                            h='0px'
                            ml='75px'
                            border='2px'
                            borderColor='#4185E7'
                            borderRadius='full'
                        >
                        </Box>
                    }
                </Stack>
                <Text fontSize='20px'>{`แสดง 1 - ${articles.length} จาก ${count} รายการ`}</Text>
            </Stack>
            <Stack
                w='100%'
                h='100%'
                pb='5rem'
                align='start'
                justify='start'
                spacing='45px'
            >
                {
                    articles.map((article, index) => (
                        <SearchArticleCard article={article} key={index} />
                    ))
                }

                <HStack spacing={2} mt={4} justifyContent="center">
                    {renderPageNumbers()}
                </HStack>
            </Stack>
        </Stack>
    )
}