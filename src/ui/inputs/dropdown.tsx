import {HtmlHTMLAttributes, useEffect, useRef} from 'react';


interface Props extends HtmlHTMLAttributes<HTMLSelectElement> {
    label?: string
    name?: string
}

export const DropDown = ({children, className = "", label, name, ...rest}: Props) => {
    const ref = useRef(0);
    useEffect(() => {
        ref.current++
    }, [])

    const id = `dropdown-${ref.current}`
    return <div>
        {label && <label htmlFor={id} className="block text-sm font-medium mb-2 dark:text-white">{label}</label>}
        <select id={id}
                name={name}
                className={`py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${className}`}
                {...rest}
        >
            {children}
        </select>
    </div>
}
