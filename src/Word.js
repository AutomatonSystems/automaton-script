

export default class Word{
	constructor(name, block, argPattern, encode, preExecute){
		this.name = name;

		this._flowControl = block;

		this._args = argPattern;

		this._encode = encode;
		this._preExecute = preExecute;
	}

	get flowControl(){
		return this._flowControl;
	}

	args(string){
		return string;
	}

	preExecute(args, block){
		if(this._preExecute)
			return this._preExecute(args, block);
		return null;
	}

	encode(args, block){
		return this._encode(args, block);
	}
}