'use client'
import {useTranslations} from 'next-intl';
import {PageLayout} from '@/ui/layout/pageLayout';
import {DashboardData} from '@/types/dashboardData';
import {CertificationCard} from './components/certificationCard';
import {BalanceCard} from '@/app/[locale]/_dashboard/components/balanceCard';
import useSWR from 'swr';
import {useRef} from 'react';
import {MaterialChart} from '@/app/[locale]/_dashboard/components/materialChart';

const mockedData = [
    {
        name: 'PET',
        inStockKg: 1345,
        lotsKg: 2400,
        soldLotsKg: 12465,
    },
    {
        name: 'PE',
        inStockKg: 345,
        lotsKg: 400,
        soldLotsKg: 1465,
    },
    {
        name: 'PVC',
        inStockKg: 765,
        lotsKg: 1250,
        soldLotsKg: 8754,
    },
]

interface Props{
    data: DashboardData
}
export function DashboardPage({data} : Props) {
    const initialLoad = useRef(0)
    const t = useTranslations("navigation");


    const {data: refreshedData} = useSWR('dashboard', async () => {
        console.log('refreshing', initialLoad.current)
        if(initialLoad.current === 0){
            initialLoad.current += 1;
            return null;
        }
        const response  = await fetch('/api/dashboard')
        if(response.ok){
            const data = await response.json()
            return data as DashboardData;
        }
    }, {
        refreshInterval: 120_000,
    })

    const {certificateTokens, balance} = refreshedData ?? data

    // const {isLoading, account} = useAccountData()

    return (
        <PageLayout>
            <section className="w-full mx-auto my-4 p-4 border border-gray-300 rounded">
                <div className="flex flex-row justify-around py-4 gap-x-2">
                    {certificateTokens.map( (cert) => <CertificationCard key={cert.id} certificateToken={cert}/>)}
                    <BalanceCard balance={balance}/>
                </div>
            </section>
            <section className="w-full my-4 p-4 border border-gray-300 rounded h-[40vh] w-full lg:w-3/4 xl:w-1/2">
               <MaterialChart data={mockedData} />
            </section>
        </PageLayout>
    )
}
