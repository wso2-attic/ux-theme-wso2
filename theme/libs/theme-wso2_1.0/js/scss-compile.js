/*
 ~   Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.
 ~
 ~   Licensed under the Apache License, Version 2.0 (the "License");
 ~   you may not use this file except in compliance with the License.
 ~   You may obtain a copy of the License at
 ~
 ~        http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~   Unless required by applicable law or agreed to in writing, software
 ~   distributed under the License is distributed on an "AS IS" BASIS,
 ~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~   See the License for the specific language governing permissions and
 ~   limitations under the License.
 */

var linkElements = document.querySelectorAll('link[rel$=sass]');
var linkElementsLength = linkElements.length;
var linkElementsCount= 0;

if(linkElementsLength > 0) {

    document.write( '<style id="scss-preload" type="text/css">body{display:none;}<\/style>');

    Array.prototype.forEach.call(linkElements, function(node) {

        var filepath = node.href.substring(0, node.href.lastIndexOf("/") + 1),
            filename = node.href.substring(node.href.lastIndexOf("/") + 1);

        var sass = new Sass();

        sass.preloadFiles(filepath, '', [filename], function () {
            sass.readFile(filename);
            sass.compile('@import "' + filename + '";', function (css) {
                if (css.status == 0) {

                    var sheet = document.createElement('style');
                    sheet.setAttribute("type", "text/css");
                    sheet.setAttribute("scss-path", css.files[0]);
                    sheet.innerHTML = css.text;
                    node.parentNode.insertBefore(sheet, node.nextSibling);

                    linkElementsCount++;
                    if(linkElementsCount == linkElementsLength){
                        var scssPreload = document.getElementById('scss-preload');
                        scssPreload.parentNode.removeChild(scssPreload);
                    }

//                    sass.writeFile('base.css', css.text, function callback(success) {
//                        if(success == true){
//                            var scss = document.createElement('link');
//                            scss.setAttribute("href", "base.css");
//                            scss.setAttribute("rel", "stylesheet");
//                            scss.setAttribute("type", "text/css");
//                            scss.setAttribute("scss-path", css.files[0]);
//                            node.parentNode.insertBefore(scss, node.nextSibling);
//                        }
//                    });

                }
                else {
                    console.log("SASS/SCSS Compiling Error");
                    console.log("-----------------------------------");
                    console.log("File: " + css.file);
                    console.log("Line Number: " + css.line);
                    console.log("Message: " + css.message);
                    console.log("-----------------------------------");
                }
            });
        });

    });
}

