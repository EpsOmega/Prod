//This Javascript file is needed for Masthead Searches. This works in tandem with HTML code located in logo.html
/*
<!-- Begin Masthead Searches Below This Line -->
<div id="rwd-search-form">
HTML code is located here and is found in logo.html
</div><!-- <div id="rwd-search-form"> --> 
<!-- End Masthead Searches above This Line --> 
*/

//Define first <SELECT> Options
var selone_arr = {
    "0": "",
    "1": "title:",
    "2": "author:",
    "3": "subject:",
    "4": "isbn:",
    "5": "series-title:",
    "6": "callnumber:",
    "7": "concept:",
    "8": "text-fl:"
};

//Define second <SELECT> Options
var seltwo_arr = {
    "0": "",
    "1": "?fq=collection:BOOK%20OR%20collection:THESES",
    "2": "?fq=collection:THESES",
    "3": "?fq=collection:SCORES%20OR%20itemtype:SCORECD",
    "4": "?fq=itemtype:MINISCORE%20OR%20itemtype:MINISCORE4%20OR%20itemtype:SC%20OR%20itemtype:SCORE%20OR%20itemtype:SCORE4%20OR%20itemtype:SCORENC%20OR%20itemtype:SCPT%20OR%20itemtype:SCPTNC%20OR%20itemtype:VSCORE%20OR%20itemtype:VSCORE4%20OR%20itemtype:VSCORENC%20OR%20itemtype:SCORECD",
    "5": "?fq=itemtype:PARTS%20OR%20itemtype:PARTS4%20OR%20itemtype:PARTSNC%20OR%20itemtype:SC%20OR%20itemtype:SCPT%20OR%20itemtype:SCPT4%20OR%20itemtype:SCPTNC%20OR%20itemtype:HARTTORCH",
    "6": "?fq=collection:AUDIOCD%20OR%20collection:LPS%20OR%20collection:AUDIOCASSE%20OR%20collection:MIXEDMEDIA%20OR%20itemtype:SCORECD",
    "7": "?fq=collection:AUDIOCD%20OR%20itemtype:SCORECD",
    "8": "?fq=collection:LPS",
    "9": "?fq=collection:DVD%20OR%20collection:VHS%20OR%20collection:MIXEDMEDIA",
    "10": "?fq=collection:DVD",
    "11": "?fq=collection:VHS",
    "12": "?fq=collection:PERIODICAL%20OR%20collection:NEWSPAPERS",
    "13": "?fq=collection:E-RESOURCE%20OR%20itemtype:ELECRES",
    "14": "?fq=location:RESERVES%20AND%20on-shelf-at:MORTENSEN",
    "15": "?fq=location:RESERVES%20AND%20on-shelf-at:ALLEN",
    "16": "?fq=location:CURRLAB",
    "17": "?fq=location:JUDAICA%20OR%20location:JUDOVER",
    "18": "?fq=on-shelf-at:PERFLIB"
};
//7 = ...just CDs
$(document).ready(function() {

//Taken directly from http://libweb.hartford.edu/koha/regex/regex-tests02.html
function KOHAfix(str) {
    var finalStr = '';
    var str2 = '';
    str2 = str.replace(/ [=#;|&!':]/g, ' ').replace(/[?]/g, '%3F'); // this is SPACE A_SPECIAL_CHAR NO_SPACE
    var str3 = str2.replace(/\//g, ' ');
    //^^console.log("STR3STR3STR3", str3);
    return str3; //Replace the ? char with %3F otherwise this looks like a query param ? as in somefile.php?count=5 
} //eof KOHAfix(str)    
//Taken directly from http://libweb.hartford.edu/koha/regex/regex-tests02.html   
//02073 03438 247

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

function nineDigitsPlusX(str) {
  return /\d{9}[X]/.test(str);
}

//Barcode 02073 03438 247 
//ISBN:087 023 224X  <--- this is a valid ISBN see wiki link below for all acceptable fomats for an ISBN
function buildURL() { // Build the URL for Solr and also send that URL to Solr
var seloneFT = selone_arr[$('#selone').find("option:selected").val()]; //Ex. "series-title:"
console.log("selone=== at GO click ============",seloneFT);
//^^console.log("MastHead 1st DD value",seloneFT);
var userinputqueryFT = $('#userinputquery').val().trim(); //greeting.trim(


/*
if (userinputqueryFT.length === 0) {
    userinputqueryFT = "*";
    //^^console.log("length === 0",userinputqueryFT);
} else {
    userinputqueryFT = KOHAfix(userinputqueryFT); //Fix the user input query string before passing it to Solr
    //^^console.log("MastHead 3rd value of  user input query", userinputqueryFT);
var temptest1=userinputqueryFT.replace(/-|\s/g,""); //remove white spaces and hyphens for testing first and foremost
var temptest2=userinputqueryFT.replace(/-|\s/g,""); //remove white spaces and hyphens for testing first and foremost

if( containsOnlyNumbers(temptest1) )userinputqueryFT = temptest1; //13 and 10digits no X here. Is this a true statement?
if(  nineDigitsPlusX(temptest2)  )userinputqueryFT = temptest2; //9 digits and X on the end here?. Is this a true statement?    
} //if*/



    if (userinputqueryFT.length === 0) {
        userinputqueryFT = "*";
        //^^console.log("length === 0",userinputqueryFT);
    } else {

    var issnCheck=userinputqueryFT;

            if(issnCheck.length == 9 && issnCheck[4]=='-'){ //ISSN check, looks for anything-anything (anyt-anyt) AND nine chars long AND with '-' in the middle
                //The ISSN in default config for Biblio works fine. The problem was  the ISBN is very specific in format and often times the Amazon ISBN would not resolve
                //in Biblio. The ISBN code rendered the ISSN searches useless, and removing hyphens to normalize the ISBN caused this. Now both the ISBN and ISSN searches work.

            console.log("This most likely is an ISSN, might be frik-frak",issnCheck);

            userinputqueryFT=issnCheck; //assign userinputqueryFT and don't modify again

            }else{//Not ISSN

                userinputqueryFT = KOHAfix(userinputqueryFT); //Fix the user input query string before passing it to Solr
                //^^console.log("MastHead 3rd value of  user input query", userinputqueryFT);
                var temptest1=userinputqueryFT.replace(/-|\s/g,""); //remove white spaces and hyphens for testing first and foremost. An ISSN will no longer be passed to this code
                var temptest2=userinputqueryFT.replace(/-|\s/g,""); //remove white spaces and hyphens for testing first and foremost. An ISSN will no longer be passed to this code

            if( containsOnlyNumbers(temptest1) )userinputqueryFT = temptest1; //13 and 10digits no X here. Is this a true statement?
            if(  nineDigitsPlusX(temptest2)  )userinputqueryFT = temptest2; //9 digits and X on the end here?. Is this a true statement? 
                //^^console.log("MastHead 3rd value of  user input query", userinputqueryFT);
               //^^console.log("MastHead 3rd value of  user input query", userinputqueryFT);     
            }//if(issnCheck.length == 9 && issnCheck[4]=='-'){

    } //if (userinputqueryFT.length === 0) {



var seltwoFT = seltwo_arr[$('#seltwo').find("option:selected").val()]; //Ex. "?fq=collection:THESES"
//^^console.log("MastHead 2nd DD value seltwoFT",seltwoFT);
var theDomain = ''; // or var theDomain ='';  use '' in production
var url4Solr = theDomain + '/app/search/' + seloneFT + '(' + userinputqueryFT.trim() + ')' + seltwoFT;
//^^console.log("url4Solr before the OR",url4Solr);
var previous_browser_url = document.getElementById('app-body');
if(previous_browser_url.getAttribute('data-last_search_performed') != url4Solr){
previous_browser_url.setAttribute('data-last_search_performed',url4Solr); // 
var getPreviousSearchURL = previous_browser_url.getAttribute('data-last_search_performed'); // getPreviousSearchURL = '12'
var url4SolrNEW=url4Solr;
url4Solr=  url4SolrNEW.replace(" or "," OR ");
window.history.pushState(null, null, url4Solr); //Must use history.pushState otherwise cart empties
$( "a.login-button, span.loggedin" ).trigger( "click" ); 
$(".my-account").removeClass("open");
}//if(previous_browser_url.getAttribute('data-last_search_performed') != url4Solr){
$(".my-account").removeClass("open");
console.log("///////////////////////////////////////////////******************************************url4Solr value before API call to Solr**************************************************//////////////////////////////////",url4Solr);
} // eof function buildURL() {
//////////////////////////////////////////////////////////////////////////  eof function buildURL() /////////////////////////////////////////////////////////////////

$('#selone').on('change', function() {
    //^^console.log(this.value);
});

$('#seltwo').on('change', function() {
    //^^console.log(this.value);
});

$("#go").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation(); 
    buildURL();
    setTimeout(() => { $(".my-account").removeClass("open"); }, 2000);
});

$("#cres").click(function(e) {
    e.preventDefault();
    $('#debugarea').html('');
});

}); //eof $(document).ready(function(){

//extra code
//if( (userinputqueryFT.length ==14 &&  userinputqueryFT.lastIndexOf("-")>0) || userinputqueryFT.length ==13 || (userinputqueryFT.length ==11 && userinputqueryFT.lastIndexOf("-")>0) || (userinputqueryFT.length ==10) ) {    