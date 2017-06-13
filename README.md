# [Theme WSO2](http://wso2-dev-ux.github.io/theme-wso2/)

[![GitHub release](https://img.shields.io/badge/release-v2.0.0-orange.svg?style=flat-square)](https://github.com/wso2-dev-ux/theme-wso2/releases/tag/v2.0.0)
![devDependency Status](https://david-dm.org/wso2-dev-ux/theme-wso2/dev-status.svg?style=flat-square)
[![License](https://img.shields.io/badge/license-MIT/Apache--2.0-blue.svg?style=flat-square)](LICENSE)

**WSO2 Products UI Templates And Components**   
http://wso2-dev-ux.github.io/theme-wso2/

---

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Theme WSO2 uses [Grunt](http://gruntjs.com) for its CSS and JavaScript build system and [Jekyll](https://jekyllrb.com/) for the written documentation. 
Our Gruntfile includes convenient methods for working with the framework, including compiling code.

**Prerequisite**

To run the build, this requires [grunt][grunt-install], [node][node-install], [sass][sass-install], [jekyll][jekyll-install], [ruby][ruby-install]

### Tooling setup

To run the documentation locally, you'll need a copy of Theme WSO2's source files, Node, and Grunt. Follow these steps and you should be ready:

1. [Install Node][node-install], which we use to manage our dependencies.
2. Install the Grunt command line tools, `grunt-cli`, with `npm install -g grunt-cli`.
3. Navigate to the root `/theme-wso2` directory and run `npm install` to install our local dependencies listed in [package.json](https://github.com/wso2-dev-ux/theme-wso2/blob/master/package.json).
4. [Install Ruby][ruby-install].
5. Then install [Sass][sass-install] with `gem install sass`. 
6. And finally install [Jekyll][jekyll-install] with `gem install jekyll`.

[grunt-install]: http://gruntjs.com/getting-started
[node-install]: https://nodejs.org/download
[jekyll-install]: https://jekyllrb.com/docs/installation
[sass-install]: http://sass-lang.com/install
[ruby-install]: https://www.ruby-lang.org/en/documentation/installation

Once completed, you'll be able to run the various Grunt commands provided from the command line.

### Using Grunt

Our Gruntfile includes the following commands and tasks:

| Task | Description |
| --- | --- |
| `grunt` | To compile the CSS and JavaScript into `/dist`. |
| `grunt docs` | Build and move other required assets to documentation folder which are used when running the documentation locally. |
| `grunt serve` | To run documentation locally. This runs the shell command `jekyll serve` on the subfolder: `/docs`. Since it uses pure jekyll, you can use [jekyll flags](https://jekyllrb.com/docs/configuration/) along with it. e.g. `grunt serve --port 4001` |
| `grunt product:<porduct-short-name>` | To compile custom CSS for specific products with some additional configurations. e.g. `grunt product:cloud` to compile custom CSS for Product Cloud. |
| `grunt test-scss` | To test scss modules `/scss/modules/`. Output `report.json` file will be generated in the root folder |

### Local documentation

Running our documentation locally requires the use of Jekyll, a decently flexible static site generator that provides us: 
basic includes, Markdown-based files, templates, and more. Here's how to get it started:

1. Run through the [tooling setup](#tooling-setup) above to install Jekyll (the site builder) and other dependencies.
2. From the root `/theme-wso2` directory, run `grunt serve` in the command line.
3. Open <http://localhost:4000> in your browser to see the documentation.

Learn more about using Jekyll by reading its [documentation](https://jekyllrb.com/docs/home/).

### What's included

Within the distribution download you'll find the following directories and files, 
logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
theme-wso2/
├── css/
│   ├── theme-wso2.css
│   ├── theme-wso2.min.css
│   └── theme-wso2.css.map
├── js/
│   ├── theme-wso2.js
│   ├── theme-wso2.min.js
│   ├── bootstrap.js
│   └── bootstrap.min.js
├── images/
├── fonts/
│   └── Roboto/
└── extensions/
    ├── datatables/
    ├── jstree/
    └── noty/
```

### License

WSO2 Inc. licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
