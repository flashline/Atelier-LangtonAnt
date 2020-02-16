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
