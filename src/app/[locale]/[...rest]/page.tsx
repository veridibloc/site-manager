import {useTranslations} from 'next-intl';

export default function NotFound() {
  const t = useTranslations("errors")
  return <>
    <h2>{t('not-found')}</h2>
    </>;
}
