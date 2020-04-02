class Interface {

	constructor(){
		this._address = null;
		this._listenPort = null;
		this._privateKey = null;
		this._dns = null;
		this._table = null;
		this._mtu = null;
		this._preUp = null;
		this._postUp = null;
		this._preDown = null;
		this._postDown = null;
		this._peers = [];
	}

	set(attribute, value){
		switch(attribute.trim().toLowerCase()){
			case 'address':
				this.address = value;
				break;
			case 'listenport':
				this.listenPort = value;
				break;
			case 'privatekey':
				this.privateKey = value;
				break;
			case 'dns':
				this.dns = value;
				break;
			case 'table':
				this.table = value;
				break;
			case 'mtu':
				this.mtu = value;
				break;
			case 'preup':
				this.preUp = value;
				break;
			case 'postup':
				this.postUp = value;
				break;
			case 'predown':
				this.preDown = value;
				break;
			case 'postdown':
				this.postDown = value;
				break;
		}
	}

	get address(){
		return this._address;
	}

	set address(value){
		this._address = value;
	}

	get listenPort(){
		return this._listenPort;
	}

	set listenPort(value){
		this._listenPort = parseInt(value);
	}

	get privateKey(){
		return this._privateKey;
	}

	set privateKey(value){
		this._privateKey = value;
	}

	get dns(){
		return this._dns;
	}

	set dns(value){
		this._dns = value;
	}

	get table(){
		return this._table;
	}

	set table(value){
		this._table = value;
	}

	get mtu(){
		return this._mtu;
	}

	set mtu(value){
		this._mtu = value === null ? null : parseInt(value);
	}

	get preUp(){
		return this._preUp;
	}

	set preUp(value){
		this._preUp = value;
	}

	get postUp(){
		return this._postUp;
	}

	set postUp(value){
		this._postUp = value;
	}

	get preDown(){
		return this._preDown;
	}

	set preDown(value){
		this._preDown = value;
	}

	get postDown(){
		return this._postDown;
	}

	set postDown(value){
		this._postDown = value;
	}

	get peers(){
		return this._peers;
	}

	addPeer(peer){
		this._peers.push(peer);
	}

	toString(){
		let data = '[Interface]\n';
		if(this.address){
			data += `Address = ${this.address}\n`;
		}
		if(this.listenPort){
			data += `ListenPort = ${this.listenPort}\n`;
		}
		if(this.privateKey){
			data += `PrivateKey = ${this.privateKey}\n`;
		}
		if(this.dns){
			data += `DNS = ${this.dns}\n`;
		}
		if(this.table){
			data += `Table = ${this.table}\n`;
		}
		if(this.mtu){
			data += `MTU = ${this.mtu}\n`;
		}
		if(this.preUp){
			data += `PreUp = ${this.preUp}\n`;
		}
		if(this.postUp){
			data += `PostUp = ${this.postUp}\n`;
		}
		if(this.preDown){
			data += `PreDown = ${this.preDown}\n`;
		}
		if(this.postDown){
			data += `PostDown = ${this.postDown}\n`;
		}
		for(let i = 0; i < this.peers.length; i++){
			data += '\n';
			data += this.peers[i].toString();
		}
		return data;
	}

	toJson(){
		let data = {
			address: this.address,
			listenPort: this.listenPort,
			privateKey: this.privateKey,
			dns: this.dns,
			table: this.table,
			mtu: this.mtu,
			preUp: this.preUp,
			postUp: this.postUp,
			preDown: this.preDown,
			postDown: this.postDown,
			peers: []
		};
		for(let peerKey of Object.keys(this._peers)){
			data.peers.push(this._peers[peerKey].toJson());
		}
		return data;
	}

}

module.exports = Interface;