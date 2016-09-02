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

        /***********************************************************
         *  Documentation tab code display
         ***********************************************************/
        var items = $('.code');
        $.each( items, function( key, value ) {
            $(this).after(
                '<div class="code-container">'+
                <!-- Nav tabs -->
                '<ul class="nav nav-tabs code-tabs" role="tablist"></ul>'+

                <!-- Tab panes -->
                '<div class="tab-content"></div>'+
                '</div>'
            );

            var codeContainer  = $(this).next().closest('.code-container');
            if($(this).children().hasClass('code-html')) {
                codeContainer.find('ul').append('<li role="presentation" class="active"><a href="#html'+key+'" aria-controls="profile"  role="tab" data-toggle="tab">HTML</a></li>');
                codeContainer.find('.tab-content').append(
                    '<div role="tabpanel" class="tab-pane active html" id="html'+key+'">' +
                    '<div class="zero-clipboard">'+
                    '<button class="btn btn-clipboard" data-clipboard-text="" type="button" title="Copy to clipboad">'+
                    '<span class="hidden-xs">Copy</span>'+
                    '</button>'+
                    '</div>'+
                    '<pre><code class="language-html" data-lang="html"><div class="html-code-content"></div></code></pre>'+
                    '</div>'
                );
                $(this).next().closest('.code-container').find('.html-code-content').text($(this).children('.code-html').html());
            }
            if ($(this).children().hasClass('code-js')){
                codeContainer.find('ul').append('<li role="presentation"><a href="#js'+key+'" aria-controls="profile" role="tab" data-toggle="tab">JS</a></li>');
                codeContainer.find('.tab-content').append(
                    '<div role="tabpanel" class="tab-pane js" id="js'+key+'">' +
                    '<div class="zero-clipboard">'+
                    '<button class="btn btn-clipboard" data-clipboard-text="" type="button" title="Copy to clipboad">'+
                    '<span class="hidden-xs">Copy</span>'+
                    '</button>'+
                    '</div>'+
                    '<pre><code class="javascript" data-lang="javascript"><div class="js-code-content"></div></code></pre>'+
                    '</div>'
                );
                $(this).next().closest('.code-container').find('.js-code-content').text($(this).children('.code-js').html());
            }

            if($(this).children().find('code-sample')){
                if($(this).find('.code-sample').hasClass('loading-sample1')) {
                    var formPrependText = '            <form class="form-horizontal" data-toggle="loading" data-loading-style="overlay">';
                    var formAppendText = '</form>';
                    codeContainer.find('.html-code-content').text($(this).find('.code-sample').html());
                    codeContainer.find('.html-code-content').prepend(document.createTextNode(formPrependText));
                    codeContainer.find('.html-code-content').append(document.createTextNode(formAppendText));
                } else if ($(this).find('.code-sample').hasClass('loading-sample2')){
                    codeContainer.find('.html-code-content').text('<div data-toggle="loading" data-loading-text="Processing" ' +
                        'data-loading-style="icon-only" data-loading-image="images/oloader.gif" data-loading-inverse="true">');
                }
            }
        });

        $(".btn-clipboard").zclip();
        $(".btn-clipboard").click(function() {
            if($(this).parents().hasClass('html')) {
                $(this).attr("data-clipboard-text", $(this).parent().next().find('.html-code-content').text());
            } else if ($(this).parents().hasClass('js')){
                $(this).attr("data-clipboard-text", $(this).parent().next().find('.js-code-content').text());
            }
        });

        /***********************************************************
         *  Code Highlighting
         ***********************************************************/

        $('.tab-pane pre code').each(function(i, block) {
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

//$('link[data-include-demo]').each(function(){
//
//    var el = $(this),
//        componentURL = 'libs/theme-wso2_1.0/components/' + $(this).data('include-demo') + '/';
//
//    $.get(componentURL + 'example.html',function(data){
//        $(el).replaceWith($(data).find('#example').html());
//    });
//
//    //var fileExt = ['css','js'];
//    //
//    //$.each(fileExt, function(index, value){
//    //    $.ajax({
//    //        url: componentURL + value,
//    //        success: function (data) {
//    //            $(data).find("a:contains(" + value + ")").each(function() {
//    //                console.log(componentURL + value + '/' + $(this).text());
//    //            });
//    //        }
//    //    });
//    //});
//
//});



/***********************************************************
 *  accordion config
 ***********************************************************/

//$('#accordion1,#accordion2').on('shown.bs.collapse', function () {
//    var elem = $(this).children().children('.in');
//    var icon = $(elem).prev().find('.status').children();
//    var iconNow = $(this).children().children('.now').prev().find('.status').children();
//    var isIconStateDown = $(iconNow).hasClass('fw-down');
//
//    if($(elem).hasClass('in')){
//        $(elem).prev().find('input[type=radio]').prop('checked',true);
//        $(elem).addClass('now');
//    }
//
//    if(isIconStateDown){
//        $(iconNow).removeClass('fw-down');
//        $(iconNow).addClass('fw-up');
//    }
//
//});


//$('#accordion1,#accordion2').on('hidden.bs.collapse', function () {
//    var elem = $(this).children().children();
//    var icon = $(elem).prev().find('.status').children();
//    var iconNow = $(this).children().children('.now').prev().find('.status').children();
//    var isIconStateUp = $(iconNow).hasClass('fw-up');
//
//    if(isIconStateUp){
//        $(iconNow).removeClass('fw-up');
//        $(iconNow).addClass('fw-down');
//    }
//
//
//});

/***********************************************************
 *  Secondary toggle navigation
 ***********************************************************/

//$('.secondary-nav').on('shown.bs.collapse', function(e){
//    $('.secondary-nav-toggle').removeClass('fw-down').addClass('fw-up');
//}).on('hidden.bs.collapse',function(e){
//    $('.secondary-nav-toggle').removeClass('fw-up').addClass('fw-down');
//})

    /***********************************************************
     *  leafletjs map config
     ***********************************************************/

//$(function(){
//    if($('.map-container').length){
//        var lat = $('.map-container').data('lat'),
//                long    = $('.map-container').data('long'),
//                container = 'map1',
//                zoomLevel = 17,
//                tileSet = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//                attrib =  '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//
//                if(lat != null && lat != undefined && lat != "" && long != null && long != undefined && long != "") {
//                    $('.map-error').hide();
//                    $('.map-container').show();
//                }else{
//                    $('.map-container').hide();
//                    $('.map-error').show();
//                }
//
//            var map = L.map(container).setView([lat,long], zoomLevel);
//
//        L.tileLayer(tileSet, { attribution: attrib}).addTo(map);
//        L.marker([lat,long]).addTo(map).bindPopup('Your are here..!').openPopup();
//    }
//});