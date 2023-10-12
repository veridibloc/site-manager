export const CardGroup = () => {
    return (
        <div
            className="grid border rounded-xl shadow-sm divide-y overflow-hidden sm:flex sm:divide-y-0 sm:divide-x dark:border-gray-700 dark:shadow-slate-700/[.7] dark:divide-gray-600">
            <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
                <img className="w-full h-auto rounded-t-xl sm:rounded-tr-none" src="../docs/assets/img/500x300/img1.jpg"
                     alt="Image Description"/>
                <div className="p-4 flex-1 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Card title
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                    </p>
                </div>
                <div className="p-4 border-t sm:px-5 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Last updated 5 mins ago
                    </p>
                </div>
            </div>

            <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
                <img className="w-full h-auto" src="../docs/assets/img/500x300/img1.jpg" alt="Image Description"/>
                <div className="p-4 flex-1 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Card title
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        This card has supporting text below as a natural lead-in to additional content.
                    </p>
                </div>
                <div className="p-4 border-t sm:px-5 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Last updated 5 mins ago
                    </p>
                </div>
            </div>

            <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
                <img className="w-full h-auto sm:rounded-tr-xl" src="../docs/assets/img/500x300/img1.jpg"
                     alt="Image Description"/>
                <div className="p-4 flex-1 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Card title
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        card has even longer content than the first to show that equal height action.
                    </p>
                </div>
                <div className="p-4 border-t sm:px-5 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Last updated 5 mins ago
                    </p>
                </div>
            </div>
        </div>
    )
}
