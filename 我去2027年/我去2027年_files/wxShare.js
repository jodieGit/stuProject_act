document.write("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");

/**
 * Created by Administrator on 15-1-14.
 */
var wxShare = {
    init : function (options){
	    
	    var setting = {
	        debug: false,
	        appId: '',
	        timestamp: '',
	        nonceStr: '',
	        signature: '',
	        jsApiList: [
	            'checkJsApi',
	            'onMenuShareTimeline',
	            'onMenuShareAppMessage',
	            'onMenuShareQQ',
	            'onMenuShareWeibo'
	        ],
	        statistics: false
	    };
	   
	    $.post("http://wechat.healen.cn/share/share.php", {path : window.location.host, url : window.location.href}, function(data){
		    setting.appId = data.appId;
		    setting.nonceStr = data.nonceStr;
		    setting.timestamp = data.timestamp;
		    setting.signature = data.signature;
		    setting.statistics = options.statistics ? options.statistics : false;
	        //alert("分享确认");
	        wx.config({
	            debug: setting.debug,
	            appId: setting.appId,
	            timestamp: setting.timestamp,
	            nonceStr: setting.nonceStr,
	            signature: setting.signature,
	            jsApiList: setting.jsApiList
	        });
	
	        wx.ready(function () {
	            wx.checkJsApi({
	                jsApiList: [
	                    'onMenuShareTimeline',
	                    'onMenuShareAppMessage',
	                    'onMenuShareQQ',
	                    'onMenuShareWeibo'
	                ],
	                success: function (res) {
	                    //alert(JSON.stringify(res));
	                }
	            });
	
	            var shareObj = {
	                title : options.title,
	                desc : options.desc,
	                link : options.link,
	                imgUrl : options.imgUrl,
	                success: function (res) {
	                    if (setting.statistics)
	                    {
		                    $.post("http://wechat.healen.cn/share/?type=addShareCount&path="+window.location.host+"&inctype=0", {},function(){});
	                    }
	                }	            
	            };
	            
	            var linetitle = options.linetitle ? options.linetitle : options.title;
	            
	            var shareLine = {
	                title : linetitle,
	                link : options.link,
	                imgUrl : options.imgUrl,
	                success: function (res) {
	                    if (setting.statistics)
	                    {
		                    $.post("http://wechat.healen.cn/share/?type=addShareCount&path="+window.location.host+"&inctype=1", {},function(){});
	                    }
	                }	            
	            };
				
	            //分享朋友
	            wx.onMenuShareAppMessage(shareObj);
				
	            //分享朋友圈
	            wx.onMenuShareTimeline(shareLine);
	
	            //分享到qq
	            wx.onMenuShareQQ(shareObj);
	
	            //分享到腾讯微博
	            wx.onMenuShareWeibo(shareObj);
	        });
	
	        wx.error(function(res){
		        
	        });
	    }, "json");
    }
}
