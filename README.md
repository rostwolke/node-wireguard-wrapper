# NodeJS Wireguard Wrapper
This project is a nodejs wrapper for the wireguard commands `wg` and `wg-quick`.

Features:
- No dependencies
- Uses promises

Limitations:
- So far it can only read but not write anything
- missing `wg set`, `wg setconf`, `wg addconf`, `wg syncconf`

## Installation
```
npm i --save wireguard-wrapper
```

## Usage
`wg` or `wg show`
```
const { Wg } = require('wireguard-wrapper');

Wg.show().then(function(interfaces){
	console.log('all interfaces:', interfaces);
});

Wg.show('wg0').then(function(interfaces){
	console.log('wg0:', interfaces);
});
```

`wg showconf`
```
const { Wg } = require('wireguard-wrapper');

Wg.showconf('wg0').then(function(config){
	console.log('wg0 configuration:', config);
	console.log('generated configuration file:', config.toString());
});
```

`wg genkey`
```
const { Wg } = require('wireguard-wrapper');

Wg.genkey().then(function(key){
	console.log('private key:', key);
});
```

`wg genpsk`
```
const { Wg } = require('wireguard-wrapper');

Wg.genpsk().then(function(psk){
	console.log('preshared key:', psk);
});
```

`wg pubkey`
```
const { Wg } = require('wireguard-wrapper');

Wg.genkey().then(function(privateKey){
	console.log('private key:', privateKey);
    Wg.pubkey(privateKey).then(function(publicKey){
        console.log('public key:', publicKey);
    });
});
```

## API
Commands:
- `Wg.show([string device])` - Returns an Statistics-Interface-Object with the current status. 
The parameter is optional
- `Wg.showconf(string device)` - Returns an Config-Interface-Object with the current configuration. 
The parameter is required.
- `Wg.genkey()` - Generates a new private key.
- `Wg.genpsk()` - Generates a new preshared key.
- `Wg.pubkey(string privateKey)` - Generates a public key from the given private Key. 
The paramter is required.
