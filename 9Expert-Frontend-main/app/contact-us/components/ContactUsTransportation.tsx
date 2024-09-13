'use client'

import { tiktokEmbedded, travelOptions } from "@/config/contact"
import { containerBreakpoints } from "@/config/theme"
import { Container, Heading, Highlight, Image, ListItem, Stack, Text, UnorderedList, useColorModeValue } from "@chakra-ui/react"
import { TikTokEmbed } from 'react-social-media-embed'

const iconSize = {
    container: { base: '100px', lg: '250px' },
    image: { base: '60px', lg: '160px' }
}

const ImageContainer = ({ iconSrc, alt }: { iconSrc: string, alt: string }) => (
    <Stack
        w={iconSize.container}
        h={iconSize.container}
        flexShrink={0}
        bg='#ffffff'
        align='center'
        justify='center'
        borderRadius='20px'
    >
        <Image
            w={iconSize.image}
            h={iconSize.image}
            src={iconSrc}
            alt={alt}
        />
    </Stack>
)

const TextContainer = ({ id, title, description }: { id: number, title: string, description: string[] }) => {
    const isList = description.length > 1

    return (
        <Stack
            w='100%'
            h='100%'
            alignSelf='center'
            justifyItems='center'
            align={{ base: 'center', lg: 'start' }}
            spacing='1rem'
        >
            <Heading
                as='h3'
                fontSize={{ base: '1.5rem', lg: '2rem' }}
                fontWeight='600'
            >
                {title}
            </Heading>
            <Text
                fontSize={{ base: '1.25rem', lg: '1.25rem' }}
                textAlign={{ base: isList ? 'start' : 'center', lg: 'start' }}
            >
                <UnorderedList marginInlineStart={isList ? '1em' : 0} spacing='1rem' styleType={isList ? 'disc' : 'none'}>
                    {description.map((item, index) => 
                    {
                        if (id === 2) 
                            return (
                                <ListItem key={index} >
                                    <Highlight
                                        query='โรงแรมเอเชีย'
                                        styles={{ fontWeight: 'bold', color: 'white'}}
                                    >
                                        {item}
                                    </Highlight>
                                </ListItem>
                            )
                            

                        return <ListItem key={index}>{item}</ListItem>
                    }
                    )}
                </UnorderedList>
            </Text>
        </Stack>
    )
}

const TransportationOption = ({id, title, description, iconSrc, alt }: { id:number, title: string, description: string[], iconSrc: string, alt: string }) => (
    <Stack
        w='100%'
        h='100%'
        p={{ base: '2rem', lg: '3rem' }}
        bg='#ffffff11'
        borderRadius='20px'
        justify='center'
        align={{ base: 'center', lg: 'start' }}
        spacing={{ base: '1rem', lg: '3rem' }}
        direction={{ base: 'column', lg: 'row' }}
    >
        <ImageContainer iconSrc={iconSrc} alt={alt} />
        <TextContainer id={id} title={title} description={description} />
    </Stack>
)

const TransportationOptionPrivateCar = ({title, iconSrc, alt }: {title: string, iconSrc: string, alt: string}) => (
    <Stack
        w='100%'
        h='100%'
        p={{ base: '2rem', lg: '3rem' }}
        bg='#ffffff11'
        borderRadius='20px'
        justify='center'
        align={{ base: 'center', lg: 'start' }}
        spacing={{ base: '1rem', lg: '3rem' }}
        direction={{ base: 'column', lg: 'row' }}
    >
        <ImageContainer iconSrc={iconSrc} alt={alt} />
        <Stack
            w='100%'
            h='100%'
            alignSelf='center'
            justifyItems='center'
            align={{ base: 'center', lg: 'start' }}
            spacing='1rem'
        >
            <Heading
                as='h3'
                fontSize={{ base: '1.5rem', lg: '2rem' }}
                fontWeight='600'
            >
                {title}
            </Heading>
            <Text
                fontSize={{ base: '1.25rem', lg: '1.25rem' }}
                textAlign={{ base: 'start', lg: 'start' }}
            >
                <Stack>
                    <Stack>
                        <Text>กรณี ถนนพญาไท มุ่งหน้า สยามแสควร์ :</Text>
                        <UnorderedList ml={'3rem'} marginInlineStart={'1em'} spacing='1rem' styleType={'disc'}>
                            <ListItem fontWeight={'bold'} >
                                {'กลับรถใต้สะพานใต้สะพานหัวช้าง เห็น 7-11 แรก ให้ชิดซ้ายเลี้ยวเข้าซอยวรฤทธิ์ จอดรถที่อาคารจอดรถเอเวอร์กรีนเพลส'}
                            </ListItem>
                        </UnorderedList>
                    </Stack>
                    <br />
                    <Stack>
                        <Text>กรณี ถนนพญาไท มุ่งหน้า อนุเสาวรีย์ชัย :</Text>
                        <UnorderedList ml={'3rem'} marginInlineStart={'1em'} spacing='1rem' styleType={'disc'}>
                            <ListItem fontWeight={'bold'} >
                                {'ข้ามสะพานหัวช้างแล้วเห็น 7-11 แรก ให้ชิดซ้ายเลี้ยวเข้าซอยวรฤทธิ์ จอดรถที่อาคารจอดรถเอเวอร์กรีนเพลส'}
                            </ListItem>
                        </UnorderedList>
                    </Stack>
                </Stack>
            </Text>
        </Stack>
    </Stack>
)

export const ContactUsTransportation = () => {
    const bgColor = '#0B345D'
    const fontColor = useColorModeValue('#FFFFFF', '#EBEBEB')

    return (
        <Stack
            as='section'
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bgColor={bgColor}
        >
            <Container p={0} maxW={containerBreakpoints} >
                <Stack
                    w='100%'
                    align='center'
                    justify='center'
                    spacing={{ base: '2rem', lg: '3rem' }}
                    color={fontColor}
                >
                    <Heading
                        as='h2'
                        fontSize={{ base: '2rem', lg: '3rem' }}
                        textAlign='center'
                    >
                        การเดินทาง
                    </Heading>
                    <Stack
                        w='100%'
                        h='620px'
                        align='center'
                        justify='center'
                        bg='#000000'
                        borderRadius='20px'
                    >
                        <TikTokEmbed title="TikTok" url={tiktokEmbedded} linkText='directory' retryDisabled />
                    </Stack>
                    {travelOptions.map(({ id, title, description, iconSrc, alt }) => <TransportationOption key={id} id={id} title={title} description={description} iconSrc={iconSrc} alt={alt} />)}
                    <TransportationOptionPrivateCar title={'รถส่วนบุคคล'} iconSrc={'/contactus/bus.png'} alt={'car'} />
                </Stack>
            </Container>
        </Stack>
    )
}