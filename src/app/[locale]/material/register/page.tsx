"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {useTranslations} from 'next-intl';
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import { registerMaterial} from './actions';
import {SubmitButton} from '@/ui/buttons/submitButton';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useState} from 'react';

const initialFormValues = {
    material: "",
    quantity: 0
}

export default function Page() {
    const [state, action] = useFormState(registerMaterial, {result: null});
    const [fieldValues, setFieldValues] = useState(initialFormValues)
    const t = useTranslations("material");
    const tc = useTranslations("common");


    const handleOnChange = (event: any) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFieldValues({
            ...fieldValues,
            [fieldName]: fieldValue
        })
    }

    const canSubmit = fieldValues.material !== "0" && fieldValues.quantity

    return (
        <PageLayout>
            <h2>Register Material</h2>
            <FormLayout>
                <form action={action} onChange={handleOnChange}>
                    <div className="gap-4 grid grid-cols-1">
                        <DropDown label={t("material")} name="material">
                            <option value="0">-- Select --</option>
                            <option value="1">Plastic</option>
                            <option value="2">Glass</option>
                            <option value="3">Paper</option>
                        </DropDown>

                        <NumberInput
                            // @ts-ignore
                            name="quantity"
                            decimals={2}
                            min={0} max={5000}
                            label={t("quantity")}
                            trailingAdornment={<span className="text-gray-400">{"kg"}</span>}
                            required={true}
                        />

                        <div className="mt-4 border-b border-gray-200"/>
                        <SubmitButton label={tc("confirm")} disabled={!canSubmit}/>
                    </div>
                </form>
            </FormLayout>
        </PageLayout>
    )
}
