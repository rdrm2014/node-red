/**
 * Created by ricardomendes on 10/01/17.
 */
var nconf = require('nconf');

nconf.argv()
	.env()
	.file({
		file: 'app/config/config.json'
	});

module.exports = nconf;