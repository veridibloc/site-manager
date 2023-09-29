import {ChildrenProps} from '@/types/childrenProps';

export const FormLayout = ({children} : ChildrenProps) => {
    return <section className="max-w-2xl w-full lg:px-10 lg:py-10 mx-auto p-8 border border-gray-200 rounded-xl">{children}</section>
}
