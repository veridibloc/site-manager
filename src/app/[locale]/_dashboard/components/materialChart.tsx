import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from "recharts"


interface DataItem {
    name: string;
    inStockKg: number;
    lotsKg: number;
    soldLotsKg: number;
}
interface Props {
    data : DataItem[]
}

export const MaterialChart = ({data} : Props) => {
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="soldLotsKg" stackId="a" fill="#acacac " />
                <Bar dataKey="lotsKg" stackId="a" fill="#1fd4ff" />
                <Bar dataKey="inStockKg" stackId="a" fill="#00ff3d" />
            </BarChart>
        </ResponsiveContainer>
    )
}
