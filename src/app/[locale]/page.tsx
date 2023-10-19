import {DashboardPage} from './_dashboard/dashboardPage';
import {fetchDashboardData} from '@/back/fetchDashboardData';
import {currentUser} from '@clerk/nextjs';
import {notFound} from 'next/navigation';

export const revalidate = 120;


export default async function Page() {
    const user = await currentUser();

    if (!user) {
        return notFound();
    }

    const data  = await fetchDashboardData(user)
    return (
        <DashboardPage data={data}/>
    )
}
