/*****************详细说明****************

	****************参数说明****************
	
		dataArr: {							//数据对象,包含文字显示开关,格式化,数据来源;	
			_switch: true,					//柱状图上方文字显示开关   	( 默认 true )
			format: 1,						//格式化数值			 		( 默认 1 )
			data: [],						//绘制显示的数据;			
		},
		newData: [],						//柱状图点击事件之后切换的数据来源
		
		xAis: [],							//X轴显示的文字信息;
		
		newXais:[],							//柱状图点击事件,X轴变更之后显示的字体信息
			
		container: document.body,			//柱状图绘制区域				( 默认 body )
		
		legend: {							//柱状图说明对象 (单位px)
			_switch: false,					//图例开启开关 				( 默认 false )
			positions: "right"("top","default")				//图例位置配置				( 默认 right)
			width: 20,						//图例前矩形有色区块宽度		( 默认 20 )
			height: 15,						//图例前矩形有色区块高度		( 默认 15 )
			empty: 8,						//图例前矩形有色区块与文字间隔( 默认 8 )
			text: []						//图例说明文字来源
		},
		
		title: {							//柱状图左上标题配置
			leftY: {					
				_switch: false,				//标题配置开关 				( 默认 false )
				color: "#000",				//标题显示颜色				( 默认 黑色 )
				fontSize: "16px",			//标题字体大小				( 默认 16px )
				text: " **** {value}"		//标题配置格式（配合dataArr.format使用)   在此字符串中, ‘{value}’不要省略
			}
		},
		
		xAisFontSize: "12",					//X轴显示文字字体大小			( 默认 12)
		yAisFontSize: "12",					//Y轴显示文字字体大小			( 默认 12)
		
		color: 								//柱状图颜色配置				
				["#c23531", "#91c7ae","#d48265", "#ca8622",
				 "#2f4554", "#61a0a8", "#37a"],							( 默认 颜色配置 )
				
		emptySpace: 15,						//柱状图空隙间隔配置 			( 默认 15 )
		
		widths: {							//柱状图宽度配置
			_switch: true,					//自适应长度开关             		( 默认 true )
			length: 15						//非自适应下,柱状图的宽度
		},
		
		backgroundColor: {					//画布背景配置
			ctx: {	
				_switch: true,				//画布中间区域开启开关		( 默认 true )
				color: "#fff8dc"			//画布中间区域颜色配置		( 默认 #fff8dc )
			},
			canvas: {
				_switch: true,				//画布四周区域开启开关		( 默认 true )
				color: "#ffe4c4"			//画布四周区域颜色配置		( 默认 #ffe4c4 )
			}
		},
		
		startX: 0							//保留对象
		
********************************示例说明*********************************
		
	*{ dataArr }:	
		e.g 	dataArr: {							
					_switch:true,		
					format:10,						
					*data:[82, 154, 268, 210],  	//绘制显示的数据;	（必传参数）
						data:	格式:[数组类型(一维、二维、一维二维混合)] 注意：相应位数据不存在，应该取值为0
							e.g: [1,2,3] or [[1,2],[3,4]] or [[1],[1,2],[0,3]]；
				}


	*{ newData } 														（必传参数）
				格式: [ dataArr.data1, dataArr.data2 ]   //dataArr.data1只指代格式,且必须再用一个数组包含;
					e.g: 	newData:[ [1,2,3] ] 
					  or 	newData:[ [[1,2],[3,4]], [4,5]] 
					  or   	newData:[ [[1],[1,2],[0,3]] ]；

	*{ xAis }:															（必传参数）
				格式:(一维数组)["一","二","三"]
					e.g		xAis: ["2016-06", "2016-07", "2016-08", '2016-09'],
									
									
	*{ newXais }  														（必传参数）
				格式:[ xAis1, xAis2]  (xAis1、xAis2只指代为数组格式)
				e.g: [ ["星期一","星期二","星期三"],["六月","七月","八月"]]
				
				
	*{container }														（必传参数）
					e.g:  	cantainer: document.getElementById(), ByTagsName()等
					(若高度有错,和容器之间有间隙,CSS设置html、body的高度为100%);

 	{ legend }:			若开启使用,则text需要传入内容						（选传参数）
			    e.g *legend: {
						_switch:true,	
						positions:"right" or "default" or "top",  top为上居中,default为右上  right为右中 
						width:20,		
						height:15,		
						empty:8,		
						*text:["上午","下午","黄昏","深夜","凌晨","六","七"]  
							格式:(一维数组)  数组长度应与color配置数组长度相等;	
					}

	{ title }			若开启使用,则text需要传入内容						（选传参数）
			    e.g title:{
						leftY:{
							_switch:true,		
							color:"#000",		
							fontSize:"16px",	
							*text:"周产量图 ( 单位: {value} )"	
								注意,在此字符串中, ‘{value}’字符段必须加入，位置不做要求
								e.g  "( 单位: {value} ) 周产量图 " or  " 单位: {value}"
						}
				}
				
				
 	{ color }:															（选传参数）
					格式:(一维数组 )   	项数应该与dataArr.data数组长度相等;
					e.g    	color:["red","orange","green","blue"], 


	{ emptySpace } 	e.g   emptySpace: 30,								（选传参数）

	{ widths }															（选传参数）
				e.g widths: {
					_switch:false,		
					length: 25			
				},

	{ xAisFontSize } 格式"15"											（选传参数）
					e.g   xAisFontSize: 15,

	{ yAisFontSize } 格式"15"											（选传参数）
					e.g   yAisFontSize: 15,


	{backgroundColor} 													（选传参数）
			e.g	backgroundColor:{
					ctx:{					
						_switch:true,		
						color:"#fff8dc"		
					},
					canvas:{				
						_switch:true,		
						color:"#ffe4c4"		
					}
				},

			****************参数说明****************
			
..............................................................................
		****************函数插件、及事件说明****************
		在插件内：
				__DEFAULT__	为默认参数配置对象；
				utils		为工具对象；
				DrawHistogram 为插件主体
				Histogram、RoundRect为辅助对象
				
				this.mouse		记录鼠标在画布中的位置
				this.origin		记录画布原点位置
       	事件：update()更新函数是插件内，很多事件函数依附的主体；
			 	窗口大小改变事件,于resize()函数内,采用函数防抖,节流,绑定window.resize事件，调用的也是update()函数;
				柱状图点击事件,切换数据显示,也调用了update()函数；(	可实现数据轮回切换	)
						内在原因是为 dataArr.data 使用了Object.defineProperty,设置钩子函数；
						在点击事件发生后,将当前的数据,push进入newData内，
						下一步,dataArr.data = newData.shift();触发set勾子函数,调用update(),

					e.g   var h1 = DrawHistogram(options)
		若想实现,X轴坐标,标题位置变更等,可
						e.g  h1.xAis = newArr[];
						然后调用   h1.update()实现效果切换、重绘;
		即,列出的参数,基本都可配置后,再调用update(),进行重绘;

		****************函数插件、及事件说明****************
*/
;(function(window, document) {

	var __DEFAULT__ = { //默认参数
		dataArr: {
			_switch: true, //是否显示柱状图上方文字
			format: 1,
			data: [5, 6, 7, 8, 9],
		},
		xAis: ["2016-06", "2016-07", "2016-08", '2016-09', "2016-10"],
		legend: {
			_switch: false,
			positions: "right", //"default",//"top",//   默认,最好使用”top"  default为右上  right为右中,显示效果不好
			width: 20,
			height: 15,
			empty: 8,
			text: ["柱状图一","柱状图二","柱状图三","柱状图四","柱状图五","柱状图六","柱状图七","柱状图八","柱状图九","柱状图十","柱状图十一","柱状图十二"]
		},
		title: {
			leftY: {
				_switch: false,
				color: "#000",
				fontSize: "16px",
				text: "周产量图 ( 单位: {value} )" //在此字符串中, ‘{value}’不要省略
			}
		},
		xAisFontSize: "12",
		yAisFontSize: "12",
		color: ["#c23531", "#91c7ae", "#d48265", "#ca8622", "#2f4554", "#61a0a8", "#37a"],
		container: document.body,
		emptySpace: 15,
		widths: {
			_switch: true,
			length: 15
		},
		backgroundColor: {
			ctx: {
				_switch: true,
				color: "#fff8dc"
			},
			canvas: {
				_switch: true,
				color: "#ffe4c4"
			}
		},
		startX: 0,
		newData: [
			[
				[11, 12, 13],
				[14, 15, 16],
				[17, 18, 19]
			],
			[
				[20, 20, 22],
				[23, 24, 25],
				[26, 27, 28]
			]
		],
		newXais:[]
	};

	var utils = {};

	function Histogram(x, y, w, h, scaleY, fillColor) { //x,y,w,h为绘制矩形的常规参数;startH为动画参数.
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.scaleY = scaleY;
		this.fillColor = fillColor;
		this.startW = 0;
		this.speed = 0;
		this.drawH = 0;
		this.hasDraw = false;
		this.animationW = w;
	}

	Histogram.prototype = {
		caculator: function() {
			if(this.drawH < this.h) {
				this.speed = Math.ceil((this.h - this.drawH) * 0.16);
				this.drawH += this.speed;
				if(this.drawH >= this.h) {
					this.drawH = this.h;
					this.hasDraw = true;
				}
			}
			if(this.h == 0) {
				this.hasDraw = true;
			}
			return this.hasDraw;
		},

		animationWidth: function() {
			this.speed = (this.startW - this.animationW) * 0.09;
			this.startW -= this.speed;
			return this.startW;
		}
	};

	function RoundRect(x, y, w, h, r, fillColor) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.color = fillColor;
		this.hasClick = false;
	};
	
	function EventTarget() {
	};
	
	EventTarget.prototype = {
		
		
	};

	utils = {
		addHandler: function( ele, type, handler){
			if (ele.addEventListener) {
				ele.addEventListener( type, handler, false);
			} else if ( ele.attachEvent) {
				ele.attachEvent("on" + type, handler);
			} else {
				ele["on" + type] = handler;
			}
		},
		
		removeHandler: function( ele, type, handler) {
			if (ele.removeEventListener) {
				ele.removeEventListener( type, handler, false);
			} else if (ele.detachEvent) {
				ele.detachEvent( "on" + type, handler);
			} else {
				ele["on" + type] = null;
			}
		},
		
		captureMouse: function(element) {
			var mouse = {
				x: 0,
				y: 0
			};
			
			this.addHandler( element, 'mousemove', function(event) {
				var x, y;
				if(event.pageX || event.pageY) {
					x = event.pageX;
					y = event.pageY;
				} else {
					x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				x -= utils.getOffset(element).offsetX;
				y -= utils.getOffset(element).offsetY;
				mouse.x = x;
				mouse.y = y;

			});
			
			console.log("若出现鼠标位置有偏差,查看是否设定*{margin:0},或在上面代码中,x、y均减少8")
			return mouse;
		},
		
		getOffset: function(element) {
			var actualLeft = element.offsetLeft,
				actualTop = element.offsetTop,
				current = element.offsetParent;

			while(current !== null) {
				actualLeft += current.offsetLeft;
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return {
				offsetX: actualLeft,
				offsetY: actualTop
			}
		},

		arrMaxLengthItem: function(arr) {
			var item = [];
			arr.reduce(function(prev, cur) {
				if(prev.length >= cur.length) {
					item = prev;
				} else {
					item = cur;
				}
				return item;
			}, []);
			return item;
		},

		countArr: function(array, format) {
			var _this = this;
			return array.reduce(function(acc, val) {
				return acc.concat(Array.isArray(val) ? _this.countArr(val) : val);
			}, []);
		},

		acount: function(num) {
			var index = 0,
				x = num;
			while(num > 10) {
				num = (num / 10);
				index++;
			}
			if(x < 10) {
				index++;
			}else if(x > 100) {
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

			if(isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
				return NaN;
			}
			value = value.toString().split('e');
			value = Math['ceil'](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
			value = value.toString().split('e');

			return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
		},

		containsRect: function(rect, x, y) {
			return !(x < rect.x || x > rect.x + rect.w || y > rect.y + 1.2 || y < rect.y + (-rect.h * rect.scaleY));
		},

		containsLegend: function(rect, x, y, textW) {
			return !(x < rect.x || x > rect.x + rect.w + textW || y < rect.y || y > rect.y + rect.h);
		},
		compare: function(a, b) {
			if(a < b) {
				return 1;
			} else if(a > b) {
				return -1;
			} else {
				return 0;
			}
		}
	};

	var DrawHistogram = function(options) { //插件定义
		
		if(!(this instanceof DrawHistogram)) return new DrawHistogram(options);
		
		this.handlers = {};
		
		this.options = options || {};

		this.extend(this.options, __DEFAULT__); //配置默认项，（用户输入的取代，没配置的使用默认值）;

		if(this.options.dataArr.data.length != this.options.xAis.length) {
			alert("数据个数不相等"); //数据,文字个数应该对应
			return;
		}

		this.process();
		
		return this;
	};

	DrawHistogram.prototype = {

		process: function() {

			this.init();

			this.fillTextStyle();

			this.histogramDraw();

			this.canvasbgDraw();

			this.draw(); //坐标轴之间的底色被清除；因为在动画中，存在clearRect,需要处理

			this.ctx.save();
			this.ctx.translate(this.originX, this.originY);

			this.cSys(); //绘制坐标轴
			this.ctx.restore();

			if(this.options.legend._switch) {
				this.top(); //上方文字注解
			}

			if(this.options.title.leftY._switch) {
				this.left();
			}

			this.drawDiv();

			this.mouseEvent(this.processArr);

			this.resize(); //添加resize事件

		},

		init: function() {
			window.myDisRequestAniFrame = ( function (){
				return window.requestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   function( callback, element) {
					   		return window.setTimeout( callback, 1000 / 50);
					   };
			})();
			
			window.cancelmymyDisRequestAniFrame = ( function (){
				return window.cancelAnimationFrame ||
					   window.webkitCancelAnimationFrame ||
					   window.mozCancelAnimationFrame ||
					   window.clearTimeout;
			})();
			
			this.canvas = document.createElement("canvas");

			this.options.container.appendChild(this.canvas); //创建一个canvas元素，并放入DOM中；

			this.mouse = utils.captureMouse(this.canvas);

			if(!this.canvas.getContext) {
				this.error();
				return;
			}

			this.ctx = this.canvas.getContext("2d");

			for(var i in this.options) { //勾子函数  ES5
				if(i == "dataArr") {
					this.defineReactive(this.options[i], "data", this.options[i].data);
				}
				if(i == "xAis") { /*是否自动刷新*/ }
			}

			var canvas = this.canvas,
				ctx = this.ctx,
				options = this.options,
				max,
				a,
				b,
				_this = this;

			this.W =
				canvas.width = options.container.clientWidth;

			this.H =
				canvas.height = options.container.clientHeight;
			//							Math.max(options.container.scrollHeight, options.container.clientHeight);

			canvas.id = "drawHistogramCanvas";

			max = Math.max.apply(null, utils.countArr(options.dataArr.data)) / options.dataArr.format; //查找输入数据中的最大值，来配置坐标Y最高段处的大小		

			if(Math.min.apply(null, utils.countArr(options.dataArr.data)) / options.dataArr.format < 1) {
				console.log("数据格式化值过大,最小数据值处理后显示不明显");
			}

			this.data = options.dataArr.data.map(function(items, index, array) {
				if(Array.isArray(items)) {
					return items.map(function(item) {
						return(item / options.dataArr.format);
					})
				} else {
					return items / options.dataArr.format;
				}
			});

			for(var i in this.data) { //此处代码处理后,可以出现dataArr项数子项数不统一，维度不统一的情况
				if(!this.data[i].length) this.data[i] = [this.data[i]];
			}

			this.maxItemLength = utils.arrMaxLengthItem(this.data).length;
			
			this.legendTextWidth = [];

			options.legend.text.forEach(function(item, index) {
				_this.legendTextWidth.push(ctx.measureText(item).width + 10);
				
//				if(index < _this.maxItemLength) {
//					if(_this.maxText <= ctx.measureText(item).width) {
//						_this.maxText = ctx.measureText(item).width + 10;
//					}
//				}
			});
			
			this.maxText = Math.max.apply(null,this.legendTextWidth);
			
			this.aspectRatio = {
				x: 0.8,
				y: 0.8
			};
			if(options.legend._switch) {
				if(options.legend.positions === "top") {
					this.aspectRatio.x = (this.W - 42 * 1.8 - 8) / this.W;; //此处代码
				} else if(options.legend.positions !== "top") {
					a = options.legend.empty * 2 + options.legend.width + this.maxText;
					this.aspectRatio.x = (this.W - a - 42 - 8) / this.W; //此处代码
				}
			} else {
				this.aspectRatio.x = (this.W - 42 * 1.8) / this.W; //此处代码
			}

			if(!options.title.leftY._switch) {
				this.aspectRatio.y = (this.H - parseInt(options.xAisFontSize) - 10 - parseInt(options.title.leftY.fontSize)) / this.H - 0.03;
			} else {
				this.aspectRatio.y = (this.H - parseInt(options.xAisFontSize) - 10 - parseInt(options.title.leftY.fontSize)) / this.H - 0.08;
			}

			this.eachSpacing = Math.floor(this.W * this.aspectRatio.x / options.xAis.length); //每一个区段的间隔大小

			if(options.widths._switch) {
				options.widths.length = Math.max(3, Math.floor((this.eachSpacing * 0.75 - this.maxItemLength * options.emptySpace) / this.maxItemLength));
			}
			if (max <= 10){
				b = max;
			}else{
				b = max + 11;
			}
			this.scaleY = (this.H * this.aspectRatio.y) / utils.acount(b); //缩放比例

			this.num = utils.acount(b) / 5;
			
			//配置坐标（0,0）原点在容器内的位置
			this.originX = 42;

			//						this.originX = this.W * 0.1;
			this.originY = this.H - parseInt(options.xAisFontSize) - 10;

			this.origin = {
				x: this.originX,
				y: this.originY
			};

			this.processArr = []; //用于 相关的事件
			
			this.indexArr = [];
			
			this.legendArr = [];


			this.splitY = (this.H * this.aspectRatio.y / 5); //画图高度平分为五份,方便绘制虚线,虚线左边文字

		},
		
		
		cSys: function() {

			var options = this.options,
				ctx = this.ctx,
				_this = this,
				textArr = [], //用于绘制横坐标文字;
				textW = 0,
				h = parseInt(options.xAisFontSize) + 8;

			ctx.save();
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(0, 1.2);
			ctx.lineTo(0, -this.H * this.aspectRatio.y); // 乘以0.8是为了上方留出空挡

			ctx.moveTo(-6, 1.2);
			ctx.lineTo(this.W * this.aspectRatio.x, 1.2)
			ctx.closePath();
			ctx.stroke();

			ctx.font = options.yAisFontSize + "px Microsoft JhengHei";
			ctx.textBaseline = "middle";
			ctx.textAlign = "start";

			ctx.save();

			/*左侧坐标、短线*/
			for(var i = 0; i <= 5; i++) {
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = "#000";
				if(i) {
					ctx.moveTo(-6, -i * this.splitY);
					ctx.lineTo(0, -i * this.splitY);
				}
				ctx.stroke();
				ctx.closePath();
				ctx.restore();

				textW = ctx.measureText(i * this.num).width;
				ctx.fillText(i * this.num, -textW - 7, -i * this.splitY);
			}
			ctx.restore();

			/*横坐标下方文字*/
			options.xAis.forEach(function(item, index) {
				textArr.push(options.startX + index * _this.eachSpacing);
			});
			textArr.push(this.eachSpacing * options.xAis.length);

			ctx.beginPath();
			textArr.forEach(function(item, index) {
				ctx.moveTo(item, 0);
				ctx.lineTo(item, 7);
			});
			ctx.closePath();
			ctx.stroke();

			ctx.save();
			ctx.font = options.xAisFontSize + "px Microsoft JhengHei";
			ctx.textAlign = "start";
			ctx.textBaseline = "bottom"; //Math.ceil(this.H * 0.04);
			options.xAis.forEach(function(item, index) {
				var textW = ctx.measureText(item).width,
					spacing;
				spacing = Math.round(_this.eachSpacing - textW) / 2;
				ctx.fillText(item, textArr[index] + spacing, h);
			});
			ctx.restore();
			/*横坐标下方文字*/
			ctx.restore();

		},

		cSysLineDash: function() {
			var options = this.options,
				ctx = this.ctx,
				setLineDash = false;

			if(ctx.setLineDash) {
				setLineDash = true;
			}

			/*画虚线,IE10级以下,没有 setLineDash*/
			for(var i = 1; i <= 5; i++) {
				if(setLineDash) {
					ctx.save();
					ctx.beginPath();
					ctx.strokeStyle = "#c1c1c1";
					//								ctx.lineWidth = 2;
					ctx.setLineDash([4, 6]);
					ctx.moveTo(0, -i * this.splitY);
					ctx.lineTo(this.W * this.aspectRatio.x, -i * this.splitY);
					ctx.closePath();
					ctx.stroke();
					ctx.restore();
				} else {
					this.drawDasheLine(ctx, 0, -i * this.splitY, this.W * this.aspectRatio.x, -i * this.splitY);
				}
			}
			/*画虚线*/
		},

		histogramDraw: function() { //

			var ctx = this.ctx,
				options = this.options,
				processArr = this.processArr,
				y = 0,
				x = 0,
				h = 0,
				w = options.widths.length,
				scaleY = this.scaleY,
				_this = this;

			var spacing = ((this.eachSpacing - ((options.widths.length + options.emptySpace) * this.maxItemLength - options.emptySpace)) / 2);
			for(var i = 0; i < this.data.length; i++) {
				var Arr = [];
				for(var j = 0; j < this.maxItemLength; j++) { //this.maxItemLength
					if(!this.data[i][j]) {
						this.data[i][j] = 0;
					}
					x = i * this.eachSpacing + spacing + (options.widths.length + options.emptySpace) * j;

					h = this.data[i][j];

					var rect = new Histogram(x, y, w, h, scaleY, options.color[j]);
					Arr.push(rect);
				}
				processArr[i] = Arr;
			}

			this.animationArr = processArr.slice();
		},

		top: function() {

			var options = this.options,
				ctx = this.ctx,
				legendArr = this.legendArr,
				empty = options.legend.empty,
				h = options.legend.height,
				w = options.legend.width,
				x = this.W,
				y = 8,
				r = 4,
				textW = this.maxText,
				startX,
				length,
				old;

			if(options.legend.positions == "right") { //位置为右居中
				var a = this.maxItemLength * h + (this.maxItemLength - 1) * (r * 2);
				y = (this.H - a) * 0.5;
				length = w + empty * 1.1 + textW + 10;
				startX = x - length;
			} else if(options.legend.positions == "top") { //位置为上方
				var num = 0;
				length = [];
				if(this.W > 875) {
					num = 0.68;
				} else {
					num = 0.5;
				}
				startX = x * num;
				if(this.H < 450) {
					y = 5;
				} else {
					y = Math.floor(this.H * 0.1 / 2) - 5;
				}
				for(var i = 0; i < this.maxItemLength; i++) {
					textW = ctx.measureText(options.legend.text[i]).width;
					length[i] = w + empty * 1.1 + textW + 10;
				}
				length[this.maxItemLength] = 0;
			} else {
				length = w + empty * 1.1 + textW + 10;
				startX = x - length;
			}
			x = this.W - startX;
			old = startX;
			ctx.save();

			ctx.textAlign = "start";
			ctx.textBaseline = "middle";

			for(var i = 0; i < this.maxItemLength; i++) {

				var legend = new RoundRect(startX, y, w, h, r, options.color[i]);
				legendArr.push(legend);

				ctx.fillStyle = options.color[i];
				roundRect(legend);
				ctx.fill();
				ctx.fillStyle = "#000";
				ctx.fillText(options.legend.text[i], startX + w + (empty * 0.5), y + h / 2);

				if(options.legend.positions == "top") {
					changeX(length[i], length[i + 1], this);
				} else {
					changeX(length, length, this);
				}
			}
			ctx.restore();

			function roundRect(obj) {
				ctx.beginPath();
				ctx.moveTo(obj.x + obj.r, obj.y);
				ctx.arcTo(obj.x + obj.w, obj.y, obj.x + obj.w, obj.y + obj.h, obj.r);
				ctx.arcTo(obj.x + obj.w, obj.y + obj.h, obj.x, obj.y + obj.h, obj.r);
				ctx.arcTo(obj.x, obj.y + obj.h, obj.x, obj.y, obj.r);
				ctx.arcTo(obj.x, obj.y, obj.x + obj.w, obj.y, obj.r);
				ctx.closePath();
			}

			function changeX(a, b, _this) {
				if((x - a) > b) {
					x = x - a;
					startX += a;
				} else {
					startX = old;
					x = _this.W - startX;
					y += h + r * 2;
				}
			}
		},

		textDraw: function(obj) {
			var ctx = this.ctx,
				spacing = Math.ceil(obj.w - ctx.measureText(obj.h).width) * 0.5;
			ctx.save();
			ctx.translate(this.originX, this.originY);
			ctx.textAlign = "start";
			ctx.textBaseline = "bottom";
			ctx.fillText(obj.h, obj.x + spacing, -(obj.scaleY * obj.h)); //使文字居中显示
			ctx.restore();
		},

		ctxbgDraw: function() {
			var options = this.options,
				ctx = this.ctx;

			if(options.backgroundColor.ctx._switch) {
				ctx.save();
				ctx.fillStyle = options.backgroundColor.ctx.color;
				ctx.fillRect(1, 0, this.W * this.aspectRatio.x, -(this.H * this.aspectRatio.y + 2));
				ctx.restore();
			}
		},

		canvasbgDraw: function() {
			var options = this.options,
				ctx = this.ctx;

			if(options.backgroundColor.canvas._switch) {
				ctx.save();
				ctx.fillStyle = options.backgroundColor.canvas.color;
				ctx.fillRect(0, 0, this.W, this.H);
				ctx.restore();
			}
		},

		draw: function() {
			var _this = this,
				process = utils.countArr(this.processArr),
				ctx = this.ctx,
				target,
				speed,
				drawH,
				hasDraw = [false];

			//						ctx.save();
			//						ctx.translate(_this.originX, _this.originY);
			//						this.cSys(); 			//绘制坐标轴
			//						ctx.restore();

			(function dramRect() {
				var timer = window.myDisRequestAniFrame(dramRect, _this.canvas);

				var switchB = hasDraw.every(function(item) {
					return item;
				});

				if(!switchB) {
					ctx.save();
					ctx.translate(_this.originX, _this.originY);
					ctx.clearRect(1, 0, _this.W * _this.aspectRatio.x, -_this.H * _this.aspectRatio.y);

					_this.ctxbgDraw();
					_this.cSysLineDash();

					for(var i = 0; i < process.length; i++) {

						hasDraw[i] = process[i].caculator();

						var x = process[i].x,
							y = process[i].y,
							w = process[i].w,
							color = process[i].fillColor,
							drawH = process[i].drawH,
							speed = process[i].speed,
							target = process[i].h;

						if(drawH < target) {
							a(drawH);
						} else {
							a(target);
						}
					}
					ctx.restore();
				} else {
					console.log("end");
					if(_this.options.dataArr._switch) {
						for(var i in process) {
							_this.textDraw(process[i]);
						}
					}
					window.cancelmymyDisRequestAniFrame(timer);
				}

				function a(h) {
					ctx.save();
					ctx.scale(1, _this.scaleY);
					ctx.fillStyle = color;
					ctx.fillRect(x, y, w, -h);
					ctx.restore();
				}
			}());
		},

		redraw: function() {
			this.ctx.clearRect(0, 0, this.W, this.H);
		},

		left: function() {
			var options = this.options,
				ctx = this.ctx;

			ctx.save();
			ctx.fillStyle = options.title.leftY.color;
			ctx.font = "bold " + options.title.leftY.fontSize + " Microsoft JhengHei";
			ctx.textAlign = "start";
			ctx.textBaseline = "middle";
			ctx.fillText(options.title.leftY.text.replace(/\{value\}/g, options.dataArr.format), 42, this.H * 0.06);
			ctx.restore();

		},

		defineReactive: function(obj, key, val) {
			var _this = this;
			Object.defineProperty(obj, key, {
				get: function() {
					return val;
				},
				set: function(newVal) {
					val = newVal;
					_this.update();
				}
			})
		},

		update: function() { //刷新函数
			var fragment = document.createDocumentFragment(),
				child = this.options.container.getElementsByTagName("canvas")[0];
			fragment.appendChild(child);
			fragment = null;
			this.options.container.removeChild(this._div);
			this.canvas = null;
			this.process();
		},

		fillTextStyle: function() {
			var ctx = this.ctx;
			ctx.fillStyle = "#37a";
			ctx.strokeStyle = "#000";
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.font = "15px Microsoft JhengHei";
		},

		drawDiv: function() {
			var _div = document.createElement("div"),
				_p = document.createElement("p"),
				_span = document.createElement("span"),
				text = document.createTextNode("数值:"),
				_style = document.createElement("style"),
				csstext = ".histogram {position:absolute;top:0;left:0;display:none;background-color:#000;opacity:0.5;color:orange;margin:0;font-size:1em!important;border-radius: 5px;font-family:'microsoft yahei';}.histogram p{margin:10px;line-height: 100%;padding:4px 10px 0px 10px;color:#37a;}",
				_style_text = document.createTextNode(csstext);

			_style.type = "text/css";
			try {
				_style.appendChild(_style_text);
			} catch(e) {
				_style.styleSheet.cssText = csstext;
			}
			document.getElementsByTagName("head")[0].appendChild(_style);
			_p.appendChild(text);
			_p.appendChild(_span);
			_div.appendChild(_p);
			_div.className = "histogram";
			this.options.container.appendChild(_div);
			this._div = _div;

				//.histogram {
				//	position:absolute;
				//	top:0;
				//	left:0;
				//	display:none;
				//	background-color:#000;
				//	opacity:0.5;
				//	color:orange;
				//	margin:0;
				//	font-size:0.5em;
				//	font-family:'microsoft yahei';
				//	border-radius: 5px;
				//}
				//.histogram p{
				//	margin:10px;
				//	line-height: 100%;
				//	padding:4px 10px 0px 10px;
				//	color:#37a;	
				//}
		},
		
		addHandler: function(type, handler) {
			if (typeof this.handlers[type] == "undefined"){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		
		fire: function(event, type, args) {
			if (!event.target) {
				event.target = this;
			}
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](event, args);
				}
			}
		},
		
		removeHandler: function(type, handler){
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						break;
					}
				}
				handlers.splice(i, 1);
			}
		},
		
		mouseEvent: function(arr1) {
			var _this = this,
				options = this.options,
				ctx = this.ctx,
				color = _this.options.backgroundColor.canvas.color,
				process = utils.countArr(arr1.slice(0)),
				textWidthArr = this.legendTextWidth,
				empty = options.legend.empty * 0.8;	
				
				this.Event = {
					mouseMove: function(event) {
						var indexM = null,
							last = null,
							indexL = null,
							colorIndex = null;
							
						for(var b in process) {
							var isSwitch = utils.containsRect(process[b], _this.mouse.x - _this.origin.x, _this.mouse.y - _this.origin.y);
							if(isSwitch) {
								indexM = b;
							}
						}
						for(var b in _this.legendArr) {
							var isOk,
								textWidth;
							textWidth =  empty + textWidthArr[b];
							isOk = utils.containsLegend(_this.legendArr[b], _this.mouse.x, _this.mouse.y, textWidth);
							if(isOk) {
								indexL = b;
							}
						}
		
						if(indexM !== null) {
							var _span = _this._div.getElementsByTagName("span")[0];
							//_this.processArr[indexM].drawAgain(ctx, "#ccc");
							colorIndex = (indexM % _this.maxItemLength);
							last = indexM;
		
							_this.canvas.style.cursor = "pointer";
							_this._div.style.display = "block";
							if(_this.mouse.x > _this.W * 0.7) {
								_this._div.style.left = _this.mouse.x - 95 + "px";
							} else {
								_this._div.style.left = _this.mouse.x + 15 + "px";
							}
							if(_this.mouse.y > _this.H * 0.7) {
								_this._div.style.top = _this.mouse.y - 30 + "px";
							} else {
								_this._div.style.top = _this.mouse.y + "px";
							}
							_span.innerHTML = (process[indexM].h * _this.options.dataArr.format).toFixed(0);
						} else if(indexL !== null) {
							_this.canvas.style.cursor = "pointer";
						} else {
							if(last !== null) {
								//_this.processArr[last].drawAgain(ctx, options.color[colorIndex]);
								last = null;
							}
							_this._div.style.display = "none";
							_this.canvas.style.cursor = "default";
						}
						indexM = null;
					},
					
					clickEvent: function(event) {
						var indexC = null;
						
						
						for(var b in process) {
							var isSwitch = utils.containsRect(process[b], _this.mouse.x - _this.origin.x, _this.mouse.y - _this.origin.y);
							if(isSwitch) {
								indexC = b;
							}
						}
						if(indexC !== null) {
							console.log("第 " + ++indexC + "个直方图的点击事件");
							_this.indexArr = undefined;
							
							_this.fire(event, "afterClick", {
								index: indexC,
								
								oldData: _this.options.dataArr.data,
								newData: _this.options.newData,
								
								oldXais: _this.options.xAis,
								newXais: _this.options.newXais
							});
							
//							_this.options.newXais.push(_this.options.xAis);
//							_this.options.xAis = _this.options.newXais.shift();
//							
//							_this.options.newData.push(_this.options.dataArr.data);
//							_this.options.dataArr.data = _this.options.newData.shift();
//							_this.fire("afterClick", clickHandle);
						}
						indexC = null;
						
					},
					
					clickEvent2: function(event) {
						var indexL1 = null;
						console.log("click")
						for(var b in _this.legendArr) {
							var isSwitch,
								textWidth;
							textWidth =  empty + textWidthArr[b];
							isSwitch = utils.containsLegend(_this.legendArr[b], _this.mouse.x, _this.mouse.y, textWidth);
							if(isSwitch) {
								indexL1 = b;
								!!isSwitch;
							}
						}
						if(indexL1 !== null) {
							/*动画效果1*/
							//_this.Animation1(indexL1);
		
							/*动画效果2*/
							if(_this.legendArr[indexL1].hasClick == false) {
								
								_this.legendArr[indexL1].fillColor = "#c1c1c1";
								
								_this.legendArr[indexL1].hasClick = true;
							} else {
								
								_this.legendArr[indexL1].fillColor = options.color[indexL1];
								
								_this.legendArr[indexL1].hasClick = false;
							}
							roundRect(_this.legendArr[indexL1]);
							
							_this.Animation2(indexL1);
							
							_this.cancelMouseEvent();			//解绑挂载函数
							//_this.mouseEvent(_this.processAnimationArr);
						}
						indexL1 = null;
					}
				}
				
				utils.addHandler( this.canvas, 'mousemove', this.Event.mouseMove);
				
				utils.addHandler( this.canvas, 'click', this.Event.clickEvent);
				
				utils.addHandler( this.canvas, 'click', this.Event.clickEvent2);
			
			function roundRect(obj) {
				ctx.save();
				ctx.save();
				ctx.fillStyle = color;
				ctx.fillRect(obj.x - obj.r , obj.y, obj.w + obj.r * 2, obj.h + obj.r);
				ctx.restore();
				ctx.beginPath();
				ctx.fillStyle = obj.fillColor;
				ctx.moveTo(obj.x + obj.r, obj.y);
				ctx.arcTo(obj.x + obj.w, obj.y, obj.x + obj.w, obj.y + obj.h, obj.r);
				ctx.arcTo(obj.x + obj.w, obj.y + obj.h, obj.x, obj.y + obj.h, obj.r);
				ctx.arcTo(obj.x, obj.y + obj.h, obj.x, obj.y, obj.r);
				ctx.arcTo(obj.x, obj.y, obj.x + obj.w, obj.y, obj.r);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
			}
		},

		cancelMouseEvent: function() {
			utils.removeHandler( this.canvas, 'mousemove', this.Event.mouseMove);
			
			utils.removeHandler( this.canvas, 'click', this.Event.clickEvent);
			
			utils.removeHandler( this.canvas, 'click', this.Event.clickEvent2);
		},

		Animation2: function(index) {
			var options = this.options,
				ctx = this.ctx,
				_this = this,
				y = 0,
				x = 0,
				h = 0,
				w = 0,
				spacing,
				dataArr,
				scaleY = this.scaleY,
				hasDraw = [false],
				clickIndex = 1,
				processArr = this.processArr.slice(0);

			dataArr = _this.data.slice(0);
			
			if(!this.indexArr) {
				this.indexArr = [];
			}

			if(this.indexArr.indexOf(index) == -1) {
				this.indexArr.push(index);
			} else {
				this.indexArr = this.indexArr.filter(function(item, itemindex) {
					return item != index;
				});
			}

			this.indexArr.sort(utils.compare);
			
			for(var i = 0; i < this.indexArr.length; i++) {
				for(var j = 0; j < processArr.length; j++) {
					processArr[j] = processArr[j].filter(function(item, itemIndex) {
						return itemIndex != _this.indexArr[i];
					})
				}
			}

			w = Math.max(3, Math.floor((this.eachSpacing * 0.75 - processArr[0].length * options.emptySpace) / processArr[0].length));

			spacing = ((this.eachSpacing - ((w + options.emptySpace) * processArr[0].length - options.emptySpace)) / 2);

			for(var i = 0; i < processArr.length; i++) {
				for(var j = 0; j < processArr[i].length; j++) {
					processArr[i][j].x = i * this.eachSpacing + spacing + (w + options.emptySpace) * j;
					processArr[i][j].w = w;
					processArr[i][j].hasDraw = false;
					processArr[i][j].drawH = 0;
				}
			}

			this.cancelMouseEvent();
			
			processArr = utils.countArr(processArr.slice(0));

			;(function dramRect() {
				var timer = window.myDisRequestAniFrame(dramRect, _this.canvas);

				var switchB = hasDraw.every(function(item) {
					return item;
				});
				
				if(!switchB) {
					ctx.save();
					ctx.translate(_this.originX, _this.originY);
					ctx.clearRect(1, 0, _this.W * _this.aspectRatio.x, -_this.H * _this.aspectRatio.y);

					_this.ctxbgDraw();
					_this.cSysLineDash();
					
					for(var i = 0; i < processArr.length; i++) {

						hasDraw[i] = processArr[i].caculator();

						var x = processArr[i].x,
							y = processArr[i].y,
							w = processArr[i].w,
							color = processArr[i].fillColor,
							drawH = processArr[i].drawH,
							speed = processArr[i].speed,
							target = processArr[i].h;

						if(drawH < target) {
							a(drawH);
						} else {
							a(target);
						}
					}
					
					if (processArr.length == 0) {
						hasDraw = [true];
					}
					
					ctx.restore();
				} else {
					if(_this.options.dataArr._switch) {
						for(var i in processArr) {
							_this.textDraw(processArr[i]);
						}
					}
					_this.mouseEvent(processArr);
					window.cancelmymyDisRequestAniFrame(timer);
				}
				function a(h) {
					ctx.save();
					ctx.scale(1, _this.scaleY);
					ctx.fillStyle = color;
					ctx.fillRect(x, y, w, -h);
					ctx.restore();
				}
			}());
		},

		Animation1: function(index) {
			var options = this.options,
				ctx = this.ctx,
				_this = this,
				direction;

			process = this.animationArr;
			index = index - 0;

			for(var b in process) {
				if(process[b][index].animationW != 0) {
					process[b][index].animationW = 0;
					process[b][index].startW = process[b][index].w;
					direction = -1;
				} else {
					process[b][index].animationW = process[b][index].w;
					process[b][index].startW = 0;
					direction = 1;
				}
			}

			var animationBoolen = true,
				w = 0,
				b;

			(function dramRect() {
				var timer = window.myDisRequestAniFrame(dramRect, _this.canvas);
				if(animationBoolen) {
					ctx.save();
					ctx.translate(_this.originX, _this.originY);
					ctx.clearRect(1, 0, _this.W * _this.aspectRatio.x, -_this.H * _this.aspectRatio.y);

					_this.ctxbgDraw();
					_this.cSysLineDash();
					//								
					for(var i = 0; i < process.length; i++) {
						for(var j = 0; j < process[i].length; j++) {
							if(j == index) {
								w = Math.floor(process[i][j].animationWidth());
								b = process[i][j];
								if(w <= 0) {
									w = 0;
								} else if(w >= b.w - 1) {
									w = b.w;
								}
								if(w == process[i][index].animationW) {
									animationBoolen = false;
								}
								a(b.fillColor, b.x, b.y, w, b.h);
							} else {
								b = process[i][j];
								a(b.fillColor, b.x, b.y, b.animationW, b.h);
							}
						}
					}
					ctx.restore();

				} else {
					_this.cancelMouseEvent();
					window.cancelmymyDisRequestAniFrame(timer);
				}

				function a(color, x, y, w, h) {
					ctx.save();
					ctx.scale(1, _this.scaleY);
					ctx.fillStyle = color;
					ctx.fillRect(x, y, w, -h);
					ctx.restore();
				}
			}());
		},
		
		resize: function() {
			var _this = this;
			
			_this.resize.resizeEvent = function (method, time, wait, least) {
				var timer = null;
				begin = new Date(),
					context = _this;
				return function() {
					var current = +new Date();
					if(current - begin > least && current - begin < time) {
						clearInterval(timer);
						timer = setTimeout(function() {
							method.apply(context);
						}, wait);
						begin = current;
					}
					if(current - begin > time) {
						clearInterval(timer);
						method.apply(context);
						begin = current;
					}
				};
			};
			utils.addHandler( window, 'resize', _this.resize.resizeEvent( _this.update, 1100, 850, 650));
		},

		error: function() {
			this.canvas.innerHTML = "You browser not support Canvas!";
			return;
		},

		extend: function(obj1, obj2) {
			for(var pro in obj2) {
				if(obj1[pro] === undefined || obj1[pro] === null) {
					obj1[pro] = obj2[pro];
				}
				if(Object.prototype.toString.call(obj1[pro]) == "[object Object]") {
					this.extend(obj1[pro], obj2[pro])
				}
				
			}
		},

		drawDasheLine: function(ctx, x1, y1, x2, y2, dashLength) { //IE10及以下不支持 setLineDash(),故写了一个自用函数;
			var deltaX = x2 - x1,
				deltaY = y2 - y1;
			dashLength = dashLength === undefined ? 6 : dashLength;
			var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = "#c1c1c1";
			for(var i = 0; i < numDashes; ++i) {
				ctx[i % 2 === 0 ? 'moveTo' : 'lineTo'](x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
	};
	window.DrawHistogram = DrawHistogram; //暴露插件接口
})(window, document);