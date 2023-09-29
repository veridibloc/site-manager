import {ChildrenProps} from '@/types/childrenProps';

export const PageLayout = ({children}: ChildrenProps) => {
    return <section className="bg-white drop-shadow-xl rounded-2xl" style={{height: "calc(100vh - 5rem)"}}>
        <div className="p-6 mx-auto">
            {children}
        </div>
    </section>
}
