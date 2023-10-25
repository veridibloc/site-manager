import {useTranslations} from 'next-intl';
import {TextInput} from '@/ui/inputs/textInput';
import {FaMagnifyingGlass} from "react-icons/fa6"
import {CheckBox} from '@/ui/inputs/checkBox';

export enum ShowFilter {
    All,
    InStockOnly,
    SoldOnly
}

interface Props {
    onSearch: (value: string) => void
    onShowFilter: (filter: ShowFilter) => void
    searchTerm?: string,
    showFilter?: ShowFilter
}

export const LotTableToolbar = ({onSearch, searchTerm, showFilter, onShowFilter}: Props) => {
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
            <div className="flex flex-row items-center gap-x-2">
            <CheckBox label={t("show-sold-lots")}
                      onChecked={(checked) => onShowFilter(!checked ? ShowFilter.All : ShowFilter.SoldOnly)}
                    // @ts-ignore
                      checked={showFilter === ShowFilter.SoldOnly}
            />
            <CheckBox label={t("show-sold-lots")}
                      onChecked={(checked) => onShowFilter(!checked ? ShowFilter.All : ShowFilter.InStockOnly)}
                    // @ts-ignore
                      checked={showFilter === ShowFilter.InStockOnly}
            />
            </div>
        </div>
    )
}
