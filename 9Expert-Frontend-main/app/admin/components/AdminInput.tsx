'use client'

import { VStack, Input, Text, forwardRef, Highlight, InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/react"
import { TAdminInput, TAdminInputUrl } from "../interface/AdminInterface"


export const AdminInput = forwardRef(({
    children,
    placeholder,
    onBlur,
    onFocus,
    defaultValue,
    value,
    onChange,
    maxLength,
    isInvalid,
    isRequired,
    type,
    onWheel
}: TAdminInput, ref) => {
    return (
        <VStack
            align='start'
            spacing='0.75rem'
            w='100%'
        >
            <Text fontSize='lg'>
                {
                    isRequired ?
                        (
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`${children} *`}
                            </Highlight>
                        )
                        :
                        children
                }
            </Text>
            <Input
                ref={ref}
                type={type ? type : 'text'}
                borderColor='exGray.100'
                defaultValue={defaultValue}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                value={value}
                maxLength={maxLength}
                isInvalid={isInvalid}
                onWheel={onWheel}
                errorBorderColor='crimson'
                _placeholder={{ color: 'exGray.300' }}
            />
        </VStack>
    )
})

export const AdminInputUrl = forwardRef(({
    children,
    placeholder,
    prefix,
    subfix,
    onBlur,
    onFocus,
    defaultValue,
    value,
    onChange,
    maxLength,
    isInvalid,
    isRequired,
}: TAdminInputUrl, ref) => {
    return (
        <VStack
            align='start'
            spacing='0.75rem'
            w='100%'
        >
            <Text fontSize='lg'>
                {
                    isRequired ?
                        (
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`${children} *`}
                            </Highlight>
                        )
                        :
                        children
                }
            </Text>
            <InputGroup>
                {
                    prefix && <InputLeftAddon>{prefix}</InputLeftAddon>
                }
                <Input
                    ref={ref}
                    type='url'
                    borderColor='exGray.100'
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    value={value}
                    maxLength={maxLength}
                    isInvalid={isInvalid}
                    errorBorderColor='crimson'
                    _placeholder={{ color: 'exGray.300' }}
                />
                {
                    subfix && <InputRightAddon>{subfix}</InputRightAddon>
                }
            </InputGroup>
        </VStack>
    )
})