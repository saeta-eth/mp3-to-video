import fileExists from 'file-exists';
import FFmpeg from 'fluent-ffmpeg';

/* eslint class-methods-use-this:
[ "error",
  {"exceptMethods": ["checkTypes", "isString", "fillWithNewExt", "convert", "throwIfMissing"] }
] */

class Convert {
  constructor(
    mp3 = this.throwIfMissing(),
    ext = this.throwIfMissing(),
    image = this.throwIfMissing()
  ) {
    this.checkTypes(mp3, ext, image);
    this.mp3 = mp3;
    this.ext = ext;
    this.image = image;
    this.output = this.fillWithNewExt(this.mp3, this.ext);
  }

  /**
    * It is a getter, should show all params
  */
  get getAttributes() {
    return `${this.mp3} ${this.ext} ${this.image} ${this.output}!`;
  }

  /**
    * It is a setter for path
    * @param {string} path of mp3
  */
  set changePath(path) {
    this.mp3 = mp3;
  }

  /**
    * It is a setter for output path
    * @param {string} output path of video
  */
  set changeOutput(output) {
    this.output = this.fillWithNewExt(output, this.ext);
  }

  /**
    * It is a setter for extension
    * @param {string} extension of video
  */
  set changeExtension(ext) {
    this.ext = ext;
  }

  /**
    * It is a setter for image
    * @param {string} image path
  */
  set changeImage(image) {
    this.image = image;
  }

  /**
    * For each params and calls _isString function
    * @param {object} arguments be a string
  */
  checkTypes(...args) {
    args.forEach(value => this.isString(value));
  }

  /**
    * Check if params is a string
    * @param {any} value be a string
  */
  isString(value) {
    if (typeof value !== 'string' && !(value instanceof String)) {
      throw new Error('Wrong type parameter.');
    }
  }

  /**
    * It return a path with output extension
    * @param {string} mp3 path
    * @param {string} extension
  */
  fillWithNewExt(mp3, ext) {
    return `${mp3.substr(0, mp3.lastIndexOf('.'))}.${ext}`;
  }

  /**
    * Takes an image and mp3 and converts it to an mp4
    * @param {string} audio path to audi file (eg. /path/to/audio.mp3)
    * @param {string} image path to image file (eg. /path/to/image.jpg)
    * @param {string} output path to output file (eg. /path/to/output.mp4)
    * @param {convert~requestCallback} callback
  */
  convert(mp3, image, output, callback) {
    const Command = new FFmpeg();
    Command
      .input(image)
      .inputOptions([
        '-loop 1',
      ])
      .input(mp3)
      .output(output)
      .outputOptions([
        '-c:v libx264',
        '-crf 18',
        '-c:a aac',
        '-strict experimental',
        '-b:a 192k',
        '-shortest',
      ])
      .on('error', (err) => {
        callback(err);
      })
      .on('end', () => {
        callback(null, 'OK');
      })
      .run();
  }

  /**
    * Set default error if parameter is missing
  */
  throwIfMissing() {
    throw new Error('Missing parameter.');
  }

  /**
    * It is a module initialize
    * @param {init~requestCallback} callback
  */
  init(callback) {
    if (!fileExists(this.mp3)) callback(new Error('MP3 path is wrong.'));
    if (!fileExists(this.image)) callback(new Error('Image path is wrong.'));
    this.convert(this.mp3, this.image, this.output, (err, success) => {
      if (err) callback(err);
      callback(null, {
        status: success,
        message: 'Everything OK',
        videoPath: this.output,
      });
    });
  }
}

export default Convert;
