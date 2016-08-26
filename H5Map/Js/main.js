// 定义构造函数和共同的方法
// function MapAPP () {
// 	this.ak="bj4GqTFHTMM3DdWN5yU8vlGQUx5ORZMB";
// 	this.init('container');
// }
// // 初始化函数，作用是显示出正确定位后的地图
// MapAPP.prototype.init = function(id){
// 	var options={
// 	 	// 指示浏览器获取高精度的位置，默认为false
//         enableHighAccuracy: true,
//         // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
//         timeout: 5000,
//         // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
//         maximumAge: 3000
// 	};
// 	if (window.navigator.geolocation) {			
//         window.navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError,options);
//     } 
//     else {
//         alert("Your browser does not support Geolocation!");
//         alert("浏览器不支持html5来获取地理位置信息");
//     }	 	
// };
// // 用于将设备的经纬度转换为百度的经纬度，减小误差
// MapAPP.prototype.convertCoordinate=function(lng,lat,callback){
// 	// 这是原生的跨域访问，也是之前百度官方的方法来进行转换经纬度
// 	// var head=document.getElementsByTagName("head")[0];
// 	// var script=document.createElement("script");
// 	// script.src="http://api.map.baidu.com/geoconv/v1/?coords="+lng+","+lat+"&from=1&to=5&ak="+this.ak+"&callback=MapAPP.prototype.dealJsonpData";
// 	// var a=script.src;
// 	// script.onload=script.onreadystatechange=function () {
// 	//  	if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {            
// 	//        // Handle memory leak in IE
// 	//         script.onload = script.onreadystatechange = null;
// 	//          if (head && script.parentNode) {
// 	//              head.removeChild(script);
// 	//         }
// 	//     }
//  	// 	}
// 	// head.insertBefore(script, head.firstChild);

// 	//这是自己写的getjson跨域，url中最后一个问号是随机生成的一个回调函数方法名，实际操作获得的数据是在done里面
// 	$.getJSON("http://api.map.baidu.com/geoconv/v1/?coords="+lng+","+lat+"&from=1&to=5&ak=bj4GqTFHTMM3DdWN5yU8vlGQUx5ORZMB&callback=?", { 
// 		dataType:'json'
// 	}).done(function (data) {
// 		var point=new BMap.Point(data.result[0].x,data.result[0].y);
// 		callback&&callback(point);
// 	});	
// };
// MapAPP.prototype.locationSuccess=function (position) {
// 	var lng = position.coords.longitude;
// 	var lat = position.coords.latitude;	
// 	MapAPP.prototype.convertCoordinate(lng,lat,function(point) {			
//  	 	var marker=new BMap.Marker(point);
//  	 	var map=new BMap.Map("container");
//  	 	map.addOverlay(marker);
//  	 	map.centerAndZoom(point,15);
//  	});	
// }	
// MapAPP.prototype.locationError=function (error) {
// 	if(error.code == 1) {
//         alert("Error: Access is denied!");
//        	MapAPP.prototype.convertCoordinate(116.404, 39.915,function(point) {			
// 	 	 	var marker=new BMap.Marker(point);
// 	 	 	var map=new BMap.Map("container");
// 	 	 	map.addOverlay(marker);
// 	 	 	map.centerAndZoom(point,15);
// 	 	});	
//     }          
//     else if( error.code == 2) {
//        alert("Error: Position is unavailable!");
//     }
// }

// // 开始调用函数的方法
// var appTest=new MapAPP();




// 对象初始化器来写JS

// 初始化一个实际的Map对象
var MapAPP={
	ak:"bj4GqTFHTMM3DdWN5yU8vlGQUx5ORZMB",
	id:"container",
	init:function () {
		var options={
	 	// 指示浏览器获取高精度的位置，默认为false
	    enableHighAccuracy: true,
	    // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
	    timeout: 5000,
	    // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
	    maximumAge: 3000
		};
		if (window.navigator.geolocation) {			
	        window.navigator.geolocation.getCurrentPosition(MapAPP.locationSuccess, MapAPP.locationError,options);
	    } 
	    else {
	        alert("Your browser does not support Geolocation!");
	        alert("浏览器不支持html5来获取地理位置信息");
	    }	 	
	},
	// 用于将获取到设备的经纬度转换为百度的经纬度，减小误差
	convertCoordinate:function (lng,lat,callback) {
		$.getJSON("http://api.map.baidu.com/geoconv/v1/?coords="+lng+","+lat+"&from=1&to=5&ak="+MapAPP.ak+"&callback=?", { 
			dataType:'json'
		}).done(function (data) {
			var point=new BMap.Point(data.result[0].x,data.result[0].y);
			callback&&callback(point);
		});	
	},
	//定位成功后，初始化地图的样式等等
	locationSuccess:function (position) {
		var lng = position.coords.longitude;
		var lat = position.coords.latitude;	
		MapAPP.convertCoordinate(lng,lat,function(point) {			
	 	 	MapAPP.drawMap(point);
	 	});	
	},
	//定位失败后，给用户的反馈信息
	locationError:function (error) {
		if(error.code == 1) {
	        alert("Error: Access is denied!");
	        var point=new BMap.Point(116.404, 39.915);	
	 	 	MapAPP.drawMap(point);
	    }          
	    else if( error.code == 2) {
	        alert("Error: Position is unavailable!");
	        var point=new BMap.Point(116.404, 39.915);	
	 	 	MapAPP.drawMap(point);
	    }
	},
	// 根据坐标画出地图
	drawMap:function (point) {
		var marker=new BMap.Marker(point);
 	 	var map=new BMap.Map(MapAPP.id);
 	 	var traffic=new BMap.TrafficLayer();
 	 	map.addTileLayer(traffic);
 	 	map.addOverlay(marker);
 	 	map.addControl(new BMap.GeolocationControl());
 	 	map.centerAndZoom(point,15);
	}

}
// 调用init方法进行初始化，显示当前位置
MapAPP.init();