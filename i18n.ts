import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
    messages: (await import(`./src/translations/${locale}.json`)).default
}));
