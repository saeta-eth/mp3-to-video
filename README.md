# mp3-to-video

> Convert mp3 to video with a image background.

## Install

`npm i mp3-to-video --save`

## Prerequisites

You need to install `ffmpeg`.

## Simple Usage
  ```js
  // ES6 
  import ConvertCommand from 'mp3-to-video';
  const Convert = new ConvertCommand('mp3Path', 'extension', 'imagePath');
  Convert.init((err, response) => {
    if (err) { 
      console.log(err);
    } else {
      console.log(response.status);   // true
      console.log(response.message);  // Everything OK
      console.log(response.videoPath); // eg. /path/to/output.mp4
    }
  });

  // ES5
  var ConvertCommand = require('mp3-to-video');
  var Convert = new ConvertCommand('mp3Path', 'extension', 'imagePath')
  Convert.init(function(err, response){
    if (err) { 
      console.log(err);
    } else {
      console.log(response.status);   // true
      console.log(response.message);  // Everything OK
      console.log(response.videoPath); // eg. /path/to/output.mp4
    }
  });
  ```

## API
- `changePath` : Change mp3 path.
- `changeOutputPath` : Change output path.
- `changeExtension` : Change extension output file.
- `changeImage` : Change image path.

## npm scripts

- `npm run build`: It builds a development version of the mp3-to-video (full code).
- `npm run check-coverage`: Check if exist library for code coverage.
- `npm run coverage`: Run test with code coverage (un-tested statements, lines, functions or branches.).
- `npm run lint`: It verify the code according to eslint rules.
- `npm run mocha`: It run the test without code coverage.
- `npm run prepublish`: It builds a development version before to publish in npm repository.
- `npm run test`: Run script `npm run coverage`

## Made with ❤ by

- Sebastian Lorenzo (Javascript developer)
- E-mail: [SebastianLorenzo@gmail.com](mailto:SebastianLorenzo@gmail.com)
- StackOverflow: [sebastian-lorenzo](http://stackoverflow.com/users/1741027/sebastian-lorenzo?tab=profile)

## License

MIT license. Copyright © 2016.
