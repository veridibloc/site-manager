'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'


export async function registerCollection(prevState: any, formData: FormData) {

    console.log("registerCollection", formData, prevState)

    return Promise.resolve({result: "ok"})
}
