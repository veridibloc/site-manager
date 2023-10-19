import {NextResponse} from 'next/server';
import {currentUser} from '@clerk/nextjs';
import {fetchDashboardData} from '@/back/fetchDashboardData';

export async function GET() {
    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", {status: 401});
    }
    const data  = await fetchDashboardData(user);
    return NextResponse.json(data);
}
