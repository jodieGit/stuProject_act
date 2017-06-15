var main = new function()
{
	this.video_total = 6;
	this.video_now = 1;
}

main.init = function()
{
	this.t(".p1_text",100,"move_from_up_TOTO");
	this.t(".p1_line1",1000,"move_from_leftDown_short");
	this.t(".p1_line4",1000,"move_from_rightUp_short");
	this.t(".p1_line2",1000,"move_from_leftDown_short");
	this.t(".p1_line3",1000,"move_from_rightUp_short");	
	$(".p1_btn").delay(1000).fadeIn(500);
	$("#p1_bg").delay(1500).fadeIn(700);
}

/*
* 1.播放视频
*/
main.play = function()
{
	// video
	for(var i=1;i<=this.video_total;i++)
	{
		$("#video"+i).hide();
		if(i == this.video_now)
		{
			$("#video"+i).show();
		}

		this.g("video"+i).pause();
	}
	
	this.g("video"+this.video_now).play();
	this.video_now++;

	// music
	this.playByWxAgain("music");

	// btn
	$(".continue_btn").hide();
}

/*
* 2.播放结束
*/
main.end = function()
{
	if(this.video_now > this.video_total)
	{
		$(".share_btn").show();
	}
	else
	{
		// BTN 
		if(this.video_now != 2)
		{
			$("#video"+(this.video_now-1)+"_btn").show();	
		}
	}

	// music
	// this.g("music").pause();
}

/* ------------------------------------- Default ------------------------------------------ */
main.g = function(id)
{
	return document.getElementById(id);
}

main.playByWx = function(id)
{
	document.addEventListener("WeixinJSBridgeReady",function()
	{
	    document.getElementById(id).play();
	},false);	
}

main.playByWxAgain = function(id)
{
	var _music = this.g(id);
	if(typeof WeixinJSBridge != "undefined")
	{
		WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
			_music.play();
		});
	}
	else
	{
		_music.play();
	}
}

main.t = function(name,time,cn)
{
	setTimeout(function()
	{
		$(name).show().addClass(cn);
	},time);
}

main.removeClass = function(obj)
{
	var _thisClass = obj.attr("class");
	if(typeof(_thisClass) == "string")
	{
		var _index = _thisClass.indexOf(" ");
		if(_index != -1)
		{
			var _ori = _thisClass.substr(0,_index);
			obj.attr("class",_ori).hide();
		}		
	}

	return obj;
}