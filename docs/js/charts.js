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
     *  Bar Charts
     ***********************************************************/

    var data = [
        {
            "metadata": {
                "names": ["rpm", "torque", "horsepower", "EngineType"],
                "types": ["ordinal", "linear", "ordinal", "ordinal"]
            },
            "data": []
        }
    ];
    
    var config = {
        type: "bar",
        x: "rpm",
        highlight: "multi",
        selectionColor: "#33ccff",
        charts: [{type: "bar", y: "torque"}],
        maxLength: 6,
        width: 500,
        height: 250
    }

    var configH = {
        type: "bar",
        x: "rpm",
        charts: [{type: "bar", y: "torque", orientation: "left"}],
        maxLength: 6,
        width: 500,
        height: 250
    }
    
    var barChart = new vizg(data, config);
    barChart.draw("#bChart");

    var barChartH = new vizg(data, configH);
    barChartH.draw("#bChartH");

    /***********************************************************
     *  Donut and Pie Charts
     ***********************************************************/
    var data1 =  [
        {
            "metadata" : {
                "names" : ["rpm","torque","horsepower", "EngineType"],
                "types" : ["linear","linear", "ordinal","ordinal"]
            },
            "data": [
                [0, 100, 12,"Rotary"]

            ]
        }
    ];

    var configDonut = {
        charts : [{type: "arc",  x : "torque", color : "EngineType", mode: "donut"}],
        width: 400,
        height: 300,
        percentage:true
    }

    var configPie = {
        charts : [{type: "arc",  x : "torque", color : "EngineType", mode: "pie"}],
        width: 400,
        height: 300
    }

    var donutChart = new vizg(data1, configDonut);
    donutChart.draw("#dChart");

    var pieChart = new vizg(data1, configPie);
    pieChart.draw("#dChartPie");

    /***********************************************************
     *  Single Line Chart
     ***********************************************************/

    var data2 =  [
        {
            "metadata" : {
                "names" : ["rpm","torque","horsepower", "EngineType"],
                "types" : ["linear","linear", "ordinal","ordinal"]
            },
            "data": [
                [0, 10, 1, "Piston"], [0, 10, 1, "Rotary"]]
        }
    ];

    var configSingle = {
        type: "line",
        x : "rpm",
        y : "torque",
        charts : [{type: "line",  y : "torque"}],
        maxLength: 6,
        width: 500,
        height: 300
    };

    var lineChartSingle = new vizg(data2, configSingle);
    lineChartSingle.draw("#lChart");

    /***********************************************************
     *  Scatter Chart
     ***********************************************************/

    var data3 =  [
        {
            "metadata" : {
                "names" : ["rpm","torque","horsepower", "weight", "EngineType"],
                "types" : ["linear","linear", "linear","linear", "ordinal"]
            },
            "data": [
            ]
        }
    ];

    var configScatter = {
        type: "scatter",
        charts : [
            {type: "scatter",
                x : "rpm",
                y : "torque",
                color: "horsepower",
                size : "weight",
                padding: {"top": 50, "left": 60, "bottom": 40, "right": 150},
                maxLength: 30}],

        width: 500,
        height: 300
    }

    var scatterChart = new vizg(data3, configScatter);
    scatterChart.draw("#sChart");
    
    
    var iterations = 1000;
    (function insertLoop(i) {
        setTimeout(function () {

            //Bar charts
            var xVal = Number((Math.random() * 100).toFixed(0)) % 15;
            barChart.insert([[xVal, Number((Math.random() * 100).toFixed(0)) % 15, 20, "Piston"]]);
            barChartH.insert([[xVal, Number((Math.random() * 100).toFixed(0)) % 15, 20, "Piston"]]);

            //Donut and Pie charts
            if ( i % 4 == 0) {
                EngineType = "Rotary";
            } else if( i % 4 == 1) {
                EngineType = "Piston V6";
            }
            else if( i % 4 == 2) {
                EngineType = "Piston V8";
            }  else if( i % 4 == 3) {
                EngineType = "Piston";
            }

            pieChart.insert([[iterations-i + 1, Number((Math.random() * 100).toFixed(2)), 13, EngineType]]);
            donutChart.insert([[iterations-i + 1, Number((Math.random() * 100).toFixed(2)), 13, EngineType]]);

            //Single Line chart
            var x = iterations-i + 1;
            lineChartSingle.insert([[x, Number((Math.random() * 100).toFixed(2)), 13, "Rotary"]]);

            //Scatter chart
            scatterChart.insert([[iterations-i + 1,Number((Math.random() * 100).toFixed(2)),Number((Math.random() * 100).toFixed(2)),(Math.random() * 100).toFixed(2),"Piston"]]);

            if (--i) insertLoop(i);
        }, 1000)
    })(iterations);

});
