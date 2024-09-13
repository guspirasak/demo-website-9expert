import { theme } from '@/config/theme'
import { ColorModeScript } from '@chakra-ui/react'
import { description, title } from '@/config/metadata'

import type { Metadata } from 'next'
import { CustomProvider } from '../providers/CustomProvider'

import './globals.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import '@mdxeditor/editor/style.css'
import 'swiper/css/bundle'
import Script from 'next/script'

export const metadata: Metadata = {
    title: title,
    description: description,
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <html lang="th" >
            <head>
                <link rel="icon" href="/logo/favicon.png" sizes="any" />
                <Script type="text/javascript" src="https://cookiecdn.com/cwc.js" />
                <Script id="cookieWow" type="text/javascript" src="https://cookiecdn.com/configs/dZqYMN15KyMPLgb4Smgy1aYc" data-cwcid="dZqYMN15KyMPLgb4Smgy1aYc" />
            </head>
            <body>
                <CustomProvider>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    {children}
                </CustomProvider>
            </body>
        </html>
    )
}
