import {useTranslations} from 'next-intl';
import {TextInput} from '@/ui/inputs/textInput';
import {FaMagnifyingGlass} from "react-icons/fa6"
import {CheckBox} from '@/ui/inputs/checkBox';

interface Props {
    onSearch: (value: string) => void
    onShowSold: (shouldShow: boolean) => void
    searchTerm?: string,
    showSold?: boolean
}

export const LotTableToolbar = ({onSearch, searchTerm, showSold, onShowSold}: Props) => {
    const t = useTranslations("material");
    return (
        <div className="flex flex-row items-center gap-x-2 justify-between">
            <div className="relative max-w-xs ">
                { /* @ts-ignore */ }
                <TextInput onInput={(e) => onSearch(e.target.value)}
                    // @ts-ignore
                           value={searchTerm}
                           placeholder={t("enter-search-term")}
                           trailingAdornment={<FaMagnifyingGlass/>}
                />
            </div>
            <CheckBox label={t("show-sold-lots")}
                      onChecked={onShowSold}
                    // @ts-ignore
                      checked={showSold}
            />
        </div>
    )
}
