class Interface {

	constructor(name){
		this._name = name || null;
		this._listenPort = null;
		this._publicKey = null;
		this._privateKey = null;
		this._peers = {};
	}

	get name(){
		return this._address;
	}

	set name(value){
		this._name = value;
	}

	get listenPort(){
		return this._listenPort;
	}

	set listenPort(value){
		this._listenPort = parseInt(value);
	}

	get publicKey(){
		return this._publicKey;
	}

	set publicKey(value){
		this._publicKey = value;
	}

	get privateKey(){
		return this._privateKey;
	}

	set privateKey(value){
		this._privateKey = value;
	}

	get peers(){
		return this._peers;
	}

	addPeer(peer){
		this._peers[peer.publicKey] = peer;
	}

}

module.exports = Interface;