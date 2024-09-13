'use client'

import { Box, HStack, useBreakpointValue } from "@chakra-ui/react"
import { MaximumLine } from "./BarGraphComponent/MaximumLine"
import { BackgroundLine } from "./BarGraphComponent/BackgroundLine"
import { Bar } from "./BarGraphComponent/Bar"

export interface IGraphData {
    label: string
    public: number
    inhouse: number
}

export const BarGraph = ({ data }: { data: IGraphData[] }) => {

    const breakpoint = useBreakpointValue({
        sm: data.length / 2,
        md: data.length,
    })

    const maxRegister = Math.max(...data.map((entry) => entry.public || entry.inhouse));

    const maxChartValue = Math.ceil((1.5 * maxRegister));

    const toPercentage = (value: number) => {
        return (value / maxChartValue) * 100
    }

    return (
        <Box
            pt='1rem'
            pb='2rem'
            px='1rem'
            position='relative'
            overflowX='auto'
            overflowY='hidden'
        >
            <MaximumLine value={maxChartValue} />
            <BackgroundLine />
            <HStack
                justify='space-between'
                spacing='3rem'
            >
                {
                    data.slice(0, breakpoint).map((val, index) => (
                        <Bar key={index} lebel={val.label} value={[toPercentage(val.public), toPercentage(val.inhouse)]} />
                    ))
                }
            </HStack>
        </Box>
    )
}