'use client'

import { Container, Stack} from "@chakra-ui/react"
import { ChartIcon, GroupUserIcon } from "@/app/icons/AdminIcon"
import { useEffect, useState } from "react"
import { TUserRegister } from "../interface/AdminInterface"
import { getAllUserRegister, getUserRegisterByFilter } from "@/libs/AdminAPI"
import * as XLSX from 'xlsx'
import moment from "moment"
import saveAs from "file-saver"

import { useSearchParams } from "next/navigation"
import { DashboardCardShow } from "../components/dashboard/DashboardCardShow"
import { DashboardCardTab } from "../components/dashboard/DashboardCardTab"
import { DashboardTableInhouse } from "../components/dashboard/DashboardTableInhouse"
import { DashboardTablePublic } from "../components/dashboard/DashboardTablePublic"
import { DashboardDetailUserInhouse } from "../components/dashboard/DashboardDetailUserInhouse"
import { DashboardDetailUserPublic } from "../components/dashboard/DashboardDetailUserPublic"

type ViewerStatistics = {
    ageLessThan20: number
    age20to39: number
    ageGreaterThan40: number
};

export const AdminDashboard = () => {

    const [state, setState] = useState<TUserRegister>({
        public: 0,
        inhouse: 0,
        total: 0,
        course: 0
    })

    const [filter, setFilter] = useState<string>('monthly')

    // const [ graphData, setGraphData ] = useState<IGraphData[]>([])

    const viewerData: ViewerStatistics = {
        ageLessThan20: 8000,
        age20to39: 10000,
        ageGreaterThan40: 2000,
    }

    const changePath = (newPath: string) => {
        console.log(newPath);
    }
    
        
    const filterRender = () => {
        switch (filter) {
        case 'yearly':
            return 'รายปี'
        case 'monthly':
            return 'รายเดือน'
        case 'daily':
            return 'รายวัน'
        default:
            return 'รายปี'
        }
    }

    const textFilterRender = () => {
        switch (filter) {
        case 'yearly':
            return `จำนวนนักเรียน ตั้งแต่ ${moment().subtract(5, 'year').format('YYYY')} ถึง ${moment().format('YYYY')}`
        case 'monthly':
            return `จำนวนนักเรียน ตั้งแต่ Jan ${moment().format('YYYY')} ถึง Dec ${moment().format('YYYY')}`
        case 'daily':
            return `จำนวนนักเรียน ตั้งแต่ 1 ${moment().format('MMM')} ถึง ${moment().endOf('month').format('DD')} ${moment().format('MMM')}`
        default:
            return `จำนวนนักเรียน ตั้งแต่ Jan ${moment().format('YYYY')} ถึง Dec ${moment().format('YYYY')}`
        }
    }

    useEffect(() => {
        getAllUserRegister((data: TUserRegister, error: unknown) => {
            if (error) console.log(error)
            setState(data)
        })
    }, [])

    useEffect(() => {
        // getUserRegisterByFilter(filter, (data: IGraphData[], error: unknown) => {
        //     if (error) console.log(error)
        //     if (filter === 'yearly') {
        //         setGraphData(data.reverse())
        //         return 
        //     }
        //     if (filter === 'monthly') {
        //         const newData = data.map((item) => {
        //             return {
        //                 ...item,
        //                 label: moment(item.label).format('MMM')
        //             }
        //         })

        //         setGraphData(newData)
        //     }

        //     if (filter === 'daily') {
        //         setGraphData(data)
        //     }
        // })
    }, [filter])

    const handleDownloadReport = () => {
        
        const worksheet = XLSX.utils.json_to_sheet<TUserRegister>([state])
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })

        saveAs(blob, "Report.xlsx")

        console.log('download report')
    }

    const subTabName = useSearchParams().get('sub')
    
    const isInhouse :boolean = subTabName === 'inhouse'
    const isDetailPage: boolean = useSearchParams().has('detail')

    let renderDetailPage:Function = () => null;
    if(isDetailPage){
        renderDetailPage = () => {
            if(isInhouse){
                return <DashboardDetailUserInhouse />
            }else{
                return <DashboardDetailUserPublic />
            }
        }
    }

    return (
        <Container
            my='2rem'
            maxW='95%'
            h='max-content'
            borderRadius='20px'
        >
            {isDetailPage?(renderDetailPage()):
                (
                    <Stack
                        direction='column'
                        w='100%'
                        spacing='2rem'
                    >
                        <Stack
                            direction='row'
                            w='100%'
                            align='center'
                            justify='space-between'
                            spacing='2rem'
                            gap='1rem'
                        >
                            <DashboardCardTab
                                isLink={true}
                                href='/admin?tab=dashboard'
                                title='จำนวนผู้ลงทะเบียน Public'
                                // icon={<ShoppingCartIcon w='60px' h='60px' color='white' />}
                                icon={<GroupUserIcon w='35px' h='35px' color={!isInhouse?'exBlue':'white'} />}

                                // bgColor={subTabName !='inhouse' ? '#65C1FF' : 'white'}
                                isActive={!isInhouse}
                            />
                            <DashboardCardTab
                                isLink={true}
                                href='/admin?tab=dashboard&sub=inhouse'
                                title='จำนวนผู้ลงทะเบียน Inhouse'
                                icon={<GroupUserIcon w='35px' h='35px' color={isInhouse?'exBlue':'white'} />}
                                
                                isActive={isInhouse}
                            />
                            <DashboardCardShow
                                title={`ยอดรวม ${isInhouse ? 'Inhouse' : 'Public' }`}
                                number={isInhouse ? state.inhouse : state.public}
                                icon={<ChartIcon w='35px' h='35px' color='white' />}
                            />
                            <DashboardCardShow
                                title='ยอดรวมทั้งหมด'
                                number={state.total}
                                icon={<ChartIcon w='35px' h='35px' color='white' />}
                            />
                        </Stack>

                        <Stack w='100%' bgColor={'white'} px='2rem' py='1.5rem' rounded='xl' >
                            {isInhouse?<DashboardTableInhouse />:<DashboardTablePublic />}
                        </Stack>
                    </Stack>
                )
            }
        </Container>
    )
}