'use strict';

var convertToRem  = require('./util/convertToRem');
var path          = require('path');

function distName() {
  var folder = path.dirname(__dirname);
  folder = path.basename(folder);
  return folder.replace('source_', '');
}

// function parentFolderName() {
//   console.log(path.dirname(__dirname))
// }

var folderName  = distName();
var dest        = './../' + folderName;
var src         = './src';


module.exports = {
  destFolder: dest,

  browserSync: {
    // Change this to be your project folder
    proxy: 'http://arillo.dev/clean-test',
    port: 9000,
    notify: false,
    open: false
  },

  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/css',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      outputStyle: 'expanded'
    },
    prefix: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 28',
      'ios >= 8',
      'edge >= 13',
      'android >= 4.4',
      'bb >= 10'
    ],
    // Css Selectors that should be removed from your css.
    // useful to remove unneeded thirdparty styles.
    remove: []
  },

  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },

  html: {
    src: src + '/templates/**',
    dest: dest + '/templates'
  },

  jslint: {
    srcJs: src + '/js/**/*.js',
    srcCoffee: src + '/js/**/*.coffee'
  },

  production: {
    dest: dest,

    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',

    cssDest: dest + '/css',
    jsDest: dest + '/js',

    cssCompressionOpts: {
      safe: true,
      mergeLonghand: false,
      discardComments: {
        removeAll: true
      }
    },

    reportSrc: [
      dest + '/css/*.css',
      dest + '/js/*.js',
      dest + '/images/**/*'
    ],
  },

  svgSprite: {
    type: 'background', // 'inline'
    src: src + '/icons',
    glob: '**/*.svg',
    dest: dest + '/images',
    optionsInline: {
      mode: {
        symbol: {
          sprite: 'sprite.svg',
          dest: '.',
          render: {
            scss: {
              template: 'gulp/tpl/_sprite-inline.scss',
              dest: '../../source_' + folderName + '/src/sass/base/_sprite.scss'
            }
          }
        }
      }
    },
    optionsBackground: {
      mode: {
        css: {
          layout: 'horizontal',
          sprite: 'sprite.svg',
          dest: '.',
          render: {
            scss: {
              template: 'gulp/tpl/_sprite-background.scss',
              dest: '../../source_' + folderName + '/src/sass/base/_sprite.scss'
            }
          }
        }
      },
      variables: {
        cssPath: '../images/',
        rem: convertToRem
      }
    }
  },

  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below.
    // See README.md for more info.
    bundleConfigs: [
      {
        entries: src + '/js/main.coffee',
        dest: dest + '/js',
        outputName: 'main.js',
        extensions: ['.coffee']
      }
    ]
  }
};
