import {ForwardedRef, forwardRef, useEffect, useRef} from 'react';
import {TextInput, TextInputProps} from '@/ui/inputs/textInput';

interface Props extends TextInputProps {
    decimals?: number
}

export const NumberInput = forwardRef(({
                                         decimals = 2,
                                         ...props
                                     }: Props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const ref = useRef(0);
    useEffect(() => {
        ref.current++
    }, [])

    const id = `number-input-${ref.current}`

    // TODO: implement nice number formatting;

    // @ts-ignore
    return (<TextInput id={id}  {...props}/>)
})


NumberInput.displayName = 'NumberInput'
