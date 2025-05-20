var ourDefaultCDNpath='https://libweb.hartford.edu/';
//var ourDefaultCDNpath='SOMEOTHERCDN';
//https://libweb.hartford.edu/koha/images/details_open.png
//https://libweb.hartford.edu/koha/2024/images/details_open.png
//this is OPC code
console.log('window.KOHA', window.KOHA);
//document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item =>console.log( item.href )  );
console.log("OPC");
console.log("KOHA.extend_config preload by LL Jim says ",KOHA);
//KOHA.extend_config
/*if( $("div.cart").length < 1 ){
console.log("0000000000000000000000000button.uhamore).remove()000000000000000000000000000000000");  
//$("button.uhamore").remove();
$('section.facets >h4').html('<span class="fcustomheading">Filters</span><span class="collfacets">Collapse All</span><span class="expfacets">Expand All</span>');
}//if( $(div.cart).length < 1 ){*/
$( '#allnewsubscriptions').remove();
//console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", window.location.pathname);
if(window.location.pathname.indexOf("/app/work/")<0)$('#allnewdetails-tabs').remove();
//<li class="dropdown doinline open">
$("li.doinline.open").removeClass("open");
$("a#login-link").click(function(){
enhanceLogins();
});
$("#mobo").html('');
/////////////////////////////////////////// FOR ASP PAGE ONLY
//col-sm-9 col-sm-offset-1 search-details-main
//$("div.col-sm-9.search-details-main").addClass("col-sm-10").removeClass("col-sm-9").removeClass("col-sm-offset-1");
$("div.col-sm-9.search-details-main").removeClass("col-sm-offset-1");
//////////////////////////////////////////
//Reset Virtual Shelf on pageChange for now, until it is decided what should be done here
//$('#newbs').remove();
//$('#shelf_row').remove();
//$('img.lvs').remove();
//$('img.rvs').remove();
$('#browse_virtual_shelf').remove();
$('#shelf_row_visibility_buttons').remove();
jQuery.data(document.body, "virtualShelfIsBuilt", false);
jQuery.data(document.body, "virtualShelfIsDisplayed", false);
jQuery.data(document.body, "numAppends", 0);
jQuery.data(document.body, "numPrepends", 0);
//Reset Virtual Shelf on pageChange for now, until it is decided what should be done here and above
//$('#shelf_row_visibility_buttons').remove();


$.getJSON( '/api/allconfig?callback=?',
function( global_koha_api_config ) {
console.log("OPC");
console.log("inside OPC and what is the path?", window.location.pathname  );


var myVar99=0;
//var myTimer99=0;


function myTimer99() {
if(!$("body").hasClass("srploaded") ){
console.log("OPCOPC looks like pagination control is not ready yet - search results still loading");
}else{
window.clearInterval(myVar99);
//window.clearInterval(myTimer99);
console.log("OPCOPCwindow.clearInterval(myVar99) CLEAR TIMER");
console.log("OPCOPCPagination-bottom can now be cloned up top");
console.log("OPCOPCSEEMS LIKE ALL FACETS ON LHS ARE FULLY LOADED");
console.log("OPCOPCSEEMS LIKE ALL FACETS ON LHS ARE FULLY LOADED and the QS = ", window.location.search);
if(  window.location.search.indexOf("fq=acqdate:%5BNOW-730DAYS%20TO%20*%5D")>=0)$("div.twoyear").append('<span class="custom-facet-remove"><i class="glyphicon glyphicon-remove"></i></span>');
if(  window.location.search.indexOf("fq=acqdate:%5BNOW-365DAYS%20TO%20*%5D")>=0)$("div.oneyear").append('<span class="custom-facet-remove"><i class="glyphicon glyphicon-remove"></i></span>');
console.log("OPCOPC = ul.pagination",  $("ul.pagination") , $("ul.pagination li").length );
}//if
}//function myTimer99() {


if(  window.location.pathname.indexOf("/app/search/")>=0 && $("div.cart").length <1 ) {

$("div.results-list-facets").attr('id', 'facets'); ///  col-md-2 hidden-xs hidden-sm
console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqinside OPC and on SRP ", window.location.pathname  );
myVar99 = setInterval(myTimer99, 20);


setTimeout(function(){
window.clearInterval(myVar99);
$('div.textwrap').highlight(  $('.solr-query').text().replace(/[()]/g,"")  );
console.log("OPC 'PASTE IN AREA' , had to force  CLEAR TIMER AFTER 4 SECONDS:" , $(".alert-info").text());
if( $('#search-results-list-holder ul.pagination').length == 0 )$('ul.pagination').clone(true,true).prependTo( "#search-results-list-holder" );
if( $(".alert-info").text() ==='No results found!' && $("#facets").text().length < 120){
//  alert("No results found!");
}
}, 4000);

}//if(  window.location.pathname.indexOf("/app/search/")>=0   ){


console.log("OPC says 2019 global_koha_api_config object here", global_koha_api_config);
//var data_str = encodeURIComponent(JSON.stringify(global_koha_api_config));
//$('body').attr("data-globalapi",data_str);
$("body").removeClass("srploaded");
//<!-- Masthead Search Replacement Begin -->
//$("#rwd-search-form").appendTo(".mastsearch-cnt");
//<!-- Masthead Search Replacement End -->
//Add WorldCat and New Titles to <nav> begin
if($( "ul.navbar-nav li.worldcatlink" ).length <=1){//if the .append method below worked in the OAL then no need for if statement
$("ul.navbar-nav").append( '<li class="worldcatlink"><a class="worldcat2" href="https://hartford.idm.oclc.org/login?url=http://firstsearch.oclc.org/fsip?dbname=worldcat&amp;done=referer">WorldCat</a></li>' );
}
if($( "ul.navbar-nav li.doinline" ).length <=1){
$("ul.navbar-nav").append( '<li class="dropdown doinline"><a class="dropdown-toggle" data-toggle="dropdown" href="#">New Titles<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="/app/search/*:*?fq=catdate:%5BNOW-30DAYS%20TO%20*%5D&amp;sort=catdate%20desc">Added in the last 30 days</a></li><li><a href="https://www.hartford.edu/academics/library/find-materials/new-titles.aspx">By subject</a></li></ul></li>');
}
//Add WorldCat and New Titles to <nav> end
//Code below for bad paths. URL's that patron should avoid
//https://hartford.waldo.kohalibrary.com/app/search/twist?suppress=1
console.log("window.location.search",window.location.search);
if(window.location.search.indexOf("suppress=1")>=0)window.location.href='/';
//Search course reserves by name, department, course number, term, notes or instructor name:
// Code below is to prevent Course Reserves Popup and place that data inline with the rest of Course Reserves page.
//So as a patron clicks on each main link to reveal the courses required, those courses are revealed below the main link.
//BEGIN IF COURSE RESERVES PAGE
if (window.location.pathname === '/app/course-reserves') { //COURSE RESERVES PAGE
$("#mobo").html('');
$("#main-content").css("opacity", 0.3);
$('.col-sm-8.col-sm-offset-2').removeClass('col-sm-8').removeClass('col-sm-offset-2').addClass('container-fluid');
$('.col-xs-12.col-sm-6').removeClass('col-xs-12').removeClass('col-sm-6').addClass('crmargin');
$('div.loading').remove();
$('#overlay5').remove();
//var ourDefaultCDNpath='https://libweb.hartford.edu/';  
//' <img src="' + ourDefaultCDNpath + 'koha/2024/images/dvd.png"    
//https://libweb.hartford.edu/koha/images/details_open.png
//https://libweb.hartford.edu/koha/2024/images/details_open.png
//<img src="https://libweb.hartford.edu/koha/images/loader5.gif"
// $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>')
//<img src="https://libweb.hartford.edu/koha/images/   <img src="' https://libweb.hartford.edu/koha/images/      
$('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>').insertBefore("#main-content");
//      $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>')      
function displayCR(crTable) {
console.log("crTablecrTablecrTablecrTablecrTablecrTable",crTable);
var newCourseReservesTbl = '';
var newCourseReservesRows = '';
var resBuilder = [];
var hasItems = false;
newCourseReservesTbl = '<div class="cr_container"><table id="crTable" class="table table-striped tablesorter tablesorter-blue new_tbl"><caption>Columns are sortable. Click' + '<img src="' + ourDefaultCDNpath + 'koha/2024/images/details_open.png" alt="" style="width:20px;height:20px;border:0"> to view titles.</caption>';
newCourseReservesTbl += '<thead><tr><th width="5%">+/-</th><th width="25%">Course Name</th width="5%"><th>Department</th>';
newCourseReservesTbl += '<th width="10%">Course Number</th><th width="5%">Term</th><th width="35%">Instructor(s)</th><th width="5%">Items</th><th width="10%">Notes</th></tr></thead><tbody>';
for (i = 0; i < crTable.courses.length; i++) { //for54
if (crTable.courses[i].course_status === "enabled") { //if enabled
resBuilder = [];
for (j = 0; j < crTable.courses[i].reserves.length; j++) { //for1   inner loop
if(crTable.courses[i].reserves.length <1 )console.log("crTable.courses[i].reserves.length",i,crTable.courses[i].reserves.length);
resBuilder.push(crTable.courses[i].reserves[j].itemnumber);
hasItems = true;
} //for1
if (hasItems) {
var opacTerm1 = 'global_koha_api_config.' + 'authvals' + '.TERM[\"' + crTable.courses[i].term + '\"]';
//console.log("opacTerm1opacTerm1opacTerm1opacTerm1",i,opacTerm1);
var opacTerm2 = eval(opacTerm1);
//console.log("opacTerm1opacTerm1opacTerm1opacTerm2",i, opacTerm2);
if(opacTerm2){
var finalTerm= opacTerm2.opac;
}else{
var opacTerm1 = 'global_koha_api_config.' + 'authvals' + '.TERM[\"' + 'NA' + '\"]';
//var finalTerm= 'Term does not exist ' + crTable.courses[i].term;
var opacTerm2 = eval(opacTerm1);
var finalTerm= opacTerm2.opac;
}
// console.log(opacTerm2);
var friendly_dept_name= 'global_koha_api_config.authvals.' + 'DEPARTMENT[\"' + crTable.courses[i].department + '\"]' + '.opac';
var friendly_dept_name2=eval(friendly_dept_name);
//console.log(eval(friendly_dept_name));
newCourseReservesRows += '<tr class="course"' + ' id=row' + crTable.courses[i].course_id + ' data-itemnumber="' + resBuilder + '" alt="' + crTable.courses[i].course_name + '">' + '<td><a class="plusminus" href="#" id="zid' + crTable.courses[i].course_id + '"><img src="' + ourDefaultCDNpath + 'koha/2024/images/details_open.png" alt="" style="width:20px;height:20px;border:0"></a></td>' + '<td>' + '<span id="cid' + crTable.courses[i].course_id + '" class="click_this_course"' + ' data-itemnumber="' + resBuilder + '">' + crTable.courses[i].course_name + '</span></td>' +
'<td>' + friendly_dept_name2 + '</td>' + '<td>' + crTable.courses[i].course_number + '</td>' +
'<td>' + finalTerm + '</td>' + '<td>' +
instrs_array(crTable.courses[i].instructors) + '</td>' + '<td>' +
crTable.courses[i].reserves.length + '</td>' + '<td>' + crTable.courses[i].public_note + '</td>' + '</tr>';
//course_name
} else {
newCourseReservesRows += '<tr class="course"' + ' id=row' + crTable.courses[i].course_id + ' data-itemnumber="-1" alt="' + crTable.courses[i].course_name + '">' + '<td><a class="plusminus" href="#" id="zid' + crTable.courses[i].course_id + '"><img src="' + ourDefaultCDNpath + 'koha/2024/images/details_open.png" alt="" style="width:20px;height:20px;border:0"></a></td>' + '<td>' + '<span href="#" id="cid' + crTable.courses[i].course_id + '" class="click_this_course"' + ' data-itemnumber="-1">' + crTable.courses[i].course_name + '</span></td>' + '<td>' + friendly_dept_name2 + '</td>' + '<td>' + crTable.courses[i].course_number + '</td>' +  '<td>' + crTable.courses[i].term + '</td>' + '<td>' + instrs_array(crTable.courses[i].instructors) + '</td>' + '<td>' + crTable.courses[i].reserves.length + '</td>' + '<td>' + crTable.courses[i].public_note + '</td>' + '</tr>';
}
hasItems = false;
} //end if enabled
} //end for54
newCourseReservesTbl += newCourseReservesRows + '</tbody>' + '</table></div>';
$("table.table").replaceWith(newCourseReservesTbl); //WHEN READY UNCOMMENT THIS LINE
// console.log(eval(friendly_dept_name));
// console.log("-----------------------------------------------------------------------------------------------");
$('#overlay5').fadeOut();
$("#main-content").css("opacity", 1.0);
} //function displayCR("pageReady?")


function removeLastExp(str) {
return str.replace(/|(\s+)?$/, '');
}
//data2.marc.fields
function get245(data) {
var title245abc = '';
var justsubs = '';
var a = '';
var b = '';
var c = '';
//console.log("len of total marc fields", data.length);
for (i = 0; i < data.length; i++) {
if (data[i] == "245") {
//console.log("found 245");
// title245abc= data[i+1].subfields
justsubs = data[i + 1].subfields;
for (j = 0; j < justsubs.length; j++) {
if (justsubs[j] == "a") {
a = justsubs[j + 1];
}
if (justsubs[j] == "b") {
b = justsubs[j + 1];
}
if (justsubs[j] == "c") {
c = justsubs[j + 1];
}
} //j loop
// console.log("justsubs", justsubs);
break;
} // if data[i]
} // for i loop
title245abc = ' ' + a + ' ' + ' ' + b + ' ' + c;
//console.log("title245abc", title245abc);
return title245abc;
} //function get245(){
function get100(data) {
var author100a = '';
var justsubs = '';
var a = '';
for (i = 0; i < data.length; i++) {
if (data[i] == "100") {
console.log("found 100");
// title245abc= data[i+1].subfields
justsubs = data[i + 1].subfields;
for (j = 0; j < justsubs.length; j++) {
if (justsubs[j] == "a") {
a = justsubs[j + 1];
}
} //j loop
console.log("author a only", justsubs);
break;
} // if data[i]
} // for i loop
author100a = ' ' + a + ' ';
console.log("author100a", author100a);
//return author100a.replace(/,(?=[^,]*$)/, '');
return author100a;
} //function get100(){
function findIndexByKey(arraytosearch, key, valuetosearch) {
for (var i = 0; i < arraytosearch.length; i++) {
if (arraytosearch[i][key] == valuetosearch) {
return i;
}
}
return null;
}
var crFormats = {
BKS: /[at]{1}[acdm]{1}/, // LOC BK
COM: /[m]{1}[abcdmsi]{1}/, // LOC CF
MAP: /[ef]{1}[abcdmsi]{1}/, // LOC MP
MIX: /[p]{1}[cdi]{1}/, // LOC MX
REC: /[ij]{1}[abcdmsi]{1}/, // LOC MU
SCO: /[cd]{1}[abcdmsi]{1}/, // LOC MU (Score separate from SoundRec for OCLC)
SER: /[a]{1}[bsi]{1}/, // LOC CNR (Continuing Resource)
VIS: /[gkro]{1}[abcdmsi]{1}/ // LOC VM
};
function getCRFormat(ldrStr) {
var test_ldr = ldrStr.substr(6, 2);
for (var t in crFormats) {
if (crFormats[t].test(test_ldr)) return t;
}
return null;
}
function getInstructorsSelect(data) {
console.log("getInstructorsSelect", data);
//console.log("getInstructorsSelect.len", data.length);
var htmlFrag = '';
var opts = '';
if (data.length > 1) {
for (i = 0; i < data.length; i++) {
opts += '<option value="ins1">' + data[i].callnum + '</option>';
} //loop
htmlFrag = '<select name="instructors">' + opts + '</select>';
} else {
//htmlFrag =  data[0].callnum + '(' + data[0].count  + ')';
htmlFrag = data[0].callnum;
}
return htmlFrag;
} //function getInstructorsSelect(data) {
function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
function instrs_array(arr) {
var instr_text4_td = '';
var arr_len = 0;
arr_len = arr.length;
for (j = 0; j < arr.length; j++) {
//instr_text4_td+= '<span class="inst_list">'+'<span class="boldit">'+arr[j].surname+'</span>'+ ' '+ arr[j].firstname +', ' + '</span>';
instr_text4_td += '<span class="inst_list">' + arr[j].firstname + ' ' + arr[j].surname + '</span>';
//console.log("insrtinstr=length", arr, arr.length);
}
return instr_text4_td;
} //end function instrs_array(arr)
function wait4PageReady() {
var crTable = angular.element('table').scope().courseSvc;
console.log( "ANG", angular.element('table').scope() );
console.log( "crTbl",  crTable);
if (angular.element('table').scope().courseSvc.loading === false) {
clearInterval(myVar);
$("div.loading-indicator.well").remove();
console.log("the DOM is fully loaded for CR page  you can use the DOM now and the CR table right here", crTable);
//ALL COURSE RESVERES CODE GOES BELOW THIS LINE
///////////////////////////////////////////////
$('.search-query').parent().remove();
$("div#filter-block").remove();
$('<div id="filter-block"><span class="crfilter">Filter courses: </span> <input type="text" id="filterquery" placeholder="Search for anything.." title="Type a query">\
<button type="button" id="cqf" class="btn btn-default">Clear</button><span id="cc"></span></div>').insertAfter('h1');
//$('<p>Click a header to sort the table by that column, and click a course title to view items on reserve.</p>').insertAfter('#filter-block');
displayCR(crTable);
//trclick test only duped of clickthiscourse below
$(".course").click(function(event) { //click fncDG 444
var ptr4ReserveArr = $(this).attr('id').substring(3);
// console.log("THE numeric portion of the ID OF THE TR CLICKED IS", ptr4ReserveArr);
var actualTRid = 'row' + ptr4ReserveArr;
var spawnedTRid = 'sub_branch' + ptr4ReserveArr;
// console.log("THE actual ID of the TR is ", actualTRid);
// console.log("AND THE SUBRANCH ID OF SPAWNED IS", spawnedTRid);

if ($(this).css("opacity") == 1) {
//console.log("aaaaaaaaaaaaaaaaaaaaaaaa", $(this).text());
//console.log("aaaaaaaaaaaaaaaaaaaaaaaa22", $(this).css("opacity"));
if ($(this).hasClass("iconexpanded")) {
//console.log("ICON CLICK MAINLY", $( this ) );
$(this).removeClass("iconexpanded");


//var ourDefaultCDNpath='https://libweb.hartford.edu/';  
//' <img src="' + ourDefaultCDNpath + 'koha/2024/images/dvd.png"    
//https://libweb.hartford.edu/koha/images/details_open.png
//https://libweb.hartford.edu/koha/2024/images/details_open.png
//<img src="https://libweb.hartford.edu/koha/images/loader5.gif"
//"https://libweb.hartford.edu/koha/images/details_open.png"
// 
//  $(this).children(":first").removeClass("minsign").children(":first").children(":first").attr("src", ourDefaultCDNpath + "koha/2024/images/details_open.png");
// $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>')
//     $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>').insertBefore("#main-content");
//      $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>')  


$(this).children(":first").removeClass("minsign").children(":first").children(":first").attr("src", ourDefaultCDNpath + "koha/2024/images/details_open.png");
// $(this).children(":first").removeClass("minsign").children(":first").children(":first").attr("src", "https://libweb.hartford.edu/koha/images/details_open.png");
$(this).next().remove();
//$( 'tr.course' ).removeAttr('opacity');
$('tr.course').fadeIn("slow", function() {
$('tr.course').css("opacity", "");
});
return;
}
if (this.getAttribute('data-itemnumber') === "-1") {
var tr_pointer = $(this);
$('<tr id="neg1"><td colspan="8"><span class="no_items4course">' + $(this).attr("alt") + ' - no additional items.</span></td></tr>').insertAfter(tr_pointer);
$("tr#neg1").hide();
$("tr#neg1").fadeIn(3000, function() {
$("tr#neg1").fadeOut(3000, function() {
// Animation complete.
$("tr#neg1").remove();
});
}); //$( "tr#neg1" ).fadeIn( 3000, function() {
return;
}
var dropdowntbl_ID2 = 'sub_branch_table_container' + $(this).attr('id').substring(3);
var subrowID = 'sub_branch' + $(this).attr('id').substring(3);
//console.log("dropdowntbl_ID2", dropdowntbl_ID2 );
var tr_pointer = $(this);
if (!tr_pointer.hasClass("iconexpanded")) { //hasClass test
tr_pointer.addClass("iconexpanded");

//var ourDefaultCDNpath='https://libweb.hartford.edu/';  
//' <img src="' + ourDefaultCDNpath + 'koha/2024/images/dvd.png"    
//https://libweb.hartford.edu/koha/images/details_open.png
//https://libweb.hartford.edu/koha/2024/images/details_open.png
//<img src="https://libweb.hartford.edu/koha/images/loader5.gif"
//"https://libweb.hartford.edu/koha/images/details_open.png"
// 
//  $(this).children(":first").removeClass("minsign").children(":first").children(":first").attr("src", ourDefaultCDNpath + "koha/2024/images/details_open.png");
// $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>')
//     $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>').insertBefore("#main-content");
//      $('<div id="overlay5">' + ' <img src="' + ourDefaultCDNpath + 'koha/2024/images/' +'loader5.gif" alt="Loading" /><br/>Loading...</div>')  



var value99 = $(this).children('td:first').append('<img id="tinyloader" src="' + ourDefaultCDNpath + 'koha/2024/images/ajax-loader.gif" alt="Loader" height="16" width="16">');
// console.log("9999999999", value99);
tr_pointer.children(":first").addClass("minsign").children(":first").children(":first").attr("src", ourDefaultCDNpath + "koha/images/details_close.png");
$('<tr id="' + subrowID + '" class="items_tbl_added addhidden"><td id="' + dropdowntbl_ID2 + '" colspan="8" class="subTbl"></td></tr>').insertAfter(tr_pointer);
event.preventDefault();
var items4Ajax = this.getAttribute('data-itemnumber'); //string.split(separator,limit)
var reqURLs = items4Ajax.split(",");
//console.log("reqURLs", reqURLs);
//http://waldo.sandbox.kohalibrary.com/api/item/
var finaltableID = 'final' + $(this).attr('id').substring(3);
$('#' + dropdowntbl_ID2).append('<table width="100%" class="table table-bordered table-striped table-hover innertable" id="' + finaltableID + '"></table>');
$("div#titlesLoading").addClass('show');
var subBranchHeading = '<tbody><tr class="boldit"><td width="30%" class="col0 sorterDefault">Title</td>' + '<td class="col1 sorterDefault" width="10%">Author</td><td class="col2 sorterDefault" width="14%">Call Number</td><td width="8%" class="col3 sorterDefault">Format type</td>' +'<td class="col4 sorterDefault" width="8%">Library</td><td class="col5 sorterDefault" width="30%">Notes</td></tr></tbody>';
var scrollTop2 = ' <img class="subbranchscroller" src="' + ourDefaultCDNpath + 'koha/2024/images/uparrow32x32.png" alt="Scroll" height="20" width="20">';
var helpRow4Subs = '<tr class="NoSort boldit"><td width="30%" class="noSort">Title</td>' + '<td class="noSort" width="10%">Author</td><td class="noSort" width="14%">Call Number</td><td width="8%" class="noSort">Format type</td>' + '<td class="noSort" width="8%">Library</td><td class="noSort" width="30%">Notes' + scrollTop2 + '</td></tr>';
var cnt = 0;
for (i = 0; i < reqURLs.length; i++) {
$.getJSON('/api/item/' + reqURLs[i], function(data) {
$.getJSON('/api/work/' + data.biblionumber, function(data2) {
if ((cnt++) % 15 == 0) {
if (cnt <= 1) $('#' + finaltableID).append(subBranchHeading);//for sub branch only
if (cnt > 1) $('#' + finaltableID).append(helpRow4Subs);//for sub branch only
} //if( (cnt++) % 20 ==0){
if (cnt == 1) $("img#tinyloader").remove();
var mainBranch_ptr = findIndexByKey(crTable.courses, "course_id", ptr4ReserveArr);
var mainBranch_ptr2 = findIndexByKey(crTable.courses[mainBranch_ptr].reserves, "itemnumber", data.id);
var foundElements = crTable.courses[mainBranch_ptr].reserves[mainBranch_ptr2];
var PublicNote = crTable.courses[mainBranch_ptr].reserves[mainBranch_ptr2].public_note;
if (typeof data.enumchron === 'undefined' || data.enumchron === null) {
// variable is undefined or null
var volInfo = '';
} else {
var volInfo = data.enumchron;
}
if (typeof data.itemcallnumber === 'undefined' || data.itemcallnumber === null) {
// variable is undefined or null
var itemCN = '';
} else {
var itemCN = data.itemcallnumber;
}
//   console.log("data2.title -------- maybe search main branch with this", data2.title); //for mainBranch_ptr( an integer ) this will yield for example 282 which is the array element # of the crTable array
$('#' + finaltableID).append('<tr class="subrow"><td width="30%">' + '<a href="/app/work/' + data2.id + '" target="_blank">' + get245(data2.marc.fields) + '</a>' +'</td>' + '<td width="10%">' + get100(data2.marc.fields) + '</td>' + '<td width="14%">' + itemCN + ' ' + volInfo + '</td>' + '<td width="6%">' + data.ccode +'</td>' + '<td width="10%">' + data.holdingbranch +'</td>' +  '<td width="30%">' + PublicNote + '</td>' + '</tr>');
$("div#titlesLoading").removeClass('show');
$('#' + subrowID).removeClass('addhidden');
}).fail(function(jqXHR, textStatus, errorThrown ) {
console.log("missing items");
}); // $.getJSON('/api/work/' + data.biblionumber, function(data2) {
}); //   $.getJSON('/api/item/'+reqURLs[i], function(data) {
} //floop
$(window).scrollTop($('#row' + $(this).attr('id').substring(3)).offset().top - 150);
$('tr.course').not(".iconexpanded").fadeTo("slow", 0.15);
} //hasClass test
} //if 1==1
// $('tr#loadingrow').remove();//??????????????????????????????????????????????????????????????????
}); //$( ".course" ).click(function(event) {  //click fncDG 444
function sortTable(colnum,dir){
var scrollTop2 = ' <img class="subbranchscroller" src="' + ourDefaultCDNpath + 'koha/2024/images/uparrow32x32.png" alt="Scroll" height="20" width="20">';
var helpRow4Subs = '<tr class="NoSort boldit"><td width="30%" class="noSort">Title</td>' +'<td class="noSort" width="10%">Author</td><td class="noSort" width="14%">Call Number</td><td width="8%" class="noSort">Format type</td>' +'<td class="noSort" width="8%">Library</td><td class="noSort" width="30%">Notes' + scrollTop2 + '</td></tr>';
var rows = $('table.innertable tbody tr.subrow').get();
rows.sort(function(a, b) {
var A = $(a).children('td').eq(colnum).text().toUpperCase();
var B = $(b).children('td').eq(colnum).text().toUpperCase();
if(dir==='asc'){
//.tablesorter-headerAsc
if(A < B) {
return -1;
}
if(A > B) {
return 1;
}
}
if(dir==='desc'){
//.tablesorter-headerAsc

if(A > B) {
return -1;
}
if(A < B) {
return 1;
}
}
return 0;
});
$.each(rows, function(index, row) {
console.log("$.each(rows",index, row);
if( (index % 15 == 0)  &&  index > 0 ) {
$('.innertable').children('tbody').append(helpRow4Subs);
}
$('.innertable').children('tbody').append(row);
});

}//function sortTable(colnum,dir){
function resetOthersDefault(currCol){// of the form col0,col1,col2, etc
$('.innertable tr.boldit td').each(function(i,val) {//all of these col0,col1,col2, etc
console.log("CLICKED ON A COL",i,val);
if(  $(this).attr('class').indexOf(currCol) === -1 ){
var resetTD= '.' +  $(this).attr('class').substr(0, 4); // of the form col0,col1,col2,etc
$('td' + resetTD).removeClass('sorterDesc').removeClass('sorterAsc').addClass('sorterDefault');
}
});
}//function resetOthersDefault(currCol)  innertable
function removeHelperRows(){// of the form col0,col1,col2, etc
$('.innertable tr').each(function(i,val) {//all of these col0,col1,col2, etc

if(  $(this).hasClass('NoSort') ){
console.log("removeHelperRows",$(this),i,val);
$(this).remove();

}
});
}//function resetOthersDefault(currCol)
$("body").on("click", "td.col0, td.col1, td.col2, td.col3, td.col4, td.col5", function(event) {
// console.log("CLICKED ON A COL");
var whichClass2 = $(event.target).attr('class').substr(0, 4); // of the form col0,col1,col2
var whichTD = '.' + whichClass2; // of the form .col0,.col1,.col2
var whichCol = parseInt($(event.target).attr('class').substr(3, 1)); //of the form 0,1,2
removeHelperRows();
if ($(this).hasClass('sorterDefault')) { //sorter-headerAsc
sortTable(whichCol, 'asc');
$(whichTD).removeClass('sorterDefault').addClass('sorterAsc');
resetOthersDefault(whichClass2);
} else if ($(this).hasClass('sorterAsc')) {
sortTable(whichCol, 'desc');
$(whichTD).removeClass('sorterAsc').addClass('sorterDesc');
resetOthersDefault(whichClass2);
} else if ($(this).hasClass('sorterDesc')) {
sortTable(whichCol, 'asc');
$(whichTD).removeClass('sorterDesc').addClass('sorterAsc');
resetOthersDefault(whichClass2);
}
}); //$("body").on("click", "td.col0, td.col1, td.col2, td.col3, td.col4, td.col5", function(event) {
$(window).on('mousewheel', function(event) {
var distance_to_top = $('#main-content').offset().top;
var openSubs = check4openSub();
//////  console.log('value of opensub',openSub);
if (openSubs > -1) {
if (event.originalEvent.wheelDelta >= 0) {
console.log('Scroll up');
//    console.log('value of opensub',openSubs);
if (($('#row' + openSubs).offset().top - $(window).scrollTop()) > 70) {
//   var confirm = confirm2ShowHiddenRows();
// if (confirm) closeSubBranch();
}
}else{
console.log('Scroll down');
if (($('#row' + openSubs).offset().top + $('#sub_branch' + openSubs).height() - $(window).scrollTop()) < 120) {
///alert("close CR");//closeSubBranch();
//  var confirm = confirm2ShowHiddenRows();
// if (confirm) closeSubBranch();
}
}
} //if(openSubs > -1){
}); //$(window).on('mousewheel', function(event) {
function confirm2ShowHiddenRows() {
var r = confirm("Display hidden Course Reserves?");
return r;
}
function check4openSub() {
var subBranchID = -1;
$("tr.course").each(function(index, value) {
var mainBrnchID = $(value).attr('id');
var justTheID = $(this).attr('id').substring(3);
var sub_branchID = 'sub_branch' + justTheID;
if ($(value).hasClass('iconexpanded')) {
subBranchID = $(this).attr('id').substring(3);
}
});
return subBranchID;
} //function check4openSubs(){
function closeSubBranch() {
$("tr.course").each(function(index, value) {
$(this).css({ opacity: 1 })
if ($(this).hasClass("iconexpanded")) {
$(this).removeClass("iconexpanded");
//var scrollTop2 = ' <img class="subbranchscroller" src="' + ourDefaultCDNpath + 'koha/2024/images/uparrow32x32.png" alt="Scroll" height="20" width="20">';
$(this).children(":first").removeClass("minsign").children(":first").children(":first").attr("src", ourDefaultCDNpath + "/koha/2024/images/details_open.png");
$(this).next().remove();
$(this).fadeIn("fast");
} //if ($(this).hasClass("iconexpanded")) {
});
} //end of function closeSubranches(){
$('#crTable').tablesorter({
widthFixed: true,
headers: { 0: { sorter: false } },
showProcessing: true,
headerTemplate: '{content} {icon}', // Add icon for various themes
widgets: ['stickyHeaders'],
widgetOptions: {
// extra class name added to the sticky header row
stickyHeaders: '',
// number or jquery selector targeting the position:fixed element
stickyHeaders_offset: 0,
// added to table ID, if it exists
stickyHeaders_cloneId: '-sticky',
// trigger "resize" event on headers
stickyHeaders_addResizeEvent: true,
// if false and a caption exist, it won't be included in the sticky header
stickyHeaders_includeCaption: true,
// The zIndex of the stickyHeaders, allows the user to adjust this to their needs
stickyHeaders_zIndex: 2,
// jQuery selector or object to attach sticky header to
stickyHeaders_attachTo: null,
// jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
stickyHeaders_xScroll: null,
// jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
stickyHeaders_yScroll: null,
// scroll table top into view after filtering
stickyHeaders_filteredToTop: true
// *** REMOVED jQuery UI theme due to adding an accordion on this demo page ***
// adding zebra striping, using content and default styles - the ui css removes the background from default
// even and odd class names included for this demo to allow switching themes
// , zebra   : ["ui-widget-content even", "ui-state-default odd"]
// use uitheme widget to apply defauly jquery ui (jui) class names
// see the uitheme demo for more details on how to change the class names
// , uitheme : 'jui'
}
});
$("#crTable").bind("sortStart", function() {
closeSubBranch(); // Removes the sub Branch and resets the TR that spawned it back to a "+" icon
// $("#overlay").show();
console.log("SORT BEGIN");
}).bind("sortEnd", function() {
// $("#overlay").hide();
console.log("SORT DONE");
});
$("th.header").on("click", function() {
//class="items_tbl_added"
$("tr.items_tbl_added").remove();
//var scrollTop2 = ' <img class="subbranchscroller" src="' + ourDefaultCDNpath + 'koha/2024/images/uparrow32x32.png" alt="Scroll" height="20" width="20">';
$("td.minsign > a  img").attr("src", ourDefaultCDNpath + "koha/2024/images/details_open.png");
$("td.minsign").removeClass("minsign");
$("tr.expanded").removeClass("expanded");
$("tr.iconexpanded").removeClass("iconexpanded");
}); //$( "th.header" ).on( "click", function() {
//subbranchscroller
$("body").on("click", "img.subbranchscroller", function(event) {
console.log("clicked subscroller");
///$(window).scrollTop($('.iconexpanded').offset().top);
var currCR = (($('.iconexpanded').offset().top) - 50) + 'px';
$("html, body").animate({ scrollTop: currCR }, "slow");
//$(window).animate({ scrollTop: $('.iconexpanded').offset().top}, 3000);
//$("html, body").animate({ scrollTop: "300px" });
});
$("body").on("click", "#cqf", function(event) {
console.log("clicked CLEAR BUTTON");
$('input#filterquery').val('');
closeSubBranch();
var cnt=0;
$("tr.course").each(function(index, value) {
$(this).removeClass("hidden");
cnt++;
});
$('span#cc').html('');
//var diff = crlen - cnt;
$('span#cc').append('Currently displaying ' + cnt + ' of ' + cnt + ' Course Reserves.');
});
$("body").on("keyup", "input#filterquery", function(event) {
event.preventDefault();
var cnt = 0;
var table, tr, td1, td2, i; // filter on 1,2 only
var filter = $(this)[0].value.toUpperCase();
table = document.getElementById("crTable");
//console.log("THISTHIS", $(this)[0].value);
console.log("current filter str=", filter);
console.log("current filter len trs=", $("tr.course").length);
var crlen = $("tr.course").length;
$("tr.course").each(function(index, value) {
$(this).css({ opacity: 1 })
if ($(this).hasClass("iconexpanded")) {
$(this).removeClass("iconexpanded");
//var scrollTop2 = ' <img class="subbranchscroller" src="' + ourDefaultCDNpath + 'koha/2024/images/uparrow32x32.png" alt="Scroll" height="20" width="20">';
$(this).children(":first").removeClass("minsign").children(":first").children(":first").attr("src", ourDefaultCDNpath + "koha/2024/images/details_open.png");
$(this).next().remove();
$(this).fadeIn("fast");
}
var td1 = $(this).find('td:eq(1)').find("span").text();
var td2 = $(this).find('td:eq(2)').text();
var td3 = $(this).find('td:eq(3)').text();
var td4 = $(this).find('td:eq(4)').text();
var td5 = $(this).find('td:eq(5)').text();
var td7 = $(this).find('td:eq(7)').text();
if (td1 || td2 || td3 || td4 || td5 || td7) {
if (td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1 || td3.toUpperCase().indexOf(filter) > -1 || td4.toUpperCase().indexOf(filter) > -1 ||td5.toUpperCase().indexOf(filter) > -1 || td7.toUpperCase().indexOf(filter) > -1) {
$(this).removeClass("hidden");
} else {
$(this).addClass("hidden");
cnt++;
}
} //if (td1 || td2 || td3 || td4 || td5 || td7) {
}); //$( "tr.course" ).each(function( index, value ) {
// console.log("hi");
$('span#cc').html('');
var diff = crlen - cnt;
$('span#cc').append(' Currently displaying ' + diff + ' of ' + crlen + ' Course Reserves.');
}); //$('#filterquery').on( "keyup", function() {
///////////////////////////////////////////////
} //if(abc.loading==false){
} //function pageReady() {
//Main entry point to code
var myVar = setInterval(function() {
wait4PageReady(); //Keep polling until page is ready
}, 300);
} //cr page if (window.location.pathname === '/app/course-reserves')
//END IF COURSE RESERVES PAGE
}//function(global_koha_api_config) {
); //$.getJSON('/api/allconfig?callback=?',


//Any more tweaks to the place hold popup modal will be added here:  placehold-modal
$( "a.placehold" ).on( "click", function() {
console.log('OPC DL for Place hold modal launched and waiting 1 second for Koha defined AJAX to load modal with data');
setTimeout(updateHoldingsPopup, 1000); //wait 1000 milliseconds then call  updateHoldingsPopup function
});


//login-modal
$( "#login-modal .login" ).click(function(event){
//event.preventDefault();
console.log('login-modallllllllllllllllllllll');
setTimeout(updateHoldingsPopup, 1000); //wait 3000 milliseconds then call  updateHoldingsPopup function
});


//Place hold modal is 60% the width of the documwent window
$( window ).resize(function() {
$(".placehold .modal-dialog").css("width", $( document ).width() * .60 );
});//$( window ).resize(function() {



/*
<div class="modal-footer">
<!-- ngIf: patron -->
<!-- ngIf: !patron --><span ng-if="!patron" class="ng-scope">
<a href="/app/me/holds" ng-click="$close()" class="ng-binding">View My holds</a>
</span><!-- end ngIf: !patron -->
<button class="btn btn-primary hidden-xs ng-hide" ng-click="submitAll()" ng-show="canSubmitAll()" aria-hidden="true">Submit All <i class="icon-chevron-right"></i></button>
<button class="btn btn-primary" ng-click="searchToPick.returnToOrigin();$close()">Exit</button>
</div>

*/
$( "#cart-action .inline a" ).on( "click", function() {
console.log( $( this ).text() );
if($( this ).text() == ' Place request'){
console.log( 'YES IT IS' );
$("#placehold-modal .modal-footer span a" ).text('View My Requests'); 
}
});

function updateHoldingsPopup() {
var modalDialog=$(".placehold .modal-dialog");
console.log(  '$( document ).width()', $( document ).width() );
if( $( document ).width() < 992){
$(".placehold .modal-dialog").css("width", $( document ).width() * .90 );
$('.item-list').css("overflow-x", "auto" );
}else{
$(".placehold .modal-dialog").css("width", $( document ).width() * .60 );
}//if( $( document ).width() < 992){
// $(".placehold .modal-dialog").css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
// $('#placehold-modal .item-list').css("margin-left","12px !important").css("margin-right","12px !important");
$("#pickup-location  option:selected" ).attr('label', 'Please select'); //change topmost dropdown to read Please select
$(' #pickup-location option[value="1" ').hide();
$(' #pickup-location option[value="2" ').hide();
$(' #pickup-location option[value="3" ').hide();
$(' #pickup-location option[value="5" ').hide();
$(' #pickup-location option[value="6" ').hide();
$(' #pickup-location option[value="7" ').hide();
$(' #pickup-location option[value="8" ').hide();
$(".modal-footer span a" ).text('View My Requests'); 
$("#placehold-modal .modal-footer span a" ).text('View My Requests'); 
}//eof function updateHoldingsPopup() {


var curr_h2_text= $('#placehold-modal h2').text();
$('#placehold-modal h2').text(curr_h2_text.replace('hold','request'));// replace the word hold with request in modal
$('.hold-action > button').html('Place request <i class="icon-chevron-right"></i>');
$('.placehold .modal-footer .btn-primary').last().text('Exit');



//0
function getJSON4_ChooseCopy(htmlID){

var targetBibID = parseInt(htmlID.match(/\d+$/)[0], 10);

///////////////////////////////////  $.getJSON( "api/work/" + targetBibID + "/items", function( data ) {

$('.item-picker > tbody   tr  button').each(function(i, v) { 
console.log("$(this).text()", $(this).text() );
if($(this).text().trim() == 'Place hold')$(this).html('<i class="icon-tag"></i> Place request');
console.log(i,v);
// console.log(tr);
});

/*
$('.item-picker > thead').html('<tr><th class="itemtype sortable" sortable="itemOrder" sort-field="itemtype">Location<i class="sorter icon icon-sort"></i></th><th sortable="itemOrder" sort-field="[homebranch,itemcallnumber]" class="sortable sorted sorted-down">Call Number<i class="sorter icon icon-sort-down"></i></th><th sortable="itemOrder" sort-field="[itemcallnumber,enumchron,copynumber,barcode]" class="sortable">Call Number<i class="sorter icon icon-sort"></i></th><th sortable="itemOrder" sort-field="[onloan,itemlost,on_hold]" class="sortable">Status<i class="sorter icon icon-sort"></i></th><th>&nbsp;</th></tr>');
*/

//<th sortable="itemOrder" sort-field="[homebranch,itemcallnumber]" class="sortable sorted sorted-down">Location/Callnum<i class="sorter icon icon-sort-down"></i></th>

$('.item-picker > thead').html('<tr><th class="col1" >Location</th><th class="col0">.</th><th class="col2">Call Number</th><th class="col3">Status</th><th class="col4">Requests</th></tr>');
var i;

$('.item-list .error-msg').hide();

/// table code goes here
setTimeout(function(){  



$('.item-picker > tbody  > tr ').each(function(k, v) {
console.log("LOOP KOHA TABLE");
var koha_itemtype=  $(this).find(".itemtype").html();
var koha_itembranch=  $(this).find(".item-branch").html();
var koha_itemcn=  $(this).find(".item-cn").html();
var koha_itemenumchron=  $(this).find(".item-enumchron").html();
var koha_itemcopynumber =  $(this).find(".item-copynumber").html();
var koha_itembarcode =  $(this).find(".item-barcode").html();
//var status_col= $(this).children('td:eq(3)').text();//available
//var status_col= $(this).find(".available").text();
var status_col=$(this).find("td:eq(3)").text();
//$(this).find("td:eq(3)").prepend(status_col);
console.log("status_col",status_col);
//.children('td:eq(3)').text();
//class="item-branch ng-binding"
$(this).find(".itemtype").html(koha_itembranch + ' ' + koha_itemtype).addClass("col1"); //item-branch ng-binding

/*
//For call number column. A combination of CN + Enum + Copy#
if(koha_itemcopynumber.length>0){
$(this).find(".vol-copy").html(koha_itemcn  + ' ' + koha_itemenumchron + ' ' + 'c.' + koha_itemcopynumber).addClass("col2");
}else{
$(this).find(".vol-copy").html(koha_itemcn  + ' ' + koha_itemenumchron + ' ' + koha_itemcopynumber).addClass("col2");
}
if(koha_itemenumchron.includes("c."))$(this).find(".vol-copy").html(koha_itemcn  + ' ' + koha_itemenumchron + ' ').addClass("col2");
*/

//For call number column. A combination of CN + Enum + Copy#
var str4CNcolumn='';
if(koha_itemcopynumber.length>0){
str4CNcolumn=koha_itemcn  + ' ' + koha_itemenumchron + ' ' + 'c.' + koha_itemcopynumber;
}else{
str4CNcolumn=koha_itemcn  + ' ' + koha_itemenumchron + ' ' + koha_itemcopynumber;
}
if(koha_itemenumchron.includes("c."))str4CNcolumn=koha_itemcn  + ' ' + koha_itemenumchron; 
$(this).find(".vol-copy").html(str4CNcolumn).addClass("col2");



console.log("koha_itemtype",koha_itemtype);
console.log("koha_itembranch",koha_itembranch);
console.log("koha_itemcn",koha_itemcn);
console.log("koha_itemenumchron",koha_itemenumchron);
console.log("koha_itemcopynumber",koha_itemcopynumber);
console.log("koha_itembarcode",koha_itembarcode);

});
$('td:nth-child(2),th:nth-child(2)').hide();

$(".item-picker").tablesorter({
theme : 'blue',
// sort on the first column and second column in ascending order
});

}, 2000);


/// table code goes here

///////////////////////////////////  });//$.getJSON( "api/work/" + targetBibID + "/items", function( data ) {

}//eof function getJSON4_ChooseCopy(htmlID){



$('body').on('change', '.hold-level select', function(ev) { // codevar
var holdingsPopupBC; //Holdings popup barcode
ev.stopImmediatePropagation();
//window.clearInterval(myVar99);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
if($(this).val()==1){
//alert("OPC code Choose a copy");
console.log("OPC code Choose a copy098" , $(this) );
console.log("OPC code Choose a copy099" , this.id );
getJSON4_ChooseCopy(this.id); //looks like holdlvl142434 where bib id is appended on the end
}else{
//alert("OPC code Next available");
}//if($(this).val()==1){
/////////////////////////////////////////////////////////////////////////////////////////////////////
});
//0




$('body').on('click', '.hold-action > button', function(ev) { // codevar
ev.stopImmediatePropagation();
console.log("Clicked");
//$('.hold-status > div > div i').append('Request successfully placed!');
var $textNodes = $(".modal-body, .modal-body *").contents().filter(function () {
return this.nodeType === Node.TEXT_NODE;
});
// For testing
$textNodes.each(function () {
console.log( $(this).text().trim() );
var str=  $(this).text();
var n = str.search("Hold successfully");
var n2 = str.search("Hold submitted");
if(n>=0){
console.log( "this this ", $(this) );
$(this)[0].nodeValue="Request successfully placed!";
}
if(n2>=0){
console.log( "this this ", $(this) );
$(this)[0].nodeValue="Request submitted.";
}
});
});
if (window.location.pathname === '/app/me/dashboard') {
//$(".user-heading").html(' <i ng-class="dashboard.userView[dashboard.state].icon" class="coin glyphicon glyphicon-user"></i> My Library Dashboard');
$('.holds .list-group-body a').text('My requests');
$('.holds .list-group-icon i').removeClass('glyphicon-time').addClass('icon-tag'); //coin glyphicon glyphicon-time
$( '.list-group-icon' ).css( "margin-top", "20px" );
$('.user-heading').html('<i ng-class="dashboard.userView[dashboard.state].icon" class="coin glyphicon glyphicon-user"></i> My Library Dashboard');
}


//This section below handles the Dashboard once a patron is logged in. There are 7 links on the RHS of the /app/me/dashboard page
//1
///app/me/details
if (window.location.pathname === '/app/me/details') {
// $(".user-heading").append('Advanced Search Page - University of Hartford Libraries Catalog');
}

//2
///app/me/details
if (window.location.pathname === '/app/me/details') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-user" style=""></i> My Personal Details');

}

//3
///app/me/message-prefs
if (window.location.pathname === '/app/me/message-prefs') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-cloud-download" style=""></i> My Messaging Preferences');
}

//4
///app/me/lists
if (window.location.pathname === '/app/me/lists') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-list-alt"></i> My Shelves');
}

//5
///app/me/messages
if (window.location.pathname === '/app/me/messages') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-inbox" style=""></i> My Messages');
}

//6
///app/me/proxy-relations
if (window.location.pathname === '/app/me/proxy-relations') {
$(".user-heading").html(' <i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-random"></i> Proxy Borrowing');
}

//7
///app/me/prefs
if (window.location.pathname === '/app/me/prefs') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-cog"></i> My General Preferences');
}


//https://hartford-sandbox.bibliovation.com/app/me/fines
if (window.location.pathname === '/app/me/fines') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-credit-card"></i> My Fines');
}    

//https://hartford-sandbox.bibliovation.com/app/me/checkouts
if (window.location.pathname === '/app/me/checkouts') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-saved"></i> My Checkouts');
}   

// /app/me/holds
if (window.location.pathname === '/app/me/holds') {
$(".user-heading").html('<i ng-class="dashboard.userView[dashboard.state].icon" class="glyphicon glyphicon-tag" style=""></i> My Requests');
//$('ol.breadcrumb').children().last().text('My Requests');
function strAfterCallNum(an_item){
console.log("function strAfterCallNum",an_item);  
var strAfterCallNum =''; //use this to figure out what the string is AFTER the call number
if( an_item.enumchron !=null ){
strAfterCallNum=' ' + an_item.enumchron;
}else{
if(an_item.copynumber!==null ){
strAfterCallNum+= ' c.' + an_item.copynumber;
}else{
strAfterCallNum=' ';
}//if(an_item.copynumber!==null ){
}//if(an_item.enumchron !=undefined && an_item.enumchron !=null ){

return strAfterCallNum;
}//function strAfterCallNum(theitems){


String.prototype.capitalize = function() {
return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

function findHoldsMatch(theitems){
$("#holdst > tbody  > tr").each(function(i, v) {
//Replace every instance of a barcode with Library, Shelving location, Call number, Enum/chron, Copy number - much like you've done with the holds popup
var tbl_by=$(v).children()[1]; //this is the popup table not raw data and cell 1 ( 2nd column ) for any given row 
var bibid= $(this).find(".bibdata a").attr('href');
$(this).find(".enumchron").hide();
$(this).find(".barcode").hide();
var col3=$(v).children()[2];
$(col3).find("span").hide();
var title=$(tbl_by).find('.bibdata a').text(); //this is the popup table not raw data and cell 1 ( 2nd column ) for any given row 
var title2 = title.replace(/[^\w\s]/gi, '');
var item_column=$(v).children()[2]; //this is the popup table not raw data and cell 1 ( 2nd column ) for any given row 

if( $(item_column).find('span').hasClass('ng-hide') ){


if( $(item_column).find('.barcode a').text() == theitems.barcode.toString() ) {

var aft_call_num= strAfterCallNum(theitems);
      
if($(item_column).find('.resfound').val()== undefined)   $(item_column).append('<div class="resfound">' + theitems.holdingbranch.capitalize() + ' ' + loc_trans[theitems.location].opac + ' ' +  theitems.itemcallnumber + ' ' + aft_call_num + '</div>');
console.log("findHoldsMatc theitems[j].item.barcode= from all items for bib record",theitems.barcode);
console.log("findHoldsMatc theitems[j].item.biblionumber=",i,theitems.biblionumber);
}//inner if if( $(item_column).find('.barcode a').text() == theitems.item.barcode.toString() ) { 


}else{

if( bibid.includes(theitems.biblionumber) ) {
console.log("bibid.includes(theitems[iiiiiiij].item.biblionumber",bibid.includes(theitems.biblionumber));
//if($(item_column).find('.resfound').val()== undefined)$(item_column).append('<div class="resfound">' + theitems.holdingbranch.capitalize() + ' ' + loc_trans[theitems.location].opac + ' ' +  theitems.itemcallnumber + ' ' + aft_call_num + '</div>');
if($(item_column).find('.resfound').val()== undefined)  $(item_column).append('<div class="resfound">' + ' Next Available ' + '</div>');
//console.log("findHoldsMatc theitems[j].item.barcode= from all items for bib record",theitems.barcode);
//console.log("findHoldsMatc theitems[j].item.biblionumber=",i,theitems.biblionumber);
}//if( bibid.includes(theitems[j].item.biblionumber) ) { 

}//outer if
});
}//function findHoldsMatch(){*/  

$.getJSON('/api/login', function (str) {
console.log('/api/login',str.uri);
var str1= str.uri;      
//https://hartford-sandbox.bibliovation.com/api/patron/48417/holds
var index = str1.lastIndexOf("/");
var result = str1.substr(index+1);      
console.log('patron ID=',result);
       $.getJSON('/api/patron/' + result + '/holds', function (str9) {
            console.log('/api/login9 and what Koha builds table from',str9);
              var i;
              $("#holdst > tbody  > tr").each(function(i, v) {
              var tbl_by=$(v).children()[1]; //this is the popup table not raw data and cell 1 ( 2nd column ) for any given row 
              //$(tbl_by).find( "a" ).attr('href');
console.log("tbl_by",tbl_by);                          

var last_child= $(tbl_by).last(); 
console.log("last_child",last_child);  
var for_the_by= $(tbl_by).find(".bibdata .author").text();
var for_the_by2=for_the_by.substring(3);
console.log("for_the_by",for_the_by);

$(tbl_by).find('.author').html(for_the_by2);

              var item_column=$(v).children()[2]; //this is the popup table not raw data and cell 1 ( 2nd column ) for any given row 
              var addBibID=$(tbl_by).find( "a" ).attr('href');
              var index = addBibID.lastIndexOf("/");
              var result = addBibID.substr(index+1);  
              console.log("item_column=",item_column);
              console.log('My requests json and the raw data Koha uses to display the patrons held items in a table',str9[i].hold);
                             $.getJSON('/api/work/' + str9[i].hold.biblionumber + '/items' , function (theitems) {
                             console.log("aaaaaaall holdings per held resource=",theitems);
              var j;
              for (j = 0; j < theitems.length; j++) {

                  findHoldsMatch(theitems[j].item);
                  console.log("theitems[j].item",theitems[j].item);

              }//for j               
                             });//$.getJSON('/api/work/' + str9[i].hold.biblionumber + '/items' , function (theitems) {

              });//("#holdst > tbody  > tr").each(function(i, v) {

         });//$.getJSON('/api/patron/' + result + '/holds', function (str9) {

});//$.getJSON('/api/login', function (str) {

}//if (window.location.pathname === '/app/me/holds') {JAN 8TH 262.38
/////////////////////////////////////////////////////////////////////////////////////// CALL SLIP UPDATES End//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

loc_trans ={
"CTRCOMPLEX": {
"opac": "Center for Complexity -- Ask at Circulation Desk",
"staff": "Center for Complexity -- Ask at Circulation Desk",
"code": "CTRCOMPLEX"
},
"TSOFFICE": {
"opac": "Tech Services Office -- Ask at Circulation Desk",
"staff": "Tech Services Office -- Ask at Circulation Desk",
"code": "TSOFFICE"
},
"ELLIOTT": {
"opac": "Head's Office -- Ask at Circulation Desk",
"staff": "Head's Office -- Ask at Circulation Desk",
"code": "ELLIOTT"
},
"SMALLSEM": {
"opac": "Small Seminar Room -- Ask at Circulation Desk",
"staff": "Small Seminar Room -- Ask at Circulation Desk",
"code": "SMALLSEM"
},
"READING": {
"opac": "Hillyer Hall",
"staff": "Slobodkina Reading Room",
"code": "READING"
},
"ARCHOVER": {
"opac": "Archives Oversized -- Ask at Circulation Desk",
"staff": "Archives Oversized -- Ask at Circulation Desk",
"code": "ARCHOVER"
},
"ARCHIVES": {
"opac": "Archives -- Ask at Circulation Desk",
"staff": "Archives -- Ask at Circulation Desk",
"code": "ARCHIVES"
},
"CLOSEDOVER": {
"opac": "Closed Stacks (Oversize) -- Ask at Circulation Desk",
"staff": "Closed Stacks (Oversize) -- Ask at Circulation Desk",
"code": "CLOSEDOVER"
},
"RAREBOOK": {
"opac": "Rare Book Room -- Ask at Circulation Desk",
"staff": "Rare Book Room -- Ask at Circulation Desk",
"code": "RAREBOOK"
},
"SHELVESLP": {
"opac": "Shelves - LP Records",
"staff": "Shelves - LP Records",
"code": "SHELVESLP"
},
"WRITING": {
"opac": "Writing Shelves",
"staff": "Writing Shelves",
"code": "WRITING"
},
"OVERSIZED": {
"opac": "Oversized",
"staff": "Oversized",
"code": "OVER"
},
"OVER": {
"opac": "Oversized",
"staff": "Oversized",
"code": "OVER"
},
"ONLINE": {
"opac": "Online",
"staff": "Online",
"code": "ONLINE"
},
"NEWSLETTERS": {
"opac": "Newsletters -- Ask at Circulation Desk",
"staff": "Newsletters -- Ask at Circulation Desk",
"code": "NEWSLETTERS"
},
"RAREBOOKOVER": {
"opac": "Rare Book Room Oversized -- Ask at Circulation Desk",
"staff": "Rare Book Room Oversized -- Ask at Circulation Desk",
"code": "RAREBOOKOVER"
},
"RESERVES": {
"opac": "Reserves -- Ask at Circulation Desk",
"staff": "Reserves -- Ask at Circulation Desk",
"code": "RESERVES"
},
"CIRCULATION": {
"opac": "Circulation Desk",
"staff": "Circulation Desk",
"code": "CIRCULATION"
},
"PERMRES": {
"opac": "Permanent Reserves -- Ask at Circulation Desk",
"staff": "Permanent Reserves -- Ask at Circulation Desk",
"code": "PERMRES"
},
"INSTRUMENTS": {
"opac": "Instruments",
"staff": "Instruments",
"code": "INSTRUMENTS"
},
"ZACHS": {
"opac": "Zachs Family Holocaust Collection",
"staff": "Zachs Family Holocaust Collection",
"code": "ZACHS"
},
"COMPACT": {
"opac": "Storage -- Ask at Circulation Desk",
"staff": "Storage -- Ask at Circulation Desk",
"code": "COMPACT"
},
"NEW": {
"opac": "New Arrivals",
"staff": "New Arrivals",
"code": "NEW"
},
"DIRECTOR": {
"opac": "Director's Office -- Ask at Circulation Desk",
"staff": "Director's Office -- Ask at Circulation Desk",
"code": "DIRECTOR"
},
"CURRLABOVER": {
"opac": "Curriculum Collection Oversized",
"staff": "Curriculum Collection Oversized",
"code": "CURRLABOVER"
},
"DISPLAY": {
"opac": "Display Case -- Ask at Circulation Desk",
"staff": "Display Case -- Ask at Circulation Desk",
"code": "DISPLAY"
},
"ListeningRoom": {
"opac": "Listening Room -- Ask at Circulation Desk",
"staff": "Listening Room -- Ask at Circulation Desk",
"code": "ListeningRoom"
},
"DANCE": {
"opac": "Shelves -- Dance",
"staff": "Shelves -- Dance",
"code": "DANCE"
},
"PERIODICALS": {
"opac": "Current Periodicals",
"staff": "Current Periodicals",
"code": "PERIODICALS"
},
"CIRCDESKVHS": {
"opac": "VHS Tapes",
"staff": "VHS Tapes",
"code": "CIRCDESKVHS"
},
"BOUNDPER": {
"opac": "Bound Periodicals",
"staff": "Bound Periodicals",
"code": "BOUNDPER"
},
"AV": {
"opac": "Audio Visual -- Ask at Circulation Desk",
"staff": "Audio Visual -- Ask at Circulation Desk",
"code": "AV"
},
"REFOFFICE": {
"opac": "Reference Office",
"staff": "Reference Office",
"code": "REFOFFICE"
},
"REVIEW": {
"opac": "Review -- Ask at Circulation Desk",
"staff": "Review -- Ask at Circulation Desk",
"code": "REVIEW"
},
"CIRCDESKCD": {
"opac": "CDs",
"staff": "CDs",
"code": "CIRCDESKCD"
},
"OPPERMAN": {
"opac": "Opperman  Collection (Closed Stacks) -- Ask at  Circulation Desk",
"staff": "Opperman  Collection (Closed Stacks) -- Ask at  Circulation Desk",
"code": "OPPERMAN"
},
"CLOSEDSTACKS": {
"opac": "Closed Stacks -- Ask at Circulation Desk",
"staff": "Closed Stacks -- Ask at Circulation Desk",
"code": "CLOSEDSTACKS"
},
"SHELVES": {
"opac": "Shelves",
"staff": "Shelves",
"code": "SHELVES"
},
"CURRLAB": {
"opac": "Curriculum Collection",
"staff": "Curriculum Collection",
"code": "CURRLAB"
},
"ATLAS": {
"opac": "Atlas Stand",
"staff": "Atlas Stand",
"code": "ATLAS"
},
"JUDAICA": {
"opac": "Judaica Collection",
"staff": "Judaica Collection",
"code": "JUDAICA"
},
"STORAGE": {
"opac": "Storage Area",
"staff": "Storage Area",
"code": "STORAGE"
},
"REFERENCE": {
"opac": "Reference",
"staff": "Reference",
"code": "REFERENCE"
},
"LEISURE": {
"opac": "Leisure Collection",
"staff": "Leisure Collection",
"code": "LEISURE"
},
"MENDING": {
"opac": "Mending -- Ask at Circulation Desk",
"staff": "Mending -- Ask at Circulation Desk",
"code": "MENDING"
},
"MiniScores": {
"opac": "Miniature Scores Shelves",
"staff": "Miniature Scores Shelves",
"code": "MiniScores"
},
"FCLD": {
"opac": "Faculty Center for Learning Development",
"staff": "Faculty Center for Learning Development",
"code": "FCLD"
},
"CTEI": {
"opac": "Center for Teaching Excellence and Innovation",
"staff": "Center for Teaching Excellence and Innovation",
"code": "CTEI"
},
"CIRCDESKDVD": {
"opac": "DVDs",
"staff": "DVDs",
"code": "CIRCDESKDVD"
}
}


item_type_trans ={
"ACCESSORYC": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "ACCESSORYC",
"description": "Equipment Accessory, Due at Close",
"replacement_price": "20.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"CDROMNC": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CDROMNC",
"description": "Non Circulating CD-ROM",
"replacement_price": "40.00",
"imageurl": "bridge/computer_file.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 1,
"manyholdsperbib": 1
},
"KIT": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "KIT",
"description": "Kit",
"replacement_price": "38.00",
"imageurl": "bridge/kit.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SCPT4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SCPT4",
"description": "Score and Part, 4 Hour Loan",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PRAYERRUG": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PRAYERRUG",
"description": "Prayer Rug (4 hour loan)",
"replacement_price": "50.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"CAMCORTERM": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CAMCORTERM",
"description": "Camcorder, Term Loan",
"replacement_price": "820.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"IPAD": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "IPAD",
"description": "iPad",
"replacement_price": "600.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"VSCORE4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VSCORE4",
"description": "Vocal Score, 4 Hour Loan",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"CD": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CD",
"description": "Audio CD",
"replacement_price": "20.00",
"imageurl": "bridge/cd_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"STREAMVID": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "STREAMVID",
"description": "Streaming Video",
"replacement_price": "0.00",
"imageurl": "bridge/web.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 1,
"manyholdsperbib": 0
},
"TRIPOD": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "TRIPOD",
"description": "Tripod",
"replacement_price": "25.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"CALCKIT": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CALCKIT",
"description": "Calculator Kit",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"FILMREEL": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "FILMREEL",
"description": "Film Reel, 16 mm",
"replacement_price": "1000.00",
"imageurl": "bridge/archive.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"ELECRES": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "ELECRES",
"description": "Electronic Resource",
"replacement_price": "0.00",
"imageurl": "bridge/web.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 0
},
"STYLUS": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "STYLUS",
"description": "Stylus",
"replacement_price": "16.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"DVDROM72": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DVDROM72",
"description": "DVD-ROM 3 Day Loan",
"replacement_price": "100.00",
"imageurl": "bridge/software.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"LAPTOP": {
"hold_fee": "0.00",
"renewalsallowed": 1,
"itemtype": "LAPTOP",
"description": "Laptop",
"replacement_price": "2000.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"CASE": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CASE",
"description": "Carrying Case",
"replacement_price": "20.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"ACCESSORY": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "ACCESSORY",
"description": "Equipment Accessory",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"LP": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "LP",
"description": "LP",
"replacement_price": "5.00",
"imageurl": "bridge/vinyl_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"HPO": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "HPO",
"description": "Hartt Performance Library Materials",
"replacement_price": "30.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PARTSNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PARTSNC",
"description": "Non Circulating Parts",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"CDROM4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CDROM4",
"description": "CD-ROM, 4 Hour Loan",
"replacement_price": "40.00",
"imageurl": "bridge/computer_file.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"DVD2": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DVD2",
"description": "DVD, 2 Hour Loan",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"PERIODICAL": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PERIODICAL",
"description": "Periodical",
"replacement_price": "25.00",
"imageurl": "bridge/periodical.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"DVD4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "DVD4",
"description": "DVD, 4 Hour Loan",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK24": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "BOOK24",
"description": "Book, 24 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PROJECTOR": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PROJECTOR",
"description": "Projector",
"replacement_price": "400.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"MARKERSET": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "MARKERSET",
"description": "Dry Erase Marker Set",
"replacement_price": "10.00",
"imageurl": "liblime-kids/card.gif",
"summary": "5 dry erase markers, one eraser,  one spray bottle of cleaning solution",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"CASSETTE4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CASSETTE4",
"description": "Audio Cassette, 4 Hour Loan",
"replacement_price": "10.00",
"imageurl": "bridge/tape_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"DVDNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "DVDNC",
"description": "Non Circulating DVD",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"MICROFORM": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MICROFORM",
"description": "Microform",
"replacement_price": "20.00",
"imageurl": "npl/Microfilm.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"NEWSPAPER": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "NEWSPAPER",
"description": "Newspaper",
"replacement_price": "0.00",
"imageurl": "bridge/periodical.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"CDROM": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CDROM",
"description": "CD-ROM Computer File",
"replacement_price": "40.00",
"imageurl": "bridge/computer_file.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"OVER2": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "OVER2",
"description": "Oversized, 2 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"DVD7": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DVD7",
"description": "DVD, 7 Day Loan",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK": {
"hold_fee": "0.00",
"renewalsallowed": 2,
"itemtype": "BOOK",
"description": "Book",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"HARTTORCH": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "HARTTORCH",
"description": "Hartt Performance Library Printed Music",
"replacement_price": "30.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"REF": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "REF",
"description": "Reference",
"replacement_price": "100.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"DRYBOARD": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DRYBOARD",
"description": "Dry Erase Board",
"replacement_price": "25.00",
"imageurl": "liblime-kids/card.gif",
"summary": "Dry Ease Board (36\" x 24\")",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"PER2": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PER2",
"description": "Periodical, 2 Hour Loan",
"replacement_price": "25.00",
"imageurl": "bridge/periodical.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"OVER": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "OVER",
"description": "Oversized Book",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SCPT": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SCPT",
"description": "Score and Part",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PERS4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PERS4",
"description": "Personal Copy, 4 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PERS2": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PERS2",
"description": "Personal Copy, 2 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PLAYBACK7": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PLAYBACK7",
"description": "Playback Equipment, 7 Day Loan",
"replacement_price": "1000.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"THESIS": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "THESIS",
"description": "Thesis",
"replacement_price": "100.00",
"imageurl": "liblime-kids/book-large-print.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"DVDRNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "DVDRNC",
"description": "Non Circulating DVDR",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"PERS7DAY": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PERS7DAY",
"description": "Personal Copy, 7 Day Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"PARTS": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PARTS",
"description": "Parts",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"CD72": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CD72",
"description": "Audio CD, 72 Hour Loan",
"replacement_price": "20.00",
"imageurl": "bridge/cd_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK14": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "BOOK14",
"description": "Book, 14 Day Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"CASSETTE": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CASSETTE",
"description": "Audio Cassette",
"replacement_price": "10.00",
"imageurl": "bridge/tape_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"VHS4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VHS4",
"description": "VHS, 4 Hour Loan",
"replacement_price": "35.00",
"imageurl": "bridge/vhs.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"TRIPODTERM": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "TRIPODTERM",
"description": "Tripod, Term Loan",
"replacement_price": "25.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"MIXM4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MIXM4",
"description": "Mixed Media, 4 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/kit.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"COPY24": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "COPY24",
"description": "Copy, 24 Hour Loan",
"replacement_price": "75.00",
"imageurl": "npl/Ed.-Curriculum.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SURGPRO": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "SURGPRO",
"description": "Surge Protector",
"replacement_price": "10.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"SC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SC",
"description": "Score and Parts",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"VIDEOGUIDE": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VIDEOGUIDE",
"description": "Video Guide",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PERSTERM": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PERSTERM",
"description": "Personal Copy, Term Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "BOOK4",
"description": "Book, 4 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"CDNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CDNC",
"description": "Non Circulating CD",
"replacement_price": "40.00",
"imageurl": "bridge/cd_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"VSCORE": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VSCORE",
"description": "Vocal Score",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK1": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "BOOK1",
"description": "Book, 1 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"VHS": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VHS",
"description": "VHS Videocassette",
"replacement_price": "35.00",
"imageurl": "bridge/vhs.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOKNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "BOOKNC",
"description": "Non Circulating Book",
"replacement_price": "100.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"CLABEQUIP": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CLABEQUIP",
"description": "Curriculum Lab Equipment",
"replacement_price": "0.00",
"imageurl": "bridge/kit.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"VHSNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VHSNC",
"description": "Non Circulating VHS",
"replacement_price": "35.00",
"imageurl": "bridge/vhs.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"THESIS4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "THESIS4",
"description": "Thesis, 4 Hour Loan",
"replacement_price": "100.00",
"imageurl": "liblime-kids/book-large-print.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SCPTNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SCPTNC",
"description": "Non Circulating Score and Part",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"BOOK3": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "BOOK3",
"description": "Book, 3 Day Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"ACCESSORY1": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "ACCESSORY1",
"description": "Equipment Accessory, 1-Day Loan",
"replacement_price": "20.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"DVD": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "DVD",
"description": "DVD",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SCORECD": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "SCORECD",
"description": "Score and CD",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"PERS72": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PERS72",
"description": "Personal Copy, 72 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK2": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "BOOK2",
"description": "Book, 2 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"KEY": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "KEY",
"description": "Key",
"replacement_price": "150.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"CD48": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CD48",
"description": "Audio CD, 48 Hour Loan",
"replacement_price": "20.00",
"imageurl": "bridge/cd_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SCORE": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SCORE",
"description": "Score",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"SCORE4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SCORE4",
"description": "Score, 4 Hour Loan",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"ACCESSORY3": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "ACCESSORY3",
"description": "Equipment Accessory, 3-Day Loan",
"replacement_price": "20.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"VSCORENC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "VSCORENC",
"description": "Non Circulating VScore",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"CD4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "CD4",
"description": "Audio CD, 4 Hour Loan",
"replacement_price": "20.00",
"imageurl": "bridge/cd_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"EXTCORD": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "EXTCORD",
"description": "Extension Cord",
"replacement_price": "10.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"REMOTECTRL": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "REMOTECTRL",
"description": "Remote Control",
"replacement_price": "10.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK7": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "BOOK7",
"description": "Book, 7 Day Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"DVD48": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DVD48",
"description": "DVD, 48 Hour Loan",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"PERS48": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "PERS48",
"description": "Personal Copy, 48 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"BOOK72": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "BOOK72",
"description": "Book, 72 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"IPAD3": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "IPAD3",
"description": "iPad, 3-Day Loan",
"replacement_price": "600.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"DVD28": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DVD28",
"description": "DVD, 28 Day Loan",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"KEYBOARDS": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "KEYBOARDS",
"description": "Midi Keyboards",
"replacement_price": "125.00",
"imageurl": "bridge/sound.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"WEBCAM": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "WEBCAM",
"description": "Webcam",
"replacement_price": "70.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"MOUSE": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MOUSE",
"description": "Mouse",
"replacement_price": "30.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"MUSINSTSEM": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MUSINSTSEM",
"description": "MusInstSem",
"replacement_price": "30.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"ACADAPTER": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "ACADAPTER",
"description": "AC Adapter",
"replacement_price": "10.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"ACCS2HR": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "ACCS2HR",
"description": "Equipment Accessory, 2-Hour Loan",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"COMPKEYB": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "COMPKEYB",
"description": "Computer Keyboard",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"YJACK": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "YJACK",
"description": "Y-Jack",
"replacement_price": "5.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"THESISNC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "THESISNC",
"description": "Non Circulating Thesis",
"replacement_price": "100.00",
"imageurl": "liblime-kids/book-large-print.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"BOOK48": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "BOOK48",
"description": "Book, 48 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"AUDIOREC": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "AUDIOREC",
"description": "Audio Recorder",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"MIXM": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MIXM",
"description": "Mixed Media",
"replacement_price": "38.00",
"imageurl": "bridge/kit.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"TMPCOPY": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "TMPCOPY",
"description": "Temporary copy created via fast add",
"replacement_price": "0.00",
"imageurl": "",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"MINISCORE4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MINISCORE4",
"description": "Mini Score, 4 Hour Loan",
"replacement_price": "10.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"MINISCORE": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "MINISCORE",
"description": "Mini Score",
"replacement_price": "10.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"LP4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "LP4",
"description": "LP, 4 Hour Loan",
"replacement_price": "5.00",
"imageurl": "bridge/vinyl_music.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"CALC": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CALC",
"description": "Calculator",
"replacement_price": "200.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"INSTRUMENT": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "INSTRUMENT",
"description": "Instrument",
"replacement_price": "9000.00",
"imageurl": "bridge/sound.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"METRONOME": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "METRONOME",
"description": "Metronome",
"replacement_price": "20.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"PER4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PER4",
"description": "Periodical, 4 Hour Loan",
"replacement_price": "25.00",
"imageurl": "bridge/periodical.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"ACCS4HR": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "ACCS4HR",
"description": "Equipment Accessory, 4-Hour Loan",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"CAMCORDER": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "CAMCORDER",
"description": "Camcorder",
"replacement_price": "820.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"DISCWASHER": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "DISCWASHER",
"description": "Discwasher",
"replacement_price": "10.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"SCORENC": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "SCORENC",
"description": "Non Circulating Score",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 1,
"manyholdsperbib": 1
},
"MIC": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "MIC",
"description": "Microphone",
"replacement_price": "0.00",
"imageurl": "liblime-kids/card.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 0
},
"DVD24": {
"hold_fee": "0.00",
"renewalsallowed": null,
"itemtype": "DVD24",
"description": "DVD, 24 Hour Loan",
"replacement_price": "35.00",
"imageurl": "bridge/dvd.gif",
"summary": "",
"rentalcharge": null,
"notforloan": 0,
"manyholdsperbib": 1
},
"HEADPHONES": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "HEADPHONES",
"description": "Headphones",
"replacement_price": "75.00",
"imageurl": "bridge/sound.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 0
},
"PERS24": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PERS24",
"description": "Personal Copy, 24 Hour Loan",
"replacement_price": "38.00",
"imageurl": "bridge/book.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"PARTS4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "PARTS4",
"description": "Parts, 4 Hour Loan",
"replacement_price": "25.00",
"imageurl": "bridge/score.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
},
"COPY4": {
"hold_fee": "0.00",
"renewalsallowed": 0,
"itemtype": "COPY4",
"description": "Copy, 4 Hour Loan",
"replacement_price": "75.00",
"imageurl": "npl/Ed.-Curriculum.gif",
"summary": "",
"rentalcharge": 0,
"notforloan": 0,
"manyholdsperbib": 1
}
}
$('.login .my-account').removeClass('open');
$( "#cart-action .inline li:eq( 2 ) a" ).html('<i class="icon-tag"></i> Place request');

$( ".page-sizer select" ).on( "change", function() {
var currentPagerSize =  $(this).val();
sessionStorage['currentPagerSize'] = currentPagerSize;
var readValue = sessionStorage['currentPagerSize'];
console.log('readValue', readValue);
console.log( 'CHANGE EVENT' );
$('#faux_pager_display').remove();
$('.num-results .form-group label').append('<span id="faux_pager_display">' + $( this ).val() + '</span>');
});