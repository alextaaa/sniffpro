# sniffpro

[![sniffpro](https://nodei.co/npm/sniffpro.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/sniffpro)

***

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A simple function for debugging stuff like promise chains, streams and other pipeline-like thingees

#### Usage

```javascript
const sniff = require('sniffpro')

fetch('https://api.com/users'))
	.then(response => response.json())
	.then(sniff) // Will console.log out the parsed json, and return the value, effectively passing it on to the next .then
	.then(user => Promise.all(user.friends.map(friend => getFriend(friendId))))
	.then(friends => /* do even more stuff here */)
```

#### Overriding prefix

sniffpro will log to console with a [sniff] prefix but if you want to override it like this

```javascript
const sniff = require('sniffpro')

fetch('https://api.com/users')
	.then(response => response.json())
	.then(sniff.tag('mytag'))
```

#### Sniffing to file

```javascript
const sniff = require('sniffpro')

fetch('https://api.com/users')
	.then(response => response.json())
	.then(sniff.save('api.json'))
```

#### Loading file

```javascript
const sniff = require('sniffpro')

sniff.load('api.json')
	.then(data => data.name)
	.then(sniff)
```

#### Memoizing expensive calls to file

```javascript
const sniff = require('sniffpro')

sniff.memo('api.json', () => fetch('https://api.com/users').then(response => response.json()))
	.then(data => data.name)
	.then(sniff)
```
