import CARD_DESC from './card.desc';
import { customStorage } from '@/utils';

const res = []

export const CARD_INFO = (list = CARD_DESC) => {
    const cardPool = customStorage.getItem('CARD_POOL') || list;
    return cardPool.map(item => ({
        ...item,
        id: item.type.replace(/\s/g, '-').replace(/'/g, '').toLocaleLowerCase()
    }))
};

export default res;