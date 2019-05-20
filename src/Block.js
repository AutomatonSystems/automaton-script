export default class Block{
	constructor(last){
		this.statements = [];
		this.last = last;
	}

	get depth(){
		if(this.statements.length==0)
			return 0;
		return this.statements[0].depth;
	}

	add(statement){
		this.statements.push(statement);
	}

	preBlock(){
		let string = "";
		for(let statement of this.statements){
			let code = statement.preBlock();
			if(code!=null && code != '')
				string += code + "\n";
		}
		return string;
	}

	mainBlock(){
		let pad = "".padEnd(this.depth, "\t");

		let string = "";
		for(let statement of this.statements){
			let code = statement.mainBlock();
			if(code!=null && code != '')
				string += pad + code + "\n";
		}

		return string;
	}
}