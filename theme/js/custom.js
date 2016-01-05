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
  
});