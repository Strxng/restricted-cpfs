export class NotFoundCpfException extends Error {
	private _message: string;
	private _statusCode: number;
	private _type: string;

	constructor() {
		super("CPF not found");
		this._message = "CPF not found";
		this._statusCode = 400;
		this._type = "NotFoundCpfException";
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
