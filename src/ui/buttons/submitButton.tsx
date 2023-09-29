import {BaseButton, BaseButtonProps} from "./baseButton"

export const SubmitButton = (props: Omit<BaseButtonProps, "type">) => (
    <BaseButton type="submit" {...props} />
);
