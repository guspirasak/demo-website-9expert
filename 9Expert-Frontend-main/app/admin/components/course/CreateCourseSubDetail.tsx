'use client'

import { Box, VStack, Text, HStack, Select, Stack, Switch, Wrap, WrapItem, Highlight } from "@chakra-ui/react"
import { AdminInput, AdminInputUrl } from "../AdminInput"
import { useEffect, useRef, useState } from "react"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { TCourseInputRef } from "../../interface/AdminInterface"
import { Skills, UserTarget } from "@/libs/GlobalData"
import { TCourseGroup, TTechnologyArea } from "../../interface/CreateCourseInterface"
import { useSelector } from "react-redux"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { ICreateCourseValidateContext, useValidateCreateCourse } from "../../context/ValidateCreateCourse"
import { CreateCourseRelate } from "./infomation/CreateCourseRelate"
import { CreateCourseRoadmap } from "./infomation/CreateCourseRoadmap"
import { useSearchParams } from "next/navigation"

export const CreateCourseSubDetail = () => {

    const { state, setState }: ICreateCourseContext = useCreateCourse()
    const { validate, setValidate }: ICreateCourseValidateContext = useValidateCreateCourse()
    const [originUrl, setOriginUrl] = useState<string>('')

    const cg = useSelector(getCourseGroup)
    const ta = useSelector(getTechnologyAreas)

    const tab = useSearchParams().get('tab')

    const [courseGroup, setCourseGroup] = useState<{
        data: TCourseGroup[]
        cache: TCourseGroup[]
    }>({
        data: [],
        cache: []
    })
    const [technologyArea, setTechnologyArea] = useState<{
        data: TTechnologyArea[]
        cache: TTechnologyArea[]
    }>({
        data: [],
        cache: []
    })

    useEffect(() => {
        if (cg.length > 0 && ta.length > 0) {
            setCourseGroup({
                data: cg,
                cache: cg
            })
            setTechnologyArea({
                data: ta,
                cache: ta
            })
        }
    }, [cg, ta])

    useEffect(() => {
        if (window.origin){
            setOriginUrl(window.origin)
        }
    }, [])

    // Ref
    const courseGroupNameAbbrRef = useRef<TCourseInputRef>()
    const courseVDORef = useRef<TCourseInputRef>()
    const courseUrlRef = useRef<TCourseInputRef>()
    const courseCatalogUrlRef = useRef<TCourseInputRef>()
    const courseDaysRef = useRef<TCourseInputRef>()
    const courseHoursRef = useRef<TCourseInputRef>()

    return (
        <Stack
            w='100%'
            gap='1.5rem'
        >
            <Stack
                spacing='1.5rem'
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
            >
                <Stack
                    w='100%'
                    h='100%'
                    position='relative'
                >
                    <Text fontSize='lg' >
                        <Highlight
                            query={["*"]}
                            styles={{ textColor: 'crimson' }}
                        >
                            {`Technology Areas *`}
                        </Highlight>
                    </Text>
                    <Select
                        value={state.technologyArea}
                        position='relative'
                        placeholder="เลือก Technology Areas"
                        isInvalid={validate.isTechnologyArea}
                        errorBorderColor="crimson"
                        onChange={(e) => {

                            const selectTechnology = technologyArea.data.filter((item: TTechnologyArea) => item.technologyName === e.target.value)

                            const newCourseGroup = courseGroup.data.filter((item: TCourseGroup) => selectTechnology[0].courseGroup.includes(item._id as string))

                            setCourseGroup(prev => ({
                                ...prev,
                                cache: newCourseGroup
                            }))

                            setState(prev => ({ ...prev, technologyArea: e.target.value, technologyNameAbbr: selectTechnology[0].technologyNameAbbr[0] }))
                            setValidate(prev => ({ ...prev, isTechnologyArea: false }))
                        }}
                        _placeholder={{ color: 'exGray.300' }}
                    >
                        {
                            technologyArea.data.map((item: TTechnologyArea, index: number) => (
                                <option
                                    key={index}
                                    value={item.technologyName}
                                >
                                    {item.technologyName}
                                </option>
                            ))
                        }
                    </Select>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    position='relative'
                >
                    <Text fontSize='lg' >
                        <Highlight
                            query={["*"]}
                            styles={{ textColor: 'crimson' }}
                        >
                            {`กลุ่มหลักสูตร *`}
                        </Highlight>
                    </Text>
                    <Select
                        value={state.courseGroupName}
                        position='relative'
                        placeholder="เลือกกลุ่มหลักสูตร"
                        isInvalid={validate.isCourseGroupName}
                        errorBorderColor="crimson"
                        onChange={(e) => {

                            const selectCourseGroup = courseGroup.data.filter((item: TCourseGroup) => item.courseGroupName === e.target.value)

                            const newTechnologyArea = technologyArea.data.filter((item: TTechnologyArea) => item.courseGroup.includes(selectCourseGroup[0]._id as string))

                            setState(prev => ({
                                ...prev,
                                technologyArea: newTechnologyArea[0].technologyName,
                                technologyNameAbbr: newTechnologyArea[0].technologyNameAbbr[0],
                                courseColor: selectCourseGroup[0].courseGroupColor
                            }))

                            setTechnologyArea(prev => ({
                                ...prev,
                                cache: newTechnologyArea
                            }))

                            setState(prev => ({
                                ...prev,
                                courseGroupName: e.target.value,
                                courseGroupNameAbbr: courseGroup.data.find((item: TCourseGroup) => item.courseGroupName === e.target.value)?.courseGroupNameAbbr as string
                            }))

                            setValidate(prev => ({ ...prev, isCourseGroupName: false, isCourseGroupNameAbbr: false, isCourseGroupColor: false, isCourseColor: false }))
                        }}
                        _placeholder={{ color: 'exGray.300' }}
                    >
                        {
                            courseGroup.data.map((item: TCourseGroup, index: number) => (
                                <option key={index} value={item.courseGroupName} >{item.courseGroupName}</option>
                            ))
                        }
                    </Select>
                </Stack>
            </Stack>
            <Stack
                spacing='1.5rem'
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
            >
                <Stack
                    align='start'
                    spacing='0.75rem'
                    w='100%'
                >
                    <Text fontSize='lg' >
                        <Highlight
                            query={["*"]}
                            styles={{ textColor: 'crimson' }}
                        >
                            {`สีตามหลักสูตร *`}
                        </Highlight>
                    </Text>
                    <Stack
                        position='relative'
                        w='100%'
                        h='100%'
                    >
                        <Select
                            value={state.courseColor.length > 1 ? `${state.courseColor[0]},${state.courseColor[1]}` : `${state.courseColor[0]},`}
                            position='relative'
                            placeholder="เลือกสีตามหลักสูตร"
                            textIndent='1.5rem'
                            isInvalid={validate.isCourseColor}
                            errorBorderColor="crimson"
                            onChange={(e) => {

                                const color = e.target.value.split(',').map((item) => {
                                    return item
                                })

                                setState(prev => ({ ...prev, courseColor: color }))
                                setValidate(prev => ({ ...prev, isCourseColor: false }))
                            }}
                            _placeholder={{
                                color: 'exGray.300',

                            }}
                        >
                            {
                                courseGroup.data.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={[item.courseGroupColor[0], item.courseGroupColor[1]]}
                                        >
                                            {item.courseGroupName}
                                        </option>
                                    )
                                })
                            }
                        </Select>
                        <Stack
                            position='absolute'
                            h='100%'
                            left='1rem'
                            top='10px'
                            zIndex={1}
                        >
                            <Box
                                w='20px'
                                h='20px'
                                bg={
                                    state.courseColor[0] && state.courseColor.length > 1 && state.courseColor[1] ?
                                        `linear-gradient(0deg, ${state.courseColor[1]}, ${state.courseColor[0]})`
                                        :
                                        state.courseColor[0] || 'gray.300'
                                }
                                borderRadius='full'
                            ></Box>
                        </Stack>
                    </Stack>
                </Stack>
                <AdminInput
                    ref={courseGroupNameAbbrRef}
                    isRequired
                    value={state.courseGroupNameAbbr}
                    placeholder="ระบุชื่อย่อกลุ่มหลักสูตร"
                    isInvalid={validate.isCourseGroupNameAbbr}
                    onBlur={() => {
                        setState(prev => ({ ...prev, courseGroupNameAbbr: courseGroupNameAbbrRef.current?.value }))
                        setValidate(prev => ({ ...prev, isCourseGroupNameAbbr: false }))
                    }}
                >
                    {`ชื่อย่อกลุ่มหลักสูตร`}
                </AdminInput>
            </Stack>
            <Stack
                spacing='1.5rem'
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
            >
                <AdminInput
                    ref={courseDaysRef}
                    isRequired
                    defaultValue={state.days}
                    placeholder="ระบุระยะเวลาของหลักสูตร ( วัน )"
                    maxLength={2}
                    isInvalid={validate.isDays}
                    onBlur={() => {
                        setState(prev => ({ ...prev, days: courseDaysRef.current?.value }))
                        setValidate(prev => ({ ...prev, isDays: false }))
                    }}
                >
                    {`ระยะเวลาของหลักสูตร ( วัน )`}
                </AdminInput>
                <AdminInput
                    ref={courseHoursRef}
                    isRequired
                    defaultValue={state.hours}
                    placeholder="ระบุระยะเวลาของหลักสูตร ( ชั่วโมง )"
                    maxLength={2}
                    isInvalid={validate.isHours}
                    onBlur={() => {
                        setState(prev => ({ ...prev, hours: courseHoursRef.current?.value }))
                        setValidate(prev => ({ ...prev, isHours: false }))
                    }}
                >
                    {`ระยะเวลาของหลักสูตร ( ชั่วโมง )`}
                </AdminInput>
            </Stack>
            <Stack
                spacing='1.5rem'
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
            >
                <Stack
                    w='100%'
                    h='100%'
                    position='relative'
                >
                    <Text fontSize='lg' >
                        <Highlight
                            query={["*"]}
                            styles={{ textColor: 'crimson' }}
                        >
                            {`สกิล *`}
                        </Highlight>
                    </Text>
                    <Select
                        value={state.skills[0]}
                        position='relative'
                        placeholder="เลือกสกิล"
                        isInvalid={validate.isSkills}
                        errorBorderColor="crimson"
                        onChange={(e) => {

                            if (!e.target.value) return

                            setState(prev => ({
                                ...prev,
                                skills: [e.target.value]
                            }))
                            setValidate(prev => ({ ...prev, isSkills: false }))
                        }}
                        _placeholder={{ color: 'exGray.300' }}
                    >
                        {
                            Skills.map((item: string, index: number) => (
                                <option
                                    key={index}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))
                        }
                    </Select>
                </Stack>
                <VStack
                    align='start'
                    w='100%'
                >
                    <Text
                        fontSize='lg'
                    >
                        <Highlight
                            query={["*"]}
                            styles={{ textColor: 'crimson' }}
                        >
                            {`สถานะหลักสูตร *`}
                        </Highlight>
                    </Text>
                    <Box
                        position='relative'
                        w='100%'
                        h='100%'
                    >
                        <Select
                            position='relative'
                            value={state.courseStatus}
                            isInvalid={validate.isCourseStatus}
                            errorBorderColor="crimson"
                            onChange={(e) => {
                                setState(prev => ({ ...prev, courseStatus: e.target.value }))
                                setValidate(prev => ({ ...prev, isCourseStatus: false }))
                            }}
                        >
                            <option value='Draft'>Draft</option>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </Select>
                    </Box>
                </VStack>
            </Stack>
            <Stack
                spacing='1.5rem'
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
            >
                <Stack
                    w='100%'
                    h='100%'
                    position='relative'
                >
                    <Text fontSize='lg' >
                        <Highlight
                            query={["*"]}
                            styles={{ textColor: 'crimson' }}
                        >
                            {`กลุ่มเป้าหมายของหลักสูตร *`}
                        </Highlight>
                    </Text>
                    <Select
                        value={state.courseTarget}
                        position='relative'
                        placeholder="เลือกกลุ่มเป้าหมายของหลักสูตรนี้"
                        isInvalid={validate.isCourseTarget}
                        errorBorderColor="crimson"
                        onChange={(e) => {

                            const target = e.target.value

                            if (!target) return

                            if (state.courseTarget.includes(target)) return

                            const newTarget = [...state.courseTarget].filter((item: string) => item !== '')

                            setState(prev => ({
                                ...prev,
                                courseTarget: [...newTarget, e.target.value]
                            }))

                            setValidate(prev => ({ ...prev, isCourseTarget: false }))
                        }}
                        _placeholder={{ color: 'exGray.300' }}
                    >
                        {
                            UserTarget.map((item: string, index: number) => (
                                <option
                                    key={index}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))
                        }
                    </Select>
                </Stack>
                <AdminInput
                    defaultValue={state.courseVDO}
                    ref={courseVDORef}
                    placeholder="ระบุลิงค์วิดีโอหลักสูตร"
                    onBlur={() => {
                        setState(prev => ({ ...prev, courseVDO: courseVDORef.current?.value }))
                    }}
                >
                    {`ลิงค์วิดีโอหลักสูตร`}
                </AdminInput>
            </Stack>
            <VStack
                w='100%'
                align='start'
            >
                <AdminInputUrl
                    value={state.courseUrl}
                    ref={courseUrlRef}
                    prefix={`${originUrl}/course/`}
                    subfix={tab === 'elearning-course' ? "_online" : '' }
                    placeholder='วาง URL ของหน้าเว็บไซตหลักสูตรที่ต้องการลิงก์ไปถึง'
                    onChange={() => {
                        setState(prev => ({ ...prev, courseUrl: courseUrlRef.current?.value }))
                    }}
                >
                    {`ลิงก์หน้าเว็บไซตหลักสูตร`}
                </AdminInputUrl>
            </VStack>
            {
                tab === 'elearning-course' &&
                    <VStack
                        w='100%'
                        align='start'
                    >
                        <AdminInputUrl
                            value={state.onlineUrl}
                            placeholder='วาง URL ของหลักสูตรเพื่อลงทะเบียนสำหรับ E-Learning'
                            onChange={(e) => {
                                setState(prev => ({ ...prev, onlineUrl: e.target.value }))
                            }}
                        >
                            {`วางลิงก์หลักสูตรเพื่อลงทะเบียนสำหรับ E-Learning`}
                        </AdminInputUrl>
                    </VStack>
            }
            <VStack
                w='100%'
                align='start'
            >
                <AdminInput
                    defaultValue={state.catalogURL}
                    ref={courseCatalogUrlRef}
                    type='url'
                    placeholder='วาง URL ของลิงก์สำหรับ Download ไฟล์'
                    onBlur={() => {
                        setState(prev => ({
                            ...prev,
                            catalogURL: courseCatalogUrlRef.current?.value
                        }))
                    }}
                >
                    {`วางลิงก์สำหรับ Download ไฟล์`}
                </AdminInput>
            </VStack>
            <Wrap
                align='start'
                spacing='2rem'
                w='100%'
                my='2rem'
            >
                <HStack
                    as={WrapItem}
                    w={{ base: '100%', md: 'auto' }}
                >
                    <Switch
                        isChecked={state.workshop}
                        size='lg'
                        onChange={() => {
                            setState(prev => ({
                                ...prev,
                                workshop: !state.workshop
                            }))
                        }}
                    />
                    <Text>{`Workshop`}</Text>
                </HStack>
                <HStack
                    as={WrapItem}
                    w={{ base: '100%', md: 'auto' }}
                >
                    <Switch
                        isChecked={state.certificate}
                        size='lg'
                        onChange={() => {
                            setState(prev => ({
                                ...prev,
                                certificate: !state.certificate
                            }))
                        }}
                    />
                    <Text>{`Certificate`}</Text>
                </HStack>
                <HStack
                    as={WrapItem}
                    w={{ base: '100%', md: 'auto' }}
                >
                    <Switch
                        isChecked={state.news}
                        size='lg'
                        onChange={() => {
                            setState(prev => ({
                                ...prev,
                                news: !state.news
                            }))
                        }}
                    />
                    <Text>{`New`}</Text>
                </HStack>
                <HStack
                    as={WrapItem}
                    w={{ base: '100%', md: 'auto' }}
                >
                    <Switch
                        isChecked={state.promotion}
                        size='lg'
                        onChange={() => {
                            setState(prev => ({
                                ...prev,
                                promotion: !state.promotion
                            }))
                        }}
                    />
                    <Text>{`Promotion`}</Text>
                </HStack>
                <HStack
                    as={WrapItem}
                    w={{ base: '100%', md: 'auto' }}
                >
                    <Switch
                        isChecked={state.recommend}
                        size='lg'
                        onChange={() => {
                            setState(prev => ({
                                ...prev,
                                recommend: !state.recommend
                            }))
                        }}
                    />
                    <Text>{`Recommend`}</Text>
                </HStack>
                <HStack
                    as={WrapItem}
                    w={{ base: '100%', md: 'auto' }}
                >
                    <Switch
                        isChecked={state.showOnHomepage}
                        size='lg'
                        onChange={() => {
                            setState(prev => ({
                                ...prev,
                                showOnHomepage: !state.showOnHomepage
                            }))
                        }}
                    />
                    <Text>{`Show on Homepage`}</Text>
                </HStack>
            </Wrap>
            <Stack
                w='100%'
                h='100%'
            >
                <CreateCourseRelate />
            </Stack>
            {
                state.courseType === 'Offline' &&
                <Stack
                    w='100%'
                    h='100%'
                >
                    <CreateCourseRoadmap />
                </Stack>
            }
        </Stack>
    )
}