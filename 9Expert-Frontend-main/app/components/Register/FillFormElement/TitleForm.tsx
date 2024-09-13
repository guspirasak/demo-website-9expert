import { Heading, VStack } from '@chakra-ui/react'

const TitleForm = (props : { title : string, content : string }) => {
    return (
        <VStack w='full' justifyContent='center' mx='auto' mt={["6vw", "6vw", "4vw", "4vw"]} >
            <Heading fontSize={["1.2em", "1.2em", "1.5em", "2em"]} fontWeight="bold" >{props.title}</Heading>
            <Heading fontSize={["0.6em", "0.6em", "0.75em", "1em"]} color='exGray.300' fontWeight="light" >{props.content}</Heading>
        </VStack>
    );
}

export default TitleForm;