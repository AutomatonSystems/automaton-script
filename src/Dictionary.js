import Word from './Word.js';
import Compiler from './Compiler.js';

export default class Dictionary{
	constructor(){
		this.words = {}
	}

	define(command, block, args, pre, main){
		let word = new Word(command, block, args, pre, main); 
		this.words[command] = word;
		return this;
	}

	get(word){
		let c = this.words[word.trim()];	
		if(c==null){
			for(let i of Object.keys(this.words)){
				console.log("#"+i+"#", i==word, word)

			}
			debugger;
			console.error(`UNKNOWN WORD '${word}'`);
		}
		return c;
	}

	buildCompiler(){
		return new Compiler(this);
	}
}