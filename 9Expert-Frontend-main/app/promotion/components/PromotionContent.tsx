'use client'

import { yearlyPromotionList, alumiPromotionList, alumiPromotion, yearlyPromotion, alumiPromotionConditionUrl } from "@/config/promotion"
import NextLink from 'next/link'
import { Container, Heading, Image, Link, Stack, Text, UnorderedList, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import MobilePromotionCard from "./MobilePromotionCard"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import DesktopPromotionCard from "./DesktopPromotionCard"
import { containerBreakpoints } from "@/config/theme"

type PromotionCard = {
    title: string,
    subtitle: string,
    image: string,
    iconBg?: React.ReactElement[],
    children?: React.ReactElement
}

const YearlyPromotionIcons = [
    <Image
        key="1"
        w='134px'
        h='134px'
        position='absolute'
        top='100px'
        right='33px'
        src='/promotion/2.png'
        alt="promotion icon 2" />,
    <Image
        key="2"
        w='80px'
        h='80px'
        position='absolute'
        bottom='20px'
        left='30px'
        src='/promotion/3.png'
        alt="promotion icon 3"
    />]

const AlumiPromotionIcons = [<Image
    key="2"
    w='80px'
    h='80px'
    position='absolute'
    top='20px'
    left='80px'
    src='/promotion/5.png'
    alt="promotion icon 5"
/>]

export const PromotionContent = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const borderColor = useColorModeValue('#C5DCFA80', '#2E2E2E33')

    const PromotionCard = ({ title = '', subtitle = '', image = '', iconBg = [], children }: PromotionCard) => {
        return isDesktop ?
            <DesktopPromotionCard title={title} subtitle={subtitle} image={image} iconBg={iconBg}>
                {children}
            </DesktopPromotionCard>
            :
            <MobilePromotionCard title={title} subtitle={subtitle} image={image}>
                {children}
            </MobilePromotionCard>
    }

    const AlumiPromotionContent = <Stack borderTop="1px" w="100%" spacing="1rem" borderColor={borderColor} mt="1rem" py={{ base: '1rem', lg: '2rem' }}>
        <Heading
            fontSize='1.25rem'
            fontWeight={700}
        >สิทธิพิเศษ
        </Heading>
        <UnorderedList
            spacing='0.5rem'
            ml='1.25rem'
        >{alumiPromotionList.map((item, index) => <li key={index}>{item}</li>)}
        </UnorderedList>
        <Stack w="100%" justifyContent="end" spacing="4px" flexWrap="nowrap" alignItems="center" direction="row">
            <Link as={NextLink} target="_blank" textDecoration="underline" variant="link" href={alumiPromotionConditionUrl}>
                <Text>เงื่อนไขของโปรโมชั่น</Text>
            </Link>
            <ExternalLinkIcon />
        </Stack>
    </Stack>

    const YearlyPromotionContent = <UnorderedList
        mt='1rem'
        ml='1.25rem'
        spacing='0.5rem'
    >{yearlyPromotionList.map((item, index) => <li key={index}>{item}</li>)}
    </UnorderedList>

    return (
        <Stack
            w='100%'
            align='center'
            justify='center'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
        >
            <Container
                p={0}
                maxW={containerBreakpoints}
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify={{ base: 'center', lg: 'space-between' }}
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '1.5rem', lg: '4rem' }}
                >
                    <PromotionCard title={yearlyPromotion.title} subtitle={yearlyPromotion.subtitle} image={yearlyPromotion.image} iconBg={YearlyPromotionIcons}>
                        {YearlyPromotionContent}
                    </PromotionCard>
                    <PromotionCard title={alumiPromotion.title} subtitle={alumiPromotion.subtitle} image={alumiPromotion.image} iconBg={AlumiPromotionIcons}>
                        {AlumiPromotionContent}
                    </PromotionCard>
                </Stack>
            </Container>
        </Stack>
    )
}