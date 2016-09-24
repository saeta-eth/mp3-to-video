const fs = require('fs');

/**
* checks if given file exists syncronously 
* @param {string} path (eg. /path/to/file.thing)
* @returns {boolean}
*/

class FileExist{
	constructor(path){
		this.path = path
	}
	init(){
		try{
			return fs.statSync(this.path).isFile();
		}catch (err){
			return false;
    }
	}
}
export default FileExist
