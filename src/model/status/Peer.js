class Peer {

	constructor(publicKey){
		this._publicKey = publicKey || null;
		this._endpoint = null;
		this._allowedIps = null;
		this._latestHandshake = null;
		this._transferRx = null;
		this._transferTx = null;
		this._persistentKeepalive = null;
	}

	get publicKey(){
		return this._publicKey;
	}

	set publicKey(value){
		this._publicKey = value;
	}

	get endpoint(){
		return this._endpoint;
	}

	set endpoint(value){
		this._endpoint = value;
	}

	get allowedIps(){
		return this._allowedIps;
	}

	set allowedIps(value){
		this._allowedIps = value.replace(/\s/g, '').split(',');
	}

	get latestHandshake(){
		return this._latestHandshake;
	}

	set latestHandshake(value){
		this._latestHandshake = parseInt(value);
	}

	get transferTx(){
		return this._transferTx;
	}

	set transferTx(value){
		this._transferTx = parseInt(value);
	}

	get transferRx(){
		return this._transferRx;
	}

	set transferRx(value){
		this._transferRx = parseInt(value);
	}

	get persistentKeepalive(){
		return this._persistentKeepalive;
	}

	set persistentKeepalive(value){
		this._persistentKeepalive = value === 'off' ? false : parseInt(value);
	}

}

module.exports = Peer;