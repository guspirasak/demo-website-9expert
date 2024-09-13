import { DarkPhoneIcon, MailIcon, DarkMailIcon, LineAtIcon, PhoneIcon, DarkLineAtIcon } from "@/app/icons/HomeIcons";
import { phoneNo, phoneNoStr, email, lineUrl, lineAt } from "@/config/contact";
import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const ContactButtomGroup = () => {
    const iconColor = useColorModeValue(true, false)

    return    (
        <>
            <Link href={`tel:${phoneNo}`} target="_blank">
                <Stack direction="row" spacing="1.125rem" alignItems="center">
                    {iconColor ? (
                        <PhoneIcon w="60px" h="60px" />
                    ) : (
                        <DarkPhoneIcon w="60px" h="60px" />
                    )}
                    <Stack spacing="sm">
                        <Text fontSize="sm">
                            Calling us
                        </Text>
                        <Text fontSize="xl" fontWeight="600">
                            {phoneNoStr}
                        </Text>
                    </Stack>
                </Stack>
            </Link>
            <Link href={`mailto:${email}`}>
                <Stack direction="row" spacing="1.125rem" alignItems="center">
                    {iconColor ? (
                        <MailIcon w="60px" h="60px" />
                    ) : (
                        <DarkMailIcon w="60px" h="60px" />
                    )}
                    <Stack spacing="sm">
                        <Text fontSize="sm">
                            Message
                        </Text>
                        <Text fontSize="xl" fontWeight="600">
                            {email}
                        </Text>
                    </Stack>
                </Stack>
            </Link>
            <Link
                href={lineUrl}
                target="_blank"
            >
                <Stack direction="row" spacing="1.125rem" alignItems="center">
                    {iconColor ? (
                        <LineAtIcon w="60px" h="60px" />
                    ) : (
                        <DarkLineAtIcon w="60px" h="60px" />
                    )}
                    <Stack spacing="sm">
                        <Text fontSize="sm">
                            Line
                        </Text>
                        <Text fontSize="xl" fontWeight="600">
                            {lineAt}
                        </Text>
                    </Stack>
                </Stack>
            </Link></>
    )
}

export default ContactButtomGroup;
