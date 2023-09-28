import {enUS, ptBR} from '@clerk/localizations';

export const SupportedLocales = ['en', 'pt'];

export function getClerkLocalization(locale: string){
    switch(locale){
        case 'en':
            return enUS;
        case 'pt':
            return ptBR;
        default:
            return enUS;
    }
}
