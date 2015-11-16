'use strict';

$(document).ready(init);

function init(){
  $('#search').click(searchStocks);
  $("#results").click("tr", getQuote);
}

function getQuote(event){
  var symbol = $(event.target).parent().children(".symbol").text();

  $.ajax('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?input=' + symbol, {
    dataType: 'jsonp'
  })
  .done(function(results){
    console.log(results);
    drawResults(results);
  })
  .fail(function(err){
    console.error(err);
  });

}

function searchStocks(event){
  var query = $("#query").val();
  $('#query').val('');
  console.log(query);

  $.ajax('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=' + query, {
    dataType: 'jsonp'
  })
  .done(function(results){
    console.log(results);
    drawResults(results);
  })
  .fail(function(err){
    console.error(err);
  });
}


function drawResults(results){
  var $results = $('#results');
  $results.empty();

  var $rows = [];
  results.forEach(function(result){
    var $tr = $('<tr>');
    var $name = $('<td>').text(result.Name);
    var $symbol = $('<td>').text(result.Symbol).addClass('symbol');
    var $exchange = $('<td>').text(result.Exchange);
    var now = new Date();
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    var time = [ now.getHours(), now.getMinutes() ];
    var $timestamp = $('<td>').text(date.join("/") + " " + time.join(":"));
    $tr.append($name, $symbol, $exchange, $timestamp);
    $rows.push($tr);
  });

  $results.append($rows);
}