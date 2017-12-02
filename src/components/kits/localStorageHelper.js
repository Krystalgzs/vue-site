// 1 定义一个全局key
const KEY = "buyGoods";

// 2 从localStorage中获取数据
export function getItem() {
    var jsonString = localStorage.getItem(KEY);
    // 若果localStorage中没有这个key对应的数据则返回一个空对象
    if (!jsonString) {
        return {};
    }
    // 如果有值，则将这个字符串转成对象返回
    return JSON.parse(jsonString);
}
// 3 设置localStorage中的数据
// gobj的格式:{gid:91,count:1}
export function setItem(gobj) {
    // 1 从localStorage中获取够买商品的对象
    var obj = getItem();
    // 2.0 判断gobj.gid的值在obj中是否存在，
    // 如果存在将gobj.count的值叠加上去即可
    // obj.['92']=1;
    if (obj[gobj.gid]) {
        // obj.91 = obj.91 + 1;
        obj[gobj.gid] = obj[gobj.gid] + gobj.count;
    } else {
        // 如果不存在 则动态向obj对象中添加一个商品的够买数量
        obj[gobj.gid] = gobj.count;
    }
    // 3.0将obj存储到localStorage中
    localStorage.setItem(KEY, JSON.stringify(obj));
}
// gobj的格式:{gid:91,count:1}
export function setItemReplace(gobj) {
    // 1 从localStorage中获取够买商品的对象
    var obj = getItem();
    // 如果不存在 则动态向obj对象中添加一个商品的够买数量
    obj[gobj.gid] = gobj.count;
    // 3.0将obj存储到localStorage中
    localStorage.setItem(KEY, JSON.stringify(obj));
}
export function delItem(goodsid){
    var obj = getItem();
    // 删除obj中对应的属性即可
    delete obj[goodsid];
    // 重新写回localStorage中
    localStorage.setItem(KEY,JSON.stringify(obj));
}