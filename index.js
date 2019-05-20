
import * as AutomatonScript from "./src/AutomatonScript.js";

let dictionary = new AutomatonScript.Dictionary();
dictionary
	.define('LOCAL', false, ['VAR', 'NUMBER'], 
		(args)=>{
			return ``
		},
		(args)=>{
			args = args.split(" ");
			return `let ${args[0]} = ${args[1]};`
		},
	)
	.define('VAR', false, ['VAR', 'NUMBER'], 
		(args)=>{
			args = args.split(" ");
			return `let ${args[0]} = ${args[1]};`
		}
	)
	.define('INC', false, ['VAR', 'NUMBER'], 
		(args)=>{
			args = args.split(" ");
			return `${args[0]} += ${args[1]};`
		}
	)
	.define('RND', false, ['VAR', 'NUMBER'], 
		(args)=>{
			args = args.split(" ");
			return `let ${args[0]} = Math.floor(Math.random()*${args[1]});`
		}
	)
	.define('LOG', false, ['EXPRESSION'], 
		(args)=>
			`console.log(${args});`
	)
	.define('REPEAT', true, ['NUMBER'], 
		(args, block)=>
			`for(let i = 0; i < ${args}; i++){\n${block}\n}`
	)
	.define('DELAY', false, ['NUMBER'], 
		(args)=>
			`await DELAY(${args});`
	)
	.define('ASYNC', true, [], 
		(args, BLOCK)=>
			`(async ()=>{${BLOCK}})();`
	);
let comp = dictionary.buildCompiler();

let compScript = comp.compile(`
LOCAL runCount 0
INC runCount 1
LOG runCount+" times run"
LOG "HELLO"
RND loopCount 3
ASYNC
	REPEAT loopCount
		DELAY 0.5
		LOG "SMOKE"
		LOG "SPAWN"
DELAY 0.2
LOG "YOU ARE A DUCK"
DELAY 5.0
LOG "YOU ARE NOT A DUCK ANYMORE"
`);

console.log("\n\n******************************************\n\n" + compScript + "\n\n************************************************\n\n");

let timers = [];

function DELAY(time){
	return new Promise( (res,rej)=>{
		timers.push({
			time: Date.now() + 1000*time,
			execute: res
		})
	});
}

function runTimers(){
	let newTimers = [];
	for(let timer of timers){
		//console.log("TIMER - > " + (timer.time-Date.now()));
		if(timer.time < Date.now()){
			//execute
			console.log("EXECUTING TIMER " + timer.time);
			timer.execute();
		}else{
			newTimers.push(timer);
		}
	}
	timers = newTimers;
}

setInterval(runTimers, 50);

global.DELAY = DELAY;

//let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

let functionScript = new Function(compScript);

let compiled = functionScript();

compiled();
compiled();
compiled();


console.log("EXIT");

/*
UI('text', {"message": "*RUMBLE*", "style": "rumble", "duration": 2});
for(let i =0 ; i < 3; i++){
	DELAY(0.5).then(()=>{
		PARTICLE("GREEN_SMOKE");
	});
}
DELAY(0.2).then(()=>{
	SPAWN("Zombie", {faction: faction}, {radius: 0.5});
});*/