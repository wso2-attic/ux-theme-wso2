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

$(function(){
    
    $(document).ready(function() {
        
        /***********************************************************
        *  Persist Sidebar toggle state
        ***********************************************************/
        var sidebarNav = '#sidebar-theme',
            uriPath = window.location.pathname;
        
        if($.session.get(sidebarNav) == 'toggled') {
            $.sidebar_toggle('show', sidebarNav, $(sidebarNav).data('container'));
            $('[data-toggle=sidebar][data-target=' + sidebarNav + ']').attr('aria-expanded', 'true');
        }
        
        $(sidebarNav).on('shown.sidebar', function(e){
            $.session.set(sidebarNav, 'toggled');
        }).on('hidden.sidebar', function(e){
            $.session.remove(sidebarNav);
        });
        
        /***********************************************************
        *  Add active state to the current page in sidebar nav
        ***********************************************************/
        var currentPage = $(sidebarNav + ' .pages a[href="' + uriPath + '"]'),
            currentPageParents = currentPage.closest('li').parents('li');
        
        currentPage.parents('li').addClass('active');
        currentPageParents.attr('aria-expanded', 'true');
        currentPageParents.find('> ul').addClass('in');
        
        $('[data-toggle="loading"]').not('.code-sample [data-toggle="loading"]').loading('show');
        
        /***********************************************************
         *  Documentation code display
         ***********************************************************/
        function htmlEscape(str) {
            return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
        }
        
        function sampleCode(request, uuid, selector, activeClass){
            var text = (!selector.hasClass('no-encode')) ? htmlEscape(selector.html()) : selector.html(),
                lang = selector.data('lang');
            
            if(request == 'tab'){
                return  '<li role="tab" class="' + activeClass + '">'+
                            '<a href="#' + uuid + '-' + lang + '" aria-controls="code" role="tab" data-toggle="tab">' + lang.toUpperCase() + '</a>'+
                        '</li>';
            }
            else if(request == 'content'){
                return  '<div role="tabpanel" class="tab-pane ' + activeClass + ' ' + lang + '" id="' + uuid + '-' + lang + '">' +
                            '<button class="btn btn-clipboard" data-clipboard-text="" type="button">'+
                                '<span>Copy</span>'+
                            '</button>'+
                            '<pre><code class="language-' + lang + '" data-lang="' + lang + '">' + text + '</code></pre>'+
                        '</div>';
            }
        }

        $(".code").each(function(key, val){
            var tabs = [],
                tabContent = [],
                uuid = ('code-example-'+key),
                codes = ($('> .code-sample', this).length > 0) ? $('> .code-sample > code', this) : $('> [data-lang]', this);
            
            $.each(codes, function(key, val) {
                var activeClass = (key == 0) ? 'active' : '';
                tabs.push(sampleCode('tab', uuid, $(val), activeClass));
                tabContent.push(sampleCode('content', uuid, $(val), activeClass));
            });
            
            if(tabs.length > 0){
                $( "<div/>", {
                    "class": "code-container",
                }).appendTo(this);

                $( "<ul/>", {
                    "class": "nav nav-tabs code-tabs",
                    "role": "tablist",
                    html: tabs.join("")
                }).appendTo($('> .code-container', this));

                $( "<div/>", {
                    "class": "tab-content",
                    html: tabContent.join("")
                }).appendTo($('> .code-container', this));
            }
        });
        
        $(".btn-clipboard").each(function() {
            $(this).attr("data-clipboard-text", $(this).siblings('pre').find('code').text());
        });
        $(".btn-clipboard").zclip();

        /***********************************************************
         *  Code Highlighting
         ***********************************************************/
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    });
    
    /***********************************************************
    *  Show page once fully rendered
    ***********************************************************/
    $(window).load(function() {
        $("body").removeClass("notransition hidden");
    });
        
    /***********************************************************
     *  noty config
     ***********************************************************/
    //noty({
    //    layout: 'topRight',
    //    text: 'Hey! This is just a "noty" notification... ',
    //    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    //    type: 'information',
    //    theme: 'wso2',
    //    //timeout: 8000,
    //    animation: {
    //        open: 'animated fadeInDown',
    //        close: 'animated fadeOutUp',
    //        easing: 'swing',
    //        speed: 500
    //    }
    //});

});

//$('link[data-include]').each(function(){
//    var el = $(this),
//        template = $(this).data('include');
//
//    $.get(template, function(data){
//        $(el).replaceWith(data);
//    });
//});

/***********************************************************
 *  accordion config
 ***********************************************************/

$('.panel-extended').on('shown.bs.collapse', function (e,f) {
    var elem = $(this).children().children('.in');

    if($(elem).hasClass('in')){
        $(elem).prev().find('input[type=radio]').prop('checked',true);
    }
});


/***********************************************************
 *  Secondary toggle navigation
 ***********************************************************/

//$('.secondary-nav').on('shown.bs.collapse', function(e){
//    $('.secondary-nav-toggle').removeClass('fw-down').addClass('fw-up');
//}).on('hidden.bs.collapse',function(e){
//    $('.secondary-nav-toggle').removeClass('fw-up').addClass('fw-down');
//})
