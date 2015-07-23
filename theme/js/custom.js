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

    /* show/hide pre-loader animation */
    //$('html').loading('show');

    /* data-table styling */
    $('.data-table').DataTable({
        responsive: true
    });

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