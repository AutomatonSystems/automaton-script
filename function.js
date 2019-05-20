
let runCount = 0;

return async ()=>{
	runCount += 1;
	console.log("HELLO");
	let loopCount = Math.floor(Math.random()*3);
	(async ()=>{
		for(let i = 0; i < loopCount; i++){
            await DELAY(0.5);
            console.log("SMOKE");
            console.log("SPAWN");
        }
	})();
	await DELAY(0.2);
	console.log("YOU ARE A DUCK");
	await DELAY(5.0);
	console.log("YOU ARE A NOT A DUCK ANYMORE");
	console.log(runCount+" times run");

}