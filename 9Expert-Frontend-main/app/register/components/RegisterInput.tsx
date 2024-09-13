'use client'

import { Input, Stack, forwardRef, Text, HStack, Select, Textarea, useColorModeValue } from "@chakra-ui/react"
import { TRegisterInput, TRegisterSelect } from "../interfaces/RegisterInterface"

export const RegisterInput = forwardRef(({ children, placeholder, onBlur, onFocus, value, isRequired, type, defaultValue, onChange, isInvalid }: TRegisterInput, ref) => {

    return (
        <Stack
            w='100%'
            h='100%'
        >
            <HStack
                w='100%'
            >
                <Text
                    textColor='#2E2E2E'
                    fontSize={{ base: '1rem', lg: '1.5rem' }}

                >
                    {children}
                </Text>
                {
                    isRequired &&
                    <Text
                        fontSize={{ base: '1rem', lg: '1.5rem' }}

                        textColor='#FF4040'
                    >
                        {`*`}
                    </Text>
                }
            </HStack>
            <Input
                aria-label={placeholder}
                ref={ref}
                variant='outline'
                h={{ base: '40px', lg: '80px' }}
                w='100%'
                px='20px'
                borderRadius='10px'
                borderColor='#C1C1C1'
                type={type}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
                isInvalid={isInvalid}
                errorBorderColor="crimson"
                fontSize={{ base: '1rem', lg: '1.5rem' }}
                _hover={{
                    borderColor: '#1CA7EC'
                }}
                _placeholder={{
                    fontSize: { base: '1rem', lg: '1.5rem' },
                    color: '#B6B6B6'
                }}
            />
        </Stack>
    )
})

export const RegisterTextarea = forwardRef(({ children, placeholder, onBlur, onFocus, value, isRequired, defaultValue, onChange, isInvalid }: TRegisterInput, ref) => {

    return (
        <Stack
            w='100%'
            h='100%'
        >
            <HStack
                w='100%'
            >
                <Text
                    textColor='#2E2E2E'
                    fontSize={{ base: '1rem', lg: '1.5rem' }}

                >
                    {children}
                </Text>
                {
                    isRequired &&
                    <Text
                        fontSize={{ base: '1rem', lg: '1.5rem' }}

                        textColor='#FF4040'
                    >
                        {`*`}
                    </Text>
                }
            </HStack>
            <Textarea
                aria-label={placeholder}
                ref={ref}
                h='192px'
                w='100%'
                py='28px'
                px='20px'
                borderRadius='10px'
                borderColor='#C1C1C1'
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                defaultValue={defaultValue}
                value={value}
                isInvalid={isInvalid}
                errorBorderColor="crimson"
                fontSize={{ base: '1rem', lg: '1.5rem' }}
                _placeholder={{
                    fontSize: { base: '1rem', lg: '1.5rem' },
                    color: '#B6B6B6'
                }}
                _hover={{
                    borderColor: '#1CA7EC'
                }}
            />
        </Stack>
    )
})

export const RegisterSelect = ({ children, placeholder, onChange, value, isRequired, heading, isInvalid, isDisabled }: TRegisterSelect) => {

    return (
        <Stack
            w='100%'
            h='100%'
        >
            <HStack
                w='100%'
            >
                <Text
                    textColor='#2E2E2E'
                    fontSize={{ base: '1rem', lg: '1.5rem' }}

                >
                    {heading}
                </Text>
                {
                    isRequired &&
                    <Text
                        fontSize={{ base: '1rem', lg: '1.5rem' }}

                        textColor='#FF4040'
                    >
                        {`*`}
                    </Text>
                }
            </HStack>
            <Select   
                color={useColorModeValue('black', 'gray.300')}
                aria-label={heading}
                h={{ base: '40px', lg: '80px' }}
                w='100%'
                borderRadius='10px'
                borderColor='#C1C1C1'
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                errorBorderColor="crimson"
                fontSize={{ base: '1rem', lg: '1.5rem' }}
                _placeholder={{
                    fontSize: { base: '1rem', lg: '1.5rem' },
                    textColor: 'white'
                }}
                _hover={{
                    borderColor: '#1CA7EC'
                }}
            >
                {children}
            </Select>
        </Stack>
    )
}