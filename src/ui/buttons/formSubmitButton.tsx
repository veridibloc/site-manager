import {BaseButton, BaseButtonProps} from "./baseButton"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export const FormSubmitButton = (props: Omit<BaseButtonProps, "type">) => {
    const {pending} = useFormStatus()
    return (
        <BaseButton type="submit" loading={pending} {...props} />
    );
}
