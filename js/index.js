//引入远程数据
//关于城市的信息
var city;
var tianqi;
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType: "jsonp",
	method: "get",
	success: function(obj){
		city=obj.data;
		console.log(city);
	}
})
//获取天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}

}) 

 
//页面加载函数
window.onload=function(){
	
	update();

	//页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	//点击城市出现城市详情页
	pos.onclick=function(){
		cityBox.style.display="block";

		//点击城市详情，跳转首页，出现该城市的天气情况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
		var chengshi=this.innerHTML;
		//调用ajax函数
		AJAX(chengshi);
	}
	
		}
	}
	var searchBox=document.getElementsByClassName("searchBox")[0];
	var button=document.getElementsByClassName("button")[0];
	var text;
	console.log("button");
	searchBox.onfocus=function(){
		button.innerHTML="确认";
		text=searchBox.value;
		// console.log(text);
	}

		button.onclick=function(){
		var neirong=button.innerHTML;
		
		if(neirong=="取消"){
			var city3=document.getElementsByClassName("city")[0];
			city3.style.display="none";
		}else{
			for(let i in city){
				for(let j in city){
					if(text==j){
						AJAX(text);
						return;
					}else{
						alert("没有此城市的天气情况");
						return;
					}

				}

			}
		     }			
		}
	}


		
//获取点击城市的天气信息
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
	})
}
//获取数据的函数
function update(){
	var pos=document.getElementsByClassName("pos")[0];
	// console.log(pos);
	pos.innerHTML=tianqi.city;
//空气质量(tag  标签)
	var quality_level=document.getElementsByTagName("h5")[0];
	// console.log(quality_level);
	quality_level.innerHTML=tianqi.weather.quality_level;

	var current_temperature=document.getElementsByClassName("title1")[0];
	// console.log(current.temperature);
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
//
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;
//当前风的方向
	var wid_direction=document.getElementsByClassName("wind_der")[0];
	// console.log(wid_direction);
	wid_direction.innerHTML=tianqi.weather.wind_direction;

//当前风级
	var wind_lever=document.getElementsByClassName("wind_lever")[0];
	wind_lever.innerHTML=tianqi.weather.wind_level+"级";
//今天最高温度
	var heighter=document.getElementsByClassName("heighter")[0];
	heighter.innerHTML=tianqi.weather.dat_high_temperature+"°";

	var lower=document.getElementsByClassName("lower")[0];
	lower.innerHTML=tianqi.weather.dat_low_temperature+"°";

	//明天最高温度
	var tomorrow_heighter=document.getElementsByClassName("tomorrow_heighter")[0];
	tomorrow_heighter.innerHTML=tianqi.weather.tomorrow_high_temperature+"°";

	var tomorrow_lower=document.getElementsByClassName("tomorrow_lower")[0];
	tomorrow_lower.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";
	//今天的天气情况
	var today_icon=document.getElementsByClassName("conpic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png" )`;
	//明天的天气
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;
	//今天天气情况：多云
	var con=document.getElementsByClassName("con")[0];
	con.innerHTML=tianqi.weather.dat_condition;
	//明天天气情况：多云
	var con1=document.getElementsByClassName("con1")[0];
	con1.innerHTML=tianqi.weather.tomorrow_condition;
	//没小时的天气情况
	//让程序动态的创建

//hourIyArr 变量
//
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];

	for(let i in hourlyArr){

		//createElement创建元素div   box1变量名字（与前面一致）
		var box1=document.createElement("div");
		//名字 。 类名=“块”
		box1.className="box"; 
	//类名 加“”
	//创建time块
		

		var time=document.createElement("div");
		//创建类名
		time.className="time";
		//添加到box快(父级元素)中
		box1.appendChild(time);
		//添加内容
		time.innerHTML=hourlyArr[i].hour+":00";
		//建图标块
		
		var icon=document.createElement("div");
		icon.className="icon";
		box1.appendChild(icon);
		icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`
		// icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`

		var timeTem=document.createElement("div");
		timeTem.className="timeTem";
		box1.appendChild(timeTem);
		// timeTem.innerHTML=hourlyArr[i].temperature+"°";
		timeTem.innerHTML=hourlyArr[i].temperature+"°";
		//添加到box
		wrap.appendChild(box1);
}



		

//未来15天
	// var dayArr=tianqi.weather.复制;
	// console.log(dayArr);

	// var wrap1=document.getgetElementsByClassName("wrap1")[0];

	// for(let i in hourIyArr){
	// 	var box2=document.createElement("div");
	// 	//名字 。 类名=“块”
	// 	box2.className="box"; 
	// 	var data=
	// 	
//未来15天天气情况
	var dayArr=tianqi.weather.forecast_list;
	var fourth=document.getElementsByClassName("fourth")[0];
	for(let i in dayArr){
		var box2=document.createElement("div");
		box2.className="box2";

		var date=document.createElement("div");
		date.className="date";
		box2.appendChild(date);
		date.innerHTML=dayArr[i].date;

		var con1=document.createElement("div");
		con1.className="con1";
		box2.appendChild(con1);
		con1.innerHTML=dayArr[i].condition;

		var conpic1=document.createElement("div");
		conpic1.className="conpic1";
		box2.appendChild(conpic1);
		conpic1.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

		var tem1=document.createElement("div");
		tem1.className="tem1";
		box2.appendChild(tem1);
		tem1.innerHTML=dayArr[i].high_temperature+"°";

		var tem2=document.createElement("div");
		tem2.className="tem2";
		box2.appendChild(tem2);
		tem2.innerHTML=dayArr[i].low_temperature+"°";

		var wind=document.createElement("div");
		wind.className="wind";
		box2.appendChild(wind);
		wind.innerHTML=dayArr[i].wind_direction;

		var size=document.createElement("div");
		size.className="size";
		box2.appendChild(size);
		size.innerHTML=dayArr[i].wind_level+"级";

		fourth.appendChild(box2);
	}
		
	var city1=document.getElementsByClassName("city")[0];
	for(let i in city){
		var citys=document.createElement("div");
		citys.className="citys";
	
		var title=document.createElement("div");
		title.className="title";
		title.innerHTML=i;
		citys.appendChild(title);

		var con=document.createElement("div");
		con.className="con";
		
	for(let j in city[i]){
		var box=document.createElement("div");
		box.className="box";
		box.innerHTML=j;
		con.appendChild(box);
	}	
	//吧con放进citys里面去
	citys.appendChild(con);
	city1.appendChild(citys);

	}
}