import { InstagramIcon, LinkInIcon, TiktokIcon, TwitterIcon, YoutubeIcon } from "@/app/icons/HomeIcons";
import { instagramUrl, linkedInUrl, tiktokUrl, twitterUrl, youtubeUrl } from "@/config/contact";
import { Stack } from "@chakra-ui/react";
import Link from "next/link";

const activeState = { 
    boxShadow:'base', 
    rounded:'full',
    bg:'white',
    color:'exBlack'
}

const SocialButtomGroup = () => {
    return (
        <Stack
            as="nav"
            mt="2rem"
            direction="row"
            align="center"
            justify={{ base: 'start' }}
            spacing={{ base: '1rem', md: '2.25rem' }}
        >
            <Stack
                as={Link}
                title="Instagram"
                p='6px'
                _hover={activeState}
                _active={activeState}
                href={instagramUrl}
            >
                <InstagramIcon w="24px" h="24px" />
            </Stack>
            <Stack
                as={Link}
                title="Tiktok"
                p='6px'
                _hover={activeState} 
                _active={activeState} 
                href={tiktokUrl}>
                <TiktokIcon w="24px" h="24px"/>
            </Stack>
            <Stack
                as={Link}
                title="Twitter"
                p='6px'
                _hover={activeState} 
                _active={activeState} 
                href={twitterUrl}>
                <TwitterIcon w="24px" h="24px" />
            </Stack>
            <Stack
                as={Link}
                title="LinkedIn"
                p='6px'
                _hover={activeState}
                _active={activeState}
                href={linkedInUrl}
            >
                <LinkInIcon w="24px" h="24px" />
            </Stack>
            <Stack
                as={Link}
                title="Youtube"
                p='6px'
                _hover={activeState} 
                _active={activeState} 
                href={youtubeUrl}>
                <YoutubeIcon w="24px" h="24px" />
            </Stack>
        </Stack>
    )
}
export default SocialButtomGroup;
