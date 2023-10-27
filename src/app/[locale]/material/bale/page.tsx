"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {useFormatter, useTranslations} from 'next-intl';
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import { baleMaterial} from './actions';
import {SubmitButton} from '@/ui/buttons/submitButton';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useEffect, useMemo, useRef, useState} from 'react';
import {SimpleCard} from '@/ui/cards/simpleCard';
import {useStockContracts} from '@/common/hooks/useStockContracts';
import {useAccountContext} from '@/common/hooks/useAccountContext';

const initialFormValues = {
    material: "",
    numberLots: 0
}

const initialErrorValues = {
    common:"",
    material: "",
    numberLots: ""
}
export default function Page() {
    const formRef = useRef<any>();
    const formatter = useFormatter();

    const [state, action] = useFormState(baleMaterial, {result: null});
    const {materials} = useAccountContext();
    const [fieldValues, setFieldValues] = useState(initialFormValues);
    const [errors, setErrors] = useState(initialErrorValues);
    const {isLoading: isLoadingContracts, contracts = []} = useStockContracts();
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
                            <div>{`${t("in-stock")}: ${formatter.number( data.stockQuantity/1000, {minimumSignificantDigits: 3})} t`}</div>
                            <div>{`${t("produced-lots")}: ${data.nextLotNumber - 100}`}</div>
                        </>
                    ),
                    sub: ''
                }
            })

    }, [isLoadingContracts, contracts, materials]);


    useEffect( () => {
        if(!contracts.length){
            return;
        }
        if (!fieldValues.material) {
            return setErrors({...errors, material: t("error-material-required")});
        }
        if (!fieldValues.material || !fieldValues.numberLots) {
            return setErrors({...errors, numberLots: t("error-number-lots-required")});
        }
        const contract = contracts.find( c => c.contractId === fieldValues.material)
        if(!contract){
            return setErrors({...errors, common: t("error-contract-not-found")});
        }
        const {stockQuantity, lotUnitQuantity} = contract.getData();

        if(fieldValues.numberLots > stockQuantity/lotUnitQuantity){
            return setErrors({...errors, numberLots: t("error-number-lots-too-high")});
        }

        setErrors(initialErrorValues);

    }, [fieldValues, contracts]);

    const canSubmit = !errors.common && !errors.material && !errors.numberLots;

    return (
        <PageLayout title={t("bale-material-title")}>
            <section className="max-w-4xl w-full mx-auto my-4 pb-4 border-b border-gray-300">
                <div className="overflow-x-auto flex flex-row justify-center gap-x-2">
                    {cards.map( ({id, ...props}) => <SimpleCard key={id} isSelected={id===fieldValues.material} {...props}/>)}
                </div>
            </section>

            <FormLayout >
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
                            name="numberLots"
                            decimals={2}
                            min={0} max={5000}
                            label={t("number-lots")}
                            required={true}
                            error={errors.numberLots}
                        />

                        <div className="mt-4 border-b border-gray-200"/>
                        <SubmitButton label={tc("confirm")} disabled={!canSubmit}/>
                    </div>
                </form>
            </FormLayout>
        </PageLayout>
    )
}
