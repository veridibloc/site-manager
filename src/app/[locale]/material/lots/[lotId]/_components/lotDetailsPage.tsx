'use client';

import {PageLayout} from '@/ui/layout/pageLayout';
import {DateTimeFormatOptions, useFormatter, useTranslations} from 'next-intl';
import {useAppContext} from '@/common/hooks/useAppContext';
import QRCode from "react-qr-code";
import {useAccountContext} from '@/common/hooks/useAccountContext';
import {Transaction} from '@signumjs/core';
import {ChainTime, convertHexEndianess, convertHexStringToDecString} from '@signumjs/util';
import {Table} from '@/ui/table';
import {useMemo} from 'react';
import {FaFingerprint, FaRegEye} from "react-icons/fa6"
import {ActionButtonGroup} from '@/ui/buttons/actionButtonGroup';
import {ActionButton} from '@/ui/buttons/actionButton';
import Link from 'next/link';
// import {useRouter} from 'next/navigation';

interface TextItemProps {
    label: string
    text: string
}

const TextItem = ({text, label} : TextItemProps) => {

    return (
        <div className="relative">
            <label htmlFor={`ti-${label}`} className="text-xs dark:text-gray-300 text-gray-500">{label}</label>
            <p id={`ti-${label}`} className="dark:text-gray-200 text-gray-700">{text}</p>
        </div>
    )
}


export interface LotDetailsData {
    lotNumber: string;
    lotWeight: number;
    stockContractId: string;
    lotTransaction: Transaction;
    materialTransactions: Transaction[],
    receiptTransaction: Transaction | null;
}

interface Props {
    data: LotDetailsData
}

const DateOptions : DateTimeFormatOptions = {
    year: "numeric",
        month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
}

function extractQuantity(transaction: Transaction): number {
    const msg = transaction.attachment.message;
    if(!msg) return 0;
    const hex = msg.substring(16, 32); // 2nd argument
    const nstr = convertHexStringToDecString(convertHexEndianess(hex));
    return Number(nstr);
}
export const LotDetailsPage = ({data}: Props) => {
    const t = useTranslations("material");
    const tc = useTranslations("common");
    const {number, dateTime} = useFormatter()
    const {Ledger: {ExplorerUrl}} = useAppContext();
    const {materials} = useAccountContext();
    const {lotNumber, receiptTransaction, materialTransactions, stockContractId, lotTransaction, lotWeight} = data;

    const materialName = t(materials.find(m => m.stockContractId === stockContractId)?.type.toLowerCase());
    const lotId = `${stockContractId}-${lotNumber}`;
    const creationDate = dateTime(ChainTime.fromChainTimestamp(lotTransaction.timestamp).getDate(), DateOptions)
    const soldDate = receiptTransaction ? dateTime(ChainTime.fromChainTimestamp(receiptTransaction?.timestamp).getDate(), DateOptions) : "-";

    const rows = useMemo(() => {
        return materialTransactions.map( t => ([
                t.transaction,
                `${number(extractQuantity(t))} kg`,
                dateTime(ChainTime.fromChainTimestamp(t.timestamp).getDate(), DateOptions),
                <ActionButtonGroup key={`actions-${t.transaction}`}>
                    <Link href={`${ExplorerUrl}/tx/${t.transaction}`} rel="noopener noreferrer" target="_blank">
                    <ActionButton actionName="view-proof" onClick={() => {}}>
                        <FaFingerprint />
                    </ActionButton>
                    </Link>
                </ActionButtonGroup>

            ])
        )
    }, [materialTransactions]);

    return (
        <PageLayout title={t('lot-details', {id: lotId})}>
            <div className="flex flex-col gap-x-4 gap-y-2 max-w-6xl mx-auto">
                <section className="flex flex-row items-start w-full gap-x-4">
                    <div className="relative flex flex-col border-gray-300 border rounded">
                        <small className="absolute top-1 left-[calc(25%_-_10px)] text-xs dark:text-gray-300 text-gray-500 mx-auto">{lotId}</small>
                        <QRCode
                            className="p-6"
                            value={lotId}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2 border-gray-300 border rounded p-4">
                        <div>
                            <TextItem label={t("material")} text={materialName}/>
                        </div>
                        <div>
                            <TextItem label={t("weight")} text={`${number(lotWeight)} kg` }/>
                        </div>
                        <div>
                            <TextItem label={t("creation-date")} text={creationDate}/>
                        </div>
                        <div>
                            <TextItem label={t("lot-sold")} text={soldDate}/>
                        </div>
                    </div>
                </section>
                <section className="border rounded border-gray-300 relative px-4 py-8 mt-4">
                    <div className="absolute text-xs top-[-8px] bg-white dark:bg-gray-800 text-gray-500 px-1">{t("lot-composition")}</div>

                    <Table rows={rows} headers={
                        [
                            { id: "transaction", content: t("proof")},
                            { id: "quantity", content: t("quantity")},
                            { id: "date", content: t("separation-date")},
                            { id: "actions", content: tc("actions")},
                        ]
                    }/>
                </section>
            </div>
        </PageLayout>
    )
}
