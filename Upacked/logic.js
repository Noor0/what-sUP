var d = new Date();
var moreThan10 = true;
var minutes=0;
var geo = navigator.geolocation;

function go(){
	console.log('in go');
	if(navigator.geolocation){
		console.log('in navig');
		

		settingTime();
		show();
		//set the date
		document.getElementById("the-date").innerHTML=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
		var day="";

		switch(d.getDay()){
			case 0:
			day="Sunday";
			break;

			case 1:
			day="Monday";
			break;

			case 2:
			day="Tuesday";
			break;

			case 3:
			day="Wednesday";
			break;

			case 4:
			day="Thursday";
			break;

			case 5:
			day="Friday";
			break;

			case 6:
			day="Saturday";
			break;
		};

		document.getElementById('day-span').innerHTML=day;
		var timeCheck = setInterval(settingTime, 10000);
	}
		
		
	else{
		document.write("<h1 style='text-align:center;'><b>You have an old version of chrome<br>Please update!</b></h1>");
	}
}
go();

function show(){
	console.log('sending request');
	geo.getCurrentPosition(function(positionObj){
		var coord = positionObj.coords;
		console.log("lat = "+coord.latitude+"lon = "+coord.longitude);
		var request = new XMLHttpRequest();
		var loc="http://api.openweathermap.org/data/2.5/weather?lat="+coord.latitude+"&lon="+coord.longitude+"&units=metric&APPID=0e6001dae144827b90a10108c09b8807";
		request.open("GET",loc,true);
		request.send();
		request.onload=function(){
			var weather = JSON.parse(request.responseText);
			document.getElementById("city").innerHTML=weather.name+","+weather.sys.country;
			document.getElementById("description").innerHTML=weather.weather[0].main;
			document.getElementById("the-icon").className="owf owf-"+weather.weather[0].id;
			document.getElementById("more-weather").innerHTML=weather.weather[0].description;
			var params=document.getElementsByClassName("params");
			params[0].getElementsByClassName("amplitude")[0].innerHTML=weather.main.humidity+"%";
			params[1].getElementsByClassName("amplitude")[0].innerHTML=weather.wind.speed+"m/s";
			params[2].getElementsByClassName("amplitude")[0].innerHTML=weather.wind.deg+"<sup>o</sup>";
			params[3].getElementsByClassName("amplitude")[0].innerHTML=weather.main.pressure+"hPa";
			params[4].getElementsByClassName("amplitude")[0].innerHTML=weather.clouds.all+"%";
			document.getElementById('temprature').innerHTML=weather.main.temp+"<sup>o</sup>C";
		};
	});
}

function settingTime(){
		var hour =d.getHours();
		if(hour > 12){
			hour-=12;
			document.getElementById('time').innerHTML=hour+":"+d.getMinutes()+" PM";
		}
		else{
			document.getElementById('time').innerHTML=hour+":"+d.getMinutes()+" AM";
		}

	}
