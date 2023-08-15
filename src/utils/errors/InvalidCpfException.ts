export class InvalidCpfException extends Error {
	private _message: string;
	private _statusCode: number;
	private _type: string;

	constructor() {
		super("CPF is not valid");
		this._message = "CPF is not valid";
		this._statusCode = 400;
		this._type = "InvalidCpfException";
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
