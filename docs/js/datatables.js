---
# Jekyll Front Matter
---
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
    var tableBasic = $('#ajax-table').DataTable({
        responsive: true,
        ajax: "{{ site.baseurl }}/data/table.json",
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
        ]
    });
    
    var tableMembers = $('#members').DataTable({
        wso2: true,
        ajax: "{{ site.baseurl }}/data/table.json",
        columns: [
            { "data": "ID" },
            { "data": null },
            { "data": "Email" },
            { "data": null }
        ],
        "columnDefs": [
            {
                "targets": 1,
                "render": function (data, type, full, meta) {
                  var html = data.Name + " - " + data.Position;
                  return type === 'display' && html.length > 40 ?
                      html.substr(0, 38) + '...' : html;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, full, meta) {
                  return '<input type="text" class="form-control" value="'+data+'">';
                }
            },
            {
                "targets": 3,
                "render": function (data, type, full, meta) {
                  return   '<a href="#" class="btn btn-default">'+
                                '<span class="fw-stack">'+
                                    '<i class="fw fw-circle-outline fw-stack-2x"></i>'+
                                    '<i class="fw fw-view fw-stack-1x"></i>'+
                                '</span>'+
                                '<span class="hidden-xs">View</span>'+
                            '</a>'+
                            '<a href="#" class="btn btn-default">'+
                                '<span class="fw-stack">'+
                                    '<i class="fw fw-circle-outline fw-stack-2x"></i>'+
                                    '<i class="fw fw-edit fw-stack-1x"></i>'+
                                '</span>'+
                                '<span class="hidden-xs">Edit</span>'+
                            '</a>'+
                            '<a href="#" data-click-event="remove-form" class="btn btn-default">'+
                                '<span class="fw-stack">'+
                                    '<i class="fw fw-circle-outline fw-stack-2x"></i>'+
                                    '<i class="fw fw-delete fw-stack-1x"></i>'+
                                '</span>'+
                                '<span class="hidden-xs">Delete</span>'+
                            '</a>';
                }
            }
        ],
        "fnCreatedRow": function(nRow, aData, iDataIndex) {
            $('td:eq(0)', nRow).attr('data-title', aData.ID);
            $('td:eq(1)', nRow).attr('data-title', aData.Name);
            $('td:eq(2)', nRow).attr('data-title', aData.Email);
            $('td:eq(3)', nRow).addClass('text-right no-wrap');
        }
    });
    
    var tableUsers = $('#device-grid,#users').DataTable({
        wso2: true,
        ajax: "{{ site.baseurl }}/data/table.json",
        columns: [
            { "data": "Device_Type" },
            { "data": null },
            { "data": "Position" },
            { "data": "Office" },
            { "data": "Age" },
            { "data": "Start_date" },
            { "data": "Salary" },
            { "data": null }
        ],
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, full, meta) {
                  return '<div class="thumbnail icon">'+
                            '<i class="square-element text fw fw-'+data.toLowerCase()+'"></i>'+
                         '</div>';
                }
            },
            {
                "targets": 1,
                "render": function (data, type, full, meta) {
                  return '<h4 title="'+data.Name+'" data-toggle="tooltip" data-placement="bottom">'+data.Name+'</h4>'+
                         '<div title="'+data.Email+'" data-toggle="tooltip" data-placement="bottom">'+data.Email+'</div>';
                }
            },
            {
                "targets": 7,
                "render": function (data, type, full, meta) {
                  return   '<a href="#" class="btn btn-default">'+
                                '<span class="fw-stack">'+
                                    '<i class="fw fw-circle-outline fw-stack-2x"></i>'+
                                    '<i class="fw fw-view fw-stack-1x"></i>'+
                                '</span>'+
                                '<span class="hidden-xs">View</span>'+
                            '</a>'+
                            '<a href="#" class="btn btn-default">'+
                                '<span class="fw-stack">'+
                                    '<i class="fw fw-circle-outline fw-stack-2x"></i>'+
                                    '<i class="fw fw-edit fw-stack-1x"></i>'+
                                '</span>'+
                                '<span class="hidden-xs">Edit</span>'+
                            '</a>'+
                            '<a href="#" data-click-event="remove-form" class="btn btn-default">'+
                                '<span class="fw-stack">'+
                                    '<i class="fw fw-circle-outline fw-stack-2x"></i>'+
                                    '<i class="fw fw-delete fw-stack-1x"></i>'+
                                '</span>'+
                                '<span class="hidden-xs">Delete</span>'+
                            '</a>';
                }
            }
        ],
        "fnCreatedRow": function(nRow, aData, iDataIndex) {
            $('td:eq(0)', nRow)
                .attr('data-search', aData.Device_Type)
                .attr('data-display', aData.Device_Type)
                .addClass('remove-padding icon-only content-fill');
            
            $('td:eq(1)', nRow)
                .attr('data-search', aData.Name+','+aData.Email)
                .attr('data-display', aData.Name)
                .addClass('fade-edge');
            
            var columns = [
                    null,
                    null,
                    aData.Position,
                    aData.Office,
                    aData.Age,
                    aData.Start_Date,
                    aData.Salary,
                    null
                ];
            for (i = 2; i < 7; i++) {
                $('td:eq('+i+')', nRow)
                .attr('data-search', columns[i])
                .attr('data-display', columns[i])
                .attr('title', columns[i])
                .attr('title', 'tooltip')
                .attr('data-placement', 'bottom')
                .addClass('fade-edge remove-padding-top');
            }
            
            $('td:eq(7)', nRow).addClass('text-right content-fill text-left-on-grid-view no-wrap');
        },
        initComplete: function (){
            $('.random-thumbs .thumbnail.icon').random_background_color();
        }
    });
        
});