"use client";

import { Input, Stack, HStack, VStack, Container, Heading, Textarea, Box, Button, Spacer } from "@chakra-ui/react";
import TitleForm from "./FillFormElement/TitleForm";
import HeadForm from "./FillFormElement/HeadForm";
import DataForm from "./FillFormElement/DataForm";
import SelectForm from "./FillFormElement/SelectForm";

export const FillForm = () => {
    return (
        <>
            <Container justifyContent="center" alignItems="center" maxW="80%" h="maxcontent" borderRadius="20px" border="1px solid" borderColor={["red", "green", "blue", "black"]} >
                <VStack w={["95%", "95%", "95%", "95%"]} justifyContent="center" mx="auto" >
                    <TitleForm title={`ลงทะเบียนสำหรับองค์กร`} content={`กรุณากรอกข้อมูลเพื่อลงทะเบียน`} />
                    <HeadForm title={`เลือกหลักสูตร`} />
                    <Stack w="full" direction={["column", "column", "column", "row"]} justifyContent="center" mt={["3vw", "3vw", "2.5vw", "1.5vw"]} spacing="10%" >
                        <VStack align="start" w={["100%", "100%", "100%", "100%", "50%"]}>
                            <HStack>
                                <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]} fontWeight="bold" >{`หลักสูตรที่น่าสนใจ `}</Heading>
                                <Heading size="sm" color="red">{`*`}</Heading>
                            </HStack>
                            <Input size={["xs", "xs", "sm", "md"]} placeholder="เลือกหลักสูตร" borderColor="#c1c1c1" />
                        </VStack>
                        <VStack align="start" mt={["3vw", "3vw", "2.5vw", "0"]} w={["100%", "100%", "100%", "100%", "50%"]} >
                            <SelectForm head={`จำนวนผู้สมัคร`} placeholder="1" options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]} />
                        </VStack>
                    </Stack>
                    <Stack w="full" direction={["column", "column", "column", "row"]} justifyContent="center" mt={["3vw", "3vw", "2.5vw", "1.5vw"]} spacing="10%" >
                        <VStack align="start" w={["100%", "100%", "100%", "100%", "50%"]}>
                            <SelectForm head={`เดือนที่ต้องการอบรม`} placeholder="เลือกเดือนที่ต้องการอบรม" options={["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]} />
                        </VStack>
                        <VStack align="start" mt={["3vw", "3vw", "2.5vw", "0"]} w={["100%", "100%", "100%", "100%", "50%"]} >
                            <SelectForm head={`รูปแบบการอบรม `} placeholder="เลือกรูปแบบการอบรม" options={["Onsite", "Live ผ่าน Microsoft Team"]}></SelectForm>
                        </VStack>
                    </Stack>
                    <VStack mt={["6vw", "6vw", "5vw", "3vw"]}></VStack>
                    <HeadForm title={`ข้อมูลผู้ลงทะเบียน/ผู้ประสานงาน`} />
                    <DataForm title1={`ชื่อ`} title2={`นามสกุล`} />
                    <DataForm title1={`ตำแหน่ง`} title2={`แผนก`} />
                    <Stack direction={["column", "column", "column", "row"]} w="full" justifyContent="center" mt={["3vw", "3vw", "2.5vw", "1.5vw"]} spacing={["5vw", "5vw", "5vw", "3vw"]} >
                        <VStack align="start" w={["100%", "100%", "100%", "100%", "50%"]}>
                            <HStack>
                                <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{`ชื่อบริษัทที่ใช้การออกกำกับภาษี`}</Heading>
                                <Heading size="sm" color="red">{`*`}</Heading>
                            </HStack>
                            <Input size={["xs", "xs", "sm", "md"]} placeholder={`ชื่อบริษัทที่ใช้การออกกำกับภาษี`} borderColor="#c1c1c1" />
                        </VStack>
                        <VStack align="start" w={["100%", "100%", "100%", "100%", "50%"]}>
                            <HStack w="full" justifyContent="space-between">
                                <HStack>
                                    <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{`สาขา`}</Heading>
                                    <Heading size="sm" color="red">{`*`}</Heading>
                                </HStack>
                            </HStack>
                            <Input size={["xs", "xs", "sm", "md"]} placeholder={`สาขา`} borderColor="#c1c1c1" />
                        </VStack>
                    </Stack>
                    <DataForm title1={`ชื่อเต็มบริษัท`} title2={`สำนักงานใหญ่`} />
                    <HStack w="full" justifyContent="center" spacing={["5vw", "5vw", "6vw", "8vw"]} mt={["3vw", "3vw", "2.5vw", "1.5vw"]} >
                        <VStack align="start" w="100%">
                            <HStack>
                                <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{`เลขประจำตัวผู้เสียภาษี `}</Heading>
                                <Heading size="sm" color="red">{`*`}</Heading>
                            </HStack>
                            <Input size={["xs", "xs", "sm", "md"]} placeholder="เลขประจำตัวผู้เสียภาษี" borderColor="#c1c1c1" />
                        </VStack>
                    </HStack>
                    <Box width="full" mt={["3vw", "3vw", "2.5vw", "1.5vw"]}>
                        <HStack>
                            <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{`ที่อยู่สำหรับออกใบกำกับภาษี `}</Heading>
                            <Heading size="sm" color="red">{`*`}</Heading>
                        </HStack>
                        <Textarea size={["xs", "xs", "sm", "md"]} placeholder="ที่อยู่สำหรับออกใบกำกับภาษี" mt={2} borderColor="#c1c1c1" width="full" resize="none" />
                    </Box>
                    <DataForm title1={`จังหวัด`} title2={`เขต / อําเภอ`} />
                    <DataForm title1={`แขวง / ตำบล `} title2={`รหัสไปรษณีย์ `} />
                    <Box width="full" mt={["3vw", "3vw", "2.5vw", "1.5vw"]}>
                        <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{`หมายเหตุ `}</Heading>
                        <Textarea size={["xs", "xs", "sm", "md"]} placeholder="หมายเหตุ" mt={2} boxSizing="border-box" borderColor="#c1c1c1" width="full" style={{ height: "160px" }} resize="none" />
                    </Box>
                    <HStack mt={["3vw", "3vw", "2.5vw", "1.5vw"]} justifyContent="space-between" w="full" mb={["3vw", "3vw", "2.5vw", "1.5vw"]} >
                        <Button fontSize={["0.7em", "0.75em", "0.8em", "1em"]} size={["xs", "xs", "sm", "lg"]} color="gray" variant="outline" w={32} borderColor="#c1c1c1" >
                            ย้อนกลับ
                        </Button>
                        <Spacer />
                        <Button fontSize={["0.7em", "0.75em", "0.8em", "1em"]} size={["xs", "xs", "sm", "lg"]} w={32} bg="#19b5fe" color="white" >
                            บันทึก
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </>
    );
};