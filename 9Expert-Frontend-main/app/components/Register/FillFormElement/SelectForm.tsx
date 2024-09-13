import { VStack, HStack, Heading, Select } from "@chakra-ui/react";

const SelectForm = (props : { head: string, placeholder: string, options: string[] }) => {
    return (
        <VStack align="start" mt={["3vw", "3vw", "2.5vw", "0"]} w={["100%", "100%", "100%", "100%", "100%"]}>
            <HStack>
                <Heading fontSize={["0.7em", "0.75em", "0.8em", "1em"]}>{props.head}</Heading>
                <Heading size="sm" color="red">{'*'}</Heading>
            </HStack>
            <Select size={["xs", "xs", "sm", "md"]} placeholder = {props.placeholder} bg="#f2f2f2" iconColor="transparent" borderColor="#c1c1c1" >
                {props.options.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </Select>
        </VStack>
    );
}

export default SelectForm;