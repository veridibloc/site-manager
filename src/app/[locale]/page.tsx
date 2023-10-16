'use client'

import {useTranslations} from 'next-intl';
import {PageLayout} from '@/ui/layout/pageLayout';
import {SimpleCard} from '@/ui/cards/simpleCard';
import {useMemo} from 'react';
import {useAccountData} from '@/common/hooks/useAccountData';

export default function Home() {
    const t = useTranslations("navigation");
    const {isLoading, account} = useAccountData()

    const cards = useMemo(() => {

        if(isLoading || !account){
            return [];
        }

        return [];


    }, [isLoading, account]);

    return (
        <PageLayout>
            <section className="max-w-4xl w-full mx-auto my-4 pb-4 border-b border-gray-300">
                <div className="overflow-x-auto flex flex-row justify-center gap-x-2">
                    {/*{cards.map( ({id, ...props}) => <SimpleCard key={id} {...props}/>)}*/}
                </div>
            </section>
            <h2>{t("dashboard")}</h2>
        </PageLayout>
    )
}
