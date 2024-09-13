import '@fontsource/kanit'
import '@fontsource/inter'

import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
import { withProse } from "@nikolovlazar/chakra-ui-prose"

const styles = {
    global: (props: object) => ({
        body: {
            bg: mode('#FFFFFF', '#23262A')(props)
        },
        '.swiper-scrollbar': {
            '&-horizontal': {
                backgroundColor: mode('rgba(23, 23, 23, 0.1)', '#FFFFFF')(props)
            },
        },
        '::selection': {
            backgroundColor: mode('#19B5FE', '#0B345D')(props),
            color: '#FFFFFF'
        },
    })
}

const components = {
    Progress: {
        baseStyle: {
            filledTrack: {
                bg: '#FEC84B'
            }
        }
    },
}

const config = {
    initialColorMode: 'system',
    useSystemColorMode: true,
}

const AdminColor = {
    exAdminBlack: 'rgba(46, 46, 46, 1)',
    exAdminOnlineBg: '#0B345D',
    exStarYellow: '#FEC84B',
    exDarkStarYellow: '#FFC62B'
}

const GraphColor = {
    exGraphBlue: {
        500: '#266EF5',
        300: '#19B5FE',
        100: '#C5DCFA'
    }
}

const MainColor = {
    exBlue: '#19B5FE',
    exYellow: '#FFC62B',
    exBlack: '#27292B',
    exGray: {
        600: '#F7F7F7',
        500: '#7D7D7D',
        400: 'rgba(110, 116, 133, 1)',
        300: 'rgba(140, 148, 163, 1)',
        100: 'rgba(233, 234, 240, 1)'
    },
    exLightBlue: 'rgba(25, 181, 254, 0.2)',
    exDarkBlue: {
        900: '#0B345D',
        300: '#1CA7EC',
        100: '#C5DCFA'
    },
    exMidBlue: '#3A86FF',
    exAdminBackground: 'rgba(244, 247, 254, 1)',
    exTechnologyArea: 'rgba(93, 139, 244, 1)'
}

const statusColor = {
    statGreen: 'rgba(54, 179, 126, 1)',
    statOrange: 'rgba(254, 200, 75, 1)',
    statRed: 'rgba(163, 54, 57, 1)',
}

const textColor = {
    textPurple: 'rgba(83, 95, 232, 1)',
}

const tagColor = {
    tagPurple: 'rgba(222, 224, 250, 0.5)',
}

export const containerBreakpoints = { base: '100%', lg: '90%', '4xl': '1920px' }

const colors = {
    ...AdminColor,
    ...MainColor,
    ...statusColor,
    ...textColor,
    ...tagColor,
    ...GraphColor
}

const fonts = {
    body: "Kanit, sans-serif",
    heading: "Kanit, sans-serif",
    mono: "Kanit, sans-serif",
}

const textStyles = {
    english: {
        fontFamily: 'Inter, sans-serif',
    },
    thai: {
        fontFamily: 'Kanit, sans-serif',
    }
}

const breakpoints = {
    sm: '375px',
    'sm-1': '425px',
    md: '768px',
    lg: '960px',
    xl: '1024px',
    'xl-1': '1210px',
    '2xl': '1360px',
    '3xl': '1440px',
    '4xl': '1920px',
    '5xl': '2560px',
}

const shadows = {
    'exBlue': '0px 0px 18px -10px #19B5FE',
}

export const theme = extendTheme({
    breakpoints,
    colors,
    config,
    fonts,
    styles,
    components,
    shadows,
    textStyles
}, withProse())