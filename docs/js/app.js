/***********************************************************
*  requirejs + handlebars (hbs templating)
***********************************************************/



$(document).ready(function() {
    require.config({
        paths: {
            hbs: 'libs/requirejs_2.1.18/require-handlebars-plugin/hbs'
        },
        hbs: { // optional
            helpers: true,            // default: true
            i18n: false,              // default: false
            templateExtension: 'hbs', // default: 'hbs'
            partialsUrl: ''           // default: ''
        }
    });

//require(['hbs!../partials/demo_partial'], function(tmplOne) {
//    $('#demohbs').html(
//        tmplOne({adjective: "favorite"})
//    );
//});

    require(['hbs/handlebars'], function (Handlebars) {

        Handlebars.registerHelper('toLowerCase', function(str) {
            return str.toLowerCase();
        });

        Handlebars.registerHelper('limit', function (arr, limit) {
            return arr.slice(0, limit);
        });

        $.getJSON('data/table.json', function(data){

            var members = Handlebars.compile($('#membersTemplate').html());
            $('#members tbody').append(members(data));

            var users = Handlebars.compile($('#usersTemplate').html());
            //$('#users tbody').append(users(data));
            $('#device-grid tbody').append(users(data));

            //$('#users').datatables_extended();
            $('#device-grid').datatables_extended();

        });




//    Handlebars.registerPartial('foo', 'partials/demo_partial.hbs');

        //$.get('partials/header_css.hbs', function(data) {
        //    var template = Handlebars.compile(data);
        //    //$('body').html(template(dataObj));
        //}, 'html');
    });


    $('#users').datatables_extended({
        "bProcessing": true,
        "bServerSide": true,
        "bDestroy": true,
        "bRetrieve": true,
        "sAjaxSource": "data/table.json",
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": function(data, textStatus, jqXHR) {
                    var jsonEmpresa = $.parseJSON(data.d);
                    console.log(jsonEmpresa);
                    $("#usersTemplate").appendTo("#users tbody");
                }
            });
        }
    });


});


