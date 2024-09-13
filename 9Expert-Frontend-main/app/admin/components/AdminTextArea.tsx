import { VStack, Textarea, Text, Box, HStack, ButtonGroup, IconButton, forwardRef } from "@chakra-ui/react";
import { TAdminTextArea } from "../interface/AdminInterface";
import { TextBoldIcon, TextItalicIcon, TextLinkIcon, TextListIcon, TextListNumberIcon, TextStrikeThroughIcon, TextUnderLineIcon } from "@/app/icons/AdminIcon";


export const AdminTextArea = forwardRef(({ children, placeholder, onBlur, onFocus, defaultValue }: TAdminTextArea, ref) => {

    return (
        <VStack
            align='start'
            spacing='0.75rem'
            w='100%'
        >
            <Text fontSize='lg' >{children}</Text>
            <Box
                w='100%'
                h='100%'
                position='relative'
            >
                {/* <HStack
                    w='100%'
                    h='100%'
                    position='absolute'
                    align='end'
                    bottom='3px'
                >
                    <Box
                        w='100%'
                        h='50px'
                        borderTop='1px'
                        borderColor='gray.100'
                        zIndex='2'
                    >
                        <ButtonGroup
                            h='100%'
                            alignItems='center'
                            size='sm'
                            spacing='0.25rem'
                            variant='ghost'
                        >
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextBoldIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextItalicIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextUnderLineIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextStrikeThroughIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextLinkIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextListIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                            <IconButton
                                aria-label='bold'
                                color='exGray.400'
                                icon={<TextListNumberIcon w='20px' h='20px' />}
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            />
                        </ButtonGroup>
                    </Box>
                </HStack> */}
                <Textarea
                    ref={ref}
                    minH='152px'
                    borderColor='exGray.100'
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    _placeholder={{ color: 'exGray.300' }}
                />

            </Box>
        </VStack>
    )
})