import {ForwardedRef, forwardRef, HtmlHTMLAttributes, ReactElement, useEffect, useRef} from 'react';

export interface TextInputProps extends HtmlHTMLAttributes<HTMLInputElement> {
    label?: string;
    leadingAdornment?: ReactElement
    trailingAdornment?: ReactElement
}

export const TextInput = forwardRef(({
                                         label,
                                         className,
                                         trailingAdornment,
                                         leadingAdornment,
                                         ...rest
                                     }: TextInputProps, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const ref = useRef(0);
    useEffect(() => {
        ref.current++
    }, [])

    const id = `text-input-${ref.current}`
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium mb-2 dark:text-white">{label}</label>}
            <div className="relative">
            <input
                id={id}
                ref={forwardedRef}
                type="text"
                className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${className}`}
                {...rest}

            />
            {leadingAdornment &&
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none z-20 pl-4">
                  {leadingAdornment}
              </div>}
            {trailingAdornment &&
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none z-20 pl-4">
                  {trailingAdornment}
              </div>}
            </div>
        </div>
    )
})

TextInput.displayName = 'TextInput'
