"use client";

import {PageLayout} from '@/ui/layout/pageLayout';
import {FormLayout} from '@/ui/layout/formLayout';
import {useTranslations} from 'next-intl';
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa"
// @ts-ignore
import {experimental_useFormState as useFormState} from 'react-dom';
import {registerCollection} from './actions';
import {TextInputWithButton} from '@/ui/inputs/textInputWithButton';
import {DropDown} from '@/ui/inputs/dropdown';
import {NumberInput} from '@/ui/inputs/numberInput';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FormSubmitButton} from '@/ui/buttons/formSubmitButton';
import {useAppContext} from '@/common/hooks/useAppContext';
import {LedgerClientFactory, setAccountInfo} from '@signumjs/core';

const initialFormValues = {
    collector: "",
    material: "",
    quantity: 0
}

export default function Page() {
    const formRef = useRef<any>();
    const [state, action] = useFormState(registerCollection, {result: null});
    const [fieldValues, setFieldValues] = useState(initialFormValues)
    const [accountAddress, setAccountAddress] = useState<string|null>("")
    const t = useTranslations("collectors");
    const {Ledger: {DefaultNode}, CollectionMaterials} = useAppContext();

    const handleOnScanQrCode = () => {
        console.log("scan QrCode")
    }

    useEffect(() => {
        if(state.success){
            formRef.current?.reset();
            setFieldValues(initialFormValues);
            setAccountAddress("");
        }
    }, [state]);

    const ledgerInstance = useMemo(() => {
        return LedgerClientFactory.createClient({
            nodeHost: DefaultNode
        })
    }, [DefaultNode]);

    const handleOnChange = (event: any) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFieldValues({
            ...fieldValues,
            [fieldName]: fieldValue
        })
    }

    const handleCollectorChange = (event: any) => {
        if (!ledgerInstance) {
            console.warn("Ledger instance not ready yet")
            return;
        }

        const collector = event.target.value;
        ledgerInstance.account.getAccount({
            accountId: collector,
        }).then(account => {
            setAccountAddress(account.accountRS)
        }).catch(e => {
            setAccountAddress(null);
        })
    }

    const canSubmit = accountAddress && fieldValues.material !== "0" && fieldValues.quantity

    return (
        <PageLayout title={t("receive-collection-title")}>
            <FormLayout>
                <form action={action} onChange={handleOnChange} ref={formRef}>
                    <div className="gap-4 grid grid-cols-1">
                        <div className="relative">

                            <TextInputWithButton
                                name="collector"
                                placeholder={t("enter-address-or-scan")}
                                buttonLabel={t("scan-qr-code")}
                                onBlur={handleCollectorChange}
                                onClick={handleOnScanQrCode}
                                label={t("collector")}
                                // @ts-ignore
                                autoComplete="signum-account"
                                required={true}
                            />
                            {accountAddress &&
                              <div className="mt-0 text-sm text-gray-500 flex flex-row items-center">
                                <div className="mr-1 text-green-500">
                                  <FaCheckCircle/>
                                </div>
                                  {accountAddress}
                              </div>}
                            {accountAddress === null &&
                              <div className="mt-0 text-sm text-gray-500 flex flex-row items-center">
                                <div className="mr-1 text-red-500">
                                  <FaTimesCircle/>
                                </div>
                                  {t("account-not-found")}
                              </div>}
                        </div>

                        <DropDown label={t("material")} name="material">
                            <option value="0">-- Select --</option>
                            {
                                CollectionMaterials.map( material => (
                                    <option key={material.id} value={material.id}>{t(material.label)}</option>
                                ))
                            }
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
                        <FormSubmitButton label={t("confirm")} disabled={!canSubmit}/>
                        {state.error && (<p className="mt-2 text-sm text-red-500">{state.error}</p>)}
                    </div>
                </form>
            </FormLayout>
        </PageLayout>
    )
}
