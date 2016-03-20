'use strict'

const File = require('fs-extra')
const Path = require('path')
const Vinyl = require('vinyl')
const VinylFS = require('vinyl-fs')
const Concat = require('concat-stream')
const Promise = require('bluebird')
const Webpack = require('webpack')
const Compiler = Webpack(require(Path.join(__dirname, 'build/webpack.prod.conf.js')))

const tasks = {
  build: {
    /**
     * Builds the 'src' directory using webpack.
     * @return {Object}          A Promise object
     */
    docs: function () {
      return new Promise((resolve, reject) => Compiler.run((error, stats) => {
        if (error) {
          reject(error, { task: 'build.docs' })
        } else {
          resolve()
        }
      }))
    }
  },
  copy: {
    /**
     * Removes 'dist' and 'dist/static' directory.
     * @return {Object}          A Promise object
     */
    static: function () {
      return new Promise((resolve, reject) => {
        File.copy(
          Path.normalize(Path.join(__dirname, '/static')),
          Path.normalize(Path.join(__dirname, '/dist/static')), {
            clobber: true
          }, (error) => {
            if (error) {
              reject(error, { task: 'copy.static' })
            } else {
              resolve()
            }
          })
      })
    }
  },
  create: {
    /**
     * Creates 'dist' directory.
     * @return {Object}          A Promise object
     */
    dist: function (promise) {
      return new Promise((resolve, reject) => {
        File.mkdirs(Path.join(__dirname, 'dist'), error => {
          if (error) {
            reject(error, { task: 'create.dist' })
          } else {
            resolve()
          }
        })
      })
    }
  },
  remove: {
    /**
     * Removes 'dist' and 'dist/static' directory.
     * @return {Object}          A Promise object
     */
    dist: function () {
      return new Promise((resolve, reject) => {
        File.remove(Path.join(__dirname, 'dist/static'), error => {
          if (error) {
            reject(error, { task: 'remove.dist', path: 'dist/static' })
          } else {
            File.remove(Path.join(__dirname, 'dist/'), error => {
              if (error) {
                reject(error, { task: 'remove.dist', path: 'dist/' })
              } else {
                resolve()
              }
            })
          }
        })
      })
    }
  },
  write: {
    /**
     * Writes the object contaning the parsed comments to Javascript file.
     * @param  {Object} files The parsed files.
     * @return {Object}          A Promise object
     */
    comments: function (files) {
      let path = Path.normalize(Path.join(__dirname, 'src/assets/files.json'))
      return new Promise((resolve, reject) => {
        File.writeJSON(path, files, error => {
          if (error) {
            reject(error, { task: 'write.comments' })
          } else {
            resolve()
          }
        })
      })
    }
  }
}

module.exports = (files, options) => {
  return new Promise((resolve, reject) => {
    // Write the comments to static/ directory
    tasks.write.comments(files)
    .then(() => tasks.remove.dist())
    .then(() => tasks.create.dist())
    .then(() => tasks.copy.static())
    .then(() => tasks.build.docs())
    .then(() => {
      VinylFS.src([Path.join(__dirname, '/dist/static/**')], { base: __dirname })
      .pipe(Concat(files => {
        resolve(null, files.concat(new Vinyl({
          path: 'index.html',
          contents: new Buffer(File.readFileSync(Path.join(__dirname, '/dist/index.html')))
        }, 'utf8')))
      }))
    })
    .error((error, message) => reject(error, message))
  })
}
