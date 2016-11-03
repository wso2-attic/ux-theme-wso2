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

$(function() {

    /***********************************************************
     *  leafletjs map config
     ***********************************************************/
    if($('.map-container-example').length){
        var lat = $('.map-container-example').data('lat'),
            long    = $('.map-container-example').data('long'),
            container = 'map-example',
            zoomLevel = 18,
            tileSet = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            subDomains = ['mt0','mt1','mt2','mt3'];

        if(lat != null && lat != undefined && lat != "" && long != null && long != undefined && long != "") {
            $('.map-error').hide();
            $('.map-container-example').show();
        }else{
            $('.map-container-example').hide();
            $('.map-error').show();
        }

        var map = L.map(container,{
            zoom: zoomLevel,
            center: [6.909877,79.852523]
        });
        L.tileLayer(tileSet, { attribution: attrib}).addTo(map);
        L.marker([lat,long]).addTo(map).bindPopup('Your are here..!').openPopup();
    }

});