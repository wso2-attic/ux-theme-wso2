/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(function(){

    /***********************************************************
     *  nav affix config
     ***********************************************************/
    /* on scroll navbar fixed top function */
    var nav = $('.navbar');
    nav.affix({
        offset: {
            top: nav.offset().top,
            bottom: function (){
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    });


    /***********************************************************
     *  loading
     ***********************************************************/
    //$('.body-wrapper').loading('show');


    /***********************************************************
     *  data-tables config
     ***********************************************************/
    // Setup - add a text input to each footer cell
    $('.data-table tfoot th').each( function () {
        var title = $('.data-table thead th').eq($(this).index()).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );

    // DataTable
    var table = $('.data-table').DataTable({
        responsive: true
    });

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function() {
            that
                .search(this.value)
                .draw();
        });
    });


    /***********************************************************
     *  noty config
     ***********************************************************/
    noty({
        layout: 'topRight',
        text: 'Hey! This is just a notification... ',
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        type: 'information',
        theme: 'relax',
        animation: {
            open: 'animated fadeInDown',
            close: 'animated fadeOutUp',
            easing: 'swing',
            speed: 500
        },
        //timeout: 5000,
        closeWith: ['button']
    });


    /***********************************************************
     *  handlebars
     ***********************************************************/
    /* table data appending function */
    var dataObj =
    { members: [
        {
            member: { first:"Jerad", last:"Rutnam"},
            company: "WSO2",
            designation: "Software Engineer"
        },
        {
            member: { first:"David", last:"Brooke"},
            company: "Google"
        }
    ]};

    Handlebars.registerHelper('fullName', function(member){
        return member.first + ' ' + member.last;
    });

    var template = Handlebars.compile($('#template').html());
    $('#members').append(template(dataObj));

});