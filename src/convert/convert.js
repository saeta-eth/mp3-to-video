import fileExists from 'file-exists';
import FFmpeg from 'fluent-ffmpeg';
import fs from 'fs';

/* eslint class-methods-use-this:
["error", {"exceptMethods": ["checkTypes", "isString", "getNameOfPath"] }] */

class Convert {
  constructor(
    path = this.throwIfMissing(),
    ext = this.throwIfMissing(),
    image = this.throwIfMissing()
  ) {
    this.checkTypes(path, ext, image);
    this.path = path;
    this.ext = ext;
    this.image = image;
    this.output = this.fillWithNewExt(this.path, this.ext);
  }

  /**
    * It is a getter, should show all params
  */
  get getAttributes() {
    return `${this.path} ${this.ext} ${this.image} ${this.output}!`;
  }

  /**
    * It is a setter for path
    * @param {string} path of mp3
  */
  set changePath(path) {
    this.path = path;
  }

  /**
    * It is a setter for output path
    * @param {string} output path of video
  */
  set changeOutputPath(output) {
    this.output = output;
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
    * @param {string} path of image
  */
  set changeImage(image) {
    this.image = image;
  }

  /**
    * For each params and calls _isString function
    * @param {object} Should be a string
  */
  checkTypes(...args) {
    args.forEach(value => this.isString(value));
  }

  /**
    * Check if params is a string
    * @param {any} Should be a string
  */
  isString(value) {
    if (typeof value !== 'string' && !(value instanceof String)) {
      throw new Error('Wrong type parameter.');
    }
  }

  /**
    * It return a path with output extension
    * @param {string} Path of mp3
    * @param {string} extension
  */
  fillWithNewExt(path, ext) {
    return path.substr(0, path.lastIndexOf(".")) + '.' +ext;
  }

  /**
    * Takes an image and mp3 and converts it to an mp4
    * @param {string} image path to image file (eg. /path/to/image.jpg)
    * @param {string} audio path to audi file (eg. /path/to/audio.mp3)
    * @param {string} output path to output file (eg. /path/to/output.mp4)
    * @param {convert~requestCallback} callback
  */
  convert(audio, image, output, callback) {
    const Command = new FFmpeg();
    Command
      .input(image)
      .inputOptions([
        '-loop 1',
      ])
      .input(audio)
      .output(output)
      .outputOptions([
        '-c:v libx264',
        '-crf 18',
        '-c:a aac',
        '-strict experimental',
        '-b:a 192k',
        '-shortest'
      ])
      .on('error', (err) => {
        callback(err);
      })
      .on('end', () => {
        callback(null, true);
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
    if (!fileExists(this.path)) callback(new Error('MP3 path is wrong.'));
    if (!fileExists(this.image)) callback(new Error('Image path is wrong.'));
    this.convert(this.path, this.image, this.output, (err, success) => {
      if(err) callback(err);
      callback(null, {
        status: 'OK',
        message: 'Everything OK',
        videoPath: this.output,
      });
    });
  }
}

export default Convert;
