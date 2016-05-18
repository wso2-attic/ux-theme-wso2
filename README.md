# Theme WSO2 v1.0.0

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

#### WSO2 Products UI Template Wrappers And Components
http://wso2-dev-ux.github.io/theme-wso2/

## Build

####Download and run `grunt` command

to compile scss and build default
```
grunt
```
to compile all + docs
```
grunt full
```
to compile only docs
```
grunt docs
```
to build product specific css: e.g. `grunt apim`
```
grunt {product-shortname}
```

## Prerequisite

To run the build, this requires [grunt](http://gruntjs.com/getting-started) > 0.4, node, sass, ruby

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
docs/
├── css/
├── data/
├── images/
├── include/
├── js/
├── libs/
│   ├── animate/
│   ├── bootstrap/
│   ├── bootstrap-daterangepicker/
│   ├── bootstrap-tour/
│   ├── codemirror/
│   ├── cropper/
│   ├── d3/
│   ├── data-tables/
│   ├── font-awesome/
│   ├── font-wso2/
│   ├── html5shiv/
│   ├── jquery/
│   ├── jquery-resize/
│   ├── jquery-ui/
│   ├── jquery-validation/
│   ├── animate/
│   ├── nanoscroller/
│   ├── noty/
│   ├── respond/
│   ├── sass/
│   ├── select2/
│   ├── split/
│   ├── theme-wso2/
│   │   ├── components/
│   │   ├── fonts/
│   │   │   └── Roboto/
│   │   ├── images/
│   │   ├── js/
│   │   ├── less/
│   │   └── scss/
│   ├── tinymce/
│   └── typeahead/
└── scss/
```

## License

WSO2 Inc. licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
