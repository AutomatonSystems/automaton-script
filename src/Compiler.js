
import Word from './Word.js';
import Block from './Block.js';
import Statement from './Statement.js';

export default class Compiler{
	constructor(dictionary){
		this.dictionary = dictionary;
	}

	compile(string){

		//console.log(string);

		let lines = string.split('\n');

		let program = new Block();

		let depth = 0;

		let blocks = [program];

		for(let line of lines){

			if(line.trim() === "")
				continue;

			//check block depth
			let statement = new Statement(line, this.dictionary);
		
			if(statement.depth > depth){
				console.log("DEEPER");
				// go one block deeper
				let block = new Block();
				blocks.unshift(block);
				program.add(block);
				depth = statement.depth;
			}

			// pop up blocks
			while(statement.depth < depth){
				console.log("SHALLOWER");
				blocks.shift();
				depth = blocks[0].depth;
			}

			console.log(statement, statement.depth, depth);

			// now at correct block level
			blocks[0].add(statement);

			if(statement.flowBlock){
				let block = new Block("LAST COMMAND");
				blocks.unshift(block);
				statement.block(block);
				depth++;
			}

			
		}

		let preBlock = program.preBlock();

		let mainBlock = program.mainBlock();

		return `
			${preBlock}
			return async ()=>{
				${mainBlock}
			}			
		`;
	}
}