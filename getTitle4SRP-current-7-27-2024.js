//This code is used in production and for an external JS file:
//https://libweb.hartford.edu/koha/bvation/js/srp-sept2023.js   <--- production file for the SRP in addition to the SRP from the DL
// $('<!--UPPER--><div class="newtitle4SRP allnew"> ' + getTitle4SRP(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
//BECOMES  $('<!--UPPER--><div class="newtitle4SRP allnew"> ' + getTitle4SRP_ext(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
//getTitle4SRP_ext
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/lah/getTitle4BDR_ext.js"></script> <--- add to header.html for BDR title
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/lah/getTitle4SRP_ext.js"></script> <--- add to header.html for SRP title

function search_245_title(delimter,outPutDisplay){
var hasDelim=false;
for (let i = 0; i < outPutDisplay.length; i++) {
    // get the size of the inner array
    var innerArrayLength = outPutDisplay[i].length;
    // loop the inner array
    for (let j = 0; j < innerArrayLength; j++) {
       // console.log('[' + i + ',' + j + '] = ' + outPutDisplay[i][j]);
       if(outPutDisplay[i][j] == delimter)hasDelim=true;
    }
}
return hasDelim;
}//function search_245_title(){


function search_245_title_and_replace(delimter,outPutDisplay){
var hasDelim=false;
for (let i = 0; i < outPutDisplay.length; i++) {
    // get the size of the inner array
    var innerArrayLength = outPutDisplay[i].length;
    // loop the inner array
    for (let j = 0; j < innerArrayLength; j++) {
       // console.log('[' + i + ',' + j + '] = ' + outPutDisplay[i][j]);
       if(outPutDisplay[i][j] == delimter)hasDelim=true;
    }
}
return hasDelim;
}//function search_245_title_and_replace(delimter,outPutDisplay){

function create_output_for_245_title(outPutDisplay){
//var hasDelim=false;
var build_title_str='';
for (let i = 0; i < outPutDisplay.length; i++) {
    // get the size of the inner array
    var innerArrayLength = outPutDisplay[i].length;
    // loop the inner array
    for (let j = 0; j < innerArrayLength; j++) {
       console.log("=====outPutDisplay[i][0]=====",outPutDisplay[i][0]);
       if( j%2==0 && outPutDisplay[i][0] =='h' &&  search_245_title('b',outPutDisplay)==false){
         outPutDisplay[i][j+1]=outPutDisplay[i][j+1]; //////////////////////////////////////////////////////////////////////////.replace(/\[.*?\]/g,"");
       }//if( j%2==0 && outPutDisplay[i][0] =='h' &&  search_245_title('b',outPutDisplay)==false){
    }//inner loop
}//outer loop
return outPutDisplay;
}//create_output_for_245_title(delimter,outPutDisplay)

function send_245_to_webpage(outPutArray){
//var hasDelim=false;
var build_title_str='';
for (let i = 0; i < outPutArray.length; i++) {
    // get the size of the inner array
    var innerArrayLength = outPutArray[i].length;
    // loop the inner array
    for (let j = 0; j < innerArrayLength; j++) {
       if( j%2==0){
         build_title_str+= '<span class="bib_title ' + 'MARC_245' +  outPutArray[i][0] + '">'   + outPutArray[i][j+1] + ' </span>';
       }//if( j%2==0 && outPutDisplay[i][0] =='h' &&  search_245_title('b',outPutDisplay)==false){
    }//inner loop
}//outer loop
return build_title_str;
}//create_output_for_245_title(delimter,outPutDisplay)    

//function getTitle(bib) { //abcfghknps THIS IS NR!!!!!!!! no foreach here  watch link building too
var getTitle4SRP_ext = function(bib) {        
console.log("OPC2-----------------------------------THIS-----------------------------------------------", $(this) );    
//always return titleStr to calling function and this includes the SRP as well.        
    var properlyFormattedHtmlString = 'test';
    var hasBsubField = false;
    var titleStr = '';

//var hasBfield=false;
var outPutDisplay = [];
var outPutDisplay2 = [];
//$("debugmarcouter").hide();
    if (bib.marc.has('245')) { //if has 245
        var data245=bib.marc._marc.fields[bib.marc._marc.fields.indexOf('245')+1];
        console.log("data245",data245);
        console.log("data24522222",data245.subfields.length); 


//outPutDisplay2.push('<div class="debugmarc">');
//outPutDisplay2.push('<h4 class="debugmarc">Raw MARC 245 below, for debugging only, followed by reformulated patron view of title</h4>');        
//outPutDisplay2.push('<span class="debugmarc" style="font-size:16px; font-weight:bold; font-style:italic;" ><b>ind1&nbsp;&nbsp;'+ data245.ind1 + '</b></span><br>' + '<span  class="debugmarc" style="font-size:16px; font-weight:bold; font-style:italic;"><b>ind2&nbsp;&nbsp;'+ data245.ind2 + '</b></span><br><br');



        for (let i = 0; i < data245.subfields.length; i++) {
        if(i%2 == 0){
        //if(data245.subfields[i]=='b')hasBfield=true;
        outPutDisplay.push([data245.subfields[i],data245.subfields[i+1]]);
        //outPutDisplay2.push('<span class="debugmarc" style="font-size:14px; color:red; font-weight:bold; font-style:italic;" ><b>'+ [ data245.subfields[i] + '</b></span>' + '&nbsp;&nbsp;'+ '<span class="debugmarc"  style="font-size:14px; color:green; font-weight:bold; font-style:italic;"><b>'+ data245.subfields[i+1] ] + '</b></span><br>');
        }//if(i%2 == 0){  

        } //for  

        console.log("outPutDisplay",outPutDisplay);
        console.table(outPutDisplay);
        //$('body').append( print(myObject) );
       // outPutDisplay2.push('</div>');
       // $('#newbibdetailsection').append( '<div class="debugmarcouter">'  + outPutDisplay2 + '</div>');


        // loop the outer array
        for (let i = 0; i < outPutDisplay.length; i++) {
        // get the size of the inner array
        var innerArrayLength = outPutDisplay[i].length;
        // loop the inner array
        for (let j = 0; j < innerArrayLength; j++) {
        console.log('[' + i + ',' + j + '] = ' + outPutDisplay[i][j]);
        }
        }

        properlyFormattedHtmlString = create_output_for_245_title(outPutDisplay);
        //properlyFormattedHtmlString2 = create_output_for_245_title2(outPutDisplay2);
        console.log("00properlyFormattedHtmlString99",properlyFormattedHtmlString);
        titleStr = send_245_to_webpage(properlyFormattedHtmlString);
        //var titleStr2 = send_245_to_webpage(properlyFormattedHtmlString2);
        console.log("11titleStr",titleStr);

        //title_ext
        // console.log("bibsssssssssssssssssssssssssssss",bib);
        // properlyFormattedHtmlString = bib.title_ext  + ' <---from bib.title_ext variable';
    } //end if has 245  
   
    ////MONDAY//Tues////console.log(properlyFormattedHtmlString);
   // titleStr = bib.title_ext;
  //  $(document).prop('title', bib.title_ext + ' - University of Hartford Libraries Catalog');    
   // return properlyFormattedHtmlString;
  // return titleStr;
return '<span class="display_title_srp"><a class="title xyz" ng-href="/app/work/' + bib.id + '"  href="/app/work/' + bib.id + '">' + titleStr + '</a></span>';    
        console.log("#===properlyFormattedHtmlString",properlyFormattedHtmlString);
} //end of function getTitle()   