import { Avatar } from '../avatar';
import {Navigation} from './navigation';

export const Sidebar = () => {
    return (
        <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200">
                <Avatar />
            </div>
            <Navigation/>
        </div>
    )
}
