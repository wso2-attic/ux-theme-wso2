# WSO2 Theme

**WSO2 Products UI Template Wrappers And Components**   
http://wso2-dev-ux.github.io/theme-wso2/

---

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

WSO2 Theme uses [Grunt](http://gruntjs.com) for its CSS and JavaScript build system and Jekyll for the written documentation. 
Our Gruntfile includes convenient methods for working with the framework, including compiling code.

*** Prerequisite ***

To run the build, this requires [grunt](http://gruntjs.com/getting-started) > 0.4, node, sass, ruby

### Tooling setup

To run the documentation locally, you'll need a copy of Theme WSO2's source files, Node, and Grunt. Follow these steps and you should be ready:

1. [Download and install Node](https://nodejs.org/download/), which we use to manage our dependencies.
2. Install the Grunt command line tools, `grunt-cli`, with `npm install -g grunt-cli`.
3. Navigate to the root `/theme-wso2` directory and run `npm install` to install our local dependencies listed in [package.json](https://github.com/wso2-dev-ux/theme-wso2/blob/master/package.json).
4. [Install Ruby][install-ruby], install [Bundler][gembundler] with `gem install bundler`, and finally run `bundle install`. This will install all Ruby dependencies, such as Jekyll and plugins.

When completed, you'll be able to run the various Grunt commands provided from the command line.

[install-ruby]: https://www.ruby-lang.org/en/documentation/installation/
[gembundler]: https://bundler.io/

### Using Grunt

Our Gruntfile includes the following commands and tasks:

| Task | Description |
| --- | --- |
| `grunt` | Run `grunt` to compile the CSS and JavaScript into `/dist` |
| `grunt docs` | Build and move other required assets to documentation folder which are used when running the documentation locally via `jekyll serve`. |
| `grunt serve` | To run jekyll server from root: `/theme-wso2` level |
| `grunt product:<porduct-short-name>` | To compile custom CSS for specific products with some additional configurations. e.g. `grunt product:cloud` to compile custom CSS for Product Cloud. |

### Local documentation

Running our documentation locally requires the use of Jekyll, a decently flexible static site generator that provides us: 
basic includes, Markdown-based files, templates, and more. Here's how to get it started:

1. Run through the [tooling setup](#tooling-setup) above to install Jekyll (the site builder) and other Ruby dependencies with `bundle install`.
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
