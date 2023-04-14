
const parseLine = (str = '') => {
    const list = str.split(/\n/);
    const titleStr = list.splice(0, 1)[0];
    const tempList = list.reduce((prev, current) => {
        const arr = current.search('"') > -1 ? current.replace(/#.*/, '').trim().split(/\s"/) : current.replace(/#.*/, '').trim().split(/\s/);
        const type = arr.splice(0, 1);
        prev[type[0]] = arr.flat().join(',').replace(/\"/g, '');
        return prev;
    }, {});
    const tempObj = {};
    Object.keys(tempList).map(item => {
        if (['SetBackgroundColor', 'SetBorderColor', 'SetTextColor'].includes(item)) {
            const color = tempList[item].split(',');
            if (color.length === 4) {
                color[3] = Math.floor((color[3] / 255) * 100) / 100;
            } else {
                color.push(1);
            }
            tempObj[item] = `rgba(${color.join(',')})`;
            return;
        }
        if (['SetFontSize'].includes(item)) {
            tempObj[item] = parseInt(tempList[item]);
            return;
        }
        if (['DisableDropSound'].includes(item)) {
            tempObj[item] = true;
            return;
        }
        if (['MinimapIcon'].includes(item)) {
            // tempObj[item] = true;
            const miniMapIconConf = tempList[item].split(',');
            tempObj[item] = {
                size: miniMapIconConf[0] || '',
                color: miniMapIconConf[1] || '',
                shape: miniMapIconConf[2] || '',
                show: true,
            };
            return;
        }
        if (['PlayEffect'].includes(item)) {
            const PlayEffectConf = tempList[item].split(',');
            tempObj[item] = {
                Colour: PlayEffectConf[0] || '',
                Temp: !!PlayEffectConf[1], // 光柱持续可见
                show: true,
            };
            return;
        }
        if (['CustomAlertSound'].includes(item)) {
            const CustomAlertSound = tempList[item].split(' ');
            tempObj[item] = {
                path: CustomAlertSound[0],
                vol: CustomAlertSound[1] || '300'
            }
            return;
        }
        return tempObj[item] = tempList[item];
    });
    if (!tempObj.PlayEffect) {
        tempObj.PlayEffect = {
            Colour: 'White',
            Temp: false,
            show: false,
        };
    }
    if (!tempObj.MinimapIcon) {
        tempObj.MinimapIcon = {
            size: 2,
            color: 'White',
            shape: 'Circle',
            show: false,
        };
    }
    // sharket的不标准 
    // 算了解析不了反正我不用
    const sharketDesc = (list.find(item => item.search('SetTextColor') > -1)?.split('#')[1] || '').trim();

    // 拆分标题
    const titleStrArr = titleStr.split(/[#|-]/).map(item => item.trim());
    if (titleStrArr.length === 1) {
        titleStrArr.push(sharketDesc);
    }
    const titleObj = {
        status: titleStrArr[0].trim() === 'Show',
        label: titleStrArr[titleStrArr.length - 1],
        disabled: titleStrArr[titleStrArr.length - 1].endsWith('*'),
        deepLevel: titleStrArr.length - 1,
        titleArr: titleStrArr.length >= 3 ? titleStrArr.slice(1, titleStrArr.length - 1) : titleStrArr.slice(1, 2),
    };

    return {
        ...titleObj,
        ...tempObj,
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

// 转换为tree
const toTree = (array) => {
    const result = [];
    if (!Array.isArray(array)) return result;
    // 清除已存在的children 重新赋值
    // array.forEach(item => {
    //     delete item.children;
    // });
    const map = {};
    array.forEach(item => {
        map[item.id] = item;
    });
    array.forEach((item, i) => {
        let parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};
// 合并同类
const mergeTree = (tree, id = '') => {
    const result = [];
    if (!Array.isArray(tree) || !tree.length) return result;
    tree.forEach((item, index) => {
        // 查询是否存在
        const i = result.findIndex(t => t.label === item.label);
        const pid = `${id ? id + '-' : ''}${index}`;

        if (i > -1) {
            result[i].children = mergeTree([...(result[i].children || []), ...(item.children || [])], result[i].id);
        } else {
            result.push({
                ...item,
                id: pid,
                pid: id,
                children: item.children ? mergeTree(item.children, pid) : null
            });
        }
    });
    return result;
};

const groupByTitleArr = (array) => {
    // 转换格式
    const titleStrArrList = array.map((item) => {
        const r = item.titleArr.map((t, i) => {
            const arr = { label: t, id: i, pid: i > 0 ? i - 1 : '' };
            if (i === item.titleArr.length - 1) {
                arr.children = [item];
            }
            return arr;
        });
        return toTree(r)[0];
    });
    return mergeTree(titleStrArrList);
};

export const filterParse = (str = '') => {
    const DETAIL_LIST = str.replace(/\r/g, '').split(/\n\n/).filter(m => m && /^[Show|Hide]/.test(m)).map(item => parseLine(item));
    return groupByTitleArr(DETAIL_LIST);
    // return DETAIL_LIST;
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
    // 解析时添加的字段或者不需要做操作的字段列表
    const exKey = ['titleArr', 'status', 'id', 'pid', 'className', 'disabled', 'label', 'children', 'deepLevel'];
    return arr.map(item => Object.keys(item).reduce((prev, key) => {
        if (exKey.includes(key)) return prev;
        const data = item[key];
        // 首句
        if (!prev) {
            const status = item.status ? 'Show' : 'Hide';
            const TA = JSON.parse(JSON.stringify(item.titleArr));
            if (item.label) TA.push(item.label);
            prev = `${status} # ${TA.join(' - ')}\n`;
            return prev;
        }
        if (key === 'BaseType' && !data) return prev;
        // 无值
        if (!data || key === 'DisableDropSound') {
            prev += `    ${key}\n`;
            return prev;
        }
        if (key === 'MinimapIcon') {
            delete data.show;
            prev += `    ${key} ${Object.keys(data).map(a => data[a]).join(' ')}\n`;
            return prev;
        }
        if (key === 'PlayEffect') {
            if (!data.show) return prev;
            console.log(data.Temp);
            prev += `    ${key} ${data.Colour}${data.Temp ? ' Temp' : ''}\n`;
            return prev;
        }
        if (Array.isArray(data)) {
            prev += `    ${key} ${data.join(' ')}\n`;
            return prev;
        }
        if (key === 'CustomAlertSound') {
            prev += `    ${key} "${data.path}" ${data.vol}\n`;
            return prev;
        }
        if (key.endsWith('Color')) {
            const color = data.match(/rgba\((.*)?\)/)[1].split(',');
            color[color.length - 1] = Math.floor(color[color.length - 1] * 255);
            prev += `    ${key} ${color.join(' ').trim()}\n`;
            return prev;
        }
        const d = typeof data === 'number' ? data : data.split(',').join(' ').trim();
        prev += `    ${key} ${d}\n`;
        return prev;
    }, '')).join(`\n`);
};