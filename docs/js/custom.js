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

    /***********************************************************
     *  data-tables config
     ***********************************************************/
    $('#ajax-table').datatables_extended({
        ajax: "data/table.json",
        columns: [
            { "data": "ID" },
            { "data": "Device_Type" },
            { "data": "OS" },
            { "data": "Name" },
            { "data": "Email" },
            { "data": "Position" },
            { "data": "Office" },
            { "data": "Age" },
            { "data": "Start_date" },
            { "data": "Salary" }
        ],
        responsive: true
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
        },
        "checkbox": {
            real_checkboxes: true,
            two_state: true,
            checked_parent_open: true,
            override_ui:true
        }
    });
    
//    // 7 bind to events triggered on the tree
//    $('#jstree').on("changed.jstree", function (e, data) {
//      console.log(data.selected);
//    });
//    
//    // 8 interact with the tree - either way is OK
//    $('button').on('click', function () {
//      $('#jstree').jstree(true).select_node('child_node_1');
//      $('#jstree').jstree('select_node', 'child_node_1');
//      $.jstree.reference('#jstree').select_node('child_node_1');
//    });
  
});

$('link[data-include]').each(function(){
    var el = $(this),
        template = $(this).data('include');

    $.get(template, function(data){
        $(el).replaceWith(data);
    });
});

$('link[data-include-demo]').each(function(){

    var el = $(this),
        componentURL = 'libs/theme-wso2_1.0/components/' + $(this).data('include-demo') + '/';

    $.get(componentURL + 'example.html',function(data){
        $(el).replaceWith($(data).find('#example').html());
    });

    //var fileExt = ['css','js'];
    //
    //$.each(fileExt, function(index, value){
    //    $.ajax({
    //        url: componentURL + value,
    //        success: function (data) {
    //            $(data).find("a:contains(" + value + ")").each(function() {
    //                console.log(componentURL + value + '/' + $(this).text());
    //            });
    //        }
    //    });
    //});

});



/***********************************************************
 *  accordion config
 ***********************************************************/

$('#accordion1,#accordion2').on('shown.bs.collapse', function () {
    var elem = $(this).children().children('.in');
    var icon = $(elem).prev().find('.status').children();
    var iconNow = $(this).children().children('.now').prev().find('.status').children();
    var isIconStateDown = $(iconNow).hasClass('fw-down');

    if($(elem).hasClass('in')){
        $(elem).prev().find('input[type=radio]').prop('checked',true);
        $(elem).addClass('now');
    }

    if(isIconStateDown){
        $(iconNow).removeClass('fw-down');
        $(iconNow).addClass('fw-up');
    }

});


$('#accordion1,#accordion2').on('hidden.bs.collapse', function () {
    var elem = $(this).children().children();
    var icon = $(elem).prev().find('.status').children();
    var iconNow = $(this).children().children('.now').prev().find('.status').children();
    var isIconStateUp = $(iconNow).hasClass('fw-up');

    if(isIconStateUp){
        $(iconNow).removeClass('fw-up');
        $(iconNow).addClass('fw-down');
    }


});

/***********************************************************
 *  Secondary toggle navigation
 ***********************************************************/

$('.secondary-nav').on('shown.bs.collapse', function(e){
    $('.secondary-nav-toggle').removeClass('fw-down').addClass('fw-up');
}).on('hidden.bs.collapse',function(e){
    $('.secondary-nav-toggle').removeClass('fw-up').addClass('fw-down');
})

    /***********************************************************
     *  leafletjs map config
     ***********************************************************/

$(function(){
    if($('.map-container').length){
        var lat = $('.map-container').data('lat'),
                long    = $('.map-container').data('long'),
                container = 'map1',
                zoomLevel = 17,
                tileSet = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attrib =  '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';

                if(lat != null && lat != undefined && lat != "" && long != null && long != undefined && long != "") {
                    $('.map-error').hide();
                    $('.map-container').show();
                }else{
                    $('.map-container').hide();
                    $('.map-error').show();
                }

            var map = L.map(container).setView([lat,long], zoomLevel);

        L.tileLayer(tileSet, { attribution: attrib}).addTo(map);
        L.marker([lat,long]).addTo(map).bindPopup('Your are here..!').openPopup();
    }
});