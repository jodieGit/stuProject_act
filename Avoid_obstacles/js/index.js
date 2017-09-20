$(document).ready(function() {
    var userName = '',pageW, pageH, flower = 0, isPlay = 1;
    var ado = $('#audio');
    $('.clickDom').click(function(e) {
        if($(this).attr('data-type') == "userName") { //用户输入姓名
            $(this).val('');
        } else if($(this).attr('data-type') == "userPhone") {
            $('.iphone_box').bind('input propertychange', function() {
                if($(this).val().length == 11) {
                    $('.iphone_box').blur();
                }
            });
            $(this).val('');
        } else if($(this).attr('data-type') == "getPackage") {
            _tcTraObj._tcTrackEvent('threeLife', 'click', 'getPackage', 1);
            judgeChanner($(".iphone_box").val());
        } else if($(this).attr('data-type') == "toShare") { //分享
            _tcTraObj._tcTrackEvent('threeLife', 'click', 'share', 2);
            share();
        } else if($(this).attr('data-type') == "closeTip") {
            $('.mask_tip').hide();
        } else if($(this).attr('data-type') == 'go') {
            _tcTraObj._tcTrackEvent('threeLife', 'click', 'goFilm', 3);
            location.href="http://m.17u.cn/app/la?refid=309581390&sUrl=tctclient%3A%7C%7Chomepage%7Chomepage";
        } 
        // music
        // else if($(this).attr('data-type') == "control_sound") {
        //     if(isPlay) {
        //         $("#bgsound")[0].pause();
        //         isPlay = false;
        //     } else {
        //         $("#bgsound")[0].play();
        //         isPlay = true;
        //     }
        // }
    });

    // 提示信息
    function showToast(text) {
        $(".toast_tip").html(text);
        $(".toast").show();
        $(".toast").css('margin-top', -($('.toast_tip')[0].offsetHeight)/2);
        $(".toast").css('margin-left', -($('.toast_tip')[0].offsetWidth)/2);
        setTimeout(function() {
            $(".toast").hide();
        }, 1000)
    }
    function resize() {
        pageW = $(window).width();
        pageH = $(window).height();
    }
    function init() {
        $(window).resize(function() {
            resize();
        });
        resize();
    }

    function judgeChanner(phone) {
        if(_tc_bridge_public.isTc){//在同程内部
            _tc_bridge_user.get_device_info({
                param:{
                },
                callback: function (data) {
                    isMember = JSON.parse(data.CBData).memberInfo.memberId;
                    if(isMember){
                        //调取领礼包接口
                        getPkg(isMember, '');
                    } else {
                        _tc_bridge_user.user_login({
                            param:{
                            },
                            callback: function (data) {
                                isMember = JSON.parse(data.CBData).memberInfo.memberId;
                                if(isMember){
                                    getPkg(isMember, '');
                                }else{
                                    return;
                                }
                            }
                        })
                    }
                }
            })
        } else {
            if(($(".iphone_box").val() == "") || ($(".iphone_box").val().length < 11)) {
                showToast("请输入手机号");
            } else {
                getPkg('', phone);
            }
        }
    };

    function getPkg(memberId, phone) {
        $.ajax({
            url: "//m.ly.com/biz/api/RedPakage/GetRedPakage/",
            type: 'post',
            data: {
                "ActivityFlag": '726ss',
                "Mobile": phone,
                "MemberId": memberId
            },
            dataType: 'json',
            beforeSend: function() {
                showToast('正在加载...');
            },
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 200 || data.code == 501) {
                    var renderData = data.result.NewRedPackageList.length ? data.result.NewRedPackageList : data.result.OldRedPackageList;
                    renderPkg(renderData);
                } else {
                    showToast('领取失败，请稍后再试');
                }
            },
            error: function(renderData) {
                return;
            },
        });
    }
    function renderPkg(data) {
        var str = '';
        data.forEach(function (item) {
            str += '<div class="list_item re"><img src="//file.40017.cn/scyx/activity/2017/0728threeLife/images/pkg_bg.png"/><div class="red_box ab"><div class="red_detail">'+
                    '<p class="part1">&yen;<span>' + item.ParValue + '</span></p><p class="part2"><span class="block_show big_show">'
                    + item.ProjectName + '</span><span class="block_show">' + item.MinConsume + '</span><span class="block_show">'
                    + item.EndTime + '</span></p>';
            if(item.StatusId == 4) {
                str += '<a class="part3 bg_gray">' + item.StatusText + '</a></div></div></div>';
            } else {
                str += '<a class="part3" href = "' + item.RedirectUrl + '">'+ item.StatusText + '</a></div></div></div>';
            }
        });
        $('.pkg_list').html(str);
        $('.game').hide();
        // music
        // $(".soundbtn").hide();
        $('.mask').hide();
        $('mask_tip').hide();
        $('.red_package').show();
    }

    init();

    function showTipText(time, userName) {
        var text = '';
        if(time == '') {
            text = '你和' + userName + "长按并拉动孔明灯进行移动，在60s内躲避天雷。坚持到游戏第十秒出现桃花，吃掉桃花可躲避天雷一次，若孔明灯被天雷劈中则游戏结束。！";
        } else {
            if(time<10) {
                text = '你和' + userName + '的天灯的坚持了'+ time +'秒，愿得一人心，白头不相离。手有点小抖噢，撑过10s可以领红包！'
            } else if(time>=10 && time<20) {
                text = '你和' + userName + '的天灯坚持了'+ time +'秒，人间天上，一样风光，我与君知。';
            } else if(time>=20 && time<40) {
                text = '你和' + userName + '的天灯坚持了'+ time +'秒，一个醉卧十里桃林忘尽前尘，一个情深不渝枯等成灰，三生爱恨，三世纠葛';
            } else if(time>=40 && time<60) {
                text = '你和' + userName + '的天灯坚持了'+ time +'秒，灼灼桃花十里，取一朵放在心上，足矣。';
            } else if(time>=60) {
                text = '爱得极致，想得透彻，最美不是一生一世一双人，而是三生三世皆是你。';
            }
        }
        $(".tip_content").html(text);
        if(time == '') {
            $('.guider_btn').hide();
            $('.phone_box').hide();
            $('.get_btn').hide();
            $('.got_btn').show();;
        } else {
            if(time > 10) {
                $('.guider_btn').hide();
                $('.phone_box').show();
                $('.get_btn').show();
                // music
                // $('#bgsound')[0].pause();
                $('.got_btn').hide();
            } else {
                $('.guider_btn').show();
                $('.tip_content').addClass('tip_content_btn');
                $('.phone_box').hide();
                $('.get_btn').hide();
                $('.got_btn').hide();
            }
        }
        $('.mask').show();
        if(_tc_bridge_public.isTc) {
            $('.phone_box').hide();
            $('.get_btn').css('top', '52%');
        }
    }

    function share() {
        var shareTitle = '三生三世，同你每一程';
        var shareContent = '快来和你爱的TA一起放天灯吧';
        var shareUrl = '//m.ly.com/biz/act/threeLife?refid=339006849';
        var shareImg = 'http://file.40017.cn/scyx/activity/2017/0728threeLife/images/share_img.jpg';

        if(_tc_bridge_public.isTc){
            _tc_bridge_bar.shareInfoFromH5({
                param: {
                    "tcsharetxt": shareTitle,
                    "tcsharedesc": shareContent,
                    "tcshareurl": shareUrl,
                    "tcshareimg": shareImg
                },
                callback: function (data) {// 仅微信单独的分享才有回调信息。
                    alert("callback:" + JSON.stringify(data));
                }
            })
        } else {
            $('.mask_tip').show();
            fed_wxshare.config({
                shareImg: shareImg,//必传
                shareUrl: shareUrl,//必传
                shareTitle: shareTitle,//非必传
                shareDesc: shareContent//非必传
            })
        }
    }
    
    
    var shareTitle = '三生三世，同你每一程';
    var shareContent = '快来和你爱的TA一起放天灯吧';
    var shareUrl = '//m.ly.com/biz/act/threeLife?refid=339006849';
    var shareImg = 'http://file.40017.cn/scyx/activity/2017/0728threeLife/images/share_img.jpg';

    if(_tc_bridge_public.isTc){
        _tc_bridge_bar.set_navbar({
            "param": {
                'center': [{'tagname': "tag_title", 'value': '三生三世'}],
                "right": [{"tagname": "tag_click_city", "icon_type": "",'icon':'i_share'}]
            },
            'callback':function(data){
                _tc_bridge_bar.shareInfoFromH5({
                    param: {
                        "tcsharetxt": shareTitle,
                        "tcsharedesc": shareContent,
                        "tcshareurl": shareUrl,
                        "tcshareimg": shareImg
                    },
                    callback: function (data) {// 仅微信单独的分享才有回调信息。
                    }
                })
            }
        })
    } else {
        fed_wxshare.config({
            shareImg: shareImg,//必传
            shareUrl: shareUrl,//必传
            shareTitle: shareTitle,//非必传
            shareDesc: shareContent//非必传
        })
    }

    
    
    
    function Lamp(ctx){
        gameMonitor.im.loadImage(['//file.40017.cn/scyx/activity/2017/0728threeLife/images/lamp.png']);
        this.width = 120;
        this.height = 113;
        this.left = gameMonitor.w/2 - this.width/2;
        this.top = gameMonitor.h - 2*this.height;
        this.player = gameMonitor.im.createImage('//file.40017.cn/scyx/activity/2017/0728threeLife/images/lamp.png');
        this.paint = function(){
            ctx.drawImage(this.player, this.left, this.top, this.width, this.height);
        }
        this.addFlowerTip = function(txt) {
            ctx.font="20px Arial";
            ctx.fillStyle  = 'white';
            ctx.fillText(txt, this.left + this.width *3/4, this.top);
        }
        this.setPosition = function(event){
            if(gameMonitor.isMobile()){
                var tarL = event.changedTouches[0].clientX;
                var tarT = event.changedTouches[0].clientY;
            } else{
                var tarL = event.offsetX;
                var tarT = event.offsetY;
            }
            this.left = tarL - this.width/2 - 16;
            this.top = tarT - this.height/2;
            if(this.left<0){
                this.left = 0;
            }
            if(this.left>pageW-this.width){
                this.left = pageW-this.width;
            }
            if(this.top<0){
                this.top = 0;
            }
            if(this.top>gameMonitor.h - this.height){
                this.top = gameMonitor.h - this.height;
            }
            this.paint();
        }

        this.controll = function(){
            var _this = this;
            var stage = $('.game');
            var currentX = this.left,
                currentY = this.top,
                move = false;
            stage.on(gameMonitor.eventType.start, function(event){
                _this.setPosition(event);
                move = true;
            }).on(gameMonitor.eventType.end, function(){
                move = false;
            }).on(gameMonitor.eventType.move, function(event){
                event.preventDefault();
                if(move){
                    _this.setPosition(event);
                }
            });
        }

        this.collision = function(tunderlist){
            for(var i=tunderlist.length-1; i>=0; i--){
                var f = tunderlist[i];
                if(f){
                    var l1 = this.top+this.height/2 - (f.top+f.height/2);
                    var l2 = this.left+this.width/2 - (f.left+f.width/2);
                    var l3 = Math.sqrt(l1*l1 + l2*l2);
                    if(l3<=this.height/2 + f.height/2){
                        tunderlist[f.id] = null;
                        if(f.type==0){
                            if(flower > 0) {
                                flower--;
                                this.updateFlower(flower);
                                this.addFlowerTip('-1');
                            } else {
                                gameMonitor.stop();
                                showTipText(Math.floor(gameMonitor.time/60), userName);
                            }
                        } else {
                            flower ++;
                            this.updateFlower(flower);
                            this.addFlowerTip('+1');
                        }
                    }
                }
            }
            
        }
        this.updateFlower = function(num) {
            $('.flower_count').html(flower);
        }
    }

    function Tunder(type, left, id){
        this.speedUpTime = 300;
        this.id = id;
        this.type = type;
        this.width = (type == 0 ? 52.5 : 45.5);
        this.height = (type == 0 ? 53.5 : 45);
        this.left = left;
        this.top = -50;
        this.speed = 0.04 * Math.pow(1.2, Math.floor(gameMonitor.time/this.speedUpTime));
        this.loop = 0;

        var p = this.type == 0 ? '//file.40017.cn/scyx/activity/2017/0728threeLife/images/tunder.png' : '//file.40017.cn/scyx/activity/2017/0728threeLife/images/flower.png';
        this.pic = gameMonitor.im.createImage(p);
        $(this.pic).addClass('border_test');
    }
    
    Tunder.prototype.paint = function(ctx){
        ctx.drawImage(this.pic, this.left, this.top, this.width, this.height);
    }
    Tunder.prototype.move = function(ctx){
        if(gameMonitor.time % this.speedUpTime == 0) {
            this.speed *= 1.2;
        }
        this.top += ++this.loop * this.speed;
        if(this.top>gameMonitor.h){
            gameMonitor.tunderList[this.id] = null;
        } else {
            this.paint(ctx);
        }
    }


    function ImageMonitor(){
        var imgArray = [];
        return {
            createImage : function(src){
                return typeof imgArray[src] != 'undefined' ? imgArray[src] : (imgArray[src] = new Image(), imgArray[src].src = src, imgArray[src])
            },
            loadImage : function(arr, callback){
                for(var i=0,l=arr.length; i<l; i++){
                    var img = arr[i];
                    imgArray[img] = new Image();
                    imgArray[img].onload = function(){
                        if(i==l-1 && typeof callback=='function'){
                            callback();
                        }
                    }
                    imgArray[img].src = img
                }
            }
        }
    }


    var gameMonitor = {
        w : pageW ,
        h : pageH ,
        bgWidth : pageW,
        bgHeight : pageH,
        time : 0,
        timmer : null,
        bgSpeed : 2,
        bgloop : 0,
        im : new ImageMonitor(),
        tunderList : [],
        bgDistance : 0,//背景位置
        eventType : {
            start : 'touchstart',
            move : 'touchmove',
            end : 'touchend'
        },
        init : function(){
            var _this = this;
            var canvas = document.getElementById('stage');
            var ctx = canvas.getContext('2d');

            //绘制背景
            var bg = new Image();
            _this.bg = bg;
            bg.onload = function() {
                canvas.width = pageW;
                canvas.height = pageH;
                ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, pageW, pageH);          	
            }
            bg.src = '//file.40017.cn/scyx/activity/2017/0728threeLife/images/star_bg.jpg';
            _this.initListener(ctx);
        },
        initListener : function(ctx){
            var _this = this;
            var body = $(document.body);
            $(document).on(gameMonitor.eventType.move, function(event){
                // event.preventDefault();
            });
            body.on(gameMonitor.eventType.start, '.playAgain', function(e){
                _tcTraObj._tcTrackEvent('threeLife', 'click', 'playGame', 4);
                $('.mask').hide();
                $('.red_package').hide();
                if(!$(e.target).parent().hasClass('guider_btn')) {
                    location.reload();
                } else {
                    var canvas = document.getElementById('stage');
                    var ctx = canvas.getContext('2d');
                    _this.lamp = new Lamp(ctx);
                    _this.lamp.controll();
                    _this.reset();
                    _this.run(ctx);
                }
                
            });

            body.on(gameMonitor.eventType.start, '#gotIt', function(e) {
                _tcTraObj._tcTrackEvent('threeLife', 'click', 'gotIt', 5);
                $(".mask").hide();
                _this.lamp = new Lamp(ctx);
                _this.lamp.paint();
                _this.lamp.controll();
                gameMonitor.run(ctx);
            });
            body.on(gameMonitor.eventType.start, '#beginGame', function(e){
                _tcTraObj._tcTrackEvent('threeLife', 'click', 'beginGame', 6);
                if($(".start_input_txt").val() == '') {
                    showToast("输入你爱人的名字");
                } else {
                    userName = $(".start_input_txt").val();
                    $(".start").hide();
                    $(".game").show();
                    // music
                    // $('.soundbtn').show();
                    _this.stop();
                    showTipText('', userName);
                }
            });
        },
        rollBg : function(ctx){
            if(this.bgDistance>=this.bgHeight){
                this.bgloop = 0;
            }
            this.bgDistance = ++this.bgloop * this.bgSpeed;
            ctx.drawImage(this.bg, 0, this.bgDistance-this.bgHeight, this.bgWidth, this.bgHeight);
            ctx.drawImage(this.bg, 0, this.bgDistance, this.bgWidth, this.bgHeight);
        },
        run : function(ctx) {
            // music
            // isPlay && $("#bgsound")[0].play();
            var _this = gameMonitor;
            
            ctx.clearRect(0, 0, _this.bgWidth, _this.bgHeight);
            _this.rollBg(ctx);

            //绘制灯具
            _this.lamp.paint();
             _this.lamp.collision(_this.tunderList);


            //产生障碍物
            if(((this.time / 60) >= 10) && ((this.time / 60)% 5 == 0)) {
                _this.genorateTunder(1);
            } else {
                _this.genorateTunder(0);
            }
            for(i=_this.tunderList.length-1; i>=0; i--){
                var f = _this.tunderList[i];
                if(f){
                    f.paint(ctx);
                    f.move(ctx);
                }
            }
            _this.timmer = setTimeout(function(){
                gameMonitor.run(ctx);
            }, Math.round(1000/60));

            _this.time++;

            $('.time_countdown').html((Math.floor(this.time/60)/10 <= 5) ? 60 - Math.floor(this.time/60) : "0"+ (60 - Math.floor(this.time/60)));

            if(Math.floor(this.time/60) >= 60) {
                _this.stop();
                showTipText(Math.floor(gameMonitor.time/60), userName);
            }
        },

        stop : function(){
            // music
            // !isPlay && $("#bgsound")[0].pause();
            var _this = this;
            $('#stage').off(gameMonitor.eventType.start + ' ' +gameMonitor.eventType.move);
            setTimeout(function(){
                clearTimeout(_this.timmer);
            }, 0);
        },
        genorateTunder : function(typeNum) {
            var genRate = 50;
            var rateParam = 0.002 * this.time;
            var random = Math.random();
            var type =  typeNum;
            var lft = (type == 0 ? 52.5 : 45.5);
            var left = Math.random()*(this.w - lft);
            var id = this.tunderList.length;
            var f = new Tunder(type, left, id);
            if(this.time < 300) {
                rateParam = 0.6;
            }
            if(((random*genRate)>(genRate-rateParam)) || (typeNum == 1)) {
                this.tunderList.push(f);
            }
        },

        reset : function(){
            this.tunderList = [];
            this.bgloop = 0;
            this.timmer = null;
            this.time = 0;
        },
        isMobile : function(){
            var sUserAgent= navigator.userAgent.toLowerCase(),
            bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
            bIsMidp= sUserAgent.match(/midp/i) == "midp",
            bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
            bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
            bIsAndroid= sUserAgent.match(/android/i) == "android",
            bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
            bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
            bIsWebview = sUserAgent.match(/webview/i) == "webview";
            return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
        }
        
    }
    if(!gameMonitor.isMobile()){
        console.log(gameMonitor.isMobile());
        gameMonitor.eventType.start = 'mousedown';
        gameMonitor.eventType.move = 'mousemove';
        gameMonitor.eventType.end = 'mouseup';
    }

    gameMonitor.init();

});