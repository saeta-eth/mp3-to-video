var ConvertCommand = require('../');
var Convert = new ConvertCommand('file/Gustavo Cerati - Medium.mp3', 'mp4', 'file/stadiumusic.png');

Convert.init( function(err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log('status: ', response.status);
    console.log('message: ', response.message);
    console.log('videoPath: ', response.videoPath);
  }
});

