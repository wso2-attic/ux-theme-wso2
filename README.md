# WSO2 Theme

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

#### WSO2 Products UI Template Wrappers And Components
http://wso2-dev-ux.github.io/theme-wso2/

## Build

#### Download and run `grunt` command

to compile scss and build default distrubution run
```
grunt
```

to compile product scss files
```
grunt css:<porduct-short-name>
```
e.g. grunt css:apim

to compile all product scss files
```
grunt css:all
```


to compile docs
```
grunt docs
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
└── scss/
```

## License

WSO2 Inc. licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
