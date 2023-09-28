import {useTranslations} from 'next-intl';
import {PageLayout} from '@/ui/layout/pageLayout';

export default function Home() {
    const t = useTranslations("navigation");
    return (
        <PageLayout>
            <h2>{t("dashboard")}</h2>
        </PageLayout>
    )
}
