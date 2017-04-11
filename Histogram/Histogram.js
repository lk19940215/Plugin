//****************参数说明****************
//				
//	{1@ container}	容器,即canvas绘制的目标区域;默认为body;	(若高度有错,CSS设置html、body的高度为100%);			格式:cantainer:document.getElementById(),ByTagsName()等
// 	{2@ dataArr}:	需要进行绘制显示的数据,	[数组类型(一维、二维)];	格式:[1,2,3] or[[1,2],[3,4]]
//	{3@ xAis}:		X轴,每个区间显示的文字,	[数组类型(一维)];		格式:["一","二","三"]	
//	{4@ color}:		绘制直方图的颜色;	项数应该与dataArr一项数据个数相等;	格式:["一","二","三"]
//	{5@ legend}:		对不同颜色直方图进行说明的文字;	项数应与color项数相等;	格式:["一","二","三"]
//	{6@ emptySpace}	直方图之间的空隙;	若dataArr为二维数组即以上,规定每个区域内,直方图之间的空隙;
//	{7@ width}		直方图的宽度;	
//	{8@ xAisFontSize}X轴下方文字字体大小; 	格式"15px"
//	{9@ yAisFontSize}y轴左方文字字体大小;		格式"15px"
//	
//	其中,4,6,7,8,9均有默认值(可不配置);1,2,3,5根据需要,应该主动传值
//		e.g 	var h1 = DrawHistogram({
//					container : document.getElementById("test"),
//					dataArr :	[540, 390, 930, 110, 125],
//					width :  10,
//					emptySpace : 5,
//					xAis : ["周一", '周二', "周三", "周四", "周五"]
//				})
//	
//		更新数据,重绘功能: 
//				在上例中当 h1.dataArr = 新值,
//					   or h1.xAis = 新值,进行更新重绘;
//		resize功能,手机横竖屏切换,PC改动窗口大小,自动重绘;
//
//****************参数说明****************

;(function(window, document) {
	var __DEFAULT__ = { 			//默认参数
		dataArr: [82, 154, 268, 210, 370], 
		xAis: ["2016-06", "2016-07", "2016-08", '2016-09', "2016-10"], 
		legend:["上午","下午","晚上"], 
		xAisFontSize: "12px",
		yAisFontSize: "12px",
		color:["#c23531","#91c7ae","#d48265","#ca8622","#2f4554","#61a0a8","#37a"],
		container: document.body, 
		emptySpace: 8,	
		width: 15, 
		startX: 0, 
	};
	
	function Histogram( x, y, w, h, scaleY, fillColor,startH){	//x,y,w,h为绘制矩形的常规参数;startH为动画参数.
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.scaleY = scaleY;
		this.fillColor = fillColor;
		this.startH = startH || 0;
	}
	
	Histogram.prototype = {
		
		process: function(ctx){					//事件调用
			this.draw(ctx);
		},
		
		draw: function(ctx){
			var startH = this.startH,
				x = this.x,
				y = this.y,
				h = this.h,
				w = this.w,
				color = this.fillColor,
				scaleY = this.scaleY,
				_this = this;
				
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				
				window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
			(function dramFrame() {
				
				var timer = window.requestAnimationFrame(dramFrame);
				var speed = (h - startH) * 0.2;
				if(startH < h) {
					ctx.save();
					ctx.scale(1, scaleY);
					startH = Math.ceil(startH);
					ctx.fillStyle = color;
//								ctx.fillStyle = _this.gradientF(ctx, x, y, x + w, y - startH);
					ctx.fillRect(x, y, w, -startH);
					ctx.restore();
					startH += speed;
				}else{
					window.cancelAnimationFrame(timer);
					_this.text(ctx, x, -h, w, scaleY);		//绘制文字；
					console.log("若没有动画,启用下面的代码");
				}
			}());
			
			/*若没有动画效果,启用以下的代码*/
//				var timer = setTimeout(function drawRect() {
//					var speed = (h - startH) * 0.2;
//					if(startH < h) {
//						
//						ctx.save();
//						ctx.scale(1, scaleY);
//						startH = Math.ceil(startH);
//						ctx.fillStyle = _this.gradientF(ctx, x, y, x + w, y - startH);
//						ctx.fillRect(x, y, w, -startH);
//						ctx.restore();
//						startH += speed;
//						setTimeout(drawRect, 30);
//					}else{
//						_this.text(ctx, x, -h, w, scaleY);		//绘制文字；
//						clearTimeout(timer);
//						console.log("Animation stop");
////						_this.clearRectangle(ctx, x, y, w, h, scaleY);
//					}
//				}, 30);
		},
		
		gradientF: function(ctx, x, y, w, h){		//颜色渐变函数 （后续优化为：颜色可配置）
			var gradient = ctx.createLinearGradient( x, y, w, h);
				gradient.addColorStop(1, "#ca8622");		//#4f6092  1E90FF
				gradient.addColorStop(0, "#ca8622");		//#37a  008b8b
			return gradient;
		},
		
		text: function(ctx, x, h, w, scaleY){
			var spacing = Math.ceil(w - ctx.measureText(-h).width) * 0.5;
			ctx.save();
			ctx.textAlign = "start";
			ctx.textBaseline = "bottom";
			ctx.fillText( -h, x + spacing, scaleY * h);		//使文字居中显示
			ctx.restore();
		}
		
	};
	
	var DrawHistogram = function(options) { //插件定义

		if(!(this instanceof DrawHistogram)) return new DrawHistogram(options);

		this.options = options || {};

		this.extend(this.options, __DEFAULT__); //配置默认项，（用户输入的取代，没配置的使用默认值）;
		
		if(this.options.dataArr.length != this.options.xAis.length) {
			alert("数据个数不相等"); //数据,文字个数应该对应
			return;
		}
		
		this.process();
	};

	DrawHistogram.prototype = {

		process: function() {		//处理函数;
			
			this.init();			//初始化
			
			this.fillTextStyle(); 	//字体颜色,方位配置

			this.cSys(); 			//绘制坐标轴

			this.histogramDraw(); 	//绘制直方图
			
			this.top();				//上方文字注解
			
			this.resize();			//添加resize事件
		},
		
		init: function() {
			this.canvas = document.createElement("canvas");

			this.options.container.appendChild(this.canvas); //创建一个canvas元素，并放入DOM中；

			if(!this.canvas.getContext) {
				this.error();
				return;
			}

			this.ctx = this.canvas.getContext("2d");

			for(var i in this.options) {					//勾子函数  ES5
				if(i == "dataArr" || i == "xAis") this.defineReactive(this.options, i, this.options[i]);
			}
			
			var canvas = this.canvas,
				ctx = this.ctx,
				options = this.options,
				max;

			this.W =
				canvas.width =
				Math.max(options.container.scrollWidth, options.container.clientWidth) * 0.95;
			this.H =
				canvas.height =
				Math.max(options.container.scrollHeight, options.container.clientHeight) * 0.95;

			canvas.id = "drawHistogramCanvas";

			this.eachSpacing = Math.floor(this.W * 0.9 / options.xAis.length); //每一个区段的间隔大小
			
			max = Math.max.apply(null, this.countArr(options.dataArr)); //查找输入数据中的最大值，来配置坐标Y最高段处的大小

			this.scaleY = (this.H * 0.8) / this.acount(max); //缩放比例
			
			//配置坐标（0,0）原点在容器内的位置
			this.originX = this.W * 0.1;
			this.originY = this.H * 0.95;
			
			this.num = this.acount(max) / 5;

			this.splitY = (this.H * 0.8 / 5); 			//画图高度平分为五份,方便绘制虚线,虚线左边文字
			
			ctx.translate(this.originX, this.originY); //转换坐标系的原点
			
			
		},

		cSys: function(){
			
			var options = this.options,
				ctx = this.ctx,
				_this = this,
				textArr = [];		//用于绘制横坐标文字;
				
			var textW = 0,
				setLineDash = false;
			
			if (ctx.setLineDash) {
				setLineDash = true;
			}
			
			ctx.save();
			
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -this.H * 0.8); // 乘以0.8是为了上方留出空挡

			ctx.moveTo(0, 0);
			ctx.lineTo(this.W * 0.9, 0)
			ctx.closePath();
			ctx.stroke();
			
			ctx.save();
			ctx.font = options.yAisFontSize + " Microsoft yahei";
			ctx.textBaseline = "middle";
			ctx.textAlign = "start";
			
			/*画虚线,IE10级以下,没有 setLineDash*/
			for(var i = 0; i <= 5; i++) {
				if (setLineDash) {
					if (i) {
						ctx.beginPath();
						ctx.strokeStyle = "#c1c1c1";
						ctx.setLineDash([5, 8])
						ctx.moveTo(0, -i * this.splitY);
						ctx.lineTo(this.W, -i * this.splitY);
						ctx.closePath();
						ctx.stroke();
					}
				}else{
					if (i) {
						this.drawDasheLine(ctx, 0, -i*this.splitY, this.W * 0.9, -i*this.splitY);
					}
				}
				textW = ctx.measureText(i * this.num).width;
				ctx.fillText(i * this.num, -textW - 4, -i * this.splitY);
			}
			ctx.restore();
			/*画虚线*/
			
			ctx.restore();
			
			/*横坐标下方文字*/
			ctx.save();
			options.xAis.forEach(function(item, index){
				textArr.push( options.startX + index * _this.eachSpacing);
			});
			textArr.push(Math.floor(this.W * 0.9));
			
			ctx.beginPath();
			textArr.forEach(function(item, index){
				ctx.moveTo(item, 0);
				ctx.lineTo(item, 10);
			});
			ctx.closePath();
			ctx.stroke();
			
			ctx.beginPath();
			ctx.font = options.xAisFontSize + " Microsoft yahei";
			ctx.textAlign = "start";
			ctx.textBaseline = "bottom";
			var h = Math.ceil(this.H * 0.04);
			options.xAis.forEach(function(item, index){
				var textW = ctx.measureText(item).width,
					spacing;
				spacing = Math.round(_this.eachSpacing - textW) / 2;
				ctx.fillText(item, textArr[index] + spacing, h);
			});
			/*横坐标下方文字*/
			ctx.closePath();
			ctx.restore();
			
		},
		
		histogramDraw: function(){		//
			var ctx = this.ctx,
				options = this.options;
				
			var processArr = [],
				y = 0,
				w = options.width,
				scaleY = this.scaleY;
			
			for (var i = 0; i < options.dataArr.length; i++) {
				if (!options.dataArr[i].length) options.dataArr[i] = [options.dataArr[i]];
				var spacing = ((this.eachSpacing - ((options.width + options.emptySpace) * options.dataArr[i].length - options.emptySpace)) / 2);
				for (var j = 0; j < options.dataArr[i].length; j++){
					var x = i * this.eachSpacing + spacing + (options.width + options.emptySpace) * j,
						h = options.dataArr[i][j];
					
					var rect = new Histogram( x, y, w, h, scaleY, options.color[j]);	
					processArr.push(rect);
				}
			}
			
			for (var b in processArr) {
				processArr[b].process(ctx);
			}
			
			/*简化之前的代码*/
//						if (!options.dataArr[0].length) {
//							var spacing = (this.eachSpacing - options.width) / 2;
//							for (var i = 0; i < options.dataArr.length; i++) {
//								
//								var x = i * this.eachSpacing + spacing,
//									h = options.dataArr[i];
//									
//								var rect = new Histogram(x, y, w, h, scaleY);
//								processArr.push(rect);
//							}
//						}else{
//							console.log("dataArr为非单项数组,进入else.");
//							for (var i = 0; i < options.dataArr.length; i++) {
//								
//								console.log( options.dataArr[i].length)
//								var spacing = ((this.eachSpacing - ((options.width + options.emptySpace) * options.dataArr[i].length - options.emptySpace)) / 2);
//								for (var j = 0; j < options.dataArr[i].length; j++){
//									
//									var x = i * this.eachSpacing + spacing + (options.width + options.emptySpace) * j,
//										h = options.dataArr[i][j];
//									
//									var rect = new Histogram( x, y, w, h, scaleY);		
//									processArr.push(rect);
//								}
//							}
//						}
			
		},
		
		top: function(){
			var options = this.options,
				ctx = this.ctx;
				
			var spacing,
				x = this.W * 0.15,
				y = 10,
				h = 20,
				w = 45,
				r = 5,
				length = x;
			
			ctx.save();
			ctx.translate(-this.originX, -this.originY);
			
			ctx.textAlign = "start";
			ctx.textBaseline = "top";
			for (var i = 0; i < options.legend.length; i++) {
				var spacing = ctx.measureText(options.legend[i]).width;
				
				ctx.fillStyle = options.color[i];
				roundRect(length,y,w - 6,h,r);
				ctx.fill();
				ctx.fillStyle = "#000";
				ctx.fillText( options.legend[i], length + w, y);
				if (length < (this.W - x - w - 30)) {
					length = length + spacing + w + 20;
				}else{
					length = x;
					y = h * 2;
				}
				
			}
			
			ctx.restore();
			
			function roundRect (x, y, w, h, r) {
				ctx.beginPath();
				ctx.moveTo(x+r, y);
				ctx.arcTo(x+w, y, x+w, y+h, r);
				ctx.arcTo(x+w, y+h, x, y+h, r);
				ctx.arcTo(x, y+h, x, y, r);
				ctx.arcTo(x, y, x+w, y, r);
				ctx.closePath();
			}
			
		},
		
		defineReactive : function(obj, key, val){	//勾子函数
			var _this = this;
			Object.defineProperty(obj, key,{
				get: function(){
					return val;
				},
				set: function(newVal){
					val = newVal;
					_this.update();
				}
			})
		},
		
		update: function(){		//刷新函数
			var fragment = document.createDocumentFragment(),
				child = document.getElementById("drawHistogramCanvas");
			fragment.appendChild(child);
			fragment = null;
			this.process();
		},
		
		fillTextStyle: function(){
			var ctx = this.ctx;
			ctx.fillStyle = "#37a";			
			ctx.strokeStyle = "#000";		
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
		},
		
		resize: function(){		//resize函数
			var _this = this;
			window.addEventListener("resize",function(method, time, wait, least){
				var timer = null;
					begin = new Date(),
					context = _this;
					
				return function(){
						var current = +new Date();
						if( current - begin > least && current - begin < time ){
							clearInterval(timer);
							timer = setTimeout(function(){
								method.apply(context);
							}, wait);
							begin = current;
						}
						if (current - begin > time) {
							clearInterval(timer);
							method.apply(context);
							begin = current;
						}
					};
			}(_this.update, 2000, 1000, 800),false);
		},
		
		error: function(){
			this.canvas.innerHTML = "You browser not support Canvas!";
		},
		
		extend: function(obj1, obj2, type) {
//						if (type == undefined || type == false) {
				for(var pro in obj2) {
					if(!obj1[pro]) {
						obj1[pro] = obj2[pro];
					}
				}
//						}else if(type){
//							for(var pro in obj2) {
//								obj1[pro] = obj2[pro];
//							}
//						}
		},
		
		countArr: function(array) {
			var _this = this;
			return array.reduce(function(acc, val) {
				return acc.concat(Array.isArray(val) ? _this.countArr(val) : val);
			}, []);
		},

		acount: function(num) {
			var index = 0,x = num;
			while(num > 10) {num = (num / 10);index++;}
			if(x < 10) {
				index++;
			}else if(x > 1000) {
				index--;
			}
			return this.ceil10(x, index);
		},
		
		ceil10: function(value, exp) {
			if(typeof exp === 'undefined' || +exp === 0) {
				return Math['ceil'](value);
			}

			value = +value;
			exp = +exp;
			// If the value is not a number or the exp is not an integer...
			
			if(isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
				return NaN;
			}
			value = value.toString().split('e');
			value = Math['ceil'](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
			value = value.toString().split('e');

			return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
		},
		
		drawDasheLine: function(ctx, x1, y1, x2, y2, dashLength){   //IE10也不支持 setLineDash()API
			var deltaX = x2 - x1,
				deltaY = y2 - y1;
			dashLength = dashLength === undefined ? 6 : dashLength;
			var numDashes = Math.floor( Math.sqrt( deltaX * deltaX + deltaY * deltaY) / dashLength);
			ctx.beginPath();
			ctx.strokeStyle = "#c1c1c1";
			for (var i = 0; i < numDashes; ++i) {
				ctx[ i % 2 === 0 ? 'moveTo': 'lineTo']( x1 + ( deltaX / numDashes) * i, y1 + ( deltaY / numDashes) * i);
			}
			ctx.closePath();
			ctx.stroke();
		}
		
	}; //暴露插件接口
	window.DrawHistogram = DrawHistogram;


})(window, document);


		/*编写日志*/
/*2017-04-11
 * 写了开头的参数说明文档,对各参数,功能进行了说明,写了示例;
 * 对代码再次优化,删除不必要的参数,更换参数的命名空间;etc
 * */

/*
 *2017-04-07 至 2017-4-10
 * 使用scale进行了整体重构,实现了原先使用比例系数的所有功能,比如resize、数据更新自动重绘功能
 * 后期,对代码命名进行了整合更改,对JS代码进行了优化,包括使用window.requesAnimationFram绘制动画
 * 但保留了使用setTimeout做的动画代码,重构了绘制直方图处的代码,节省代码量
 * 还更新了canvas上方的文字显示,更新了color、emptySpace插件接口;etc
 * */

/*2017-3-27 	代码开始插件化，尽量减小配置，优化使用；v1.1*/

/*2017-3-28  	构建直方图构造函数,以及原型方法；实现动画效果，颜色渐变等，v1.2*/

/*2017-3-29		坐标轴重绘，走了弯路，y取相反值即可，不必旋转坐标系；(上午) 宽度自适应,字体居中等; 
 * (待完成优化：1.坐标轴缩放（根据容器大小缩放数据）；2：根据数据，决定间隔大小)
 * ：坐标轴缩放，找到思路；未完美优化    （思路可能出错）
 * 思路一：用于scale；
 * 思路二：配置一个缩放比例系数i;（所有的与坐标相关的参数，全部乘以该系数）
 * v1.3
 * */

/*2017-3-30
 * 照思路，开始优化；
 * 思路一：运用ctx.scale(),当数据过大时，填充的文字，坐标轴的颜色等显示效果都不好；
 * 思路二：通过配置一个缩放比例系数,根据目前的情况,处理效果比较好；（后续使用此方法）；
 * 下午：将坐标缩放过程产生的代码，进行优化；
 * 		问题一：height接口暴露出来，效果出现差错；        解决：options.height 可配置 
 * 后续优化方向：数据传入，使用二维数组的数据。    配置方法分离代码；
 *此时版本：v.1.3.1
 *  */

/*2017-3-31		尝试，有数据更新后，页面自动更新，未果；	*/

/*2014-4-01
 * 利用object.defineProperty设置钩子函数，实现了，当数据HeightArr、xAis
 * 更新后，图标的整体重绘
 * 遗留问题（很多参数，都设置在了options里面，导致这些暴露出去的控制参数混乱，
 * 			且在代码里，又对这些参数进行过计算更新；无法实现任一控制参数的改变，
 * 			都进行视图更新；）
 * 后续，需要整合，优化代码；   （10:30）
 * 实现了resize触发后，视图的更新，采用了函数防抖，事件监听；（效果有时出现误差） 15:29
 * */

/*2017-04-06
 * 优化代码；
 * 根据要求，进行代码整改;
 * 再次尝试使用scale(),发现思路正确，可以达到想要的文字显示效果
 * */

/*
 *遗留	问题一，是否使用setTimeout代替setInterval （解决）
 *		问题二：endX接口暴露了出去,与容器最大的宽度，存在冲突。需待改进（忽略）
 *		问题三：画虚线时，未采用API：setLindeDash(). 前期准备工作不足（解决，存在浏览器不存在该方法，做了兼容；
 * 		问题四：坐标轴缩放，根据原先思路，scale()、比例系数，再次想到transform（）API,是否可以
 * 				测试：使用transform,与使用scale()是一样的效果，深入学习之后,找到了两个API之间的关联；但同样，不能使用，因为显示效果不好；
 * (解决)，最终思路，使用scale,完成坐标轴的整体缩放;
 * */