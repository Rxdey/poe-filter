
const parseLine = (str = '') => {
    const list = str.split(/\n/);
    const titleStr = list.splice(0, 1)[0];

    const tempList = list.reduce((prev, current) => {
        const arr = current.search('"') > -1 ? current.replace(/#.*/, '').trim().split(/\s"/) : current.replace(/#.*/, '').trim().split(/\s/);
        const type = arr.splice(0, 1);
        prev[type[0]] = arr.flat().join(',').replace(/\"/g, '');
        return prev;
    }, {});
    // sharket的不标准 
    // 算了解析不了反正我不用
    const sharketDesc = list.find(item => item.search('SetTextColor') > -1)?.split('#')[1]||''.trim();
    // console.log(sharketDesc);
    const titleObj = {
        status: titleStr.split(/[#|-]/)[0].trim() === 'Show',
        title: (titleStr.split(/[#|-]/)[1] || sharketDesc || '').trim(),
        scTitle: (titleStr.split(/\s[#|-]\s/)[2] || sharketDesc || '').trim(),
        desc: (titleStr.split(/\s[#|-]\s/)[3] || '').trim(),
    };
    return {
        ...titleObj,
        ...tempList,
    };
};

const groupByTitle = (array, key) => {
    const arr = array.reduce((prev, current) => {
        const name = current[key];
        if (!prev[name]) prev[name] = [];
        prev[name].push(current);
        return prev;
    }, {});
    return Object.keys(arr).map((k, i) => ({
        id: `${key}-${i}`,
        label: k,
        title: arr[k][0].title || '',
        children: arr[k].map((c, index) => ({
            ...c,
            id: `${key}-${i}-${index}`,
            label: c.desc || c.scTitle || c.label,
            disabled: (c.desc || c.scTitle || c.title).endsWith('*')
        }))
    }));
};

export const filterParse = (str = '') => {
    const DETAIL_LIST = str.replace(/\r/g, '').split(/\n\n/).filter(m => m && /^[Show|Hide]/.test(m)).map(item => parseLine(item));
    return groupByTitle(groupByTitle(DETAIL_LIST, 'scTitle'), 'title');
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
            prev += `    ${key} "${data.split(' ')[0]}" ${data.split(' ')[1] || 300}\n`;
        } else {
            prev += `    ${key} ${data.split(',').join(' ').trim()}${key.endsWith('Color') ? ` # ${(item.desc || item.scTitle).replace('*', '')}${item.title}` : ''}\n`;
        }
        return prev;
    }, '')).join(`\n`);
};