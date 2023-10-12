"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {useTranslations} from 'next-intl';
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import {registerMaterial} from './actions';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useEffect, useRef, useState} from 'react';
import {useAccountContext} from '@/common/hooks/useAccountContext';
import {FormSubmitButton} from '@/ui/buttons/formSubmitButton';
import {useStockContracts} from '@/common/hooks/useStockContracts';
import {CardGroup} from '@/ui/cards/cardGroup';


const initialFormValues = {
    material: "",
    quantity: 0
}

export default function Page() {
    const formRef = useRef<any>();
    const [state, action] = useFormState(registerMaterial, {result: null});
    const {materials} = useAccountContext();
    const {isLoading: isLoadingContracts, contracts} = useStockContracts();
    const [fieldValues, setFieldValues] = useState(initialFormValues)
    const t = useTranslations("material");
    const tc = useTranslations("common");


    console.log("PAGE contracts", contracts)

    useEffect(() => {
        state.success && formRef.current && formRef.current.reset();
    }, [state]);

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

            <section className="max-w-2xl w-full mx-auto my-4">
                <CardGroup />
            </section>

            <FormLayout>
                <form ref={formRef} action={action} onChange={handleOnChange}>
                    <div className="gap-4 grid grid-cols-1">
                        <DropDown label={t("material")} name="material">
                            <option value="0">-- Select --</option>
                            {
                                materials.map((material) => {
                                    return <option key={material.stockContractId}
                                                   value={material.stockContractId}>{t(material.type.toLowerCase())}</option>
                                })
                            }
                        </DropDown>

                        <NumberInput
                            // @ts-ignore
                            name="quantity"
                            decimals={2}
                            min={0} max={10_000}
                            label={t("quantity")}
                            trailingAdornment={<span className="text-gray-400">{"kg"}</span>}
                            required={true}
                        />

                        <div className="mt-4 border-b border-gray-200"/>
                        <FormSubmitButton label={tc("confirm")} disabled={!canSubmit}/>
                    </div>
                </form>
            </FormLayout>
        </PageLayout>
    )
}
