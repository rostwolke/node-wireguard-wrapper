'use strict';

const {exec} = require('child_process');
const StatusInterface = require('../model/status/Interface');
const StatusPeer = require('../model/status/Peer');
const ConfigInterface = require('../model/config/Interface');
const ConfigPeer = require('../model/config/Peer');

class Wg {

	static show(device){
		if(!device){
			device = 'all';
		}
		return new Promise(function(resolve, reject){
			if(!/^[A-Za-z0-9]*$/.test(device)) {
				return reject("Invalid device/interface name");
			}
			exec(`wg show ${device} dump`, function(error, stdout, stderr){
				if(error){
					return reject(`Exec error: ${error}`);
				}
				if(stderr){
					return reject(`StdErr: ${stderr}`);
				}
				let lines = stdout.split('\n');
				let data = {}, tmp;
				for(let i = 0; i < lines.length; i++){
					// skip empty lines
					if(lines[i].trim() === ''){
						continue;
					}
					let parts = lines[i].split('\t');
					if(device !== 'all'){
						parts.unshift(device);
					}
					if(parts.length === 5){
						tmp = new StatusInterface(parts[0]);
						tmp.privateKey = parts[1];
						tmp.publicKey = parts[2];
						tmp.listenPort = parts[3];
						data[parts[0]] = tmp;
					}
					if(parts.length === 9){
						tmp = new StatusPeer(parts[1]);
						tmp.endpoint = parts[3];
						tmp.allowedIps = parts[4];
						tmp.latestHandshake = parts[5];
						tmp.transferTx = parts[6];
						tmp.transferRx = parts[7];
						tmp.persistentKeepalive = parts[8];
						data[parts[0]].addPeer(tmp);
					}
				}

				resolve(data);
			});
		});
	}

	static showconf(device){
		return new Promise(function(resolve, reject){
			if(!device){
				return reject('No device/interface specified');
			}

			if(!/^[A-Za-z0-9]*$/.test(device)) {
				return reject('Invalid device/interface name');
			}
			exec(`wg showconf ${device}`, function(error, stdout, stderr){
				if(error){
					return reject(`Exec error: ${error}`);
				}
				if(stderr){
					return reject(`StdErr: ${stderr}`);
				}

				let lines = stdout.split('\n');
				let iface = new ConfigInterface();
				let currentPeer, parts;
				for(let i = 0; i < lines.length; i++){
					if(lines[i].trim() === '[Interface]'){
						currentPeer = null;
						continue;
					}
					if(lines[i].trim() === '[Peer]'){
						currentPeer = new ConfigPeer();
						iface.addPeer(currentPeer);
						continue;
					}

					parts = lines[i].split('=');
					if(parts.length < 2){
						continue;
					}

					if(currentPeer){
						currentPeer.set(parts[0], parts[1].trim());
					}else{
						iface.set(parts[0], parts[1].trim());
					}
				}

				resolve(iface);
			});
		});
	}

	static genkey(){
		return new Promise(function(resolve, reject){
			exec(`wg genkey`, function(error, stdout, stderr){
				if(error){
					return reject(`Exec error: ${error}`);
				}
				if(stderr){
					return reject(`StdErr: ${stderr}`);
				}

				resolve(stdout.trim());
			});
		});
	}

	static genpsk(){
		return new Promise(function(resolve, reject){
			exec(`wg genpsk`, function(error, stdout, stderr){
				if(error){
					return reject(`Exec error: ${error}`);
				}
				if(stderr){
					return reject(`StdErr: ${stderr}`);
				}

				resolve(stdout.trim());
			});
		});
	}

	static pubkey(privateKey){
		return new Promise(function(resolve, reject){
			if(!/^[A-Za-z0-9+/=]*$/.test(privateKey)){
				return reject('Invalid private key');
			}
			
			exec(`echo '${privateKey}' | wg pubkey`, function(error, stdout, stderr){
				if(error){
					return reject(`Exec error: ${error}`);
				}
				if(stderr){
					return reject(`StdErr: ${stderr}`);
				}

				resolve(stdout.trim());
			});
		});
	}

}

module.exports = Wg;
