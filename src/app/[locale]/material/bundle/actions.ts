'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'


export async function bundleMaterial(prevState: any, formData: FormData) {

    console.log("registerMaterial", formData, prevState)

    return Promise.resolve({result: "ok"})
}
