import { MiniRecommandCard } from "@/app/components/ContentCard/MiniRecommandCourseCard"
import { MagnifyingGlassIcon } from "@/app/icons/HomeIcons"
import { Stack, InputGroup, Text, Input, InputRightElement, HStack, Heading, Divider, useColorModeValue, useBreakpointValue, Button, Link } from "@chakra-ui/react"
import { ArticleCard, MiniArticleCard } from "./ArticleCard"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { useArticle } from "../context/ArticleContext"
import { useEffect, useState } from "react"
import { getThreeLatestArticle } from "@/libs/AdminAPI"
import { useDebounce } from "@/utils/useDebounce"
import { getArticleBySearch } from "@/libs/UserAPI"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useSearchParams } from "next/navigation"

export const ArticleSection = ({ course }: { course: TCourseCard }) => {

    const { state, setState, page, setPage } = useArticle()

    const [recommand, setRecommand] = useState<TArticle[]>([])
    const [search, setSearch] = useState<string>('')
    const [count, setCount] = useState<number>(0)

    const debounceSearch = useDebounce(search, 500)
    const category = useSearchParams().get('category')

    useEffect(() => {
        getThreeLatestArticle((data: TArticle[], error: string) => {
            if (error) console.log(error)
            data ? setRecommand(data) : setRecommand([])
        })
    }, [])

    useEffect(() => {
        getArticleBySearch(search, category as string, page, (data: { articles: TArticle[], count: number }, error: string) => {
            if (error) console.log(error)
            data ? setState(data.articles) : setState([])
            setCount(data.count)
        })
    }, [debounceSearch, page, category])

    const cardBg = useColorModeValue('#FFFFFF', '#FFFFFF11')
    const isDesktop = useBreakpointValue({ base: false, lg: true })

    return (
        <Stack
            w='100%'
            h='100%'
            align='start'
            justify='space-between'
            direction={{ base: 'column-reverse', lg: 'row' }}
            position='relative'
            spacing={{ base: '2rem', lg: '3rem' }}
        >
            <Stack
                as="section"
                align='center'
                w='100%'
                h='100%'
                spacing={{ base: '2rem', lg: '3rem' }}
            >
                {
                    state?.map((a, index) => (
                        <ArticleCard key={index} article={a} />
                    ))
                }
                {
                    page < Math.ceil(count / 5) && (
                        <Button
                            w='15rem'
                            h='5rem'
                            bg='exBlue'
                            textColor='white'
                            fontSize='lg'
                            display='felx'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            onClick={() => setPage(page + 1)}
                        >
                            <Text>อ่านเพิ่มเติม</Text>
                            <ChevronDownIcon w='28px' h='28px' />
                        </Button>
                    )
                }
            </Stack>
            <Stack
                as="aside"
                position={{ base: 'relative', lg: 'sticky' }}
                top={{ base: 'auto', lg: '145px' }}
                align='center'
                w='100%'
                maxW='500px'
                spacing={{ base: '1rem', lg: '1.5rem' }}
                borderRadius='20px'
                bgColor={cardBg}
                shadow='lg'
                p={{ base: '1rem', lg: '2rem' }}
            >
                <InputGroup>
                    <Input
                        name="search article"
                        aria-label="search article"
                        value={search}
                        w='100%'
                        h='60px'
                        bg='#817F7F1A'
                        borderLeftRadius='10px'
                        placeholder='ค้นหาบทความ'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputRightElement
                        h='60px'
                        borderRightRadius='10px'
                    >
                        <MagnifyingGlassIcon w='20px' h='20px' color='#77808B' />
                    </InputRightElement>
                </InputGroup>
                <HStack
                    w='100%'
                    spacing={0}
                >
                    <Heading
                        w='100%'
                        fontSize={{ base: '1rem', lg: '1.25rem' }}
                    >
                        บทความล่าสุด
                    </Heading>
                    <Divider
                        width='100%'
                        border='2px'
                        borderColor='#817F7F33'
                    />
                </HStack>
                <Stack
                    w='100%'
                    spacing='1rem'
                >
                    {
                        recommand.map((article, index) => (
                            <MiniArticleCard
                                key={index}
                                article={article}
                            />
                        ))
                    }
                </Stack>
                {isDesktop && (<>
                    <HStack
                        w='100%'
                        spacing={0}
                    >
                        <Heading
                            w='100%'
                            fontSize={{ base: '1rem', lg: '1.25rem' }}
                        >
                            หลักสูตรแนะนำ
                        </Heading>
                        <Divider
                            width='100%'
                            border='2px'
                            borderColor='#817F7F33'
                        />
                    </HStack>
                    <Stack
                        w='100%'
                        align='center'
                        justify='center'
                        p='1rem'
                    >
                        {
                            course._id && (
                                <MiniRecommandCard course={course} />
                            )
                        }
                    </Stack>
                </>)}

            </Stack>
        </Stack>
    )
}