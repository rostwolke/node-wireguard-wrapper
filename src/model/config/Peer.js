class Peer {

	constructor(){
		this._allowedIps = null;
		this._endpoint = null;
		this._publicKey = null;
		this._persistentKeepalive = false;
	}

	set(attribute, value){
		switch(attribute.trim().toLowerCase()){
			case 'allowedips':
				this.allowedIps = value;
				break;
			case 'endpoint':
				this.endpoint = value;
				break;
			case 'publickey':
				this.publicKey = value;
				break;
			case 'persistentkeepalive':
				this.persistentKeepalive = value;
				break;
		}
	}

	get allowedIps(){
		return this._allowedIps;
	}

	set allowedIps(value){
		this._allowedIps = value.replace(/\s/g, '').split(',');
	}

	get endpoint(){
		return this._endpoint;
	}

	set endpoint(value){
		this._endpoint = value;
	}

	get publicKey(){
		return this._publicKey;
	}

	set publicKey(value){
		this._publicKey = value;
	}

	get persistentKeepalive(){
		return this._persistentKeepalive;
	}

	set persistentKeepalive(value){
		this._persistentKeepalive = value === null ? false : value;
	}

	toString(){
		let data = '[Peer]\n';
		if(this.allowedIps){
			data += `AllowedIPs = ${this.allowedIps.join(', ')}\n`;
		}
		if(this.endpoint){
			data += `Endpoint = ${this.endpoint}\n`;
		}
		if(this.publicKey){
			data += `PublicKey = ${this.publicKey}\n`;
		}
		if(this.persistentKeepalive){
			data += `PersistentKeepalive = ${this.persistentKeepalive}\n`;
		}
		return data;
	}

	toJson(){
		return {
			allowedIps: this.allowedIps,
			endpoint: this.endpoint,
			publicKey: this.publicKey,
			persistentKeepalive: this.persistentKeepalive
		};
	}

}

module.exports = Peer;