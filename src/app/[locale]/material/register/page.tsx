"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {useTranslations} from 'next-intl';
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import {registerMaterial} from './actions';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useAccountContext} from '@/common/hooks/useAccountContext';
import {FormSubmitButton} from '@/ui/buttons/formSubmitButton';
import {useStockContracts} from '@/common/hooks/useStockContracts';
import {SimpleCard} from '@/ui/cards/simpleCard';
import {useFormatter} from 'next-intl'


const initialFormValues = {
    material: "",
    quantity: 0
}

export default function Page() {
    const formRef = useRef<any>();
    const formatter = useFormatter();

    const [state, action] = useFormState(registerMaterial, {result: null});
    const {materials} = useAccountContext();
    const {isLoading: isLoadingContracts, contracts = []} = useStockContracts();
    const [fieldValues, setFieldValues] = useState(initialFormValues)
    const t = useTranslations("material");
    const tc = useTranslations("common");

    useEffect(() => {
        if(state.success){
            formRef.current?.reset();
            setFieldValues(initialFormValues);
        }
    }, [state]);

    const handleOnChange = (event: any) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFieldValues({
            ...fieldValues,
            [fieldName]: fieldValue
        })
    }


    const cards = useMemo(() => {

        const materialMap = materials.reduce((map, m) => {
            map[m.stockContractId] = t(m.type.toLowerCase());
            return map
        }, {} as Record<string, string>)

        if (isLoadingContracts) {
            return Object.entries(materialMap).map(([key, value]) => {
                return {
                    id: key,
                    title: value,
                    content: '',
                    sub: ''
                }
            })
        }

        return contracts
            .filter((contract) => !!materialMap[contract.contractId])
            .map((contract) => {
                const data = contract.getData();
                return {
                    id: contract.contractId,
                    title: materialMap[contract.contractId],
                    content: (
                        <>
                            <span>{`${t("in-stock")}: ${formatter.number( data.stockQuantity/1000, {minimumSignificantDigits: 3})} t`}</span>
                        </>
                    ),
                    sub: ''
                }
            })

    }, [isLoadingContracts, contracts, materials]);

    const canSubmit = fieldValues.material !== "0" && fieldValues.quantity > 0

    return (
        <PageLayout title={t("register-incoming-material-title")}>

            <section className="max-w-4xl w-full mx-auto my-4 pb-4 border-b border-gray-300">
                <div className="overflow-x-auto flex flex-row justify-center gap-x-2">
                    {cards.map( ({id, ...props}) => <SimpleCard key={id} isSelected={id===fieldValues.material} {...props}/>)}
                </div>
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
