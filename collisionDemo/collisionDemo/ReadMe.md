在"2D"场景监测碰撞的方法：
    1、外接图形判别法：
        1-1、轴对称包围盒(无旋转矩形)
        1-2、圆形碰撞；
        1-3、圆形与矩形（无旋转）
        1-4、圆形与旋转矩形（以矩形中心点为旋转轴）
    2、光线投射法
    3、分离轴定理
    4、其他
        4-1、地图格子划分
        4-2、像素检测


    1 外接图形判别法：
        1-1 轴对称包围盒：判断任意两个（无旋转）矩形的任意一边是否无间距，从而判断是否碰撞。
            算法：rect1.x < rect2.x + rect2.width &&
                 rect1.x + rect1.width > rect2.x &&
                 rect1.y < rect2.y + rect2.height &&
                 rect1.height + rect1.y > rect2.y
            缺点：
                相对局限：两物体必须式矩形，且均不允许旋转（及关于水平和垂直方向上对称）
                对于包含着图案（非填满整个矩形）的矩形进行碰撞检测，可能存在精度不足的问题；
                物体运动速度过快时，可能会在相邻两动画帧之间快速穿越，导致忽略了本应碰撞的事件发生。
            适用案例： 类举行物体间的碰撞
        1-2 圆形碰撞：通过判断任意两个圆的圆心距离是否小于两圆半径之和，若小于则为碰撞。
            算法：Math.sqrt(Math.pow(circleA.x - circleB.x, 2) + Math.pow(circleA.y - circleB.y, 2)) < circleA.radius + circleB.radius
            缺点：与轴对称包围盒类似
            适用案例：（类）圆形的物体，如各种球类碰撞
        1-3 圆形和矩形（无旋转）：通过找出矩形上离圆心最近的点，然后通过判断该点与圆心的距离是否小于圆的半径，若小于则为碰撞。
            预定以下变量：距离上离圆心最近的点为变量：closetPoint = {x, y};
                        矩形：rect = {x, y, w, h}; //左上角与宽高
                        圆形：circle = {x, y, r}; //圆心与半径
            x轴：
                如果圆心在矩形的左边：circle.x < rect.x     closetPoint.x = rect.x;
                如果圆心在矩形的右边：circle.x > rect.x + rect.width closetPoint.x = rect.x + rect.width
                如果圆心在矩形的正上下方：closetPoint.x = circle.r;
            y轴:如果圆心在矩形的上方：circle.y < rect.y     closetPoint.y = rect.y
                如果圆心在矩形的下方：circle.y > rect.y + rect.h  closetPoint.y = rect.y + rect.h
                如果圆心在矩形的正左右两侧：closetPoint.y = circle.y

                然后通过矩形上距离圆心远近的点与圆心的距离，将结果与圆的半径进行对比，如果小于半径，则为碰撞
                var distance = Math.sqrt(Math.pow(closetPoint.x - circle.x, 2) - Math.pow(closetPoint.y - circle.y, 2));
                distance < circle.r  碰撞
         缺点：矩形必须是轴对称图形，不能旋转

        1-4 圆形与旋转矩形（以矩形中心为旋转轴）：即使矩形以其中心为旋转轴进行了旋转，但是判断它与圆形是否发生碰撞的本质还是找出矩形上离圆心的最近点。
        对于旋转后的矩形，要找出其离圆心最近的点，似乎有些困难。其实，我们可以将我们的思想的范围扩大：将矩形的旋转看作是整个画布的旋转。那么我们将画布反向旋转，矩形旋转的角度。因此，我们只需求出画布旋转后的圆心位置，即可使用圆形与矩形的判断方法了。
        x' = cos(B) * (cx - centerX) - sin(B)* (cy-centerY) + centerX;
        y' = sin(B) * (cx - centerX) + cos(B)*
        (cy - centerY) + centerY;
        优点： 相对于圆形与矩形（未旋转）的方法，适用范围更广。
        















