import {ChildrenProps} from '@/types/childrenProps';

interface Props extends ChildrenProps{
    title?: string;
}
export const PageLayout = ({children, title}: Props) => {
    return <section className="bg-white drop-shadow-xl rounded-2xl" style={{height: "calc(100vh - 5rem)"}}>
        {title && <div className="p-6 mx-auto bg-blue-500 rounded-t-2xl text-white text-xl text-center">{title}</div>}
        <div className="p-6 mx-auto">
            {children}
        </div>
    </section>
}
