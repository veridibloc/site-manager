import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations("navigation");
  return (
      <h2>{t("dashboard")}</h2>
  )
}
