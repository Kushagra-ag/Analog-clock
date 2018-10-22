	window.onload
	{
		function preloader()
		{
			document.getElementsByTagName('main')[0].classList.toggle = "main_";
			document.getElementsByClassName('preload')[0].classList.toggle = "preload_2";
		}

		var canvas = document.querySelector('.myCanvas');
		var canvas3 = document.querySelector('.myCanvas_3');
		var ctx = canvas.getContext("2d");
		var ctx3 = canvas3.getContext("2d");
		var radius = canvas.width/3;
		var audio = document.querySelector('.tick');
		audio.volume = 0.9;
		var num=1, temp = 50;


		ctx.translate(canvas.width/2, canvas.height/2);
		ctx3.translate(canvas.width/2, canvas.height/2); 
		

		setInterval(time,1000,ctx3,radius);
		drawclock(ctx, radius);
		numbers(ctx, radius);
		

		function drawclock(ctx, radius)
		{
			ctx.lineWidth = 2;

			ctx.beginPath();
			ctx.arc(0,0,radius,15*Math.PI/180,75*Math.PI/180);
			ctx.strokeStyle = "#000";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(0,0,radius,105*Math.PI/180,165*Math.PI/180);
			ctx.strokeStyle = "#000";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(0,0,radius,195*Math.PI/180,255*Math.PI/180);
			ctx.strokeStyle = "#000";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(0,0,radius,285*Math.PI/180,345*Math.PI/180);
			ctx.strokeStyle = "#000";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(0,0,radius*0.1,0,2*Math.PI);
			ctx.strokeStyle = "#000";				//the small circle at centre
			ctx.lineWidth = 1;
			ctx.stroke();

		}

		function numbers(ctx, radius)
		{
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = radius*0.40 + "px handlee";
			ctx.fillStyle = "#000";

			for(num=3; num<13; num+=3)
			{
				let deg = num*Math.PI/6;

				ctx.rotate(deg);
				ctx.translate(0, -radius);
				ctx.rotate(-deg);
				ctx.fillText(num,0,0);
				ctx.rotate(deg);
				ctx.translate(0, radius);
				ctx.rotate(-deg);
			}
		}

		function time(ctx3, radius)
		{	

			let time = new Date();
			let hours = time.getHours();
			let min = time.getMinutes();
			let sec = time.getSeconds();
			let d = time.getDate(),supscript = 'th';
			

			//audio.play();

			if(d==1)
				supscript = 'st';
			else if(d==2)
				supscript = 'nd';
			else if(d==3)
				supscript = 'rd';

			if(temp!=d)
			{
				ctx.rotate(5*Math.PI/6);
				ctx.translate(0,-radius*0.735);
				ctx.strokeStyle = "#000";		//current date code
				ctx.rotate(-5*Math.PI/6);
				ctx.fillStyle = "#fff";
				ctx.fillRect(0,0,44,22);
				ctx.strokeRect(0,0,44,22);
				ctx.rotate(5*Math.PI/6);

				ctx.textAlign = "start";
				//ctx.rotate(5*Math.PI/6);
				ctx.translate(0, -radius*0.065);
				ctx.rotate(-5*Math.PI/6);			//updating the date
				ctx.font = radius*0.08 + "px handlee";
				ctx.fillStyle = "#000";
				ctx.fillText(d+supscript,0,0);
				ctx.rotate(5*Math.PI/6);
				ctx.translate(0, radius*0.8);
				ctx.rotate(-5*Math.PI/6);
				temp = d;
			}


			ctx3.fillStyle = "#fff"
			ctx3.fillRect(-canvas.width/2,-canvas.width/2,canvas.width,canvas.width);
			//document.getElementById('myCanvas_3').style.backgroundImage = "url('background.png')";
			//document.getElementById('myCanvas_3').style.opacity = 0.5;

			hours = hours % 12;
			hours = (hours*Math.PI/6) + (min*Math.PI/360) + (sec*Math.PI/21600);
			hands(ctx3, hours, radius*0.4, radius*0.06);

			min = (min*Math.PI/30) + (sec*Math.PI/1800);
			hands(ctx3, min, radius*0.7, radius*0.04);

			sec = (sec*Math.PI/30);
			hands_sec(ctx3, sec, radius*0.8, radius*0.009);

		}

		function hands(ctx3, pos, len, width)
		{
			
			ctx3.beginPath();
			ctx3.lineWidth = width;
			ctx3.strokeStyle = "#000";
			ctx3.moveTo(0,0);
			ctx3.rotate(pos);
			ctx3.lineTo(0, -len);
			ctx3.stroke();
			ctx3.rotate(-pos);

		}

		function hands_sec(ctx3, pos, len, width)
		{
			ctx3.beginPath();
			ctx3.lineWidth = width;
			ctx3.strokeStyle = "#d00";
			ctx3.rotate(pos);
			ctx3.moveTo(0,len/6);
			ctx3.lineTo(0, -len);
			ctx3.stroke();
			ctx3.rotate(-pos);

			ctx3.beginPath();
			ctx3.arc(0,0,radius*0.02,0,2*Math.PI);
			ctx3.fillStyle = "#d00";
			ctx3.fill();			

		}

// Stop-watch code starts ----

		var myTimer;
		var timer = document.querySelector('.timer');
		var start_ = document.querySelector('.start_button');
		var pause_ = document.querySelector('.pause_button');
		var lap_ = document.querySelector('.lap_button');
		var reset_ = document.querySelector('.reset_button');
		var resume_ = document.querySelector('.resume_button');
		var stop_ = document.querySelector('.stop_button');
		var sec_delay;
		var count = 0,flag=1,check=1;
		var min_t = 0, hours_t = 0;

		function start(event)
		{
			var time_ref = new Date();
			var sec_ref = time_ref.getSeconds();
			
			start_.style.opacity = "0";

			pause_.style.display = "inline-block";
			
			document.getElementsByClassName('lap_no')[0].style.display = "inline";

			lap_.style.display = "inline-block";
			
			lap_div.style.display = "block";
			lap_div.className = "anim_div";

			timer.classList.toggle('anim');
			pause_.classList.toggle('anim_pause');
			
			myTimer = setInterval(diff,1000,sec_ref,0);
		}


		function diff(sec_ref,sec_delay)
		{
			let date_cur = new Date();
			let sec_cur = date_cur.getSeconds();
			let sec_final;
			//console.log("current- "+sec_cur);

			if(flag == 0 || sec_cur == 0 || check == 0)
			{		
				//console.log("in the if block of flag");
				flag = 0;
				check = 1;
				sec_cur += 60;
			}

			if(sec_cur == 59)
				check = 0;

			sec_final = (sec_cur - sec_ref + sec_delay) % 60;			
			
			if(sec_final == 0)
			{				
				//console.log("in the if block of final=0");
				min_t = (++min_t)%60;

				if(min_t == 0)
					hours_t = (++hours_t)%12;
			}



			//remove the previously appended zeroes
			sec_final = parseInt((sec_cur - sec_ref + sec_delay)%60, 10);	
			min_t = parseInt(min_t, 10);
			hours_t = parseInt(hours_t, 10);

			//prefix zero to single digits
			if(hours_t < 10)
				hours_t = "0" + hours_t;
			if(min_t < 10)
				min_t = "0" + min_t;
			if(sec_final < 10)
				sec_final = "0" + sec_final;

			
			timer.innerHTML = (hours_t).toString()+ " : " + (min_t).toString() + " : " + (sec_final).toString();
		}
		

		function lap(event)
		{
			let data = timer.innerHTML;
			let p = document.getElementsByClassName('lap_no');

			if(count == 0)
			{
				p[0].innerHTML = "   " + data;
				p[1].style.display = "inline"; 
				count++;
			}

			else if(count == 1)
			{
				p[1].innerHTML = "   " + data;
				p[2].style.display = "inline";
				count++;
			}

			else if(count == 2)
			{
				p[2].innerHTML = "   " + data;
				
				lap_.disabled = true;
				lap_.style.color = "#666";
				lap_.style.borderColor = "#666";
				lap_.style.cursor = "default";
				stop_.style.display = "inline-block";
				stop_.style.marginLeft = "-200px";
				pause_.style.display = "none";

				count++;
			}
		}
		
		
		function pause(event)
		{
			pause_.style.display = "none";
			lap_.style.display = "none";
			resume_.style.display = "inline-block";

			stop_.style.display = "inline-block";
			stop_.style.marginLeft = "0";

			clearInterval(myTimer);
			
			sec_delay = timer.innerHTML.slice(-2);
			sec_delay = parseInt(sec_delay,10);
		}


		function resume(event)
		{
			var date_cur = new Date();
			var sec_cur = date_cur.getSeconds();

			resume_.style.display = "none";
			pause_.style.display = "inline-block";
			pause_.style.marginLeft  = "-200px";
			
			lap_.style.display = "inline-block";
			stop_.style.display = "none";

			myTimer = setInterval(diff,1000,sec_cur,sec_delay);
		}


		function reset(event)
		{
			let i=0;
			count=0, min_t=0,hours_t=0;
			start_.style.opacity = "1";
			
			timer.classList.toggle('anim');
			timer.innerHTML = "00 : 00 : 00";
			
			pause_.classList.toggle('anim_pause');

			reset_.style.display = "none";
			
			lap_.style.display = "none";
			lap_.style.color = "#000";
			lap_.style.borderColor = "#333";
			lap_.style.cursor = "pointer";
			lap_.disabled = false;

			lap_div.className = "anim_div_2";

			var p = document.getElementsByClassName('lap_no');
			while(i!=3)
			{
				p[i++].innerHTML = "";
			}
		}

		function stop(event)
		{
			stop_.style.display = "none";
			reset_.style.display = "inline-block";
			resume_.style.display = "none";
			lap_.style.display = "none";
			clearInterval(myTimer);
		}
}
