import {ChildrenProps} from '@/types/childrenProps';

export const ActionButtonGroup = ({children}: ChildrenProps) => {
    return (
        <div className="flex flex-row gap-x-1">
            {children}
        </div>
    )
}
