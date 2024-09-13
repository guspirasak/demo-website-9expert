'use client'

import { CourseImageUploadIcon } from "@/app/icons/AdminIcon"
import { AspectRatio, Box, Image, Container, HStack, Heading, VStack, Text, Button, Input, Stack, Select, Tag, TagCloseButton, TagLabel, Wrap, useToast, Switch, Highlight, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { AdminArticleInput } from "../AdminArticleInput"
import { TCreateArticle } from "../../interface/CreateArticleInterface"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { TArticleInputRef } from "../../interface/AdminInterface"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { request } from "@/libs/axios"
import { Validation } from "@/libs/Validation"
import { useRouter, useSearchParams } from "next/navigation"
import { getAllAricleTitleByMultiId, getAllCourseNameByMultiId, getArticleById, uploadArticleDesctiption } from "@/libs/AdminAPI"
import { parseInput } from "@/libs/stringManage"
import { SelectCourseRelateModal } from "./modal/SelectCourseRelateModal"
import { useCreateArticle } from "../../context/CreateArticleContext"
import { useSelector } from "react-redux"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { TCourseGroup, TTechnologyArea } from "../../interface/CreateCourseInterface"
import { SelectArticleRelateModal } from "./modal/SelectArticleRelateModal"
import { TSelectArticleRelateModal } from "../../interface/ArticleInterface"
import { Editor } from '@tinymce/tinymce-react'
import { TCourseDrawer } from "@/app/course/interface/CourseInterface"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { Loading } from "../Loading"
import { UploadApiResponse } from "@/app/components/Markdown/Markdown.interface"
import { MDXEditorComponent } from "./components/MDXEditor"

export const CreateArticlePage = () => {

    const editorRef = useRef<any>(null);

    const search = useSearchParams()
    const router = useRouter()
    const courseGroup = useSelector(getCourseGroup)
    const technologyAreas = useSelector(getTechnologyAreas)

    const { state, setState } = useCreateArticle()

    const [course, setCourse] = useState<TCourseDrawer[]>([])
    const [article, setArticle] = useState<TSelectArticleRelateModal[]>([])
    const [loading, setLoading] = useState(false)

    const articleImage = useRef<TArticleInputRef>()
    const articleTitle = useRef<TArticleInputRef>()
    const articleSkills = useRef<TArticleInputRef>()
    const articleTeaser = useRef<TArticleInputRef>()
    const articleTeaserAbbr = useRef<TArticleInputRef>()
    const articleVDO = useRef<TArticleInputRef>()
    const articleKeywords = useRef<TArticleInputRef>()
    const articleNote = useRef<TArticleInputRef>()
    const articlesDownloadFileURL = useRef<TArticleInputRef>()

    const toast = useToast()

    const handleSaveImage = () => {
        const courseImageElement = articleImage.current as HTMLInputElement | null
        const file: File | undefined = courseImageElement?.files?.[0]

        imageToBase64(file, (result: { file: string, image_url: string, error?: string }) => {
            if (result.error) {
                console.log(result.error)
            }

            setState(prev => ({
                ...prev,
                articleImage: result.file
            }))
        })
    }

    const handleSave = () => {

        const validatedData = {
            articleTitle: state.articleTitle,
            articleTeaser: state.articleTeaser,
            articleTeaserAbbr: state.articleTeaserAbbr,
            articleType: state.articleType,
            articleImage: state.articleImage,
            articleDetail: state.articleDetail,
            articleDetailType: state.articleDetailType,
            technologyArea: state.technologyArea,
            courseGroup: state.courseGroup,
            skills: state.skills,
            status: state.status,
        }

        Validation(validatedData, async (res: Record<string, boolean | Record<string, boolean>>, empty: boolean) => {

            if (empty) {
                console.log(res)
                return toast({
                    title: 'Error',
                    description: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            const newData = {
                ...state,
                articleImage: state.articleImage
            }

            if (search.get('id')) {
                const id = search.get('id')
                setLoading(true)
                const { data, error } = await request(`/api/v1/articles/${id}`, {
                    method: 'PUT',
                    data: newData
                })

                if (error) {
                    setLoading(false)
                    console.log(error)
                    return toast({
                        title: 'Error',
                        description: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
                setLoading(false)
                toast({
                    title: 'Success',
                    description: 'บันทึกข้อมูลสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                router.push('/admin?tab=article')
                return

            } else {
                setLoading(true)
                const { data, error } = await request('/api/v1/articles', {
                    method: 'POST',
                    data: newData
                })

                if (error) {
                    setLoading(false)
                    console.log(error)
                    return toast({
                        title: 'Error',
                        description: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
                setLoading(false)
                toast({
                    title: 'Success',
                    description: 'บันทึกข้อมูลสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                router.push('/admin?tab=article')
                return
            }

        })
    }

    useEffect(() => {
        if (!search.get('id')) router.push('/admin?tab=article&action=create')

        if (search.get('action') === 'edit' && search.get('id')) {
            const id = search.get('id')

            getArticleById(id as string, (data: TCreateArticle, error: unknown) => {
                if (error) {
                    console.log(error)
                }

                setState(data)
            })
        }
    }, [])

    useEffect(() => {
        getAllCourseNameByMultiId(state.courseRelated, (data: TCourseDrawer[], error: unknown) => {
            if (error) console.log(error)
            if (data) setCourse(data.sort((a, b) => a.courseName.localeCompare(b.courseName)))
        })
    }, [state.courseRelated])

    useEffect(() => {
        getAllAricleTitleByMultiId(state.articleRelated, (data: TSelectArticleRelateModal[], error: unknown) => {
            if (error) console.log(error)
            if (data) setArticle(data.sort((a, b) => a.articleTitle.localeCompare(b.articleTitle)))
        })
    }, [state.articleRelated])

    return (
        <>
            {
                loading && <Loading />
            }
            <Container
                my='2rem'
                maxW='95%'
                bg='white'
                h='100%'
                borderRadius='20px'
            >
                <HStack
                    borderBottom='1px'
                    borderColor='exGray.100'
                    w='100%'
                    h='130px'
                    align='center'
                    justify='space-between'
                    px='3rem'
                    m='0'
                >
                    <Heading>{`บทความ`}</Heading>
                </HStack>
                <VStack
                    align='start'
                    px='2rem'
                    py='3rem'
                    spacing='2rem'
                >
                    <VStack
                        align='start'
                        w='100%'
                        h='100%'
                        spacing='1rem'
                        mb='1.5rem'
                    >
                        <Heading size='md' >{`ภาพขนาดย่อของบทความ`}</Heading>
                        <Stack
                            direction={{ base: 'column', lg: 'row' }}
                            h='100%'
                            w='100%'
                            spacing='1.5rem'
                        >
                            <AspectRatio
                                ratio={167 / 92}
                                w='100%'
                                h='100%'
                                maxW='600px'
                            >
                                <Image
                                    alt="Article Image"
                                    borderRadius='10px'
                                    w='600px'
                                    h='100%'
                                    fit='cover'
                                    objectPosition='top'
                                    src={state.articleImage || "https://res.cloudinary.com/dzz6rgxkl/image/upload/v1702450992/9expert/public/h5owwu5ca7hdhmzhwgia.png"}
                                />
                            </AspectRatio>
                            <VStack
                                w='100%'
                                align='start'
                                spacing='1.5rem'
                                h='100%'
                            >
                                <Text
                                    noOfLines={2}
                                    maxW='50%'
                                    textColor='exGray.500'
                                >
                                    {`อัพโหลดภาพหน้าปกของบทความของคุณรูปแบบที่รองรับ: .jpg, .jpeg หรือ .png`}
                                </Text>
                                <Button
                                    bg='exLightBlue'
                                    color='exBlue'
                                    leftIcon={<CourseImageUploadIcon w='16px' h='16px' />}
                                    onClick={() => articleImage.current?.click()}
                                    _hover={{
                                        bg: 'exBlue',
                                        color: 'white'
                                    }}
                                    _active={{
                                        bg: 'exBlue',
                                        color: 'white'
                                    }}
                                >
                                    {`Upload image`}
                                </Button>
                                <Input
                                    ref={articleImage}
                                    onChange={handleSaveImage}
                                    type="file"
                                    display='none'
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                />
                            </VStack>
                        </Stack>
                    </VStack>
                    <Stack
                        align='start'
                        w='100%'
                        spacing='1rem'
                    >
                        <AdminArticleInput
                            placeholder='ระบุหัวข้อ'
                            isRequired
                            ref={articleTitle}
                            defaultValue={state.articleTitle}
                            onBlur={() => setState(prev => ({ ...prev, articleTitle: articleTitle.current?.value }))}
                        >
                            {`หัวข้อ`}
                        </AdminArticleInput>
                    </Stack>
                    <Stack
                        align='start'
                        w='100%'
                        spacing='1rem'
                        direction={{ base: 'column', lg: 'row' }}
                    >
                        <AdminArticleInput
                            isRequired
                            placeholder='ระบุคำเปรยบทความ'
                            defaultValue={state.articleTeaser}
                            ref={articleTeaser}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, articleTeaser: e.target.value }))}
                        >
                            {`คำเปรยบทความ`}
                        </AdminArticleInput>
                        <AdminArticleInput
                            isRequired
                            placeholder='ระบุคำเปรยบทความแบบย่อ'
                            defaultValue={state.articleTeaserAbbr}
                            ref={articleTeaserAbbr}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, articleTeaserAbbr: e.target.value }))}
                        >
                            {`คำเปรยบทความแบบย่อ`}
                        </AdminArticleInput>
                    </Stack>
                    <VStack
                        align='start'
                        w='100%'
                        spacing='1rem'
                    >
                        <Text fontWeight='bold' fontSize='lg' >
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`รายละเอียดบทความ *`}
                            </Highlight>
                        </Text>
                        <Stack
                            w='100%'
                        >
                            <Select
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    articleDetailType: e.target.value
                                }))}
                                value={state.articleDetailType}
                            >
                                <option value='md'>Markdown</option>
                                <option value='html'>HTML</option>
                            </Select>
                            {
                                state.articleDetailType === 'html' ?
                                    <Editor
                                        apiKey={process.env.NEXT_PUBLIC_APP_EDITOR}
                                        onInit={(_evt, editor) => editorRef.current = editor}
                                        plugins={'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons code'.split(' ')}
                                        init={{
                                            toolbar: `undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen code preview save print | insertfile image media template link anchor codesample | ltr rtl`,
                                            images_file_types: 'jpg, jpeg, png, webp',
                                            automatic_uploads: true,
                                            file_picker_types: 'image',
                                            menubar: '',
                                            toolbar_sticky: true,
                                            file_picker_callback: function (cb, value, meta) {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.setAttribute('accept', 'image/jpeg, image/png, image/jpg, image/webp');
                                                input.onchange = async function () {
                                                    const image = (this as HTMLInputElement).files?.[0] as File;
                                                    let url = ''
                                                    const reader = new FileReader();
                                                    const [result] = await Promise.all([
                                                        new Promise<string>((resolve) => {
                                                            reader.readAsDataURL(image);
                                                            reader.onload = () => resolve(reader.result as string);
                                                        }),
                                                    ]);

                                                    await uploadArticleDesctiption([result as string], (data: UploadApiResponse[], error: unknown) => {
                                                        if (error) {
                                                            toast({
                                                                title: 'Failed to upload image',
                                                                description: error as string,
                                                                status: 'error',
                                                                duration: 5000,
                                                                isClosable: true,
                                                                position: 'top-right',
                                                            });
                                                        }

                                                        url = data[0].url
                                                    })

                                                    cb(url, { title: image.name });
                                                    return url;
                                                }
                                                input.click()
                                            }}
                                        }
                                        onBlur={(e) => {
                                            if (editorRef.current) {
                                                setState(prev => ({ ...prev, articleDetail: editorRef.current.getContent() }))
                                            }
                                        }}
                                        initialValue={state.articleDetail}
                                    />
                                    :
                                    <MDXEditorComponent />
                            }
                        </Stack>
                    </VStack>
                    <VStack
                        mt='3rem'
                        w='100%'
                    >
                        <Heading
                            w='100%'
                            pb='1rem'
                            size='lg'
                            borderBottom='1px'
                            borderColor='exGray.300'
                        >{`เลือก Tag ที่เกี่ยวข้องกับบทความ`}</Heading>
                    </VStack>
                    <VStack
                        align='start'
                        w='100%'
                        spacing='1.5rem'
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align='end'
                            justify='start'
                            spacing='30px'
                            direction='row'
                        >
                            <VStack
                                align='start'
                                spacing='0.75rem'
                                w='75%'
                            >
                                <Text fontWeight='bold' fontSize='lg' >{`หลักสูตรที่เกี่ยวข้องกับบทความ`}</Text>
                                <Stack
                                    w='100%'
                                    h='80px'
                                    px='20px'
                                    py='18px'
                                    border='1px'
                                    borderRadius='10px'
                                    borderColor='exGray.100'
                                >
                                    <Wrap
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='start'
                                        direction='row'
                                        spacing='15px'
                                    >
                                        {
                                            course.length > 0 && state.courseRelated.slice(0, 2).map((c, index) => (
                                                <Tag
                                                    key={index}
                                                    w={course.length === 1 ? 'fit-content' : '40%'}
                                                    h='fit-content'
                                                    bg='#D9ECFF'
                                                    px='20px'
                                                    py='10px'
                                                    borderRadius='full'
                                                    variant='solid'
                                                    colorScheme='green'
                                                >
                                                    <TagLabel
                                                        textColor='#4091F4'
                                                        fontSize='20px'
                                                        fontWeight='600'
                                                    >
                                                        {course.filter(v => v._id === c).length > 0 && course.filter(v => v._id === c)[0].courseName}
                                                    </TagLabel>
                                                    <TagCloseButton
                                                        color='#4091F4'
                                                        onClick={() => setState(prev => ({ ...prev, courseRelated: state.courseRelated.filter((_, i) => i !== index) }))}
                                                    />
                                                </Tag>
                                            ))
                                        }
                                        {
                                            state.courseRelated.length > 2 && (
                                                <Tag
                                                    w='fit-content'
                                                    h='fit-content'
                                                    bg='#4091F4'
                                                    px='20px'
                                                    py='10px'
                                                    borderRadius='full'
                                                    variant='solid'
                                                    colorScheme='green'
                                                >
                                                    <TagLabel
                                                        textColor='white'
                                                        fontSize='20px'
                                                        fontWeight='600'
                                                    >
                                                        {`+ ${(state.courseRelated.length - 2)}`}
                                                    </TagLabel>
                                                </Tag>
                                            )
                                        }
                                    </Wrap>
                                </Stack>
                            </VStack>
                            <SelectCourseRelateModal />
                        </Stack>
                        <AdminArticleInput
                            ref={articleSkills}
                            isRequired
                            defaultValue={state.skills?.toString()}
                            placeholder="ระบุ Skill ที่เกี่ยวข้องกับบทความ"
                            onBlur={() => {
                                if (!articleSkills.current?.value) return

                                setState(prev => ({
                                    ...prev,
                                    skills: [...parseInput(articleSkills.current?.value, [])],
                                }))
                            }}
                        >
                            {`Skill`}
                        </AdminArticleInput>
                        <Stack
                            align='start'
                            w='100%'
                            spacing='0.75rem'
                        >
                            <Text fontWeight='bold' fontSize='lg' >
                                <Highlight
                                    query={["*"]}
                                    styles={{ textColor: 'crimson' }}
                                >
                                    {`Course Group *`}
                                </Highlight>
                            </Text>
                            <Box
                                position='relative'
                                w='100%'
                                h='100%'
                            >
                                <Select
                                    h='80px'
                                    position='relative'
                                    value={state.courseGroup}
                                    onChange={(e) => {

                                        const selectCourseGroup = courseGroup.filter((item: TCourseGroup) => item._id === e.target.value)

                                        const newTechnologyArea = technologyAreas.filter((item: TTechnologyArea) => item.courseGroup.includes(selectCourseGroup[0]._id as string))

                                        setState(prev => ({
                                            ...prev,
                                            courseGroup: e.target.value,
                                            technologyArea: newTechnologyArea[0]._id
                                        }))
                                    }}
                                >
                                    <option value="" style={{ display: 'none' }} ></option>
                                    {
                                        courseGroup.map((item: TCourseGroup, index: number) => (
                                            <option key={index} value={item._id}>{item.courseGroupName}</option>
                                        ))
                                    }
                                </Select>
                                {
                                    !state.courseGroup &&
                                    <HStack
                                        position='absolute'
                                        h='100%'
                                        left='1.5rem'
                                        top='0'
                                    >
                                        <Text fontSize='md' textColor='exGray.300' >{`เลือกCourse Group ที่เกี่ยวข่องกับบทความ`}</Text>
                                    </HStack>
                                }
                            </Box>
                        </Stack>
                        <Stack
                            align='start'
                            w='100%'
                            spacing='0.75rem'
                        >
                            <Text fontWeight='bold' fontSize='lg' >
                                <Highlight
                                    query={["*"]}
                                    styles={{ textColor: 'crimson' }}
                                >
                                    {`Technology Area *`}
                                </Highlight>
                            </Text>
                            <Box
                                position='relative'
                                w='100%'
                                h='100%'
                            >
                                <Select
                                    h='80px'
                                    position='relative'
                                    value={state.technologyArea}
                                    onChange={(e) => setState(prev => ({ ...prev, technologyArea: e.target.value }))}
                                >
                                    <option value="" style={{ display: 'none' }} ></option>
                                    {
                                        technologyAreas.map((item: TTechnologyArea, index: number) => (
                                            <option key={index} value={item._id}>{item.technologyName}</option>
                                        ))
                                    }
                                </Select>
                                {
                                    !state.technologyArea &&
                                    <HStack
                                        position='absolute'
                                        h='100%'
                                        left='1.5rem'
                                        top='0'
                                    >
                                        <Text fontSize='md' textColor='exGray.300' >{`เลือก Technology Area ที่เกี่ยวข่องกับบทความ"`}</Text>
                                    </HStack>
                                }
                            </Box>
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            align='end'
                            justify='start'
                            spacing='30px'
                            direction='row'
                        >
                            <VStack
                                align='start'
                                spacing='0.75rem'
                                w='75%'
                            >
                                <Text fontWeight='bold' fontSize='lg' >{`บทความอื่นๆ ที่เกี่ยวข้อง`}</Text>
                                <Stack
                                    w='100%'
                                    h='80px'
                                    px='20px'
                                    py='18px'
                                    border='1px'
                                    borderRadius='10px'
                                    borderColor='exGray.100'
                                >
                                    <Wrap
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='start'
                                        direction='row'
                                        spacing='15px'
                                    >
                                        {
                                            article.length > 0 && state.articleRelated.slice(0, 2).map((a, index) => (
                                                <Tag
                                                    key={index}
                                                    w={course.length === 1 ? 'fit-content' : '40%'}
                                                    h='fit-content'
                                                    bg='#D9ECFF'
                                                    px='20px'
                                                    py='10px'
                                                    borderRadius='full'
                                                    variant='solid'
                                                    colorScheme='green'
                                                >
                                                    <TagLabel
                                                        textColor='#4091F4'
                                                        fontSize='20px'
                                                        fontWeight='600'
                                                    >
                                                        {article.filter(v => v._id === a).length > 0 && article.filter(v => v._id === a)[0].articleTitle}
                                                    </TagLabel>
                                                    <TagCloseButton
                                                        color='#4091F4'
                                                        onClick={() => setState(prev => ({ ...prev, articleRelated: state.articleRelated.filter((_, i) => i !== index) }))}
                                                    />
                                                </Tag>
                                            ))
                                        }
                                        {
                                            state.articleRelated.length > 2 && (
                                                <Tag
                                                    w='fit-content'
                                                    h='fit-content'
                                                    bg='#4091F4'
                                                    px='20px'
                                                    py='10px'
                                                    borderRadius='full'
                                                    variant='solid'
                                                    colorScheme='green'
                                                >
                                                    <TagLabel
                                                        textColor='white'
                                                        fontSize='20px'
                                                        fontWeight='600'
                                                    >
                                                        {`+ ${(state.articleRelated.length - 2)}`}
                                                    </TagLabel>
                                                </Tag>
                                            )
                                        }
                                    </Wrap>
                                </Stack>
                            </VStack>
                            <SelectArticleRelateModal />
                        </Stack>
                    </VStack>
                    <Stack
                        align='start'
                        w='100%'
                        spacing='1.5rem'
                        direction={{ base: 'column', lg: 'row' }}
                    >
                        <AdminArticleInput
                            placeholder="ระบุ URL สำหรับวิดีโอ"
                            defaultValue={state.articleVideoUrl}
                            ref={articleVDO}
                            onBlur={() => {
                                setState(prev => ({
                                    ...prev,
                                    articleVideoUrl: articleVDO.current?.value
                                }))
                            }}
                        >
                            {`URL สำหรับวิดีโอ`}
                        </AdminArticleInput>
                        <AdminArticleInput
                            placeholder="ระบุ URL สำหรับไฟล์ที่สามารถดาวน์โหลดได้"
                            ref={articlesDownloadFileURL}
                            defaultValue={state.articlesFileDownload}
                            onBlur={() => {
                                setState(prev => ({
                                    ...prev,
                                    articlesFileDownload: articlesDownloadFileURL.current?.value
                                }))
                            }}
                        >
                            {`URL สำหรับไฟล์ที่สามารถดาวน์โหลดได้`}
                        </AdminArticleInput>
                    </Stack>
                    <Stack
                        align='start'
                        w='100%'
                        spacing='1.5rem'
                        direction={{ base: 'column', lg: 'row' }}
                    >
                        <AdminArticleInput
                            defaultValue={state.note}
                            ref={articleNote}
                            placeholder="ระบุ หมายเหตุ"
                            onBlur={() => setState(prev => ({
                                ...prev,
                                note: articleNote.current?.value
                            }))}
                        >
                            {`หมายเหตุ`}
                        </AdminArticleInput>
                        <AdminArticleInput
                            ref={articleKeywords}
                            defaultValue={state.keywords?.toString()}
                            placeholder="ระบุ Keyword ที่เกี่ยวข้องกับบทความ ( ใส่ , (Comma) เพื่อคั่น Keyword )"
                            onBlur={() => setState(prev => ({
                                ...prev,
                                keywords: [...parseInput(articleKeywords.current?.value, [])],
                            }))}
                        >
                            {`Keyword ที่เกี่ยวข้องกับบทความ`}
                        </AdminArticleInput>
                    </Stack>
                    <Stack
                        align='start'
                        w='100%'
                        spacing='1.5rem'
                        direction={{ base: 'column', lg: 'row' }}
                    >
                        <VStack
                            align='start'
                            w='100%'
                            spacing='0.75rem'
                        >
                            <Text fontWeight='bold' fontSize='lg' >
                                <Highlight
                                    query={["*"]}
                                    styles={{ textColor: 'crimson' }}
                                >
                                    {`สถานะ *`}
                                </Highlight>
                            </Text>
                            <HStack
                                w='100%'
                                spacing='2rem'
                            >
                                <Box
                                    position='relative'
                                    w='100%'
                                    h='100%'
                                >
                                    <Select

                                        position='relative'
                                        value={state.status}
                                        onChange={(e) => setState(prev => ({ ...prev, status: e.target.value }))}
                                    >
                                        <option value="" style={{ display: 'none' }} ></option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Delete">Delete</option>
                                    </Select>
                                    {
                                        !state.status &&
                                        <HStack
                                            position='absolute'
                                            h='100%'
                                            left='1.5rem'
                                            top='0'
                                        >
                                            <Text fontSize='md' textColor='exGray.300' >{`เลือกสถานะ`}</Text>
                                        </HStack>
                                    }
                                </Box>
                            </HStack>
                        </VStack>
                        <Stack
                            align='start'
                            w='100%'
                            spacing='0.75rem'
                        >
                            <Text fontWeight='bold' fontSize='lg' >
                                <Highlight
                                    query={["*"]}
                                    styles={{ textColor: 'crimson' }}
                                >
                                    {`ประเภทบทความ *`}
                                </Highlight>
                            </Text>
                            <Box
                                position='relative'
                                w='100%'
                                h='100%'
                            >
                                <Select
                                    position='relative'
                                    value={state.articleType}
                                    onChange={(e) => setState(prev => ({ ...prev, articleType: e.target.value }))}
                                >
                                    <option value="" style={{ display: 'none' }} ></option>
                                    <option value="Article">Article</option>
                                    <option value="Video">Video</option>
                                    <option value="Article_With_Video">Article with Video</option>
                                </Select>
                                {
                                    !state.articleType &&
                                    <HStack
                                        position='absolute'
                                        h='100%'
                                        left='1.5rem'
                                        top='0'
                                    >
                                        <Text fontSize='md' textColor='exGray.300' >{`เลือกประเภทบทความ`}</Text>
                                    </HStack>
                                }
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack
                        align='start'
                        w='100%'
                        spacing='0.75rem'
                        direction='row'
                    >
                        <Box
                            position='relative'
                            h='100%'
                        >
                            <Switch
                                size='lg'
                                isChecked={state.pin}
                                onChange={(e) => setState(prev => ({ ...prev, pin: e.target.checked }))}
                            />
                        </Box>
                        <Text fontWeight='bold' fontSize='lg' >
                            {`ปักหมุดบทความ`}
                        </Text>
                    </Stack>
                    <HStack
                        my='2rem'
                        justify='space-between'
                        w='100%'
                    >
                        <Button
                            w='130px'
                            variant='outline'
                            fontSize='sm'
                        >
                            {`ย้อนกลับ`}
                        </Button>
                        <Button
                            w='130px'
                            bg='exBlue'
                            color='white'
                            fontSize='sm'
                            onClick={handleSave}
                            disabled
                        >
                            {`บันทึก`}
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </>
    )
}