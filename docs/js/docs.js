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
        
        // Persist Sidebar toggle state
        var sidebarNav = '#sidebar-theme';
        
        if($.session.get(sidebarNav) == 'toggled') {
            $.sidebar_toggle('show', sidebarNav, $(sidebarNav).data('container'));
            $('[data-toggle=sidebar][data-target=' + sidebarNav + ']').attr('aria-expanded', 'true');
        }
        
        $(sidebarNav).on('shown.sidebar', function(e){
            $.session.set(sidebarNav, 'toggled');
        }).on('hidden.sidebar', function(e){
            $.session.remove(sidebarNav);
        });
        
    });
    
    $(window).load(function() {
        
        // Show page once fully rendered
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
    
    /***********************************************************
     *  Activating jsTree
     ***********************************************************/
    $('#jstree').jstree({
        "plugins": ["types"],
        "types": {
          "default" : {
            "icon": false,
            "draggable": false, 
            "clickable": false
          }
        }
    });

    /***********************************************************
     *  Documentation sidebar active
     ***********************************************************/

    var urlValue = window.location.href.toString();
    var splitUrl = urlValue.split("/");
    var pageName = splitUrl[splitUrl.length - 2];
    var items = $('a.doc-list');
    $.each( items, function( key, value ) {
        var strValue = value.toString();
        var listItem = strValue.substring(strValue.lastIndexOf("/") + 1);
        if(listItem == pageName){
            $("#"+listItem).addClass('active');
            $("#"+listItem).closest('ul').addClass('in');
            $("#"+listItem).closest('ul').prev().addClass('active');
        }
    });

    /***********************************************************
     *  Documentation code toggle
     ***********************************************************/

    var codeDisplayBtn = $('<a class="btn btn-link code-btn">&lt;/&gt;&nbsp;&nbsp;Show Code </a>');
    $(".code").after(codeDisplayBtn);
    $(".code-btn").click(function () {
        var codeContent = $(this).next().closest('.code-container').find('.code-content');
        if($(this).next().hasClass('code-container')){
            $(this).nextAll().eq(1).remove();
            $(this).next().remove();
            $(this).removeClass('code-btn-active');
        }else{
            $(this).after(
                '<div class="code-container">'+
                '<div class="zero-clipboard">'+
                '<button class="btn btn-clipboard" data-clipboard-text="" type="button" title="Copy to clipboad">'+
                '<span class="hidden-xs">Copy</span>'+
                '</button>'+
                '</div>'+
                '<pre><code class="language-html" data-lang="html"><div class="code-content"></div></code></pre>'+
                '</div>');
            $(this).next().closest('.code-container').find('.code-content').text($(this).prev('div').html());
            $(this).next().closest('.code-container').find('.code-content').prepend("<h5 class='code-heading'><b>HTML</b></h5>");
            $(this).next().closest('.code-container').find('.btn-clipboard').attr("data-clipboard-text",($(this).prev('div').html()));

            if($(this).nextAll().eq(1).hasClass('code-js')){
                $(this).next().after('<div class="code-container">'+
                    '<div class="zero-clipboard">'+
                    '<button class="btn btn-clipboard" data-clipboard-text="" type="button" title="Copy to clipboad">'+
                    '<span class="hidden-xs">Copy</span>'+
                    '</button>'+
                    '</div>'+
                    '<pre><code class="javascript"><div class="js-code-content"></div></code></pre>'+
                    '</div>');
                $(this).nextAll().eq(1).closest('.code-container').find('.js-code-content').text($(this).nextAll().eq(2).html());
                $(this).nextAll().eq(1).closest('.code-container').find('.js-code-content').prepend("<h5 class='code-heading'><b>JS</b></h5>");
                $(this).nextAll().eq(1).closest('.code-container').find('.btn-clipboard').attr("data-clipboard-text",($(this).nextAll().eq(2).html()));
            }

            if($(this).prev('div').children().find('code-sample')){
                if($(this).prev('div').find('.code-sample').hasClass('loading-sample1')) {
                    var formPrependText = '            <form class="form-horizontal" data-toggle="loading" data-loading-style="overlay">';
                    var formAppendText = '</form>';
                    $(this).next().closest('.code-container').find('.code-content').text($('.code-sample').html());
                    $(this).next().closest('.code-container').find('.code-content').prepend(document.createTextNode(formPrependText));
                    $(this).next().closest('.code-container').find('.code-content').append(document.createTextNode(formAppendText));
                } else if ($(this).prev('div').find('.code-sample').hasClass('loading-sample2')){
                    $(this).next().closest('.code-container').find('.code-content').text('<div data-toggle="loading" data-loading-text="Processing" ' +
                        'data-loading-style="icon-only" data-loading-image="images/oloader.gif" data-loading-inverse="true">');
                }
            }
            $(this).addClass('code-btn-active');
            $('.btn-clipboard').zclip();
            $('.code-container pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }
    });

    /***********************************************************
     *  Documentation Form Validation
     ***********************************************************/

    $('#form-validation-example').validate();
    $('#form-range-example').validate();
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