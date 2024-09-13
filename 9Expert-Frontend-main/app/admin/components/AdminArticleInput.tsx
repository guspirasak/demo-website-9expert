'use client'

import { VStack, Input, Text, forwardRef, Highlight } from "@chakra-ui/react"
import { TAdminInput } from "../interface/AdminInterface"


export const AdminArticleInput = forwardRef(({ children, placeholder, onBlur, onFocus, defaultValue, isRequired, onChange, value }: TAdminInput, ref) => {

    return (
        <VStack
            align='start'
            spacing='0.75rem'
            w='100%'
        >
            <Text fontWeight='bold' fontSize='lg' >
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
                h='60px'
                borderColor='exGray.100'
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                _placeholder={{ color: 'exGray.300' }}
            />
        </VStack>
    )
}) 