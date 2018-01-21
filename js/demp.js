var aa="123";
console.log(aa);
var button=document.getElementsByClassName("button");
console.log(button);
// 当前页面加载的时候
window.onload=function(){
		//当点击按钮时会出现弹窗
	button[0].onclick=function(){
			//alert("这是一个弹窗")
			var city=document.getElementsByClassName("city");
			console.log(city);
			//让城市消失
			city[0].style.display="none";
	}
	//获取pos这个元素
	var pos=document.getElementsByClassName("pos");
	pos[0].onclick=function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="block";
	}
}
//引入远程数据
//关于城市的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(city);
	}
})
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var tianqi=obj.data;
		console.log(tianqi);            
		// var tem=tianqi.weather
	}
})

