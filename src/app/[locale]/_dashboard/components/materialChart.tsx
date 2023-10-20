'use client'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from "recharts"
import {useTranslations} from 'next-intl';
export interface DataItem {
    name: string;
    unbundled: number;
    lots: number;
    sold: number
}
interface Props {
    data : DataItem[]
}

export const MaterialChart = ({data} : Props) => {
    const t = useTranslations('dashboard.chart')
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" label={{ value: t("tons"), position: "insideLeft", angle: -90}}/>
                <YAxis yAxisId="right" orientation="right" label={{ value: t("tons"), position: "insideRight", angle: -270}}/>
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="lots" stackId="a" fill="#93c5fd" name={t("lots")}/>
                <Bar yAxisId="left" dataKey="unbundled" stackId="a" fill="#86efac" name={t("unbundled")}/>
                <Bar yAxisId="right" dataKey="sold" stackId="a" fill="#cecece" name={t("sold")}/>
            </BarChart>
        </ResponsiveContainer>
    )
}
