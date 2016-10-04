/* eslint func-names: ["error", "never"] */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import fileExists from 'file-exists';
import fs from 'fs';
import ConvertCommand from '../../';

chai.use(dirtyChai);
const expect = chai.expect;

describe('convert', () => {
  describe('on success', () => {
    let result;
    let error;
    beforeEach(function (done) {
      this.timeout(50000);
      if (fileExists('file/Gustavo Cerati - Medium.mp4')) {
        fs.unlink('file/Gustavo Cerati - Medium.mp4');
      }
      const Convert = new ConvertCommand('file/Gustavo Cerati - Medium.mp3', 'mp4', 'file/stadiumusic.png');
      Convert.init((err, response) => {
        result = response;
        error = err;
        done();
      });
    });

    it('should create a mp4 file', () => {
      expect(fileExists('file/Gustavo Cerati - Medium.mp4')).to.equal(true);
      expect(result).to.include.keys('status');
      expect(error).to.be.null();
    });
  });
  describe('on error', () => {
    let result;
    let error;
    beforeEach(function (done) {
      this.timeout(50000);
      const Convert = new ConvertCommand('file/leo.messi', 'mp4', 'file/stadiumusic.png');
      Convert.init((err, data) => {
        error = err;
        result = data;
        done();
      });
    });

    it('should not create outputError.mp4', () => {
      expect(result).to.be.undefined();
      expect(error).to.not.be.null();
    });
  });
});
