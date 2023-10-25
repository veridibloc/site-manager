import {useTranslations} from 'next-intl';
import {TextInput} from '@/ui/inputs/textInput';
import {FaMagnifyingGlass} from "react-icons/fa6"
import {DropDown} from '@/ui/inputs/dropdown';

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
                { /* @ts-ignore */ }
                <DropDown label={""} onChange={(e) => onShowFilter(Number(e.target.value) as ShowFilter)}>
                    <option value={ShowFilter.All}>{t("show-all-lots")}</option>
                    <option value={ShowFilter.InStockOnly}>{t("show-instock-lots")}</option>
                    <option value={ShowFilter.SoldOnly}>{t("show-sold-lots")}</option>
                </DropDown>
            </div>
        </div>
    )
}
