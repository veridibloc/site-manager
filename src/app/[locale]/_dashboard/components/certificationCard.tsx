import {CertificateToken} from '@/types/dashboardData';
import {FaRecycle} from 'react-icons/fa6';
import {ChainValue} from '@signumjs/util';
import {useFormatter, useTranslations} from 'next-intl';
import certImage from "@/assets/img/cert_bg.jpg";
import Link from 'next/link';
import {useAppContext} from '@/common/hooks/useAppContext';
import Image from 'next/image';


interface Props {
    certificateToken: CertificateToken
    className?: string
}

export const CertificationCard = ({certificateToken, className = ""}: Props) => {
    const t = useTranslations("dashboard.certificate");
    const {Ledger: {ExplorerUrl}} = useAppContext();
    const {number} = useFormatter();

    const value = Number(ChainValue.create(certificateToken.decimals).setAtomic(certificateToken.quantity).getCompound())

    return (
        <Link href={`${ExplorerUrl}/asset/${certificateToken.id}`} rel="reopener noreferrer" target="_blank">
            <div
                className={`relative flex flex-col border drop-shadow rounded-xl dark:border-gray-700 dark:shadow-slate-700/[.7] bg-green-50 ${className} bg-cover`}
            >
                <div className="w-[200px] opacity-50">
                    <img className={"w-full h-auto"} src={certImage.src} alt="Certification Background"/>
                </div>
                <div className="absolute bottom-4 right-4 p-2">
                    <FaRecycle className="text-green-600/[.2] text-4xl"/>
                </div>

                <div className="absolute w-full p-4 md:p-5">
                    <div
                        className="text-xs font-serif font-light mt-2 text-gray-500 uppercase text-center">{t("certificate")}</div>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 text-2xl text-center">
                        {number(value, {minimumFractionDigits: certificateToken.decimals})}
                    </p>
                    <h3 className="text-gray-800 dark:text-white text-center font-serif font-bold">
                        {certificateToken.name}
                    </h3>
                    <div
                        className="text-[10px] font-serif font-light bottom-2 text-gray-500 text-center leading-tight">{t("proved-asset")}
                        <div>{certificateToken.id}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
