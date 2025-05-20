//This code is within the DL's BDR section
//$('#newbibdetailsection').append('<div class="bdr-newbibdata newtitle">' + '<h4 class="display_title">' + getTitle4BDR_ext(bib) + '</h4>' + '</div>');
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/lah/getTitle4BDR_ext.js"></script> <--- add to header.html for BDR title
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/lah/getTitle4SRP_ext.js"></script> <--- add to header.html for SRP title
//Moved to
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/2024/prod/js/getTitle4BDR_ext.js"></script> <--- add to header.html for BDR title
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/2024/prod/js/getTitle4SRP_ext.js"></script> <--- add to header.html for SRP title

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
var getTitle4BDR_ext = function(bib) {        
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


        for (let i = 0; i < data245.subfields.length; i++) {
        if(i%2 == 0){
        //if(data245.subfields[i]=='b')hasBfield=true;
        outPutDisplay.push([data245.subfields[i],data245.subfields[i+1]]);
        //outPutDisplay2.push('<span class="debugmarc" style="font-size:14px; color:red; font-weight:bold; font-style:italic;" ><b>'+ [ data245.subfields[i] + '</b></span>' + '&nbsp;&nbsp;'+ '<span class="debugmarc"  style="font-size:14px; color:green; font-weight:bold; font-style:italic;"><b>'+ data245.subfields[i+1] ] + '</b></span><br>');
        }//if(i%2 == 0){  

        } //for  

        console.log("outPutDisplay",outPutDisplay);
        console.table(outPutDisplay);

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
    } //end if has 245  

return '<span class="display_title_bdr"><a class="title xyz" ng-href="/app/work/' + bib.id + '"  href="/app/work/' + bib.id + '">' + titleStr + '</a></span>';    
        console.log("#===properlyFormattedHtmlString",properlyFormattedHtmlString);
} //end of function getTitle()   


/*<h4 class="display_title">
<span class="subfield marc245a">Lieder. </span>
<span class="subfield marc245b">opus 10-opus 41] / </span>
<span class="subfield titleText marc245c">Richard Strauss ; herausgegeben von = edited by = edité par Dr. Franz Trenner.</span><span class="subfield marc245n">Vol. 1, </span>
<span class="subfield marc245p">[Lieder für eine Singstimme und Klavier = voice and piano = chant et piano : </span>
</h4>*/