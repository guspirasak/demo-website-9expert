'use client'

import { Stack, Heading, Text, AspectRatio, Image, Highlight } from "@chakra-ui/react"
import { useGroup } from "../context/GroupContext"

export const GroupBanner = () => {

    const { state } = useGroup()

    console.log('state: ', state);
    

    return (
        <Stack
            w='100%'
            h='100%'
            minH={{ base: '499px', lg: '1300px', '2xl': '1756px' }}
            align='center'
            justify='center'
        >
            <Heading
                as='h1'
                w='20ch'
                fontSize={{ base: '26px', lg: '64px' }}
                textColor='white'
                textAlign='center'
            >
                <Highlight
                    query={state?.courseGroup?.courseGroupName}
                    styles={{
                        fontSize: { base: '36px', lg: '90px' },
                        fontWeight: '800',
                        color: 'white',
                        fontFamily: 'Inter',
                    }}
                >
                    {`คอร์สทั้งหมดของหลักสูตร ${state?.courseGroup?.courseGroupName}`}
                </Highlight>
            </Heading>
            <Text
                fontSize='28px'
                textColor='white'
                mt='2rem'
            >
                {state?.courseGroup?.courseGroupTeaserAbbr}
            </Text>
            <AspectRatio
                ratio={3509 / 2481}
                w='80%'
                mt={{ base: '30px', lg: '136px' }}
                mb={{ base: '0px', lg: '108px' }}
            >
                <Image
                    alt='course group banner'
                    src={state?.courseGroup?.courseGroupBanner}
                    borderRadius='20px'
                    loading="lazy"
                />
            </AspectRatio>
        </Stack>
    )
}