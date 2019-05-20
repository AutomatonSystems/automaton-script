let UUID = 0;

export default class Statement{
	constructor(line, dictionary){

		this.uuid = UUID++;

		for(this.depth = 0; this.depth < line.length; this.depth++)
			if(line.charAt(this.depth)!='\t')
				break;

		this.line = line;

		line = line.substring(this.depth);

		var i = line.indexOf(' ');
		if(i>0){
			this.command = dictionary.get(line.slice(0,i));
			this.args = this.command.args( line.slice(i+1));
		}else{
			this.command = dictionary.get(line);
			this.args = null;
		}

		this._flowBlock = null;

	}

	block(block){
		this._flowBlock = block;
	}

	// statment that is followed by a block
	get flowBlock(){
		return this.command.flowControl;
	}

	preBlock(){
		return this.command.preExecute(this.args);		
	}

	mainBlock(){		
		let block = this._flowBlock?this._flowBlock.mainBlock():'';
		return this.command.encode(this.args,block);
	}
}