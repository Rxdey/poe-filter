import CARD_DESC from './card.desc';

const res = []

export const CARD_INFO = (list = CARD_DESC) => {
    return list.map(item => ({
        ...item,
        id: item.type.replace(/\s/g, '-').replace(/'/g, '').toLocaleLowerCase()
    }))
};

export default res;