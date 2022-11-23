###
隐藏滚动条
.relaybox-centerout {
    width: 100%;
    height: calc(100% - 33px);
    overflow: hidden;
}

.relaybox-center {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    /* 隐藏滚动条 */
    /* firefox */
    scrollbar-width: none;
    /* IE 10+ */
    -ms-overflow-style: none;
}

.relaybox-center::-webkit-scrollbar {
    display: none;
}

###
css两个类选择器必须要紧挨在一起
例如：
.weather-centerboxitem.last{
    border-right:0px
}

###
Object.keys方法，成员是参数对象自身的（不含继承的）所有可遍历属性的键名


###
shift() 方法能够删除数组第 1 个元素，并返回该元素
