"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useRef, useState} from 'react';
import {FaCheck, FaRegEye} from 'react-icons/fa6';
import {useStockContracts} from '@/common/hooks/useStockContracts';
import {useAccountContext} from '@/common/hooks/useAccountContext';
import {Table} from '@/ui/table';
import {LotTableToolbar, ShowFilter} from './_components/lotTableToolbar';
import {useRouter} from 'next/navigation';
import {ActionButton} from '@/ui/buttons/actionButton';
import {ActionButtonGroup} from '@/ui/buttons/actionButtonGroup';


interface SoldLot {
    stockContract: string;
    lotNumber: string;
    transactionId: string;
}

export default function Page() {
    const t = useTranslations("material");
    const mounted = useRef(false);
    const router = useRouter()
    const {materials} = useAccountContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [soldLots, setSoldLots] = useState<Record<string, boolean>>({})
    const [lotFilter, setLotFilter] = useState<ShowFilter>(ShowFilter.All)
    const {isLoading: isLoadingContracts, contracts = []} = useStockContracts();

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, [])

    useEffect(() => {

        if (isLoadingContracts) return;

        const requests = contracts.map(c => c.getLotReceipts())
        Promise
            .all(requests)
            .then((receipts) => {
                if (!mounted.current) return;
                const soldLots = receipts.reduce(
                    (acc, lots, index) => {
                        for (let l of lots) {
                            acc[`${contracts[index].contractId}-${l.lotNumber}`] = true;
                        }
                        return acc
                    }, {} as Record<string, boolean>)
                setSoldLots(soldLots);
            })

    }, [contracts, isLoadingContracts]);

    const handleViewLot = (lotId: string) => {
        return router.push(`/material/lots/${lotId}`);
    }

    const rows = useMemo(() => {

        if (isLoadingContracts || !soldLots) {
            return [];
        }

        const rows = [];
        for (let material of materials) {
            const materialName = t(material.type.toLowerCase());
            const contract = contracts.find(c => c.contractId === material.stockContractId);
            if (!contract) continue;
            const {lotUnitQuantity, nextLotNumber} = contract.getData();
            for (let lotNumber = 100; lotNumber < nextLotNumber; lotNumber++) {
                const lotId = `${contract.contractId}-${lotNumber}`;
                rows.push([
                    materialName,
                    lotId,
                    `${lotUnitQuantity} kg`,
                    soldLots[lotId] ? <FaCheck/> : "",
                    <ActionButtonGroup key={`actions-${lotId}`}>
                        <ActionButton actionName="view-lot" onClick={() => handleViewLot(lotId)}>
                            <FaRegEye/>
                        </ActionButton>
                    </ActionButtonGroup>
                ])
            }
        }

        return rows;
    }, [isLoadingContracts, contracts, materials, soldLots, t]);

    const filteredRows = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return rows.filter(row => {
            let isAccepted = true;
            switch (lotFilter) {
                case ShowFilter.InStockOnly:
                    // @ts-ignore
                    isAccepted = !soldLots[row[1]];
                    break;
                case ShowFilter.SoldOnly:
                    // @ts-ignore
                    isAccepted = soldLots[row[1]];
                    break;
                case ShowFilter.All:
                default:
                    isAccepted = true

            }
            if(!searchTerm){
                return isAccepted
            }

            // @ts-ignore
            return isAccepted && (row[0].toLowerCase().includes(term) || row[1].toLowerCase().includes(term))
        })
    }, [rows, searchTerm, soldLots, lotFilter]);

    return (
        <PageLayout title={t("bale-lots-title")}>
            <section className="max-w-4xl w-full mx-auto my-4 pb-4">
                <Table
                    toolbar={<LotTableToolbar
                        onSearch={setSearchTerm}
                        onShowFilter={setLotFilter}
                        showFilter={lotFilter}
                    />
                    }
                    headers={[
                        {id: "material", content: t("material")},
                        {id: "lot-number", content: t("lot-number")},
                        {id: "lot-size", content: t("lot-size")},
                        {id: "lot-sold", content: t("lot-sold")},
                        {id: "lot-actions", content: t("lot-actions")}
                    ]}
                    rows={filteredRows}
                />
            </section>
        </PageLayout>
    )
}
