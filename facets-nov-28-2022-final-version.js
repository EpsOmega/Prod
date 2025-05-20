/*
11/23/20222 version of Facets and Show More
Latest version the fixes are listed below:
1. Regardless of current page, Show More will return results and page # will be reset to 1
2. Sort by dropdown is recognized by Show More, and the results will be based on this value.replace
3. O' works on both queries and as an option in Show uhamore
4. Twist, civil war, civil war general all work with Show More
5. There is one bug and I cannot fix right now and here is the URL:
https://hartford-sandbox.bibliovation.com/app/search/(civil%20war)?sort=title-sort%20desc&collection=((%22DVD%22)%20OR%20(%22SCORES%22)%20OR%20(%22VHS%22))&author-display=((%22Films%20for%20the%20Humanities%20%26%20Sciences%20(Firm)%22)%20OR%20(%22Criterion%20Collection%20(Firm)%22)%20OR%20(%22Janus%20Films%22))&topic_facet=%22Foreign%20films%22

The above works but attempting to drill down breaks with last option added. Maybe it is the sequence that breaks.

*/

//$('#alltests').remove();
//$('#header').prepend('<div id="alltests"></div>');


////remove_all_facects at once commented out below
//see OPC too for //$('.search-summary').append('<button id="remove_all_facets" type="button">Remove All Facets at Once</button>')


/*
Set display to none when going live, otherwise a behind the scenes URL will display in the header
Place this CSS in DL and CSS section
#testurl{
display:none;
}

<span id="testurl">https://hartford-sandbox.bibliovation.com/app/search/(o'Hara)?sort=score%20desc&amp;collection=((%22SCORES%22)%20OR%20(%22DVD%22)%20OR%20(%22AUDIOCD%22))&amp;topic_facet=((%22Musicals%22)%20OR%20(%22Song%20cycles%22)%20OR%20(%22Songs%20(High%20voice)%20with%20piano%22)%20OR%20(%22Songs%20(Low%20voice)%20with%20piano%22))&amp;author-display=((%22O%27Hara,%20Kelli%22)%20OR%20(%22Bernstein,%20Leonard,%22)%20OR%20(%22Allen,%20Glenn%20Seven%22))&amp;pubyear=(%5B2010%20TO%202013%7D%20OR%20%5B2000%20TO%202010%7D)</span>
//Needed to keep track of current url and used to append more facets via the Show More buttons
*/

var facetLookup = {
    'Owned by': 'owned-by',
    'Topic': 'topic_facet',
    'Author': 'author-display',
    'Region': 'geo_facet',
    'Format': 'collection',
    'Language': 'language',
    'Date': 'pubyear'
}

var facetLookup2 = {
    'owned-by': 'Owned by',
    'topic_facet': 'Topic',
    'author-display': 'Author',
    'geo_facet': 'Region',
    'collection': 'Format',
    'language': 'Language',
    'pubyear': 'Date'
}

var whichFacet4Modal = '';
var urlStack = '';
var whichFacetChosenNEW = '';
var userChoicesName = [];
var userChoicesVal = [];
var facet4DateClick = '';
var sortBy='';

function getQS() {
    var qs = '';
    var qsfinal = '';

    var qs2 = $("span.solr-field").text().trim();
    //console.log("getQS() qs2", qs2);
    //console.log("-------------------------------------------");

    $("span.solr-query").each(function(index) {
        //console.log( index + ": " + $( this ).text() );
        qs = qs + $(this).text() + ' ';
    });
    //console.log("-------------------------------------------");
    // var qs = $("span.solr-query").text().trim();
    //console.log("getQS() qs OK as is?", qs);    
    qsfinal = qs.trim();
    //console.log("getQS() qsfinal trimmed", qsfinal);  
    var uri_enc = encodeURIComponent(qs2 + qsfinal);
    //console.log("var uri_enc <--- return value for the API", uri_enc ); 
    return uri_enc;
} //function getQS() {


function getUrlParams(url) {
    var queryparams = url.split('?')[1];
    //  //console.log("getUrlParams(url)", queryparams); //&fq=

    if (queryparams === undefined) {
        data = [];
        return data;
    }

    var params = queryparams.split('&');
    var pair = null,
        data = [];

    if (params !== undefined) {
        params.forEach(function(d) {
            pair = d.split('=');
            if (pair[0] !== 'page' && pair[0] !== 'sort') {
                data.push({
                    key: pair[0],
                    value: pair[1]
                });
            }
        });
    } //if(params !==undefined){
    return data;
} //eof function getUrlParams(url) {


//&fq=op:(OR)  line 78 is the problem    ------------>libweb js file  - SAYS OPACstring =  &fq=op:(OR)
function buildOPAC_url(forFacets, qsForFacets, thisFacetNorml) { //q.op=AND    //&op=OR
    //console.log("777777777777777777 libweb js file/buildOPAC_url forFacets, qsForFacets, thisFacetNorml ", forFacets, qsForFacets, thisFacetNorml);
    facet4DateClick = thisFacetNorml;
    var i;
    var OPACstring = '';
    for (i = 0; i < forFacets.length; i++) {

        //VIP line of code
        //used to be this OPACstring += '&fq=' + forFacets[i]['key'] + ':' + '(' + forFacets[i]['value'] + ')'; //but this allow all facets an array of 7 distinct elements like collection, author-by to be returned on UPDATE
        // it has been replaced with 

        if (qsForFacets.includes("'")) {
            OPACstring += '&fq=' + forFacets[i]['key'] + ':' + '(' + forFacets[i]['value'] + ')'; //this may or may not be a good thing.
            //console.log("libweb js file/buildOPAC_url  - SAYS OPACstring = forFacets[i]['key'], forFacets[i]['value']", forFacets[i]['key'], forFacets[i]['value']);

        } else {

            OPACstring += '&fq=' + forFacets[i]['key'] + ':' + '' + forFacets[i]['value'] + ''; //this may or may not be a good thing.
            //console.log("libweb js file/buildOPAC_url  - SAYS OPACstring = forFacets[i]['key'], forFacets[i]['value']", forFacets[i]['key'], forFacets[i]['value']);
        } //if( qsForFacets.includes("'") ){

    } //for (i = 0; i < forFacets.length; i++) {

    //console.log("84 libweb js file  - SAYS OPACstring = ", OPACstring);
    var OPACstring2 = OPACstring.replace("&fq=fq:", "&fq=");
    //OPACstring2 = /api/opac/twist?facet.field=topic_facet&fq=op:(OR)&facet.limit=5000&facet.offset=0&facet.sort=count
    //console.log("87libweb js file  - SAYS OPACstring2 > ", OPACstring2);
    OPACstring2 = '/api/opac/' + qsForFacets + '?' + 'facet.field=' + thisFacetNorml + OPACstring2 + '&facet.limit=5000&facet.offset=0&facet.sort=count';
    //console.log("89libweb js file  - SAYS OPACstring2 > agian ", OPACstring2);
    //if it looks like /api/opac/twist?facet.field=topic_facet&fq=op:(OR)&facet.limit=5000&facet.offset=0&facet.sort=count
    var OPACstring3 = OPACstring2.replace("&fq=op:(OR)", "&op=OR"); //.replace("op=OR", "q.op=AND");   //replace the op=OR and then send off to Solr as an API call
    return OPACstring3;

} //eof

$(document).on("click", ".userlimit", function(event) {
    if ($(this).children().find(".label-warning").text().indexOf("acqdate:[NOW-2YEARS TO *]") > 0) $(".custom-facet-remove").remove();
    if ($(this).children().find(".label-warning").text().indexOf("acqdate:[NOW-1YEARS TO *]") > 0) $(".custom-facet-remove").remove();
});


//custom-facet-remove
$("body").on("click", ".custom-facet-remove", function(event) {
    //console.log("REMOVE AN ACQ DATE");
    var zz = $(this).prev().data("year_range");
    //console.log(zz);
    if ($(this).prev().data("year_range") == 1) {
        //fq=acqdate:%5BNOW-365DAYS%20TO%20*%5D
        var removedate = window.location.href.replace("fq=acqdate:%5BNOW-1YEARS%20TO%20*%5D", "");

    } else {
        //fq=acqdate:%5BNOW-730DAYS%20TO%20*%5D
        var removedate = window.location.href.replace("fq=acqdate:%5BNOW-2YEARS%20TO%20*%5D", "");
    }
    $(this).remove();
    window.history.replaceState({}, null, removedate);
});

$("body").on("click", ".customacqdate", function(event) {
    //event.preventDefault();
    var n = $(this).attr("data-year_range");
    //console.log("n = ", n);
}); //$("body").on("click", ".customacqdate", function(event) {

$("body").on("click", ".customacqdate-keep", function(event) {
    event.preventDefault();
    var n = $(this).attr("data-year_range");
    $("div.allcustomacqdate span.custom-facet-remove").remove();
    $(this).parent().append('<span class="custom-facet-remove"><i class="glyphicon glyphicon-remove"></i></span>');
    var urlparams = getParams(window.location.href);
    //console.log("ENTER KEY TEST facets 520 .js says urlparams = ", urlparams);
    var kb = '';

    if (window.location.search !== '') {
        for (let [key, value] of Object.entries(urlparams)) {
            if (key !== 'pubyear' && key !== 'sort' && key !== 'page') {
                if (value !== 'acqdate:[NOW-2YEARS TO *]' && value !== 'acqdate:[NOW-1YEARS TO *]') {
                    //console.log("key=", key);
                    //console.log("value=", value);
                    kb += key + '=' + value + '&';
                } //inner if
            }
        } //for
    } //if(window.location.search !== ''){

    //console.log("ENTER KEY TEST kb ENTER KEY TEST kbENTER KEY TEST kb= ", kb);
    kb = kb.replace(/\&$/, ''); /////////////////////////////////////////////////////
    //console.log("ENTER KEY TEST kb ENTER KEY TEST kbENTER KEY TEST kb= and dupe", kb);
    var kb2 = kb.replace(/&page=[0-9]+/, ''); ///////////////////////////////////////////
    //console.log("ENTER KEY TEST kb2 ENTER KEY TEST kb2ENTER KEY TEST kb2= ", kb2);
    $("#toppager").remove();

    if (kb2 === '') {
        var enterKeyURL = '?' + 'fq=acqdate:%5BNOW-' + n + 'YEARS%20TO%20*%5D';
        //console.log("kb2 === '' ENTER KEY TEST facets enterKeyURL enterKeyURL ", enterKeyURL);
        window.location.pathname + enterKeyURL;
        //console.log("kb2 === '' ENTER KEY TEST facets  window.location.pathname +  enterKeyURL =", window.location.pathname + enterKeyURL); //
        //window.history.replaceState({}, null, window.location.pathname + enterKeyURL + '&sort=acqdate%20desc');
        window.location.hash = window.location.pathname + enterKeyURL + '&sort='+sortBy;
    } else {
        var enterKeyURL = encodeURI(kb2) + '&' + 'fq=acqdate:%5BNOW-' + n + 'YEARS%20TO%20*%5D';
        //console.log("!kb2 === '' ENTER KEY TEST facets enterKeyURL enterKeyURL ", enterKeyURL);
        //console.log("!kb2 === '' ENTER KEY TEST facets  window.location.pathname + '?' +  enterKeyURL =", window.location.pathname + '?' + enterKeyURL);
        // window.history.replaceState({}, null, window.location.pathname + '?' + enterKeyURL + '&sort=acqdate%20desc');
        window.location.hash = window.location.pathname + '?' + enterKeyURL + '&sort='+sortBy;

    } //if kb2 
}); //$("body").on("click", ".customacqdate", function(event) {    


//Modal functions
$("#mym button.cancel").click(function() {
    //console.log("CANCEL CLICKED");
    $("#mobo").scrollTop(0);
    $("#mym").hide();
    //<div id="facets_loading_text">
    // $("#facets_loading_text").remove();
    $("#overlay_facets_loading").remove();
}); //$("#mym button.cancel").click(function() {


function URL4Results(){
var paramsArr=[]; 
var theURL='';   
//build a string such that the calling program only has to append new show more search
sortBy=getCurrentSort(); //title-sort%20desc  <----- of this form
const urlParams = new URLSearchParams(location.search);

for (const entry of urlParams.entries()) {
    console.log("entry", entry);
    paramsArr.push(entry);
}//for

//console.log("paramsArr", paramsArr );
var existingStr='';
for (let i = 0; i < paramsArr.length; i++) {
 if(paramsArr[i][0]!='page' && paramsArr[i][0]!='sort'){
    existingStr+= '&' + paramsArr[i][0] + '=' +  encodeURIComponent(paramsArr[i][1]); //paramsArr[i][1]; // encodeURIComponent(paramsArr[i][1]);
 }//if
}//for 
// console.log("existingStr", existingStr );

theURL=window.location.origin+ window.location.pathname + '?sort='+sortBy+'&page=1' + existingStr;//+ ''
return theURL;
//debugger;
}//function URL4Results(){

function removeKOHABIB(kohabibURL) {
    var newstrptr = 0;
    var res = kohabibURL;
    if (kohabibURL.lastIndexOf("#kohabib-") > 0) {
        newstrptr = kohabibURL.lastIndexOf("#kohabib-"); //an int here
        res = kohabibURL.slice(0, newstrptr);
        //console.log(res);
    }
    return res;
} //eof


//remove_all_facects at once
/*$("body").on("click", "#remove_all_facets", function(event) {
   //console.log("remove_all_facets");
$( ".limit-summary" ).remove();
 window.location.hash=window.location.pathname;                   
 //console.log("inside OPC and what is the path?", window.location.pathname  );
});//$("#remove_all_facets").click(function() {*/
//remove_all_facects at once

$("body").on("click", "form.rowpubyear2", function(event) {
    event.preventDefault();
    var sortBy='';

    if ($(event.target).text() === 'Apply') { //It used to be Refine now the text is Update  rather Apply
        //console.log("=== 'Apply/Update'");

  sortBy=getCurrentSort(); //title-sort%20desc  <----- of this form
  console.log("ddddddddddddddddddddddddddddddddsortBy5", sortBy );    

        var refineMin = $("input[ng-model='rangeSlider.userMin']").val();
        var refineMax = $("input[ng-model='rangeSlider.userMax']").val();
        //console.log("qqqqqqqqqqqqqqqqqpatronURL again ", refineMin, refineMax);
        var qs = getQS();
        //console.log("var qs = getQS() inside update ", qs);
        var current_url = window.location.href;
        var urlparams = getParams(window.location.href);
        //console.log("facets 520 .js says urlparams = ", urlparams);

        //  var buildnewURL = '/app/search/' + '(' + qs + ')'; //see line 95 for more info
        var buildnewURL = '/app/search/' + '' + qs + '';
        //https://hartford.waldo.sandbox.kohalibrary.com/app/search/(help)?pubyear=%5B1975%20TO%202019%5D&topic_facet=%22English%20language%22
        var cnt = 0;
        for (let [key, value] of Object.entries(urlparams)) {
            if (key !== 'pubyear' && key !== 'page') {
                //console.log(key + ':' + value);
            }
        }

        //console.log("facets 520 .js says current_url = ", current_url);
        //var newurl = current_url.replace(/&page=[0-9]+/, '');
        var newurl = current_url.replace(/page=[0-9]+/, 'page=1'); //5-1-19 var browserURL_b4_append2 = browserURL_b4_append.replace(/\?page=[0-9]+/, '');


var urlFinal='';
urlFinal=URL4Results()+'&pubyear='+ '('+ encodeURI('[' + refineMin + ' TO ' + refineMax + ']') +')';

        $("#toppager").remove();

        window.location.href=urlFinal;
    } //if refine


    if ($(event.target).text() === 'Clear') {
        $("input[ng-model='rangeSlider.userMin']").val($("span.irs-min").text());
        $("input[ng-model='rangeSlider.userMax']").val($("span.irs-max").text());
        var $d5 = $(".js-range-slider");
        //console.log("$d5", $d5);
        var d5_instance = $d5.data("ionRangeSlider");
        //console.log("d5_instance", d5_instance);
        d5_instance.update({
            min: $("input[ng-model='rangeSlider.userMin']").val(),
            max: $("input[ng-model='rangeSlider.userMax']").val(),
            from: $("input[ng-model='rangeSlider.userMin']").val(),
            to: $("input[ng-model='rangeSlider.userMax']").val()
        });

    } //if reset

}); //$("body").on("click", "form.rowpubyear2", function(event) {    

function myTimer(param1, param2) {
    //console.log("function myTimer(param1, param2) loop", param1, param2);
    if (theTEST == param2) clearInterval(myVar);
}


function sortFacetsTable(colnum, dir) {
    //  $("#mym .modal-header").prepend("HIIIIIIIIIIIIIIIIIIIIIII");
    //dir='asc';
    var rows = $('.facetstbl tbody  tr').get();

    rows.sort(function(a, b) {

        var A = $(a).children('td').eq(colnum).text().toUpperCase();
        var B = $(b).children('td').eq(colnum).text().toUpperCase();

        if (dir === 'asc') {
            if (A < B) {
                return -1;
            }
            if (A > B) {
                return 1;
            }

        } else {

            if (A > B) {
                return -1;
            }
            if (A < B) {
                return 1;
            }

        } //if(dir==='asc'){
        return 0;
    });

    $.each(rows, function(index, row) {
        $('.facetstbl').children('tbody').append(row);

    });
} //eof function sortTable(){  


$("#sortcol1-111").on("click", "img", function(event) {
    //  $("#sortingtable").show();
    //$("#mobo").css("background-color", "yellow");
    if ($(this).attr('alt').indexOf("Ascending") >= 0) {
        //console.log("currently set to asc mode #sortcol1 > img");

        sortFacetsTable(1, 'asc');
        //$(this).text("Sort Descending");
        $(this).attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/down.png');
        $(this).attr('alt', 'Sort Descending');
    } else {
        ////////////// timer_i++;
        //console.log("currently set to desc mode #sortcol1 > img ");
        sortFacetsTable(1, 'desc');
        //$(this).text("Sort Ascending");
        $(this).attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/up.png');
        $(this).attr('alt', 'Sort Ascending');
    } //if( $(this).text().indexOf("Ascending") >= 0){
    /// $("#mobo").removeClass('modal_overlay');       
    //   $("#sortingtable").hide(); 
    //console.log("function(event) 2", event);
    https: //libweb.hartford.edu/koha/discoverylayer/ver520/images/both.png
        $('#sortcol2 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/both.png');
    $('#sortcol2 >img').attr('alt', 'Sort Descending');
}); //$("body").on("click", "#sortcol1", function() {

function facetsCol1Sort() {
    if ($('#sortcol1 >img').attr('alt').indexOf("Ascending") >= 0) {
        ////console.log("458 currently set to asc mode #sortcol2 > img");
        sortFacetsTable(1, 'asc');
        //$(this).text("Sort Descending");
        $('#sortcol1 >img').attr('alt', 'Sort Descending');
        $('#sortcol2 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/both.png');
        $('#sortcol1 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/up.png');
        $('#sortcol2 >img').attr('alt', 'Sort Descending');
        //console.log("indexOf(Ascending) >= 0");
    } else {
        //console.log("613 currently set to desc mode #sortcol2 > img");
        sortFacetsTable(1, 'desc');
        //$(this).text("Sort Ascending");
        $('#sortcol1 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/down.png');
        $('#sortcol1 >img').attr('alt', 'Sort Ascending');
        // //console.log("sortFacetsTable2(2,'desc')");
        $('#sortcol2 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/both.png');
        $('#sortcol2 >img').attr('alt', 'Sort Descending');
    } //if( $(this).text().indexOf("Ascending") >= 0){
}

$("#sortcol1").on("click", "img", function(event) {
    //console.log("1111111111 23456789613");
    event.stopPropagation();

    $("#sortingfacetstable > img").show({
        done: function() {
            facetsCol1Sort();
            $("#sortingfacetstable > img").hide();
        },
        duration: 1000
    });
});

function facetsCol2Sort() {
    if ($('#sortcol2 >img').attr('alt').indexOf("Ascending") >= 0) {
        //console.log("458 currently set to asc mode #sortcol2 > img");
        sortFacetsTable2(2, 'asc');
        //$(this).text("Sort Descending");
        $('#sortcol2 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/up.png');
        $('#sortcol2 >img').attr('alt', 'Sort Descending');
        //console.log("sortFacetsTable2(2,'asc')");
    } else {
        //console.log("613 currently set to desc mode #sortcol2 > img");
        sortFacetsTable2(2, 'desc');
        //$(this).text("Sort Ascending");
        $('#sortcol2 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/down.png');
        $('#sortcol2 >img').attr('alt', 'Sort Ascending');
        //console.log("sortFacetsTable2(2,'desc')");
        $('#sortcol1 >img').attr('src', 'https://libweb.hartford.edu/koha/lak6live/images/both.png');
        $('#sortcol1 >img').attr('alt', 'Sort Descending');
    } //if( $(this).text().indexOf("Ascending") >= 0){
}


// $(".target").show( "slide", {direction: "up" }, 2000 );
$("#sortcol2").on("click", "img", function(event) {
    //console.log("2222222 123456789613");
    event.stopPropagation();
    $("#sortingfacetstable > img").show({
        done: function() {
            facetsCol2Sort();
            $("#sortingfacetstable > img").hide();
        },
        duration: 1000
    });
});


function sortFacetsTable2(colnum, dir) {
    //dir='asc';
    var rows = $('.facetstbl tbody  tr').get();
    rows.sort(function(a, b) {

        var A = parseInt($(a).children('td').eq(colnum).text().toUpperCase());
        var B = parseInt($(b).children('td').eq(colnum).text().toUpperCase());

        if (dir === 'asc') {
            if (A < B) {
                return -1;
            }
            if (A > B) {
                return 1;
            }

        } else {

            if (A > B) {
                return -1;
            }
            if (A < B) {
                return 1;
            }

        } //if(dir==='asc'){
        return 0;
    });

    $.each(rows, function(index, row) {
        $('.facetstbl').children('tbody').append(row);
    });
} //eof function sortTable(){ 

//select all checkboxes
$("#Checkbox1").change(function() { //"select all" change 
    var status = this.checked; // "select all" checked status
    $('.limControl').each(function() { //iterate all listed checkbox items
        this.checked = status; //change ".checkbox" checked status
        //console.log("#Checkbox1 just clicked Check/uncheck all looping?");
        //console.log("this", $(this));
    });
}); ///


$("body").on("click", "input.limControl", function() {
    //alert("facets code is updating");
    ////console.log("77777777777777777777777777777777777FACETs .js - SAYS CLICK ON input.limControl");

    var currState = $(this).prop('checked');
    a = FuzzySet();
    a.add($(this).val());
    var listItems = $("td.lim-select input.limControl");
    ////console.log("66666666666666666666666666666666666666666fuzzy for ", whichFacetChosenNEW);


    if (whichFacetChosenNEW != 'author-display') {
        listItems.each(function(i, v) {
            //   //console.log("66666666666666666666666666666666666666666fuzzy for ",$(this).attr('name') );
            //  //console.log("00000000000000000000000000000000000000000000000000i,v", i , v);
            if (a.get($(v).attr("name")) !== null && a.get($(v).attr("name"))[0][0] > 0.85) {
                // //console.log("66666666666666666666666666666666666666666fuzzy for ",$(this).attr('name'),  $(this).val(), a.get($(v).attr("name"))[0][0], a.get($(v).attr("name"))[0][1]);

                if (currState) {
                    //console.log("checked");
                    $(this).prop("checked", true);

                } else {
                    //console.log("unchecked");
                    $(this).prop("checked", false);
                }

            } // if(a.get($(v).attr("name")) !==null && a.get($(v).attr("name"))[0][0]> 0.90){

        }); //.each
    } //if(whichFacetChosenNEW!='author-display'){

}); //$("body").on("click", "input.limControl", function() {    


var getParams = function(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};


$(document).on("keyup", "input[ng-model='rangeSlider.userMin']", function(e) {
    if (e.keyCode == 13 || e.charCode == 13) {
        //console.log("keyup on input[ng-model='rangeSlider.userMin']", $(this), event);
        //console.log("You changed the date min to ");
        //console.log($(this).val());
        //console.log($("input[ng-model='rangeSlider.userMax']").val());
        updateDateEnterKey($(this).val(), $("input[ng-model='rangeSlider.userMax']").val());

    }
});

//var x = event.charCode || event.keyCode; // Use either charCode or keyCode, depending on browser support
$(document).on("keyup", "input[ng-model='rangeSlider.userMax']", function(e) {
    if (e.keyCode == 13 || e.charCode == 13) {
        //console.log("keyup on input[ng-model='rangeSlider.userMax']", $(this), event);
        //console.log("You changed the date max to ");
        //console.log($(this).val());
        updateDateEnterKey($("input[ng-model='rangeSlider.userMin']").val(), $(this).val());
    }
});


function updateDateEnterKey(inputFieldMin, inputFieldMax) {
    var urlparams = getParams(window.location.href);
    //console.log("ENTER KEY TEST facets 520 .js says urlparams = ", urlparams);
    var kb = '';

    if (window.location.search !== '') {

        for (let [key, value] of Object.entries(urlparams)) {
            if (key !== 'pubyear' && key !== 'page') {
                //console.log(key + ':' + value);
                kb += key + '=' + value + '&';
            }
        } //for

    } //if(window.location.search !== ''){
    //console.log("ENTER KEY TEST kb ENTER KEY TEST kbENTER KEY TEST kb= ", kb);
    kb = kb.replace(/\&$/, ''); /////////////////////////////////////////////////////

    //console.log("ENTER KEY TEST kb ENTER KEY TEST kbENTER KEY TEST kb= and dupe", kb);
    var kb25 = kb.replace(/&page=[0-9]+/, ''); ///////////////////////////////////////////
    var kb2 = kb25.replace(/\?page=[0-9]+/, ''); /////////////////////////////////////////// 
    //console.log("ENTER KEY TEST kb2 ENTER KEY TEST kb2ENTER KEY TEST kb2= ", kb2);
    $("#toppager").remove();
    if (kb2 === '') {

        var enterKeyURL = '?' + 'pubyear=[' + inputFieldMin + ' TO ' + inputFieldMax + ']';
        //console.log("kb2 === '' ENTER KEY TEST facets enterKeyURL enterKeyURL ", enterKeyURL);
        window.location.pathname + enterKeyURL
            //console.log("kb2 === '' ENTER KEY TEST facets  window.location.pathname +  enterKeyURL =", window.location.pathname + encodeURI(enterKeyURL)); //
            // window.history.replaceState({}, null, window.location.pathname + encodeURI(enterKeyURL));
        window.location.hash = window.location.pathname + encodeURI(enterKeyURL);
    } else {

        var enterKeyURL = kb2 + '&' + 'pubyear=[' + inputFieldMin + ' TO ' + inputFieldMax + ']';
        //console.log("!kb2 === '' ENTER KEY TEST facets enterKeyURL enterKeyURL ", enterKeyURL);
        //console.log("!kb2 === '' ENTER KEY TEST facets  window.location.pathname +  enterKeyURL =", window.location.pathname + '?' + encodeURI(enterKeyURL));
        //window.history.replaceState({}, null, window.location.pathname + '?' + encodeURI(enterKeyURL));
        window.location.hash = window.location.pathname + '?' + encodeURI(enterKeyURL);
    } //if kb2

} //function updateDateEnterKey(inputFieldMin, inputFieldMax) { 


function getCurrentSort() {
var sortBy='';
var retval='';
    $(".re-sorter select option").each(function(ind,v) {
      console.log("IND,V", ind,v);
      
      if($(this).attr("selected")=='selected'){
         console.log("this val", $(this).attr("value")); 
         sortBy=$(this).attr("value").split(":");
         retval=sortBy[1].replace(" ", "%20");
         console.log("split", sortBy[1],retval);
        // $('#app-body').attr('data-sortby', retval);
        
       }//if($(this).attr("selected")=='selected'){    
    }); //$(".re-sorter select").each(function(i,v) {
 return retval;
}//function getCurrentSort() {   


//Launch Modal for Facets except for date range click event
$("body").off("click", "button.uhamore").on("click", "button.uhamore", function(e) {
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", $(e.currentTarget).attr("alt"));
    //var sortBy='';
    var pubYearSingleValues = true;
    //pubYearSingleValues=true;
    var singleYearValues = [];
    var countForSingleYearValues = [];
    var frequency = 0;

  sortBy=getCurrentSort(); //title-sort%20desc  <----- of this form
  console.log("ddddddddddddddddddddddddddddddddsortBy5", sortBy );
  //$("#app-body").data("sortby");
   //   var currentModalFacet = $("#app-body").data("sortby");
 // console.log("getCurrentSort()", $("#app-body").data("sortby") );

    $(this).parent().find(".nav-list a").each(function(index) {

        console.log(index + "2: " + $(this).attr("title"));
        console.log("hg", $(this).parent().next().text()); ////////////// like (2) or (1)
        //var thenum = thestring.replace( /^\D+/g, ''); 
        countForSingleYearValues.push($(this).parent().next().text().replace(/[^0-9]/g, ''));
        console.log("frequency", frequency); ////////////// like (2) or (1)   
        datePortion = $(this).attr("title").split(":");
        console.log("datePortion", datePortion[1].length);
        if (datePortion[1].length <= 6) {
            singleYearValues.push(datePortion[1].trim());
        } else {
            pubYearSingleValues = false;
        } //if(datePortion[1].length <= 6){

    }); //$(this).parent().find(".nav-list a").each(function( index ) {

    //var b= $(this).parent().find(".facet-display-value a").attr("title");
    console.log("b", singleYearValues);

    //var c= $(b).next().text();
    console.log("z", countForSingleYearValues);

    console.log("pubYearSingleValues", pubYearSingleValues);



    if (pubYearSingleValues == true) {
        // code here checks for single year date entries on LHS facets and if all entries are single year dates
        //then use those years from the LHS facet to build a popup/modal and populate the modal with those dates
        //important point here, there is no need to make a network call after a click upon Show More because the facets bar already has those values.
        //Normally Show More clicks trigger an API call to Solr but not this time.
       // search – a string of parameters, starts with the question mark ?
        //hash starts with the hash character #
        let url = new URL(window.location.href);//window.location.href
        console.log(url.origin);        
        console.log(url.pathname);
        console.log(url.search);   
        console.log(url.hash);
        $('#testurl').remove();
        $('#topbar').append('<span id="testurl">' + window.location.href + '</span>');
        $("#mobo").html('');
        $("#main-content").append('<div id="overlay_facets_loading"><div id="facets_loading_text">Loading...</div></div>');

        var thisFacetNorml = 'pubyear'; //$(this).attr('alt');
        console.log("thisFacetNORM", thisFacetNorml);
        var qsForFacets = getQS();
        if (qsForFacets == 'All%20Records') qsForFacets = '*';

        console.log("libweb js file  - SAYS QS forFacets = ", qsForFacets);
        console.log("===============window.location.href=================", window.location.href);

        var forFacets = getUrlParams(window.location.search); // major
        console.log("libweb js file  - SAYS forFacets = ", forFacets);
        var OPACstring22 = buildOPAC_url(forFacets, qsForFacets, thisFacetNorml);
        var OPACstring2 = OPACstring22.replace("op=OR", "q.op=AND");

        if (window.location.href.includes("OR") && OPACstring2.indexOf('q.op=AND') == -1) {
            OPACstring2 += '&q.op=AND';
            console.log("OBAPPENDING THE &q.op=AND ", OPACstring22, OPACstring2);
            console.log("OBAPPENDING Page hostname and the full URL for Solr is: " + window.location.hostname + OPACstring2);
        }

        $("#facets_loading_text").remove();
        $('#mobo').append('<table class="table table-striped facetstbl"><tbody class="facetsbdy"></tbody></table>');


        //console.log("result.facets", result.facets, whichFacet4Modal );      
        for (let i = 0; i < singleYearValues.length; i++) {
            //  text += cars[i] + "<br>";
            displaystr += '<tr class="facetrow"><td class="lim-select">' + '<input class="limControl" type="checkbox" value="' + singleYearValues[i] + '"' + ' name="' + singleYearValues[i] + '">' + '</td>' + '<td class="lim-name"><label class="limCaption" for="modal__doc_type_1004AJ">' + singleYearValues[i] + '</label></td>' + '<td class="lim-count"><span dir="ltr">' + countForSingleYearValues[i] + '<span></td></tr>';

        }

        var exactFacets = singleYearValues.length;
        console.log("828 OBexactFacetsexactFacetsexactFacets", exactFacets);
        $('#mym tbody.facetsbdy').empty();
        $('#mym tbody.facetsbdy').append(displaystr);
        ////console.log("OBvar friendlyFacets=var friendlyFacets=", friendlyFacetsNEW);
        $('#sortcol1').html('');
        $('#sortcol1').html('<img src="https://libweb.hartford.edu/koha/lak6live/images/both.png" alt="Sort Ascending">');
        $('#sortcol2').html('');
        $('#sortcol2').html('<img src="https://libweb.hartford.edu/koha/lak6live/images/down.png" alt="Sort Ascending"></span>');
        $('#mym h4.modal-title').html('Refine your <b><span ' + 'data-part1="' + 'Pub Date' + '" class="thisfacetheader">' + ' selection' + '</span></b>' + ' (' + singleYearValues.length + ' options).');
        // data-user="bob"  /koha/lak6live/images

        var totnumfortextsearch = singleYearValues.length + 1;
        // var theChosenFacet=$(e.currentTarget).attr("alt");
        $('#mym').attr('data-chosenfacet', $(e.currentTarget).attr("alt"));
        $('#mym').attr('data-nrowsreturned', exactFacets);
        $('#mym').attr('data-origquerytotal', totnumfortextsearch);
        $('#mym').attr('data-facet4networkcall', facetLookup[thisFacet]);
        $('#mym h5#facetresults').html('Number of distinct facets returned ( same as rows below ): <b id="usethis">' + exactFacets + '</b><br>This # has to match the number of search results returned: ' + '<b><span class="thesefacetresults">' + totnumfortextsearch + '</span></b>');
        if (exactFacets >= solrMAX) $('#mym h5#facetresults').append("<br>Your current search exceeds " + solrMAX + " results. Please find ways to narrow your search, before using " + thisFacet + " facet search.")
        $('#Checkbox1').prop('checked', false); // Unchecks it
        $('#mym').show();

        $(".facetFriendlyName").text('Pub Date Year');

        //return;
    } //if(pubYearSingleValues==true){

    if (pubYearSingleValues == false) {
        //if($(e.currentTarget).attr("alt")!='pubyear5'){
        //console.log("b4 anything update buton clicked and url to build from = ", window.location.href);  
        $('#testurl').remove();
        $('#topbar').append('<span id="testurl">' + window.location.href + '</span>');

        whichFacetChosenNEW = $(this).attr("alt");
        //str.substring(0, str.indexOf(' ')); // "72"
        var newllbs = $(this).attr("alt");
        var newllbs2 = $(this).attr("alt");
        //console.log("newllbs libweb js file  - SAYS CLICK ON UHAMORE", newllbs); 
        //console.log("newllbs libweb js file2  - SAYS CLICK ON UHAMORE", newllbs2); 
        var newllbs3 = $(this).attr("alt");
        var newllbs4 = $(this).attr("alt");
        //console.log("newllbs libweb js file2  - SAYS CLICK ON UHAMOREnewllbs4", newllbs4); 
        var newllbs5 = $(this).attr("alt"); //newllbs4.replace(/^\s+|\s+$/g, '');
        console.log("704 newllbs5newllbs5", newllbs5);
        $("#mobo").html('');
        $("#main-content").append('<div id="overlay_facets_loading"><div id="facets_loading_text">Loading...</div></div>');

        var thisFacet = newllbs5;
        //if(thisFacet =='Owned')thisFacet='Owned by';
        //if(thisFacet =='Publication')thisFacet='Date';
        console.log("UPDOM", thisFacet);
        var thisFacetNorml = $(this).attr('alt');
        //console.log("thisFacetNORM", thisFacetNorml);
        var qsForFacets = getQS();
        if (qsForFacets == 'All%20Records') qsForFacets = '*';

        //console.log("libweb js file  - SAYS QS forFacets = ", qsForFacets);
        //console.log("===============window.location.href=================", window.location.href );

        var forFacets = getUrlParams(window.location.search); // major
        //console.log("libweb js file  - SAYS forFacets = ", forFacets);
        var OPACstring22 = buildOPAC_url(forFacets, qsForFacets, thisFacetNorml);
        var OPACstring2 = OPACstring22.replace("op=OR", "q.op=AND");

        if (window.location.href.includes("OR") && OPACstring2.indexOf('q.op=AND') == -1) {
            OPACstring2 += '&q.op=AND';
            console.log("OBAPPENDING THE &q.op=AND ", OPACstring22, OPACstring2);
            console.log("OBAPPENDING Page hostname and the full URL for Solr is: " + window.location.hostname + OPACstring2);
        }

        //console.log("OBOPACstring2 =", OPACstring2);
        var solrMAX = 5000;

        a = FuzzySet();
        //console.log("OB a =", a);
        var displaystr = '';
        //debugger;
        //console.log("796 B4 getJSON call OPACstring2", OPACstring2);  


        //https://hartford-sandbox.bibliovation.com/app/search/(new%20york)?sort=score%20desc&owned-by=(%22SRR%22)%20OR%20(%22CAREERSERV%22)&pubyear=(%5B1990%20TO%202000%7DOR%5B2000%20TO%202010%7D)
        $.getJSON(OPACstring2 + encodeURI('&f.pubyear.facet.interval.set=[2022,2022]&f.pubyear.facet.interval.set=[2021,2022)&f.pubyear.facet.interval.set=[2019,2021)&f.pubyear.facet.interval.set=[2016,2019)&f.pubyear.facet.interval.set=[2013,2016)&f.pubyear.facet.interval.set=[2010,2013)&f.pubyear.facet.interval.set=[2000,2010)&f.pubyear.facet.interval.set=[1990,2000)&f.pubyear.facet.interval.set=[1980,1990)&f.pubyear.facet.interval.set=[1970,1980)&f.pubyear.facet.interval.set=[1960,1970)&f.pubyear.facet.interval.set=[1950,1960)&f.pubyear.facet.interval.set=[1940,1950)&f.pubyear.facet.interval.set=[1930,1940)&f.pubyear.facet.interval.set=[1920,1930)&f.pubyear.facet.interval.set=[1910,1920)&f.pubyear.facet.interval.set=[1900,1910)&f.pubyear.facet.interval.set=[1800,1900)&f.pubyear.facet.interval.set=[1700,1800)&f.pubyear.facet.interval.set=[1600,1700)&f.pubyear.facet.interval.set=[1500,1600)&f.pubyear.facet.interval.set=[1400,1500)&f.pubyear.facet.sort=index&facet.field=owned-by&facet.field=collection&facet.field=author-display&facet.field=topic_facet&facet.field=pubyear&facet.field=language&facet.field=geo_facet&facet.interval=pubyear'), function(result) {
            //console.log("$.getJSON 801 result from $.getJSON(OPACstring2)", result);
            // $("#overlay_facets_loading").remove(); // Remove loader info
            $("#facets_loading_text").remove();
            $('#mobo').append('<table class="table table-striped facetstbl"><tbody class="facetsbdy"></tbody></table>');


            console.log("result.facets", result.facets, whichFacet4Modal);
            var foundTheI = 0;
            for (let i = 0; i < result.facets.length; i++) {
                console.log("814 AAAAAAAAAARRRRRRRRRRRRRRRYYYYYYYYYYYYYYYresult.facets", result.facets[i], whichFacet4Modal);
                if (result.facets[i].field == whichFacet4Modal) {
                    console.log("818 IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIresult.facetsfound I ", i, result.facets[i].values);
                    foundTheI = i;
                } //if(result.facets[i].field=='whichFacet4Modal'){
            } //for


            $.each(result.facets[foundTheI].values, function(i, field) {
                //console.log("819 OBi=", i, field);
                displaystr += '<tr class="facetrow"><td class="lim-select">' + '<input class="limControl" type="checkbox" value="' + field.value.replace(/['"]+/g, '') + '"' + ' name="' + field.display_value + '">' + '</td>' + '<td class="lim-name"><label class="limCaption" for="modal__doc_type_1004AJ">' + field.display_value + '</label></td>' + '<td class="lim-count"><span dir="ltr">' + field.count + '<span></td></tr>';
                //console.log("field.display_value", field.display_value);
                if (a.get(field.display_value) !== null) {
                    //console.log("823 OBfuzzy for Credo Reference (Firm) and the term ", field.display_value, " = ", a.get(field.display_value)[0][0], a.get(field.display_value)[0][1]);
                } //if (a.get(field.display_value) !== null) {
            });

            var exactFacets = result.facets[foundTheI].values.length;
            //console.log("828 OBexactFacetsexactFacetsexactFacets", exactFacets);
            $('#mym tbody.facetsbdy').empty();
            $('#mym tbody.facetsbdy').append(displaystr);
            ////console.log("OBvar friendlyFacets=var friendlyFacets=", friendlyFacetsNEW);
            $('#sortcol1').html('');
            $('#sortcol1').html('<img src="https://libweb.hartford.edu/koha/lak6live/images/both.png" alt="Sort Ascending">');
            $('#sortcol2').html('');
            $('#sortcol2').html('<img src="https://libweb.hartford.edu/koha/lak6live/images/down.png" alt="Sort Ascending"></span>');
            $('#mym h4.modal-title').html('Refine your <b><span ' + 'data-part1="' + facetLookup2[whichFacetChosenNEW] + '" class="thisfacetheader">' + ' selection' + '</span></b>' + ' (' + exactFacets + ' options).');
            // data-user="bob"  /koha/lak6live/images

            var totnumfortextsearch = result.total_hits + 1;
            $('#mym').attr('data-chosenfacet', $(e.currentTarget).attr("alt"));            
            $('#mym').attr('data-nrowsreturned', exactFacets);
            $('#mym').attr('data-origquerytotal', totnumfortextsearch);
            $('#mym').attr('data-facet4networkcall', facetLookup[thisFacet]);
            $('#mym h5#facetresults').html('Number of distinct facets returned ( same as rows below ): <b id="usethis">' + exactFacets + '</b><br>This # has to match the number of search results returned: ' + '<b><span class="thesefacetresults">' + totnumfortextsearch + '</span></b>');
            if (exactFacets >= solrMAX) $('#mym h5#facetresults').append("<br>Your current search exceeds " + solrMAX + " results. Please find ways to narrow your search, before using " + thisFacet + " facet search.")
            $('#Checkbox1').prop('checked', false); // Unchecks it
            $('#mym').show();
        }); //$.getJSON(url4JSONfacets, function(result) {

        var friendlyFacets = facetLookup2[whichFacetChosenNEW];
        var whichFacet4Modal = whichFacetChosenNEW;
        //console.log("hg9friendlyFacets =facetLookup[whichFacetChosenNEW]",whichFacetChosenNEW, friendlyFacets);   
        //hg9friendlyFacets =facetLookup[whichFacetChosenNEW] author-display Author 
        $(".facetFriendlyName").text(friendlyFacets);

        //}//if($(e.currentTarget).attr("alt")!='pubyear'){
    } //if(pubYearSingleValues==false){    
}); //$("body").off("click", "button.uhamore").on("click", "button.uhamore", function() {
////////////////////////////////////////////////////////////////////////////////////////////////End of Launch Modal for Facets    
////////////////////End of Launch Modal for Facets 





$("#mym button.update").click(function() {
    var modalOptions = "";
    var selected = [];
    var facetCNT = 0;
    var facetCNTmax = 20;
    var URL4KOHA="";    
    var modalQS="";
    var modalQS2="";
    var currentModalFacet = $("#mym").data("chosenfacet");
    var encoded='';
    var encoded2='';    
//window.location.hostname
    console.log("window.location.hostname", window.location.hostname);
    $('#mobo tbody.facetsbdy td.lim-select input.limControl').each(function(i,v) {
        if ($(this).prop("checked") == true) {
        facetCNT++;
        if ($(this).attr('name').includes("'")) { //if ' in modal as one of the selected choices
        selected.push($(this).attr('name'));
        }else{
        selected.push($(this).val());  
        }// if ($(this).attr('name').includes("'")) { //if ' in modal as one of the selected choices

        } //if( $(this).prop( "checked" ) ){
    }); //$('tbody.facetsbdy td.lim-select input.limControl').each(function() {

        if(selected.length>0 && facetCNT<facetCNTmax){    

            for (let i = 0; i < selected.length; i++) {

             encoded = encodeURIComponent(selected[i]).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");

            if(currentModalFacet != 'pubyear')modalOptions += '%28"' + encoded + '"%29' + ' OR ';
            if(currentModalFacet == 'pubyear')modalOptions += '%28' + encoded + '%29' + ' OR ';
            }//for loop

var tempsub='';

        modalOptions =  modalOptions.substring(0, modalOptions.length - 3).trim();
        modalQS=  '&' + currentModalFacet + '=%28' + modalOptions + '%29';
        //tempsub=

        URL4KOHA = URL4Results()+ modalQS;
        //debugger;
window.location.href = URL4KOHA;


        }else{
            //alert("You have selected more than 20 or none");
            if(selected.length<1)alert("You need to select at least one item, or click Cancel");
            if(facetCNT>facetCNTmax)alert("You cannot select more than 20 items");
        }//if(selected.length>0 && facetCNT<facetCNTmax){ 

});//$("#mym button.update").click(function() {    



//whichFacetChosenNEW
//Launch Modal for Facets and only for date range click event
$("body").on("click", "div.input-group input", function(e) {
    //console.log("922 $(this) date range click div.input-group inputdiv.input-group input",  $(e.currentTarget).attr('ng-model') );    //rangeSlider.userMin
    if ($(e.currentTarget).attr('ng-model') == 'rangeSlider.userMin' && $('div.customrange').length < 1) {
  sortBy=getCurrentSort(); //title-sort%20desc  <----- of this form
  console.log("ddddddddddddddddddddddddddddddddsortBy5", sortBy );
        var qs = getQS();
        console.log("date range click queryParams ", qs); //date range click queryParams  (civil%20war)
        var forFacets = getUrlParams(window.location.search);
        var OPACstring22 = buildOPAC_url(forFacets, qs, 'pubyear');
        console.log("930 FOR DATES AND NEW CODE OPACstring2= ", OPACstring22, sortBy);
        var OPACstring2 = OPACstring22.replace("op=OR", "q.op=AND");


        if (window.location.href.includes("OR") && OPACstring2.indexOf('q.op=AND') == -1) {
            OPACstring2 += '&q.op=AND';
            //console.log("936 APPENDING THE &q.op=AND ", OPACstring22, OPACstring2);
            //console.log("937 APPENDING Page hostname and the full URL for Solr is: " + window.location.hostname + OPACstring2);
        } //if( window.location.href.includes("OR") ){


        //console.log("941 OPACstring2 =", OPACstring2);
        //date range click
        $.getJSON(OPACstring2 + encodeURI('&f.pubyear.facet.interval.set=[2022,2022]&f.pubyear.facet.interval.set=[2021,2022)&f.pubyear.facet.interval.set=[2019,2021)&f.pubyear.facet.interval.set=[2016,2019)&f.pubyear.facet.interval.set=[2013,2016)&f.pubyear.facet.interval.set=[2010,2013)&f.pubyear.facet.interval.set=[2000,2010)&f.pubyear.facet.interval.set=[1990,2000)&f.pubyear.facet.interval.set=[1980,1990)&f.pubyear.facet.interval.set=[1970,1980)&f.pubyear.facet.interval.set=[1960,1970)&f.pubyear.facet.interval.set=[1950,1960)&f.pubyear.facet.interval.set=[1940,1950)&f.pubyear.facet.interval.set=[1930,1940)&f.pubyear.facet.interval.set=[1920,1930)&f.pubyear.facet.interval.set=[1910,1920)&f.pubyear.facet.interval.set=[1900,1910)&f.pubyear.facet.interval.set=[1800,1900)&f.pubyear.facet.interval.set=[1700,1800)&f.pubyear.facet.interval.set=[1600,1700)&f.pubyear.facet.interval.set=[1500,1600)&f.pubyear.facet.interval.set=[1400,1500)&f.pubyear.facet.sort=index&facet.field=owned-by&facet.field=collection&facet.field=author-display&facet.field=topic_facet&facet.field=pubyear&facet.field=language&facet.field=geo_facet&facet.interval=pubyear'), function(result) {
            //console.log("OBdate range click", result);
            var pubyrMIN = 2050;
            var pubyrMAX = 0;
            //console.log("$.getJSON 898 IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIresult.facetsfound I ", result ); 

            var foundTheJ = 0;
            //console.log("950000000000000000000000000000000000000000 AAAAAAAAAARRRRRRRRRRRRRRRYYYYYYYYYYYYYYYresult.facetsfacet4DateClickfacet4DateClick", facet4DateClick ); 
            for (let j = 0; j < result.facets.length; j++) {

                //console.log("968 AAAAAAAAAARRRRRRRRRRRRRRRYYYYYYYYYYYYYYYresult.facets", result.facets[j], facet4DateClick );     

                if (result.facets[j].field == facet4DateClick) {

                    //console.log("972 IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIresult.facetsfound I ", j, result.facets[j].values ); 
                    foundTheJ = j;
                } //if(result.facets[i].field=='whichFacet4Modal'){
            } //for loop    


            //console.log("977 foundTheIfoundTheIfoundTheIfoundTheI ", foundTheJ ); 
            var dateSplitMin = 0;
            var dateSplitMax = 2050;
            var temp1 = 0;
            var temp2 = 0;
            var dateArr = [];

            $.each(result.facets[foundTheJ].values, function(i, field) {
                //console.log("OBi=", i, field);
                //console.log("970 range=", i, field);        

                //console.log("970 field.display_valuefield.display_value", field.display_value);

                dateArr = field.display_value.split('-');
                // Date split of the for [adate1, adate2]
                if (dateArr[0] < dateArr[1]) {
                    dateSplitMin = dateArr[0];
                } else {
                    dateSplitMin = dateArr[1];
                }


                if (dateArr[0] > dateArr[1]) {
                    dateSplitMax = dateArr[0];
                } else {
                    dateSplitMax = dateArr[1];
                }
                // Date split of the for [adate1, adate2]


                if (dateSplitMin > pubyrMAX) pubyrMAX = dateSplitMin;
                if (dateSplitMax < pubyrMIN) pubyrMIN = dateSplitMax;
                //console.log("?????????????????????????????????OBfield.display_value", field.display_value);
            }); //$.each(result.facets[0].values, function(i, field) {

            $("input[ng-model='rangeSlider.userMin']").val(pubyrMIN);
            $("input[ng-model='rangeSlider.userMax']").val(pubyrMAX);

            var minval = $("input[ng-model='rangeSlider.userMin']").val(pubyrMIN);
            var maxval = $("input[ng-model='rangeSlider.userMax']").val(pubyrMAX);
            $("div.customrange").remove();
            $(".pubyearRangeDiv").append('<div class="customrange"><input type="text" class="js-range-slider" name="my_range" value="" /><form class="rowpubyear2"><button type="reset" class="col-sm-3 btn btn-sm pull-right">Clear</button><button type="submit" class="col-sm-3 btn btn-sm pull-right btn-warning">Apply</button></form></div>');

            $(".js-range-slider").ionRangeSlider({
                skin: "big",
                type: "double",
                min: pubyrMIN,
                max: pubyrMAX,
                prettify_enabled: false,
                grid: true,
                onChange: function(data) {
                    // fired on every range slider update
                    //console.log("data", data);
                    //console.log("data", data.from);
                    //console.log("data", data.to);
                    $("input[ng-model='rangeSlider.userMin']").val(data.from);
                    $("input[ng-model='rangeSlider.userMax']").val(data.to);
                }
            }); // $(".js-range-slider").ionRangeSlider({

        }); //$.getJSON(OPACstring2, function(result) {

    } //if($(e.currentTarget).attr('ng-model') =='rangeSlider.userMin')

    if ($(e.currentTarget).attr('ng-model') == 'rangeSlider.userMax' && $('div.customrange').length < 1) {

        var qs = getQS();
        //console.log("date range click queryParams ", qs);
        var forFacets = getUrlParams(window.location.search);
        var OPACstring22 = buildOPAC_url(forFacets, qs, 'pubyear');
        //console.log("FOR DATES AND NEW CODE OPACstring2= ", OPACstring22);
        var OPACstring2 = OPACstring22.replace("op=OR", "q.op=AND");


        if (window.location.href.includes("OR") && OPACstring2.indexOf('q.op=AND') == -1) {
            OPACstring2 += '&q.op=AND';
            //console.log("APPENDING THE &q.op=AND ", OPACstring22, OPACstring2);
            //console.log("APPENDING Page hostname and the full URL for Solr is: " + window.location.hostname + OPACstring2);
        } //if( window.location.href.includes("OR") ){

        //console.log("OPACstring2 =", OPACstring2);
        //date range click
        $.getJSON(OPACstring2, function(result) {
            //console.log("possible reversal APPENDING THE &q.op=AND ", OPACstring22, OPACstring2);
            //console.log("$.getJSON 1003 result ", result);       
            //console.log("OBdate range click", result);
            var pubyrMIN = 2050;
            var pubyrMAX = 0;
            $.each(result.facets[0].values, function(i, field) {
                //console.log("OBi=", i, field);

                if (field.display_value > pubyrMAX) pubyrMAX = field.display_value;
                if (field.display_value < pubyrMIN) pubyrMIN = field.display_value;
                //console.log("field.display_value", field.display_value);
            }); //$.each(result.facets[0].values, function(i, field) {

            $("input[ng-model='rangeSlider.userMin']").val(pubyrMIN);
            $("input[ng-model='rangeSlider.userMax']").val(pubyrMAX);

            var minval = $("input[ng-model='rangeSlider.userMin']").val(pubyrMIN);
            var maxval = $("input[ng-model='rangeSlider.userMax']").val(pubyrMAX);
            $("div.customrange").remove();
            $(".pubyearRangeDiv").append('<div class="customrange"><input type="text" class="js-range-slider" name="my_range" value="" /><form class="rowpubyear2"><button type="reset" class="col-sm-3 btn btn-sm pull-right">Clear</button><button type="submit" class="col-sm-3 btn btn-sm pull-right btn-warning">Apply</button></form></div>');

            $(".js-range-slider").ionRangeSlider({
                skin: "big",
                type: "double",
                min: pubyrMIN,
                max: pubyrMAX,
                prettify_enabled: false,
                grid: true,
                onChange: function(data) {
                    // fired on every range slider update
                    //console.log("data", data);
                    //console.log("data", data.from);
                    //console.log("data", data.to);
                    $("input[ng-model='rangeSlider.userMin']").val(data.from);
                    $("input[ng-model='rangeSlider.userMax']").val(data.to);
                }
            }); // $(".js-range-slider").ionRangeSlider({

        }); //$.getJSON(OPACstring2, function(result) {

    } //if($(e.currentTarget).attr('ng-model') =='rangeSlider.userMax')

}); //$("body").on("click", "div.input-group input", function(e) {
//End Launch Modal for Facets and only for date range click event