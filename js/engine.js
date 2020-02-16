
(function (Driver) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Main = function() {
	this.step = 0; //this.step=1;
	Stage.init();
	this.initColorChain();
	this.world = new World();
	var cell = new Cell("#cellProto","#main",new apix.common.tools.math.Vector(0,0),this.colorChain);
	this.world.addCell(cell);	
	this.ant = new Ant("#antProto","#main",cell,this.world,this.colorChain,Main.INIT_ROTATE);
	if(!Main.SKIP) this.clk = new apix.common.event.timing.Clock($bind(this,this.loop),Main.PERIOD); 
	else {
		if (Main.SKIP_METHOD=="pauseOnZero") 	this.compute=this.compute1;
		else 									this.compute=this.compute2;
		this.compute();
	}
	
};
Main.__name__ = true;
Main.main = function() {
	Main.g = apix.common.util.Global.get();
	Main.g.setupTrace();
	new Main();
};
Main.prototype = {
	loop: function() {
		this.step++;
		this.ant.currentCell.colorChain.action();
		this.ant.currentCell.changeColor();
		this.ant.advance();			
		//this.step++;
		apix.common.display.ElementExtender.inner(apix.common.util.StringExtender.get(".counter"),"" + this.step);		
		if (Main.MAX_STEP != -1 && this.step > Main.MAX_STEP - 1) this.clk.stop();
	}
	,compute1: function() {
		this.step++;
		while( (this.ant.posx!=0 || this.ant.posy!=0 ) || this.step<Main.SKIP_START ) {		
			this.ant.currentCell.colorChain.action();
			this.ant.currentCell.changeColor();
			this.ant.advance();				
			this.step++;			
		}
		apix.common.display.ElementExtender.inner(apix.common.util.StringExtender.get(".counter"),"" + this.step);
		//log("- "+this.step);
		//this.step++;
		if (Main.MAX_STEP == -1 || this.step <= Main.MAX_STEP + 1)  
			new apix.common.event.timing.Delay($bind(this,this.displayColor),Main.PERIOD);
		this.ant.posx=null;this.ant.posy=null;
	}
	,compute2: function() {
		this.step++;	
		if (Main.SKIP_VALUE==1) {
			this.ant.currentCell.colorChain.action();
			this.ant.currentCell.changeColor();
			this.ant.advance();	
		}
		while (this.step % Main.SKIP_VALUE != 0 || this.step<Main.SKIP_START) {			
			this.ant.currentCell.colorChain.action();
			this.ant.currentCell.changeColor();
			this.ant.advance();			
			this.step++;			
		}		
		apix.common.display.ElementExtender.inner(apix.common.util.StringExtender.get(".counter"),"" + this.step);
		//this.step++;
		if (Main.MAX_STEP == -1 || this.step <= Main.MAX_STEP )  
			new apix.common.event.timing.Delay($bind(this,this.displayColor),Main.PERIOD);
		
		
	}	
	,displayColor: function() {
		if (this.step%2 !=0 || Main.SKIP_METHOD!="pauseOnZero") {
			this.world.grid.forIn(function(gridx,i) {
				if(gridx != null) gridx.forIn(function(c,ix) {
					if(c != null) apix.common.display.ElementExtender.cssStyle(c.elem,"backgroundColor",c.color);
				});
			});	
		}
		if(Main.MAX_STEP == -1 || this.step < Main.MAX_STEP)
		new apix.common.event.timing.Delay($bind(this,this.compute),Main.PERIOD);
	}
	,initColorChain: function() {
		this.colorChain = Main.COLOR_CHAIN;
	}
};
var Stage = function() { };
Stage.__name__ = true;
Stage.init = function() {
	Stage.resize();
	apix.common.display.ElementExtender.on(window,"resize",Stage.onResize);
};
Stage.resize = function() {
	apix.common.display.ElementExtender.posy(apix.common.util.StringExtender.get("#main"),apix.common.display.Common.get_windowHeight() / 2);
};
Stage.onResize = function() {
	Stage.resize();
};
var World = function() {
	this.grid = new apix.common.util.ArrayZ();
};
World.__name__ = true;
World.prototype = {
	addCell: function(c) {
		if(this.grid[c.pos.get_yi()] == null) this.grid.set(c.pos.get_yi(),new apix.common.util.ArrayZ());
		this.grid[c.pos.get_yi()].set(c.pos.get_xi(),c);
	}
	,getCellAt: function(x,y) {
		var c = null;
		if(this.grid[y] != null) {
			if(this.grid[y][x] != null) c = this.grid[y][x];
		}
		return c;
	}
};
var Cell = function(qrySel,into,p,cc) {
	this.colorChain = cc;
	this.elem = apix.common.display.ElementExtender.clone(apix.common.util.StringExtender.get(qrySel));
	this.ctnr = apix.common.util.StringExtender.get(into);
	this.ctnr.appendChild(this.elem);
	this.elem.id = apix.common.display.Common.get_newSingleId();
	this.color = this.colorChain.color;
	if(!Main.SKIP) apix.common.display.ElementExtender.cssStyle(this.elem,"backgroundColor",this.color);
	if(p != null) this.pos = p; else this.pos = new apix.common.tools.math.Vector(0,0);
	this.setPosition();
};
Cell.__name__ = true;
Cell.prototype = {
	changeColor: function() {
		this.colorChain = this.colorChain.next;
		this.color = this.colorChain.color;
		if(!Main.SKIP) apix.common.display.ElementExtender.cssStyle(this.elem,"backgroundColor",this.color);
	}
	,setPosition: function(p) {
		if(p != null) this.pos = p;
		var x = apix.common.display.ElementExtender.width(this.elem) * this.pos.get_x();
		var y = apix.common.display.ElementExtender.height(this.elem) * this.pos.get_y();
		apix.common.display.ElementExtender.posx(this.elem,x);
		apix.common.display.ElementExtender.posy(this.elem,y);
	}
};
var Ant = function(qrySel,into,c,w,cc,ir) {
	//haxe.Log.trace("Ant() Main.MAX_STEP="+Main.MAX_STEP,{ fileName : "Main.hx", lineNumber : 54, className : "Main", methodName : "new"});
	this.posx; this.posy;
	this.initRotation = ir;
	this.initColorChain(cc);
	this.step = 1;
	this.step2 = 1;
	this.elem = apix.common.display.ElementExtender.clone(apix.common.util.StringExtender.get(qrySel));
	this.ctnr = apix.common.util.StringExtender.get(into);
	//if(!Main.SKIP) 
	this.ctnr.appendChild(this.elem);
	this.elem.id = apix.common.display.Common.get_newSingleId();
	this.currentCell = c;
	this.world = w;
	//if(!Main.SKIP) 
	this.displayOn(this.currentCell);
};
Ant.__name__ = true;
Ant.prototype = {
	advance: function() {
		var cell;
		var nx = this.currentCell.pos.get_xi();
		var ny = this.currentCell.pos.get_yi();
		if(this.get_rotation() == 0) ny--; else if(this.get_rotation() == 90) nx++; else if(this.get_rotation() == 180) ny++; else if(this.get_rotation() == 270) nx--; else if(this.get_rotation() == 45) {
			ny--;
			nx++;
		} else if(this.get_rotation() == 135) {
			ny++;
			nx++;
		} else if(this.get_rotation() == 225) {
			ny++;
			nx--;
		} else if(this.get_rotation() == 315) {
			ny--;
			nx--;
		} else haxe.Log.trace("f::Invalid rotation in Ant.advance() !!",{ fileName : "Main.hx", lineNumber : 275, className : "Ant", methodName : "advance"});
		this.posx=nx;this.posy=ny;
		cell = this.world.getCellAt(nx,ny);
		if(cell == null) {
			cell = new Cell("#cellProto","#main",new apix.common.tools.math.Vector(nx,ny),this.colorChain);
			this.world.addCell(cell);
		}
		this.currentCell = cell;
		//if(!Main.SKIP) 
		this.displayOn(this.currentCell);
	}
	,turnLeft: function() {
		var _g = this;
		_g.set_rotation(_g.get_rotation() - 90);
		if(this.get_rotation() < 0) this.set_rotation(360 + this.get_rotation());
	}
	,turnRight: function() {
		var _g = this;
		_g.set_rotation(_g.get_rotation() + 90);
		if(this.get_rotation() >= 360) this.set_rotation(this.get_rotation() - 360);
	}
	,displayOn: function(c) {
		var x = apix.common.display.ElementExtender.width(this.elem) * c.pos.get_x();
		var y = apix.common.display.ElementExtender.height(this.elem) * c.pos.get_y();
		apix.common.display.ElementExtender.posx(this.elem,x);
		apix.common.display.ElementExtender.posy(this.elem,y);
	}
	,initColorChain: function(cc) {
		this.colorChain=cc;
		do {
			if (cc.action==90) cc.action = $bind(this,this.turnRight);
			else if (cc.action==-90) cc.action = $bind(this,this.turnLeft);
			cc=cc.next;
		}
		while (cc!=this.colorChain); 
		/*
		this.colorChain = cc;
		cc.action = $bind(this,this.turnRight);
		cc = cc.next;
		cc.action = $bind(this,this.turnLeft);
		*/
	}
	,get_rotation: function() {
		if(this.elem.rotation == null) apix.common.display.ElementExtender.setRotation(this.elem,this.initRotation);
		return this.elem.rotation;
	}
	,set_rotation: function(v) {
		apix.common.display.ElementExtender.setRotation(this.elem,v);
		return this.elem.rotation;
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var apix = {};
apix.common = {};
apix.common.display = {};
apix.common.display.Common = function() { };
apix.common.display.Common.__name__ = true;
apix.common.display.Common.get_body = function() {
	return window.document.body;
};
apix.common.display.Common.get_windowHeight = function() {
	return window.innerHeight;
};
apix.common.display.Common.get_userAgent = function() {
	return window.navigator.userAgent;
};
apix.common.display.Common.get_newSingleId = function() {
	apix.common.display.Common.__nextSingleId++;
	var id = "apix_instance_" + apix.common.display.Common.__nextSingleId;
	if(window.document.getElementById(id) != null) haxe.Log.trace("f::Id " + id + " already exists ! ",{ fileName : "Common.hx", lineNumber : 273, className : "apix.common.display.Common", methodName : "get_newSingleId"});
	return id;
};
apix.common.display.ElementExtender = function() { };
apix.common.display.ElementExtender.__name__ = true;
apix.common.display.ElementExtender.clone = function(el,b) {
	if(b == null) b = true;
	var e = el.cloneNode(b);
	return e;
};
apix.common.display.ElementExtender.handCursor = function(el,v) {
	if(v == null) v = true;
	var str;
	if(v) str = "pointer"; else str = "auto";
	if(el.style != null && el.style.cursor != null) el.style.cursor = str;
};
apix.common.display.ElementExtender.setRotation = function(e,v) {
	var el = e;
	var r;
	if(v == null) r = "null"; else r = "" + v;
	var g = apix.common.util.Global.get();
	if(g.get_isWebKit()) el.style.webkitTransform = "rotate(" + r + "deg)"; 
	else if(g.get_isFirefox()) el.style.mozTransform = "rotate(" + r + "deg)"; 
	else if(g.get_isIE()) el.style.msTransform = "rotate(" + r + "deg)"; 
	else if(g.get_isOpera()) el.style.oTransform = "rotate(" + r + "deg)"; 
	else if(g.get_isKhtml()) el.style.khtmlTransform = "rotate(" + r + "deg)"; 
	else el.style.transform = "rotate(" + r + "deg)";
	el.rotation = v;
};
apix.common.display.ElementExtender.posx = function(el,v,bounds) {
	var vx = apix.common.display.ElementExtender.numVal(v,null);
	if(vx == null) {
		if(el.offsetLeft != null) vx = el.offsetLeft; else if(el.clientLeft != null) vx = el.clientLeft; else if(el.scrollLeft != null) vx = el.scrollLeft; else vx = apix.common.display.ElementExtender.numVal(Std.parseFloat(el.style.left),null);
		if(vx == null) haxe.Log.trace("f::Element " + el.id + " has not valid left position !",{ fileName : "ElementExtender.hx", lineNumber : 534, className : "apix.common.display.ElementExtender", methodName : "posx"});
	} else {
		if(bounds != null) {
			if(vx < bounds.get_x()) vx = bounds.get_x(); else if(vx > bounds.get_x() + bounds.get_width()) vx = bounds.get_x() + bounds.get_width();
		}
		el.style.left = (vx == null?"null":"" + vx) + "px";
	}
	return vx;
};
apix.common.display.ElementExtender.posy = function(el,v,bounds) {
	var vy = apix.common.display.ElementExtender.numVal(v,null);
	if(vy == null) {
		if(el.offsetTop != null) vy = el.offsetTop; else if(el.clientTop != null) vy = el.clientTop; else if(el.scrollTop != null) vy = el.scrollTop; else vy = apix.common.display.ElementExtender.numVal(Std.parseFloat(el.style.top),null);
		if(vy == null) haxe.Log.trace("f::Element " + el.id + " has not valid top position !",{ fileName : "ElementExtender.hx", lineNumber : 555, className : "apix.common.display.ElementExtender", methodName : "posy"});
	} else {
		if(bounds != null) {
			if(vy < bounds.get_y()) vy = bounds.get_y(); else if(vy > bounds.get_y() + bounds.get_height()) vy = bounds.get_y() + bounds.get_height();
		}
		el.style.top = (vy == null?"null":"" + vy) + "px";
	}
	return vy;
};
apix.common.display.ElementExtender.width = function(el,v) {
	if(el == null) haxe.Log.trace("f::Element is null !",{ fileName : "ElementExtender.hx", lineNumber : 595, className : "apix.common.display.ElementExtender", methodName : "width"});
	var w = apix.common.display.ElementExtender.numVal(v,null);
	if(w == null) {
		if(el.clientWidth != null) w = el.clientWidth; else w = apix.common.display.ElementExtender.numVal(Std.parseFloat(el.style.width),null);
		if(w == null) {
			if(el.offsetWidth != null) w = el.offsetWidth; else if(el.scrollWidth != null) w = el.scrollWidth;
		}
		if(w == 0 && el.style.width != "") w = Std.parseFloat(el.style.width);
		if(w == null) haxe.Log.trace("f::Element " + el.id + " has not valid width !",{ fileName : "ElementExtender.hx", lineNumber : 605, className : "apix.common.display.ElementExtender", methodName : "width"});
	} else el.style.width = (w == null?"null":"" + w) + "px";
	return w;
};
apix.common.display.ElementExtender.height = function(el,v,forceCss) {
	if(el == null) haxe.Log.trace("f::Element is null !",{ fileName : "ElementExtender.hx", lineNumber : 614, className : "apix.common.display.ElementExtender", methodName : "height"});
	var h = apix.common.display.ElementExtender.numVal(v,null);
	if(h == null) {
		if(el.clientHeight != null && (!forceCss || el.clientHeight != 0)) h = el.clientHeight; else h = apix.common.display.ElementExtender.numVal(Std.parseFloat(el.style.height),null);
		if(h == null) {
			if(el.offsetHeight != null) h = el.offsetHeight; else if(el.scrollHeight != null) h = el.scrollHeight;
		}
		if(h == 0 && el.style.height != "") h = Std.parseFloat(el.style.height);
		if(h == null) haxe.Log.trace("f::Element " + el.id + " has not valid height !",{ fileName : "ElementExtender.hx", lineNumber : 624, className : "apix.common.display.ElementExtender", methodName : "height"});
	} else el.style.height = (h == null?"null":"" + h) + "px";
	return h;
};
apix.common.display.ElementExtender.css = function(el,k,v) {
	if(el == null) haxe.Log.trace("f::Element is null !",{ fileName : "ElementExtender.hx", lineNumber : 676, className : "apix.common.display.ElementExtender", methodName : "css"});
	if(el.style[k]==null) haxe.Log.trace("f::Element " + el.id + " hasn't '" + k + "' style property !",{ fileName : "ElementExtender.hx", lineNumber : 677, className : "apix.common.display.ElementExtender", methodName : "css"});
	if(v == null) v = el.style[k]; else {
		el.style[k]=v;
	}
	return v;
};
apix.common.display.ElementExtender.cssStyle = function(el,k,v) {
	if(el == null) haxe.Log.trace("f::Element is null !",{ fileName : "ElementExtender.hx", lineNumber : 684, className : "apix.common.display.ElementExtender", methodName : "cssStyle"});
	if(el.style[k]==null) haxe.Log.trace("f::Element " + el.id + " hasn't '" + Std.string(k) + "' style property !",{ fileName : "ElementExtender.hx", lineNumber : 685, className : "apix.common.display.ElementExtender", methodName : "cssStyle"});
	if(v == null) v = el.style[k]; else {
		el.style[k]=v;
	}
	return v;
};
apix.common.display.ElementExtender.inner = function(el,v) {
	if(el == null) haxe.Log.trace("f::Element is null !",{ fileName : "ElementExtender.hx", lineNumber : 830, className : "apix.common.display.ElementExtender", methodName : "inner"});
	if(v == null) v = el.innerHTML; else el.innerHTML = v;
	return v;
};
apix.common.display.ElementExtender.on = function(srcEvt,type,listenerFunction,b,data) {
	if(b == null) b = false;
	if(apix.common.event.StandardEvent.isMouseType(type)) apix.common.display.ElementExtender.handCursor(srcEvt);
	var deleguateFunction = apix.common.display.ElementExtender.getLst(srcEvt,listenerFunction,data);
	var el = srcEvt;
	if(el.listeners == null) el.listeners = [];
	el.listeners.push({ type : type, listenerFunction : listenerFunction, deleguateFunction : deleguateFunction});
	srcEvt.addEventListener(type,deleguateFunction,b);
};
apix.common.display.ElementExtender.getLst = function(srcEvt,listenerFunction,data) {
	var deleguateFunction;
	if(data == null) deleguateFunction = listenerFunction; else deleguateFunction = function(e) {
		listenerFunction.call(srcEvt,e,data);
	};
	return deleguateFunction;
};
apix.common.display.ElementExtender.numVal = function(n,defVal) {
	if(n == "0") return Std.parseFloat("0");
	if(n == null) return defVal;
	if(Math.isNaN(n)) return defVal;
	if(n == "") return defVal;
	if(typeof(n) == "string") return Std.parseFloat(n);
	return Math.pow(n,1);
};
apix.common.event = {};
apix.common.event.EventSource = function() {
	this._listenerArray = [];
};
apix.common.event.EventSource.__name__ = true;
apix.common.event.EventSource.prototype = {
	dispatch: function(e) {
		var ret = null;
		if(e.target == null) e.target = this;
		var _g = 0;
		var _g1 = this._listenerArray;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o.data != null) e.data = o.data;
			ret = o.listener(e);
		}
		return ret;
	}
};
apix.common.util = {};
apix.common.util.Global = function() {
};
apix.common.util.Global.__name__ = true;
apix.common.util.Global.get = function() {
	if(apix.common.util.Global._instance == null) apix.common.util.Global._instance = new apix.common.util.Global();
	return apix.common.util.Global._instance;
};
apix.common.util.Global.apixTrace = function(v,i) {
	var str = Std.string(v);
	var len = str.length;
	if(len > 2 && HxOverrides.substr(str,1,2) == "::") {
		if(HxOverrides.substr(str,0,1) == "e" || HxOverrides.substr(str,0,1) == "f") {
			var d = window.document.getElementById("apix:error");
			if(d != null) {
				str = "<br/>error " + (i != null?"in " + i.fileName + " line " + i.lineNumber:"") + " : " + "<span style='color:#999;'>" + HxOverrides.substr(str,3,len - 3) + "</span>" + "<br/>";
				d.innerHTML += str + "<br/>";
				throw "apix error. See red message in page.";
			} else if(HxOverrides.substr(str,0,1) == "f") {
				var msg = "";
				v = HxOverrides.substr(str,3,len - 3);
				if(window.document.getElementById("haxe:trace") != null) msg = "apix error. See message in page."; else msg = "apix error. See last message above.";
				js.Boot.__trace(v,i);
				throw msg;
			}
		} else if(HxOverrides.substr(str,0,1) == "s") {
			str = "" + "<span style='color:#999;'>" + HxOverrides.substr(str,3,len - 3) + "</span>";
			var d1 = window.document.getElementById("apix:info");
			if(d1 != null) d1.innerHTML += "<div style='border-bottom: dotted 1px black;' >" + str + "</div>"; else js.Boot.__trace(v,i);
		} else if(HxOverrides.substr(str,0,1) == "i") {
			str = "notice in " + (i != null?i.fileName + ":" + i.lineNumber:"") + "<span style='color:#999;'> - " + HxOverrides.substr(str,3,len - 3) + "</span>";
			var d2 = window.document.getElementById("apix:info");
			if(d2 != null) d2.innerHTML += "<div style='border-bottom: dotted 1px black;' >" + str + "</div>"; else js.Boot.__trace(v,i);
		}
	} else {
		var d3 = window.document.getElementById("apix:info");
		if(d3 != null) d3.innerHTML += "<div style='border-bottom: dotted 1px black;' >" + str + "</div>"; else js.Boot.__trace(v,i);
	}
};
apix.common.util.Global.prototype = {
	intVal: function(n,defVal) {
		if(defVal == null) defVal = 0;
		if(n == "0") return Std.parseInt("0");
		if(n == null) return defVal;
		if(Math.isNaN(n)) return defVal;
		if(n == "") return defVal;
		if(typeof(n) == "string") return Std.parseInt(n);
		return n;
	}
	,empty: function(v) {
		if(v == null) return true;
		if(v.length == 0) return true;
		return false;
	}
	,setupTrace: function(ctnrId,where) {
		if(where == null) where = "bottom";
		var ctnr;
		if(this.empty(ctnrId)) ctnr = apix.common.display.Common.get_body(); else ctnr = window.document.getElementById(ctnrId);
		if(ctnr != null) {
			if(window.document.getElementById("apix:error") == null) ctnr.innerHTML = "<div id='apix:error' style='font-weight:bold;color:#900;' ></div>" + ctnr.innerHTML;
			if(window.document.getElementById("apix:info") == null) {
				if(where == "top") ctnr.innerHTML = "<div id='apix:info' style='font-weight:bold;' ></div>" + ctnr.innerHTML; else {
					ctnr.innerHTML += "<div id='apix:info' style='position:relative;font-weight:bold;' ></div>";
					apix.common.display.ElementExtender.css(window.document.getElementById("apix:info"),"zIndex",Std.string(this.getNextZindex()));
				}
			}
			haxe.Log.trace = apix.common.util.Global.apixTrace;
		} else return false;
		return true;
	}
	,getNextZindex: function() {
		var highestZ = null;
		var onefound = false;
		var elems = window.document.getElementsByTagName("*");
		if(elems.length > 0) {
			var _g = 0;
			while(_g < elems.length) {
				var el = elems[_g];
				++_g;
				if(el.style.position != null && el.style.zIndex != null) {
					var zi = this.intVal(el.style.zIndex);
					if(highestZ == null || highestZ < zi) highestZ = zi;
				}
			}
		}
		if(highestZ == null) highestZ = 0;
		return highestZ + 1;
	}
	,get_isMobile: function() {
		return new EReg("iPhone|ipad|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|opera mobi|windows phone|iemobile|mobile".toLowerCase(),"i").match(apix.common.display.Common.get_userAgent().toLowerCase());
	}
	,get_isIE: function() {
		return new EReg("msie".toLowerCase(),"i").match(apix.common.display.Common.get_userAgent().toLowerCase());
	}
	,get_isOpera: function() {
		return new EReg("opera".toLowerCase(),"i").match(apix.common.display.Common.get_userAgent().toLowerCase());
	}
	,get_isFirefox: function() {
		return new EReg("firefox".toLowerCase(),"i").match(apix.common.display.Common.get_userAgent().toLowerCase());
	}
	,get_isKhtml: function() {
		return new EReg("konqueror".toLowerCase(),"i").match(apix.common.display.Common.get_userAgent().toLowerCase());
	}
	,get_isWebKit: function() {
		return new EReg("webkit|chrome|safari".toLowerCase(),"i").match(apix.common.display.Common.get_userAgent().toLowerCase());
	}
};
apix.common.event.StandardEvent = function(target) {
	this.target = target;
};
apix.common.event.StandardEvent.__name__ = true;
apix.common.event.StandardEvent.isMouseType = function(v) {
	var _g = 0;
	var _g1 = ["click","dblclick",apix.common.event.StandardEvent.MOUSE_DOWN,apix.common.event.StandardEvent.MOUSE_OVER];
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i == v) return true;
	}
	return false;
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
apix.common.event.timing = {};
apix.common.event.timing.Clock = function(f,per) {
	if(per == null) per = 0.04;
	haxe.Timer.call(this,Math.round(per * 1000));
	this.top = new apix.common.event.EventSource();
	this.run = $bind(this,this.clockRun);
	this.listener = f;
	this._idle = false;
};
apix.common.event.timing.Clock.__name__ = true;
apix.common.event.timing.Clock.__super__ = haxe.Timer;
apix.common.event.timing.Clock.prototype = $extend(haxe.Timer.prototype,{
	clockRun: function() {
		if(!this._idle) {
			if(this.listener != null) this.listener(this);
			if(this.top != null) this.top.dispatch(new apix.common.event.StandardEvent(this));
		}
	}
});
apix.common.event.timing.Delay = function(f,per) {
	if(per == null) per = 0.04;
	this.listener = f;
	this.timer = haxe.Timer.delay($bind(this,this.clockRun),Math.round(per * 1000));
};
apix.common.event.timing.Delay.__name__ = true;
apix.common.event.timing.Delay.prototype = {
	clockRun: function() {
		this.timer.stop();
		this.listener(this);
	}
};
apix.common.tools = {};
apix.common.tools.math = {};
apix.common.tools.math.Vector = function(vx,vy,vz) {
	this.g = apix.common.util.Global.get();
	this.set_x(vx);
	this.set_y(vy);
	this.set_z(vz);
};
apix.common.tools.math.Vector.__name__ = true;
apix.common.tools.math.Vector.prototype = {
	get_xi: function() {
		return this._x | 0;
	}
	,get_yi: function() {
		return this._y | 0;
	}
	,get_x: function() {
		return this._x;
	}
	,set_x: function(v) {
		this._x = v;
		return v;
	}
	,get_y: function() {
		return this._y;
	}
	,set_y: function(v) {
		this._y = v;
		return v;
	}
	,set_z: function(v) {
		this._z = v;
		return v;
	}
};
apix.common.tools.math.Rectangle = function() { };
apix.common.tools.math.Rectangle.__name__ = true;
apix.common.tools.math.Rectangle.__super__ = apix.common.tools.math.Vector;
apix.common.tools.math.Rectangle.prototype = $extend(apix.common.tools.math.Vector.prototype,{
	get_width: function() {
		return this._width;
	}
	,get_height: function() {
		return this._height;
	}
});
apix.common.util.ArrayZ = function() {
	this.negLength = 0;
	this.posLength = 0;
};
apix.common.util.ArrayZ.__name__ = true;
apix.common.util.ArrayZ.prototype = {
	set: function(i,v) {
		this[i] = v;
		if(i < 0) this.negLength = Std["int"](Math.min(this.negLength | 0,i | 0)); else this.posLength = Std["int"](Math.max(this.posLength | 0,i + 1 | 0));
	}
	,forIn: function(f,s,e) {
		if(s == null) s = this.negLength; else s = s;
		if(e == null) e = this.posLength; else e = e;
		var $it0 = new apix.common.util.StepIterator(s,e);
		while( $it0.hasNext() ) {
			var i = $it0.next();
			f(this[i],i);
		}
	}
};
apix.common.util.StepIterator = function(min,max,step) {
	this.min = min;
	this.max = max;
	if(step == null) {
		if(min < max) step = 1; else step = -1;
	}
	if(min <= max && step < 0 || min > max && step >= 0) step *= -1;
	this.step = step;
};
apix.common.util.StepIterator.__name__ = true;
apix.common.util.StepIterator.prototype = {
	hasNext: function() {
		var ret;
		if(this.step > 0) ret = this.min < this.max; else ret = this.min > this.max;
		return ret;
	}
	,next: function() {
		var ret = this.min;
		this.min += this.step;
		return ret;
	}
};
apix.common.util.StringExtender = function() { };
apix.common.util.StringExtender.__name__ = true;
apix.common.util.StringExtender.get = function(v,parent) {
	if(apix.common.util.StringExtender.rootHtmlElement == null) apix.common.util.StringExtender.rootHtmlElement = apix.common.display.Common.get_body();
	if(parent == null) parent = apix.common.util.StringExtender.rootHtmlElement;
	return parent.querySelector(v);
};
haxe.Log = function() { };
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
Main.SKIP = Driver.skip;
Main.SKIP_METHOD=Driver.skipMethod;
Main.COLOR_CHAIN = Driver.colorChain;
Main.SKIP_VALUE = Driver.skipValue;
Main.MAX_STEP = Driver.maxStep;
Main.INIT_ROTATE = Driver.initRotation;
Main.PERIOD =1/Driver.frequency;
Main.SKIP_START=Driver.skipStart;
apix.common.display.Common.__nextSingleId = -1;
apix.common.event.StandardEvent.g = apix.common.util.Global.get();
apix.common.event.StandardEvent.msPointer = window.navigator.msPointerEnabled;
apix.common.event.StandardEvent.MOUSE_DOWN = apix.common.event.StandardEvent.msPointer?"MSPointerDown":apix.common.event.StandardEvent.g.get_isMobile()?"touchstart":"mousedown";
apix.common.event.StandardEvent.MOUSE_OVER = apix.common.event.StandardEvent.msPointer?"MSPointerOver":apix.common.event.StandardEvent.g.get_isMobile()?"touchstart":"mouseover";
Main.main();
})(Driver);
