import {ChildrenProps} from '@/types/childrenProps';


interface Props extends ChildrenProps {
    actionName: string;
    onClick: (actionName: string) => void
}

export const ActionButton = ({actionName, children, onClick}: Props) => {
    return <button
        type="button"
        onClick={() => onClick(actionName)}
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
        {children}
    </button>
}
