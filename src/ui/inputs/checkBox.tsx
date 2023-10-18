import {ForwardedRef, forwardRef, HtmlHTMLAttributes, useEffect, useRef, useState} from 'react';
import {useStockContracts} from '@/common/hooks/useStockContracts';

export interface CheckboxProps extends HtmlHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    onChecked: (checked: boolean) => void
    checked?: boolean
}

export const CheckBox = forwardRef(({
                                        label,
                                        error,
                                        className,
                                        onChecked,
                                        checked,
                                        ...rest
                                    }: CheckboxProps, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const ref = useRef(0);
    const [isChecked, setIsChecked] = useState(!!checked);
    useEffect(() => {
        ref.current++
    }, [])
    const id = `checkbox-${ref.current}`

    const handleClick = (e: any) => {
        setIsChecked(!isChecked)
        onChecked(!isChecked)
    }

    return (
        <div className="relative">
            <div className="flex" onClick={handleClick}>
                <input
                    id={id}
                    ref={forwardedRef}
                    type="checkbox"
                    className={`shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 ${className}`}
                    onChange={console.log}
                    {...rest}
                    checked={isChecked}
                />
                {label && <label htmlFor={id} className="text-sm text-gray-500 ml-3 dark:text-gray-400">{label}</label>}
            </div>
            {error && <div className="mt-1 text-red-600 text-xs" aria-errormessage={error}>{error}</div>}
        </div>
    )
})

CheckBox.displayName = 'CheckBox'
