// @Todo complete prod part.

var rev     = require('gulp-rev')
var data    = require('gulp-data')
var named   = require('vinyl-named')
var webpack = require('webpack-stream')
var path    = require('path')


function webpackConfig() {
    return {
	module: {
	    loaders: [{
		test: /\.jsx?$/,
		loader: 'babel',
		query: { compact: false }
	    },{
                test: /\.njk$/,
		loader: 'nunjucks'
	    }]
	},
	resolve: {
	    root: [
		path.resolve('./src/pages/templates'),
                path.resolve('./src/scripts/'),
		path.resolve('./')
	    ]
	}
    }
}

// @todo fix file path.
function cc(stream) {
    return stream
	.pipe(named(function(file) {
            var filename = file.path.match(/pages[\/|\\]([^]+)\.js$/)
			return filename[1]
            // if(filename) {
            //     file.named = filename[1]
            // } else {
            //     file.named = path.basename(file.path, path.extname(file.path))
            // }

            // return this.queue(file)
        }))
	.pipe(webpack(webpackConfig()).on('error', console.log))
}


function min(stream) {
    return stream
}

module.exports = {
    cc: cc,
    min: min
}
