import {FaRegMoneyBill1} from 'react-icons/fa6';
import {Amount} from '@signumjs/util';
import {useFormatter, useTranslations} from 'next-intl';
import {useAppContext} from '@/common/hooks/useAppContext';


interface Props {
    balance: string;
    className?: string
}

export const BalanceCard = ({balance, className = ""}: Props) => {
    const {Ledger: {Ticker}} = useAppContext()
    const t = useTranslations("dashboard.balance");
    const {number} = useFormatter();
    const value = Number(Amount.fromPlanck(balance).getSigna())
    const signa = Math.floor(value);
    const fraction = value - signa;
    return <div
        className={`relative flex flex-col w-[200px] border drop-shadow rounded-xl dark:border-gray-700 dark:shadow-slate-700/[.7] bg-blue-50 ${className}`}>
        <div className="absolute top-0 right-0 p-2">
            <FaRegMoneyBill1 className="text-blue-300 text-4xl"/>
        </div>
        <div className="p-4 md:p-5">
            <h3 className="text-gray-600 uppercase dark:text-white text-center">
                {t("credits")}
            </h3>
            <div className="leading-tight">

                <p className="mt-1 text-gray-800 dark:text-gray-400 justify-center flex flex-row items-baseline">
                    <div className="text-3xl">
                        {number(signa, {maximumFractionDigits: 4})}
                    </div>
                    <small className="text-xs">
                        {number(fraction, {maximumFractionDigits: 4}).replace('0.', '.').replace('0,', ',')}
                    </small>
                </p>
                <h3 className="text-gray-800 dark:text-white text-center">
                    {Ticker}
                </h3>
            </div>
        </div>
    </div>
}
