export class ServerException extends Error {
	private _message: string;
	private _statusCode: number;
	private _type: string;

	constructor() {
		super("An error ocurred internally");
		this._message = "An error ocurred internally";
		this._statusCode = 500;
		this._type = "ServerException";
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
