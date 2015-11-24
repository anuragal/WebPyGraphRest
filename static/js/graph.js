/* CHART Functions

Script file to generate charts for server performance data
These charts are generated using D3 and nv.D3 js files

Charts defined
- Stacked bar chart for Memory data
- Bar chart for CPU data
*/

var duration= 5000;

//************START Section for generating Memory Usage Stats*****************//
var memory_stats_data = [{"key": "Used", "values": []}, {"key": "Available", "values": []}]
var memory_stats_chart;
function redraw_memorychart() {
    nv.addGraph(function () {
        memory_stats_chart = nv.models.multiBarChart();

        memory_stats_chart.multibar.stacked(true); // default to stacked
        memory_stats_chart.showControls(false); // don't show controls

        memory_stats_chart.xAxis
            .tickFormat(function (d) {
                return d3.time.format('%X')(new Date(d))
            });

        memory_stats_chart.yAxis
            .tickFormat(d3.format(',.1f'));

        d3.select('#memchart svg')
            .datum(memory_stats_data)
            .transition().duration(duration)
            .call(memory_stats_chart)
            ;

        nv.utils.windowResize(memory_stats_chart.update);

        return memory_stats_chart;
    });        
}

function getMemoryStatsData(){
    $.ajax({url: "memory_stats", 
        success: function(result) {
            $.each(result, function(index, value) {
              if(value["key"] == "Used")
              {
                  memory_stats_data[0].values.push(value["values"][0])
              }
              if(value["key"] == "Available")
              {
                  memory_stats_data[1].values.push(value["values"][0])
              }
            });
            redraw_memorychart();
        }
    });
}
getMemoryStatsData();
//************END Section for generating Memory Usage Stats*****************//

//************START Section for generating CPU Stats*****************//
var cpu_stats_data = [{"key": "cpu", "values": [], "color": '#ff7f0e'}]
var cpu_stats_chart;
function redraw_cpuchart() {
    nv.addGraph(function () {
        cpu_stats_chart = nv.models.multiBarChart();
        cpu_stats_chart.showControls(false); // don't show controls
        cpu_stats_chart.xAxis
            .tickFormat(function (d) {
                return d3.time.format('%X')(new Date(d))
            });

        cpu_stats_chart.yAxis
            .tickFormat(d3.format(',.1f'));

        d3.select('#cpuchart svg')
            .datum(cpu_stats_data)
            .transition().duration(duration)
            .call(cpu_stats_chart)
            ;

        nv.utils.windowResize(cpu_stats_chart.update);

        return cpu_stats_chart;
    });        
}

function getCPUStatsData(){
    $.ajax({url: "cpu_stats", 
        success: function(result) {
            $.each(result, function(index, value) {
              if(value["key"] == "cpu")
              {
                  cpu_stats_data[0].values.push(value["values"][0])
              }
            });
            redraw_cpuchart();
        }
    });
}
getCPUStatsData();
//************END Section for generating CPU Stats*****************//

var interval;
interval = setInterval(function () {
    getMemoryStatsData();
    getCPUStatsData();
}, duration);

function stopPolling()
{
    clearInterval(interval);
}