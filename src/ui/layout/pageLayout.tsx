import {ChildrenProps} from '@/types/childrenProps';

export const PageLayout = ({children}: ChildrenProps) => {
    return <section className="bg-white drop-shadow-xl pr-6 rounded-2xl" style={{height: "calc(100vh - 5rem)"}}>
        <div className="p-6">
            {children}
        </div>
    </section>
}
