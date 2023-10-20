'use client'
import {useTranslations} from 'next-intl';
import {PageLayout} from '@/ui/layout/pageLayout';
import {DashboardData} from '@/types/dashboardData';
import {CertificationCard} from './components/certificationCard';
import {BalanceCard} from '@/app/[locale]/_dashboard/components/balanceCard';
import useSWR from 'swr';
import {useRef} from 'react';
import {MaterialChart} from '@/app/[locale]/_dashboard/components/materialChart';
import {CollectedStatsCard} from '@/app/[locale]/_dashboard/components/collectedStatsCard';

const mockedData = {
        grantedTokens: 18.67,
        collectorCount: 22,
        collectedMaterial: [
            {
                id: 1,
                name: "plastic",
                quantity: 187
            }
        ],
    }

interface Props {
    data: DashboardData
}

export function DashboardPage({data}: Props) {
    const initialLoad = useRef(0)
    const t = useTranslations("navigation");


    const {data: refreshedData} = useSWR('dashboard', async () => {
        console.log('refreshing', initialLoad.current)
        if (initialLoad.current === 0) {
            initialLoad.current += 1;
            return null;
        }
        const response = await fetch('/api/dashboard')
        if (response.ok) {
            const data = await response.json()
            return data as DashboardData;
        }
    }, {
        refreshInterval: 120_000,
    })

    const {certificateTokens, balance, chartData} = refreshedData ?? data

    // const {isLoading, account} = useAccountData()

    return (
        <PageLayout>
            <section className="w-full mx-auto my-4 p-4 border border-gray-300 rounded">
                <div className="flex md:flex-row flex-col justify-around py-4 gap-x-2">
                    {certificateTokens.map((cert) => <CertificationCard key={cert.id} certificateToken={cert}/>)}
                    <BalanceCard balance={balance}/>
                </div>
            </section>
            <section className="w-full my-4 flex flex-col md:flex-row gap-x-4 h-auto">
                <div className="w-full p-4 border border-gray-300 rounded lg:w-3/4 xl:w-1/2">
                    <MaterialChart data={chartData}/>
                </div>
                <div className="w-full p-4 border border-gray-300 rounded lg:w-3/4 xl:w-1/2">
                    <CollectedStatsCard data={data.collectorStats}/>
                </div>
            </section>
        </PageLayout>
    )
}
