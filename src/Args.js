/*
pattern

Array of definitions

{
	"name": the name the attr will take
	"type": the type the att
}

*/

let operands = ['+'];

export default function extractArgs(string, patterns){
	let args = {};
	
	let parts = string.match(/[\=\!\(\)-_a-zA-Z0-9\.\*\/]*(\{[^\}]*\})?/g);
	parts = parts.filter((match)=>match!="");

	for(let index = 0; index < patterns.length; index++){
		let argPattern = patterns[index];
		if(argPattern.attrs==null)
			argPattern.attrs=[];

		if(parts[index]==null){
			
			if(argPattern.default)
				args[argPattern.name] = argPattern.default;
			else
				args[argPattern.name] = null;
			continue;
		}

		let argParts = parts[index].split('{');
		
		let token = argParts[0];

		if(argParts.length>1){
			let obj = argParts[1].substring(0,argParts[1].length-1);
			
			if(obj.trim().length>1){
				//todo replcae with regexp
				let mods = obj.split(",");
				//again probably
				let keyValueMap = {}

				mods.forEach((l)=>{
					if(l.includes(":")){
						let kv = l.split(":");
						let key = kv[0].trim();
						let value = kv[1].trim();
						keyValueMap[key] = value;
					}
				});

				let sourceVar = token;

				if(mods.length>0){

					let script = `{`;
					// copy existing
					if(sourceVar.trim()!=""){
						for(let key of argPattern.attrs){
							if(keyValueMap[key]){
								let valueOverride = keyValueMap[key];
								if(operands.includes(valueOverride.charAt(0))){
									script += `${key}:${sourceVar}.${key}${valueOverride},`
								}else{
									script += `${key}:${valueOverride},`
								}
							}else{
								script += `${key}:${sourceVar}.${key},`
							}
						}
					}
					// new parts
					for(let key of Object.keys(keyValueMap)){
						if(!argPattern.attrs.includes(key)){
							script += `${key}:${keyValueMap[key]},`
						}
					}

					if(script.length>1)
						script = script.substring(0,script.length-1);
					script +=`}`;

					token = script;
				}
			}
				
		}

		args[argPattern.name] = token;
	}

	return args;
}