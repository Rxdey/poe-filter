// 获取后缀
export const getSuffix = name => name.substring(name.lastIndexOf(".") + 1);

// 读取文件
export const readFile = file => {
  const reader = new FileReader();
  reader.readAsText(file, 'utf-8');
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function () {
      reject();
    };
  });
};

// 转驼峰

export const toCamel = (str = '') => {
  const a = str.split('-');
  let result = a[0];
  for (let i = 1; i < a.length; i++) {
    result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
  }
  return result[0].toUpperCase() + result.substring(1);
};

export const toCamelWithSpace = (str) => {
  const arr = str.split('-');
  return arr.map(item => `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`).join(' ')
}