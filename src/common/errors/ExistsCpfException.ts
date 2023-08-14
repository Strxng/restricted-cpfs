export class ExistsCpfException extends Error {
	private _message: string;
	private _statusCode: number;
	private _type: string;

	constructor() {
		super("CPF already exists");
		this._message = "CPF already exists";
		this._statusCode = 400;
		this._type = this.name;
	}

	get message() {
		return this._message;
	}

	get statusCode() {
		return this._statusCode;
	}

	get type() {
		return this._type;
	}
}
