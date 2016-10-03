import { 
  assert,
  expect 
} from 'chai';
import ConvertCommand from '../../';
import fileExists from 'file-exists';
import fs from 'fs';

describe('convert', () => {

  describe('on success', () => {
      let result;
      let error;
      beforeEach(function(done) {
        this.timeout(50000);
        if(fileExists('file/Gustavo Cerati - Medium.mp4')) {
          fs.unlink('file/Gustavo Cerati - Medium.mp4');
        }
        let Convert = new ConvertCommand('file/Gustavo Cerati - Medium.mp3', 'mp4', 'file/stadiumusic.png')
        Convert.init((err, response) => {
          result = response;
          error = err;
          done();
        });
      });
      
      it('should create a mp4 file', () => {
        expect(fileExists('file/Gustavo Cerati - Medium.mp4')).to.equal(true);
        expect(result).to.include.keys('status');
      });
  });

  describe('on error', () => {
    let results, error;
    beforeEach(function(done) {
      this.timeout(50000);
      let Convert = new ConvertCommand('file/leo.messi', 'mp4', 'file/stadiumusic.png')
      Convert.init((err, data) => {
        error = err;
        results = data;
        done();
      });
    });

    it('should not create outputError.mp4', () => {
      expect(results).to.be.undefined;
      expect(error).to.not.be.null;
    });
  });

});