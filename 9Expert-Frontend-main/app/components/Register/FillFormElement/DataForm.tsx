import { Stack, HStack, VStack, Heading, Input } from "@chakra-ui/react"

const DataForm = (props : { title1 : string, title2 : string }) => {
    return (
        <Stack direction={["column", "column", "column", "row"]} w="full" justifyContent="center" mt={["3vw", "3vw", "2.5vw", "1.5vw"]} spacing={["5vw", "5vw", "5vw", "3vw"]} >
            <VStack align="start" w={["100%", "100%", "100%", "100%", "50%"]}>
                <HStack>
                    <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{props.title1}</Heading>
                    <Heading size="sm" color="red">{'*'}</Heading>
                </HStack>
                <Input size={["xs", "xs", "sm", "md"]} placeholder = {props.title1} borderColor="#c1c1c1" />
            </VStack>
            <VStack align="start" w={["100%", "100%", "100%", "100%", "50%"]}>
                <HStack>
                    <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{props.title2}</Heading>
                    <Heading size="sm" color="red">{'*'}</Heading>
                </HStack>
                <Input size={["xs", "xs", "sm", "md"]} placeholder={props.title2} borderColor="#c1c1c1" />
            </VStack>
        </Stack>
    )
}

export default DataForm;