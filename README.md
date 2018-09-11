
```css
/* before */
.example {
    border: 1px solid red;
}

/* after */

.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'2px\'%3E%3Crect fill='red' width=\'100%25\' height=\'50%25\'%3E %3C/rect%3E %3C/svg%3E")  0 0 2 0 stretch;
}
```

## Options

#### `base64`

Type: `Boolean`  
Default: `false`

Allows you to define whether UTF-8 or base64 encoding will be used.

```css
/* before { base64: true } */


.example {
    border: 1px solid red;
}

/* after */

.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMnB4Jz48cmVjdCBmaWxsPSJyZWQiIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzUwJSc+IDwvcmVjdD4gPC9zdmc+")  0 0 2 0 stretch;
}
```

#### blackList

```css
/* before { blackList:['.example1'],base64:true } */


.example {
    border: 1px solid red;
}

.example1 {
    border-left: 1px solid red;
}

/* after */

.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMnB4Jz48cmVjdCBmaWxsPSJyZWQiIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzUwJSc+IDwvcmVjdD4gPC9zdmc+")  0 0 2 0 stretch;
}

.example1 {
    border-left: 1px solid red;
}

```


## Usage

```bash
npm install postcss-retina-hairlines --save-dev
```
#### PostCSS

```bash
npm install postcss --save-dev
```

```js
const postcss = require('postcss')
postcss([
	require('postcss-retina-hairlines')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

```bash
npm install gulp-postcss --save-dev
```

```js
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var retinaHairlines = require('postcss-retina-hairlines')

var options = {
  base64: true,
  blackList: ['.example1']
}

gulp.task('css', function () {
  return gulp.src('test/source.css')
      .pipe(postcss([retinaHairlines(options)]))
      .pipe(gulp.dest('example'))
})
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-retina-hairlines')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

