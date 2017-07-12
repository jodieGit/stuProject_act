(function(doc, win) {
    //orientationchange: 判断手机是水平方向还是垂直方向，感应方向

    //doc: document对象
    //doc.documentElement:得到文档的根元素<html>
    // 之所以要得到文档的根元素，是为了计算网页所打开时屏幕的真实宽度
    var docEle = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        recalc = function() {
            var clientWidth = docEle.clientWidth;
            if(!clientWidth) return;

            // 320是默认手机屏幕
            // clientWidth是网页打开时所得到的屏幕的真实宽度值；
            // 这两者相除得到一个放大或缩小的比例值
            docEle.style.fontSize = 20 * (clientWidth / 320) + 'px';
            // 设置根元素font-size
        }
        if(!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
        // 当dom加载完成时，或者屏幕垂直水平方向有所改变进行html的根元素计算
})(document, window);
// 如果不想进行一个响应式设计的开发，可以直接写死font-size