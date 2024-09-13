import { Heading, VStack, Box } from '@chakra-ui/react'

const HeadForm = (props : { title: string }) => {
    return (
        <VStack w='full' align='start' mt={["3vw", "3vw", "2.5vw", "1.5vw"]} >
            <Heading fontSize={['0.85em', '0.9em', '1.2em', '1.6em']} color='md' fontWeight="bold" >{props.title}</Heading>
            <Box
                borderBottom={["1px", "1px", "1px", "2px"]}
                borderBottomColor="#b6b6b6"
                width="100%"
            />
        </VStack>
    )
}

export default HeadForm;