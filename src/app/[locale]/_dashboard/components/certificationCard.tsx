import {CertificateToken} from '@/types/dashboardData';
import {FaCertificate, FaRecycle} from 'react-icons/fa6';
import {ChainValue} from '@signumjs/util';
import {useFormatter} from 'next-intl';


interface Props {
    certificateToken: CertificateToken
    className?: string
}

export const CertificationCard = ({certificateToken, className = ""}: Props) => {
    const {number} = useFormatter();

    const value = Number(ChainValue.create(certificateToken.decimals).setAtomic(certificateToken.quantity).getCompound())

    return <div
        className={`relative flex flex-col w-[200px] border drop-shadow rounded-xl dark:border-gray-700 dark:shadow-slate-700/[.7] bg-green-50 ${className}`}>
        <div className="absolute top-0 right-0 p-2">
            <FaCertificate className="text-green-300 text-4xl" />
        </div>
        <div className="absolute top-2 right-2 p-2">
            <FaRecycle className="text-green-600/[.6] text-xl" />
        </div>

        <div className="p-4 md:p-5">
            <h3 className="text-gray-800 dark:text-white">
                {certificateToken.name}
            </h3>
            <p className="mt-1 text-gray-800 dark:text-gray-400 text-2xl text-center">
                {number(value, {minimumFractionDigits: certificateToken.decimals})}
            </p>
        </div>
    </div>
}
