import {FaTrashCanArrowUp} from 'react-icons/fa6';
import {useFormatter, useTranslations} from 'next-intl';
import {CollectorStats} from '@/types/dashboardData';
import {LabeledTextItem} from '@/ui/labeledTextItem';
import {Table} from '@/ui/table';
import {useAppContext} from '@/common/hooks/useAppContext';
import {useMemo} from 'react';

interface Props {
    data: CollectorStats;
}

export const CollectedStatsCard = ({data}: Props) => {
    const t = useTranslations('dashboard.collection-stats');
    const {number} = useFormatter();
    const {CollectionMaterials} = useAppContext()

    const rows = useMemo(() => {
        return data.collectedMaterial.filter(m => !!CollectionMaterials[m.id])
            .map((material) => {
            const materialName = CollectionMaterials[material.id].toLowerCase();
            return [t(materialName), `${number(material.quantity/1000, {maximumFractionDigits: 3})} t`]
        })
    }, [CollectionMaterials, data.collectedMaterial, t])

    return <div
        className={`relative flex flex-col w-full border drop-shadow rounded-xl dark:border-gray-700 dark:shadow-slate-700/[.7] bg-green-100`}>
        <div className="absolute top-0 right-0 p-2">
            <FaTrashCanArrowUp className="text-green-300 text-4xl drop-shadow-none"/>
        </div>
        <div className="p-4 md:p-5">
            <h3 className="text-gray-800 uppercase font-bold dark:text-white">
                {t("collection-stats")}
            </h3>
            <div className="flex flex-col md:flex-row justify-between mt-4">

                <div>
                    <LabeledTextItem label={t('collectors-count')}
                                     text={number(data.collectorCount, {maximumFractionDigits: 0})}
                                     textClassName="text-2xl"/>
                </div>
                <div>
                    <LabeledTextItem label={t('granted-tokens')}
                                     text={number(data.grantedTokens, {maximumFractionDigits: 2})}
                                     textClassName="text-2xl"/>
                </div>
            </div>
            <div className="mt-4">
                <LabeledTextItem label={t("collected-material")} text=""/>
                <Table headers={[
                    {
                        id: 'material',
                        content: t('material')
                    },
                    {
                        id: 'quantity',
                        content: t('quantity')
                    }
                ]}
                       rows={[...rows]}
                />
            </div>
        </div>
    </div>
}
