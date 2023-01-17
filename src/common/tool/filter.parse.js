
const parseLine = (str = '') => {
    const list = str.split(/\n/);
    const titleStr = list.splice(0, 1)[0];
    const titleObj = {
        status: titleStr.split(/\s[#|-]\s/)[0] === 'Show',
        title: titleStr.split(/\s[#|-]\s/)[1].trim(),
        scTitle: titleStr.split(/\s[#|-]\s/)[2].trim(),
        desc: (titleStr.split(/\s[#|-]\s/)[3] || '').trim(),
    };
    return {
        ...titleObj,
        ...list.reduce((prev, current) => {
            const arr = current.search('"') > -1 ? current.replace(/#.*/, '').trim().split(/\s"/) : current.replace(/#.*/, '').trim().split(/\s/);
            const type = arr.splice(0, 1);
            prev[type[0]] = arr.flat().join(',').replace(/\"/g, '');
            return prev;
        }, {}),
    };
};
// 合并同类项
const mergeList = (list = [], key = 'title', id = 1) => {

    const fun = (arr = [], key = 'title', i) => {
        return arr.reduce((prev, current) => {
            if (!prev) prev = [];
            let index = prev.findIndex(item => item.label === current[key]);
            if (index === -1) {
                prev.push({ label: current[key], children: [], id: `${i}-${prev.length}` });
                index = prev.length - 1;
            }
            prev[index].children.push({
                ...current,
                label: current.desc || current.scTitle || current.title,
                id: `${prev[index].id}-${prev[index].children.length}`,
                disabled: (current.desc || current.scTitle || current.title).endsWith('*')
            });
            return prev;
        }, []);
    };
    const parent = fun(list, key, id);
    return parent.map(item => ({ ...item, children: fun(item.children, 'scTitle', item.id) }));
};

export const filterParse = (str = '') => {
    const titleReg = /# ----------(.*)----------/g;
    const reg = /# ----------.*----------\n\n/
    const ROOT_CLASS = str.split(reg);
    const TITLE_LIST = str.match(titleReg);
    ROOT_CLASS.splice(0, 1);
    const DETAIL_LIST = TITLE_LIST.map((item, i) => ({
        id: `${i + 1}`,
        label: item.replace(/#|\s|-/g, ''),
        children: mergeList(ROOT_CLASS[i].split(/\n\n/).filter(m => m).map(child => parseLine(child)), 'title', `${i + 1}`),
    }));
    return DETAIL_LIST;
};


export const flatArray = (arr = []) => {
    return arr.reduce((prev, current) => {
        if (!prev) prev = [];
        if (current.children) {
            prev.push(...flatArray(current.children));
        } else {
            prev.push(current);
        }
        return prev;
    }, []);
};

// 还原数据
export const compileData = (arr = []) => {
    const exKey = ['title', 'scTitle', 'status', 'id', 'desc', 'className', 'disabled', 'label'];
    return arr.map(item => Object.keys(item).reduce((prev, key) => {
        if (exKey.includes(key)) return prev;
        const data = item[key];
        if (!prev) {
            const status = item.status ? 'Show' : 'Hide';
            const st = item.desc ? `${item.scTitle} - ${item.desc}` : item.scTitle;
            prev = `${status} # ${item.title} - ${st}\n`;
        }
        if (key === 'BaseType' && !data) return prev;
        if (!data) {
            prev += `    ${key}\n`;
            return prev;
        }
        if (key === 'CustomAlertSound') {
            prev += `    ${key} "${data.split(' ')[0]}" ${data.split(' ')[1]||300}\n`
        } else {
            prev += `    ${key} ${data.split(',').join(' ').trim()}${key.endsWith('Color') ? ` # ${(item.desc || item.scTitle).replace('*', '')}` : ''}\n`;
        }
        return prev;
    }, '')).join(`\n`);
};