"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {useTranslations} from 'next-intl';
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import { bundleMaterial} from './actions';
import {SubmitButton} from '@/ui/buttons/submitButton';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useState} from 'react';

const initialFormValues = {
    material: "",
    numberLots: 0
}

export default function Page() {
    const [state, action] = useFormState(bundleMaterial, {result: null});
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

    const canSubmit = fieldValues.material !== "0" && fieldValues.numberLots

    return (
        <PageLayout title={t("bundle-material-title")}>
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
                            name="numberLots"
                            decimals={2}
                            min={0} max={5000}
                            label={t("numberLots")}
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
