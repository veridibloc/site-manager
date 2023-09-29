import {ForwardedRef, forwardRef, HtmlHTMLAttributes, MouseEventHandler, useEffect, useRef} from 'react';

interface Props extends Omit<HtmlHTMLAttributes<HTMLInputElement>, "onClick"> {
    label?: string;
    name?: string;
    buttonLabel: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const TextInputWithButton = forwardRef(({
                                                   label,
                                                   buttonLabel,
                                                   className,
                                                   onClick,
                                                   name,
                                                   ...rest
                                               }: Props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const ref = useRef(0);
    useEffect(() => {
        ref.current++
    }, [])

    const id = `text-input-button-${ref.current}`
    return (
        <div className={className}>
            {label && <label htmlFor={id} className="block text-sm font-medium mb-2 dark:text-white">{label}</label>}
            <div className="flex rounded-md shadow-sm">
                <input
                    id={id}
                    name={name}
                    ref={forwardedRef}
                    type="text"
                    className={`py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                    {...rest}
                />
                <button type="button"
                        onClick={onClick}
                        className="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
})

TextInputWithButton.displayName = 'TextInputWithButton'
