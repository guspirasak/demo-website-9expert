'use client'

import { Select, Stack, Text, Highlight } from "@chakra-ui/react"
import { AdminInput } from "../AdminInput"
import { AdminTextArea } from "../AdminTextArea"
import { ChangeEvent, useRef } from "react"
import { TCourseInputRef } from "../../interface/AdminInterface"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { LevelList } from "@/libs/GlobalData"
import { useSearchParams } from "next/navigation"
import { ICreateCourseValidateContext, useValidateCreateCourse } from "../../context/ValidateCreateCourse"

export const CreateCourseMainDetail = () => {

    const { state, setState }: ICreateCourseContext = useCreateCourse() 
    const { validate, setValidate }: ICreateCourseValidateContext = useValidateCreateCourse()

    const tab = useSearchParams().get('tab')

    // Ref
    const courseIdRef = useRef<TCourseInputRef>()
    const courseNameRef = useRef<TCourseInputRef>()
    const courseNameAbbrRef = useRef<TCourseInputRef>()
    const courseTeaserAbbrRef = useRef<TCourseInputRef>()
    const coursePriceRef = useRef<TCourseInputRef>()
    const coursePriceBeforeRef = useRef<TCourseInputRef>()

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='1.5rem'
        >
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                spacing='1.5rem'
                w='100%'
            >
                <AdminInput
                    ref={courseIdRef}
                    isRequired
                    defaultValue={state.courseId}
                    placeholder="ระบุรหัสของหลักสูตร"
                    isInvalid={validate.isCourseId}
                    onBlur={() => {
                        setState(prev => ({ ...prev, courseId: courseIdRef.current?.value }))
                        setValidate(prev => ({ ...prev, isCourseId: false }))
                    }}
                >
                    {`รหัสหลักสูตร`}
                </AdminInput>
                <AdminInput
                    ref={courseNameRef}
                    isRequired
                    defaultValue={state.courseName}
                    placeholder="ระบุชื่อของหลักสูตร"
                    isInvalid={validate.isCourseName}
                    onBlur={() => {
                        setState(prev => ({ ...prev, courseName: courseNameRef.current?.value }))
                        setValidate(prev => ({ ...prev, isCourseName: false }))
                    }}
                >
                    {`ชื่อหลักสูตร`}
                </AdminInput>
            </Stack>
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                spacing='1.5rem'
                w='100%'
            >
                <AdminInput
                    ref={courseNameAbbrRef}
                    defaultValue={state.courseNameAbbr}
                    placeholder="ระบุชื่อย่อของหลักสูตร"
                    onBlur={() => {
                        setState(prev => ({ ...prev, courseNameAbbr: courseNameAbbrRef.current?.value }))
                        setValidate(prev => ({ ...prev, isCourseNameAbbr: false }))
                    }}
                >
                    {`ชื่อย่อหลักสูตร`}
                </AdminInput>
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
                            {`ความยาก *`}
                        </Highlight>
                    </Text>
                    <Select
                        position='relative'
                        placeholder="เลือกความยาก"
                        value={state.difficultLevel}
                        isInvalid={validate.isDifficultLevel}
                        onChange={(e) => {
                            setState(prev => ({ ...prev, difficultLevel: e.target.value }))
                            setValidate(prev => ({ ...prev, isDifficultLevel: false }))
                        }}
                        _placeholder={{ color: 'exGray.300' }}
                    >
                        {
                            LevelList.slice(1, LevelList.length).map((item: string, index: number) => (
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
            </Stack>
            <AdminTextArea
                defaultValue={state.courseTeaserAbbr}
                ref={courseTeaserAbbrRef}
                isRequired
                placeholder="ป้อนคำอธิบายหลักสูตรโดยย่อ"
                onBlur={() => {
                    setState(prev => ({ ...prev, courseTeaserAbbr: courseTeaserAbbrRef.current?.value }))
                }}
            >
                {`รายละเอียดหลักสูตรย่อ`}
            </AdminTextArea>
            <Stack
                spacing='1.5rem'
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
            >
                <AdminInput
                    value={`${state.price}`}
                    ref={coursePriceRef}
                    isRequired
                    placeholder="ระบุราคา"
                    maxLength={6}
                    isInvalid={validate.isPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (tab === 'elearning-course') {
                            setState(prev => ({ ...prev, price: Number(e.target?.value), elearningPrice: Number(e.target?.value) }))
                            return
                        }

                        setState(prev => ({ ...prev, price: Number(e.target?.value) }))
                        setValidate(prev => ({ ...prev, isPrice: false }))
                    }}
                >
                    {`ราคาหลักสูตร`}
                </AdminInput>
                <AdminInput
                    value={`${state.priceBefore}`}
                    ref={coursePriceBeforeRef}
                    placeholder="ระบุราคา"
                    maxLength={6}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setState(prev => ({ ...prev, priceBefore: Number(e.target?.value) }))
                    }}
                >
                    {`ราคาหลักสูตรหลังลด`}
                </AdminInput>
            </Stack>
        </Stack>
    )
}