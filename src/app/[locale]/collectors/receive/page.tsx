"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {TextInput} from '@/ui/inputs/textInput';
import {useTranslations} from 'next-intl';
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import {registerCollection} from './actions';
import {SubmitButton} from '@/ui/buttons/submitButton';
import {TextInputWithButton} from '@/ui/inputs/textInputWithButton';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useMemo, useReducer, useState} from 'react';

const initialFormValues = {
    collector: "",
    material: "",
    quantity: 0
}

function formReducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    }
}

export default function Home() {
    const [state, action] = useFormState(registerCollection, {result: null});
    const [fieldValues, setFieldValues] = useState(initialFormValues)
    const t = useTranslations("collectors");

    console.log("state", state)

    const handleOnScanQrCode = () => {
        console.log("scan QrCode")
    }

    const handleOnChange = (event: any) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFieldValues({
            ...fieldValues,
            [fieldName]: fieldValue
        })
    }

    const canSubmit = fieldValues.collector && fieldValues.material !== "0" && fieldValues.quantity

    return (
        <PageLayout>
            <h2>Collectors Receive!</h2>
            <FormLayout>
                <form action={action} onChange={handleOnChange}>
                    <div className="gap-4 grid grid-cols-1">
                        <TextInputWithButton
                            name="collector"
                            placeholder={t("enter-address-or-scan")}
                            buttonLabel={t("scanQrCode")}
                            onClick={handleOnScanQrCode}
                            label={t("collector")}
                            // @ts-ignore
                            autoComplete="signum-account"
                            required={true}
                        />

                        <DropDown label={t("material")} name="material">
                            <option value="0">-- Select --</option>
                            <option value="1">Plastic</option>
                            <option value="2">Glass</option>
                            <option value="3">Paper</option>
                        </DropDown>

                        <NumberInput
                            name="quantity"
                            decimals={2}
                            min={0} max={5000}
                            label={t("quantity")}
                            trailingAdornment={<span className="text-gray-400">{"kg"}</span>}
                            required={true}
                        />

                        <div className="mt-4 border-b border-gray-200"/>
                        <SubmitButton label={t("confirm")} disabled={!canSubmit}/>
                    </div>
                </form>
            </FormLayout>
        </PageLayout>
    )
}
