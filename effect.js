window.onload = function(){
	var box = document.getElementById("box");
	var oNavlist = document.getElementById("nav").children;
	var slider = document.getElementById("slider");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var index = 1;
	var isMoving = false;
	var tag = 1;
	var text = document.getElementById("text");
	//提示
	setInterval(function(){
		var le = parseInt(text.style.left); 
		if(le <= -308){
			text.style.left = "800px";
			le = 800;
			tag = 0;
			animate(text,{left:le-10*tag},function(){tag++;});
		}else{
			animate(text,{left:le-10*tag},function(){tag++;});
		}
	},40);
	//轮播下一张函数
	function next(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index++;
		navChange();
		animate(slider,{left:-1200*index},function(){
			if (index == 6) {
				index = 1;
				slider.style.left = "-1200px";
			}
			isMoving = false;
		});
	}
	//轮播上一张函数
	function prev(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index--;
		navChange();
		animate(slider,{left:-1200*index},function(){
			if (index == 0) {
				index = 5;
				slider.style.left = "-6000px";
			}
			isMoving = false;
		});
	}
	var timer = setInterval(next,3000);
	//鼠标划入清定时器
	box.onmouseover = function(){
		animate(left,{opacity:50});
		animate(right,{opacity:50});
		clearInterval(timer);
	}
	//鼠标划出开定时器
	box.onmouseout = function(){
		animate(left,{opacity:0});
		animate(right,{opacity:0});
		timer = setInterval(next,3000);
	}
	right.onclick = next;
	left.onclick = prev;
	//按钮点击事件
	for (var i = 0; i < oNavlist.length; i++) {
		oNavlist[i].idx = i;
		oNavlist[i].onclick = function(){
			index = this.idx+1;
			navChange();
			animate(slider,{left:-1200*index});
		}
	}
	//按钮背景色的切换
	function navChange(){
		for (var i = 0; i < oNavlist.length; i++) {
			i == 0 ? oNavlist[i].style.color = "red":""; 
			oNavlist[i].className = "";
		}
		if (index == 6) {
			oNavlist[0].style.color = "#fff";
			oNavlist[0].className = "active";
		}else if(index == 0){
			oNavlist[4].className = "active";
		}else{
			index == 1 ? oNavlist[index-1].style.color = "#fff":"";
			oNavlist[index-1].className = "active";
		}
	}
}