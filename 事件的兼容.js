/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-08 15:08:33
 * @version $Id$
 */

var EventUtil = {
	addHandler: function(element, type, handler){
		if (element.addEventListener){
			element.addEventListener(type, handler, false); //冒泡阶段可以最大限度兼容浏览器事件（IE就是冒泡，netscape是事件捕捉）
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler: function(element, type, handler){
		if (element.removeEventListener){
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	getEvent: function(event){
		return event ? event : window.event; // widnow.event for IE DOM0 level such as onclick, onmouseover .... Begin with 'on' . 
	},
	getTarget: function(event){
		return event.target || event.srcElement; //srcElement for IE.
	},
	preventDefault: function(event){
		if (event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation: function(event){
		if (event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	getButton: function(event){
		if (document.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;
		} else {
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	getWheelData: function(event){
		if (event.wheelData){
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelData : event.wheelData);
		} else {
			return -event.detail * 40; //For fireFox.
		}
	},
	getChardCode: function(event){  //用于获取当触发keypress事件时，返回键值。
		if (typeof event.charCode == "number"){
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},

}