// 第一个视频
$(".p1_btn").bind("touchstart",function()
{
	$("#page1").fadeOut(100);
	$(".go_btn").delay(2000).fadeIn(100);
	main.play();
	main.g("music").play();
});

// 第一个视频结束的按钮
$(".go_btn").bind("touchstart",function()
{
	$(".go_btn").fadeOut(100);
	main.play();
});

// 继续播放下一个视频
$(".continue_btn").bind("touchstart",function()
{
	main.play();
});

// share
$(".share_btn").bind("touchstart",function()
{
	$("#share").fadeIn(500);
});

$("#share").bind("touchstart",function()
{
	$(this).fadeOut(500);
});

// ---------------------------- video ----------------------------- //

// 按钮出现
for(var i=1;i<=5;i++)
{
	main.g("video"+i).ontimeupdate = function()
	{
		switch(this.id)
		{
			case "video1":
				if(this.currentTime > 7)
				{
					this.pause();
				}
			break;

			case "video2":
				if(main.video_now == 3 && this.currentTime > 13.7)
				{
					main.end();
				}

				// 防止黑屏
				if(this.currentTime > 14.5)
				{
					this.pause();
				}
			break;

			case "video3":
				if(main.video_now == 4 && this.currentTime > 15)
				{
					main.end();
				}

				if(this.currentTime > 16.5)
				{
					this.pause();
				}
			break;

			case "video4":
				if(main.video_now == 5 && this.currentTime > 13.5)
				{
					main.end();
				}

				if(this.currentTime > 14.5)
				{
					this.pause();
				}
			break;

			case "video5":
				if(main.video_now == 6 && this.currentTime > 13.7)
				{
					main.end();
				}

				if(this.currentTime > 15.2)
				{
					this.pause();
				}
			break;
		}
	}
}

$("#video6").bind("ended",function()
{
	$("#video6").hide();
	main.video_now++;
	main.removeClass($('.p1_line1'));
	main.removeClass($('.p1_line2'));
	main.removeClass($('.p1_line3'));
	main.removeClass($('.p1_line4'));
	main.removeClass($('.p1_text'));
	main.removeClass($('.p1_btn'));
	main.removeClass($('#p1_bg'));									

	// end animate
	$("#page1").show();
	main.t(".end_text",600,"move_from_up_TOTO");
	main.t(".p1_line1",600,"move_from_leftDown_short");
	main.t(".p1_line4",600,"move_from_rightUp_short");
	main.t(".p1_line2",600,"move_from_leftDown_short");
	main.t(".p1_line3",600,"move_from_rightUp_short");	
	$(".share_btn").delay(600).fadeIn(500);
	$("#p1_bg").delay(1000).fadeIn(700);
})

$(window).bind("touchmove",function(event)
{
	event.preventDefault();
})