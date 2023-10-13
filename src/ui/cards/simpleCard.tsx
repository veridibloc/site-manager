import {ReactElement} from 'react';

interface Props {
    title: string | ReactElement
    content: string | ReactElement
    sub: string | ReactElement
    isLoading?: boolean
    isSelected?: boolean // TODO:
}


export const SimpleCard = ({title, content, sub, isLoading = false, isSelected = false}: Props) => {

    return (
        <div
            className={`flex flex-col w-[300px] bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] ${isSelected ? "bg-blue-400 drop-shadow" : ""}`}>
            <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {isLoading
                        ? <div className="w-full h-6 bg-gray-200 rounded-md dark:bg-gray-700"/>
                        : title
                    }
                </h3>
                <p className="mt-1 text-gray-800 dark:text-gray-400">
                    { isLoading
                        ? <div className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-700"/>
                        : content
                    }
                </p>
                <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
                    {isLoading
                        ? <div className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"/>
                        : sub
                    }
                </p>
            </div>
            {/*<img class="w-full h-auto rounded-b-xl" src="../docs/assets/img/500x300/img1.jpg" alt="Image Description">*/}
        </div>
    )
}


