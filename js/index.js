const toRight	=+90;				// clockwise rotation
const toLeft 	=-90;				// anti-clockwise
const up		=0;					// up orientation
const down 		=180;				// down orientation
var Driver = {}; 					// Engine driver where all parameters are.
Driver.maxStep=4; 					// max step number before stop or -1 for infinite
Driver.frequency=1;					// Number of frame per second
Driver.skip=false;					// if true only some views are displayed (freeze frame effect)
									// If false : step's number equal view's number
Driver.skipMethod="pauseOnZero"; 	// "pauseOnZero" or "pauseOnValue" (default)
								
Driver.skipValue=1;					// Number of skipped steps between 2 views if skipMethod <> pauseOnZero. Must be >=2
									// OR
Driver.skipStart=0;	 				// First skip value before first view. 
//
Driver.initRotation=toLeft;			// Start orientation of Ant
initColorChain=initColorChain1; 	// Choose one of the functions below
log (" "+initColorChain.toString().substr(9,16));
//
initColorChain();
//
// Highway 	: 1 , 5 , 13 , 15
// Sym		: 3or2 , 8 , 14
function initColorChain1() { 	//1 highway 
	var cc;
	Driver.colorChain = { color : "white", action :toRight, next : null};
	cc = Driver.colorChain;
	cc.next = 			{ color : "black", action :toLeft, 	next : Driver.colorChain};		
}
function initColorChain2() { 	//2 sym and large expansive
	var cc;
	Driver.colorChain = { 	color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { 			color : "blue", 	action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { 			color : "green", 	action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { 			color : "black", 	action :toRight, next : Driver.colorChain};		
}
function initColorChain2_1() { 	//2_1 idem 2 but whith only 2 colors visible for humans.
	var cc;
	Driver.colorChain = { 	color : "#00ffff", 			action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { 			color : "#000000", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { 			color : "#00fffe", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { 			color : "#000001", 			action :toRight, next : Driver.colorChain};		
}
function initColorChain2_2() { 	//2_2 idem 2_1 with 4 colors
	var cc;
	Driver.colorChain = { 	color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { 			color : "red",	 	action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { 			color : "green", 	action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { 			color : "cyan", 	action :toRight, next : Driver.colorChain};		
}
function initColorChain3() { 	//3 sym few expansive
	var cc;
	Driver.colorChain = { 	color : "#000033", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { 			color : "#ff3300", 	action :toLeft, next : null};
	cc=cc.next;
	cc.next=  {				color : "#0099ff", 	action :toRight, next : null};
	cc=cc.next;
	cc.next = { 			color : "green", 	action :toRight, next : null};
	cc=cc.next;
	cc.next=  { 			color : "#bbbbff", 	action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { 			color : "yellow", 	action :toLeft, next : Driver.colorChain};	
}
function initColorChain3_1() { 	//3.1 idem 3 but whith only 2 colors visible for humans.
	var cc;
	Driver.colorChain = { 	color : "#ff0000", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { 			color : "#000000", 		action :toLeft, next : null};
	cc=cc.next;
	cc.next=  {				color : "#ff000e", 	action :toRight, next : null};
	cc=cc.next;
	cc.next = { 			color : "#000001", 	action :toRight, next : null};
	cc=cc.next;
	cc.next=  { 			color : "#ff000d", 	action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { 			color : "#000002", 	action :toLeft, next : Driver.colorChain};	
}
function initColorChain4() { 	//4 sym look like 3, whith creation of an envelope around the core 
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "cyan", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toLeft, next : Driver.colorChain};		
}
function initColorChain5() { 	//5 highway around 10000 step. Idem 1.
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "cyan", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};		
}
function initColorChain6() { 	//6 chaos no highway until 2000000 (and maybe infinitely)
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "black", 			action :toRight, next : Driver.colorChain};		
}
function initColorChain7() { 	//7 sym whith creation of an envelope around the core, few expansive
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};		
}
function initColorChain8() { 	//8 sym , regulary high expansive, no enveloppe; nice alternative black&white and color
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "purple", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#ff4", 			action :toRight, next : null}; // yellow
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain9() { 	//9 chaos inside a growing enveloppe
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "purple", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null}; 
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain10() { 	//10 chaos patatoïd, no highway
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "purple", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain11() { 	//11 highway immediate
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = 			{ color : "red", 	action :toLeft, next : null};
	cc=cc.next;
	cc.next = 			{ color : "gray", 	action :toLeft, next : null};
	cc=cc.next;
	cc.next = 			{ color : "purple", action :toLeft, next : null};
	cc=cc.next;
	cc.next=  			{ color : "black", 	action :toRight, next : null};
	cc=cc.next;
	cc.next = 			{ color : "green", 	action :toRight, next : null};
	cc=cc.next;
	cc.next = 			{ color : "violet", action :toRight, next : Driver.colorChain};	
}
function initColorChain12() { 	//12 chaos then create a cubic bougeon, then grow, then create an other little bugeon
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "purple", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	//cc.next=  { color : "green", 			action :toRight, next : null};
	//cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain13() { 	//13 create an highway around only 1000 step
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "purple", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	//cc.next=  { color : "green", 			action :toRight, next : null};
	//cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain14() { 	//14 nice sym, expansive
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "purple", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "black", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "violet", 			action :toLeft, next : Driver.colorChain};	
}
function initColorChain15() { 	//15 patatoïd but highway very late, just before 258.350  !!!
	var cc;
	Driver.colorChain = { color : "orange", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "green", 				action :toLeft, next : null};
	
	cc=cc.next;
	cc.next = { color : "black", 				action :toRight, next : null};
	
	cc=cc.next;
	//
	cc.next = { color : "red", 				action :toLeft, next : Driver.colorChain};	
}
function initColorChain16() { 	//16 idem than 14 with same colors of initColorChain2
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "white", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "white", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "blue", 			action :toLeft, next : Driver.colorChain};	
}
// Aldoaldoz's samples
function initColorChain17() { 	//17  large highway after 230.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#008800", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "blue", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain18() { 	//18  straight highway after 1.150.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#008800", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#555500", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "purple", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain19() { 	//19 very complex highway from 30.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#008800", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#555500", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "purple", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain20() { 	//20 connical highway from 10.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toRight, next : null};
	cc=cc.next;
	
	//
	cc.next = { color : "gray", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain21() { 	//21 connical highway up to 15.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#008800", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#555500", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "purple", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain22() { 	//22 like an aeroplane from 10000
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#FFB600", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "magenta", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#442222", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#203020", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#1000ff", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#334400", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "purple", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain23() { 	//23 2D highway immediately
	var cc;
	Driver.colorChain = { color : "white", 	action :toRight, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "#B52727", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "#204797", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "yellow", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain24() { 	//24 Spiral in a 2D extend space from 15.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#008800", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "#555500", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain25() { 	//25 similar 24 but ant becomes crazy !!
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "#008800", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain27() { 	//27 artistic from 840.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#006600", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "#555500", 			action :toLeft, next : null};
	cc=cc.next;
	//
	cc.next = { color : "purple", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain28() { 	//28 artistic from 110.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#006600", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "#555500", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain29() { 	//29 artistic from 100.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#006600", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "#555500", 			action :toRight, next : Driver.colorChain};	
} 
function initColorChain30() { 	//30 artistic from 1.000.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "#008800", 			action :toRight, next : Driver.colorChain};	
}
function initColorChain31() { 	//31 artistic from 700.000
	var cc;
	Driver.colorChain = { color : "white", 	action :toLeft, next : null};
	cc = Driver.colorChain;
	//
	cc.next = { color : "red", 				action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "green", 			action :toRight, next : null};
	cc=cc.next;
	cc.next = { color : "cyan", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "yellow", 			action :toLeft, next : null};
	cc=cc.next;
	cc.next = { color : "violet", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "gray", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#880000", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#008800", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "blue", 			action :toRight, next : null};
	cc=cc.next;
	cc.next=  { color : "#555500", 			action :toRight, next : null};
	cc=cc.next;
	//
	cc.next = { color : "purple", 			action :toRight, next : Driver.colorChain};	
}

/*
// TODO if necessary
function turnRight (el) { rotate (el,toRight);}
function turnLeft(el) { rotate (el,toLeft);}
function rotate (el,rotation) {	el.style.transform = "rotate(" + rotation + "deg)";}
//
// util func
function getRotation (el) {
	var st = window.getComputedStyle(el, null);
	var tr = st.getPropertyValue("transform") ;
	var values = tr.split('(')[1].split(')')[0].split(',');
	var a = values[0];
	var b = values[1];
	var c = values[2];
	var d = values[3];
	var scale = Math.sqrt(a*a + b*b);
	var sin = b/scale;
	return  Math.round(Math.atan2(b, a) * (180/Math.PI));
}
*/
function log (o="") {
	$("info").innerHTML+=o+"<br/>";
}
function $ (id) { 
	return document.getElementById(id);
}