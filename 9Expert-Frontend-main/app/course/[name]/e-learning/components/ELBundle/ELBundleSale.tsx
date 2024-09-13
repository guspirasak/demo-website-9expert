'use client'

import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
// import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
import { AspectRatio, Button, Heading, Image, Stack, useBreakpointValue } from "@chakra-ui/react"
import { TUserBundle } from "../../interface/ELTab"
import { BundleCard } from "@/app/components/ContentCard/BundleCard"


export const ELBundleSale = ({ bundle, setShowBundleDetail }: { bundle: TUserBundle, setShowBundleDetail: React.Dispatch<React.SetStateAction<boolean>> }) => {
    
    return (
        <Stack
            w='100%'
            minH={{ base: '600px', '2xl': '1300px' }}
            color='white'
            pt={{ base: '3rem', '2xl': '0' }}
            align='center'
            justify={{ base: 'start', '2xl': 'center' }}
            position='relative'
        >
            <Heading
                w='max-content'
                pb='2rem'
                textAlign='center'
                fontSize={{ base: '24px', lg: '48px' }}
                borderBottom='2px'
                borderColor='#1CA7EC'
                as='h2'
            >
                {`ซื้อแบบ Bundle Course คุ้มกว่า`}
            </Heading>
            <Stack
                w='100%'
                h='100%'
                position='relative'
            >
                <Stack
                    w='100%'
                    mt='25px'
                    minH={{ base: '700px', '2xl': '1105px' }}
                    borderRadius='50px'
                    // bg='linear-gradient(180deg, #19B5FE, #0B345D)'
                    align='center'
                    justify='center'
                    bgImage='/bundle_pro.png'
                    bgPosition={{ base: 'start', '2xl': 'center' }}
                    bgRepeat='no-repeat'
                    bgSize='contain'
                >

                </Stack>
                <Stack
                    w='100%'
                    minH={{ base: '600px', '2xl': '1200px' }}
                    mt='25px'
                    borderRadius='50px'
                    bg='transparent'
                    align='center'
                    justify='start'
                    position='absolute'
                    top={{ base: '0', '2xl': '22%' }}
                    left={{ base: '0', '2xl': '8%' }}
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='start'
                        direction='row'
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align={{ base: 'center', md: 'start' }}
                            justify='center'
                            position='relative'
                            pl={{ base: '0', xl: '2rem', '3xl': '0' }}
                        >
                            <BundleCard scale={useBreakpointValue({ base: '0.8', '3xl': '1' })} bundle={bundle} />
                        </Stack>
                        {/* <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                        position='relative'
                    >
                        <Heading
                            w='100%'
                            fontSize='40px'
                            textAlign='center'
                            fontWeight='500'
                        >
                            {`กลุ่มหลักสูตรสำหรับ`}
                        </Heading>
                        <Heading
                            w='100%'
                            fontSize='40px'
                            textAlign='center'
                            fontWeight='600'
                        >
                            {bundle.name}
                        </Heading>
                        <Stack
                            w='567px'
                            h='88px'
                            align='center'
                            justify='center'
                            bg='linear-gradient(90deg, #E1090E, #BC0001)'
                        >
                            <Heading
                                w='100%'
                                fontSize='48px'
                                textAlign='center'
                            >
                                {`โปรโมชั่นราคาแพ็คเกจ `}
                            </Heading>
                        </Stack>
                    </Stack> */}
                    </Stack>
                    <Button
                        w='380px'
                        h={{ base: '60px', '3xl': '80px' }}
                        mt={{ base: '2rem', 'xl': '-2rem', '3xl': '35px' }}
                        ml={{ base: '0', '2xl': '20%' }}
                        bg='linear-gradient(180deg, #FEC84B, #F79009)'
                        fontSize={{ base: '30px', '3xl': '36px' }}
                        textColor='white'
                        borderRadius='15px'
                        onClick={() => setShowBundleDetail(true)}
                        _hover={{
                            bg: 'linear-gradient(180deg, #FEC84B, #F79009)',
                        }}
                        _active={{
                            bg: 'linear-gradient(180deg, #FEC84B, #F79009)',
                        }}
                    >
                        {`สนใจหลักสูตร`}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}