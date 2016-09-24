class Convert {
	constructor(path = 'OK', ext = 'mp4', image = 'image'){
		this.path = path
		this.ext = ext
		this.image = image
	}

	get getAttributes(){
		return `${this.path} ${this.ext} ${this.image}!`
	}

	set changePath(path){
		this.path = path
	}

	set changeExtension(ext){
		this.ext = ext
	}

	set changeImage(image){
		this.image = image
	}

	init() {
		
	}
}

export default Convert