import {ReactElement} from 'react';

type TableElement = ReactElement | string;

interface TableHeaderElement {
    id: string;
    content: TableElement;
}

interface Props {
    toolbar?: ReactElement,
    headers?: TableHeaderElement[];
    rows: TableElement[][];
}

export const Table = ({rows, toolbar, headers = []}: Props) => {

    if (rows.length && rows[0].length !== headers.length) {
        console.error("Number of rows and headers must be equal")
    }

    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div
                        className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                        {toolbar && (
                            <div className="py-3 px-4">
                                {toolbar}
                            </div>
                        )}
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    {headers.map((el) => (
                                        <th key={`th-${el.id}`} scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">{el.content}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {rows.map((row, index) => {
                                        const id = `${headers[index]!.id}-${index}`;
                                        return (
                                            <tr key={`tr-${id}`} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                {row.map((cell, index) => (
                                                    <td key={`td-${id}`}
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{cell}</td>
                                                ))
                                                }
                                            </tr>
                                        )
                                    }
                                )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
