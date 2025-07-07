import MojitoAbout from '@/templates/mojito/app/about/page';
import MojitoPage from '@/templates/mojito/app/page';
import { MojitoHeader } from '@/templates/mojito/components/header';

export const templateComponents = {
    mojito: {
        header: MojitoHeader,
    },
} as const

export const templatePages = {
    mojito: {
        home: MojitoPage,
        about: MojitoAbout
    },
} as const