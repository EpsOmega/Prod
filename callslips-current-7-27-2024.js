/* This data and functions below determine whether or not a BDR page keeps the Call slip/Place Hold or not.*/
// Any Homebranch other than Mortensen and Allen are ignored since they do not get a Call Slip.
//These 2 variables below are GLOBAL to the Koha application, links_stay_ below is for Mortensen and itemtype and below that for location. These are GOOD itemtypes in the arrays below
var global_links_stay_for_MortyITEMTYPE=['BOOK', 'BOOK7', 'BOOK14','CASSETTE','CD', 'CDROM' , 'CLABEQUIP', 'DVD', 'DVD7', 'DVD28', 'DVDROM72','KIT', 'LP', 'MINISCORE', 'MIXM','OVER', 'PARTS', 'PERS7DAY', 'PERSTERM', 'REF', 'SC', 'SCORE', 'SCORECD', 'SCPTNC','THESIS', 'TMPCOPY', 'TRIPODTERM', 'VHS', 'VIDEOGUIDE', 'VSCORE'];

var global_links_stay_for_MortyLOCATION=[];// This array is empty right now, but is ready to go if needed in the code below. Do not add locations here unless you fully understand the implications as coded below.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//These 2 variables below are GLOBAL to the Koha application,  links_stay_ below is for Allen and itemtype and below that for location. These are GOOD itemtypes in the arrays below
var global_links_stay_for_AllenITEMTYPE=['BOOK', 'BOOK7', 'BOOK14','BOOKNC', 'CASSETTE', 'CD', 'CDROM','CLABEQUIP', 'DVD', 'DVD7', 'DVD28', 'DVDROM72','KIT', 'LP', 'MINISCORE', 'MIXM', 'OVER', 'PARTS',  'PERS7DAY', 'PERSTERM', 'REF', 'SC', 'SCORE', 'SCORECD',  'SCPT', 'THESIS', 'TMPCOPY', 'TRIPODTERM', 'VHS',  'VIDEOGUIDE', 'VSCORE'];

var global_links_stay_for_AllenLOCATION=[];// This array is empty right now, but is ready to go if needed in the code below. Do not add locations here unless you fully understand the implications as coded below.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////******************************************************************///////////////////////////////////////////////////////////
//  || means OR   && means AND    <---- Javascript syntax 
//Code Overview below
// Assume now the Morty location array is var global_links_stay_for_MortyLOCATION = ['PERMRES'];
//Below is a conditional using OR (||) . The way it is currently written is if for example ITEMTYPE of PERMRES gets added to the Morty location array the statement below
//if(  ($.inArray(itemtype, global_links_stay_for_MortyITEMTYPE)>=0) || ($.inArray(location, global_links_stay_for_MortyLOCATION)>=0) )
//return true; //this indicates an item is a good item
// return true for any resource being held at location PERMRES - this may or may not be what you want.
// But say for example you want only BOOK4 ITEMTYPES to be GOOD items that get Call slips
// You would have to alter the conditional to read:
//if(   ($.inArray(itemtype, global_links_stay_for_MortyITEMTYPE)>=0) || (($.inArray(location, global_links_stay_for_MortyLOCATION)>=0) && itemtype=='BOOK4')  )return true; //this indicates an item is a good item
//Notice more parens are wrapped around the second expression and more importantly the second expression only evaluates to TRUE when an itemtype is both in PERMRES AND also of itemtype BOOK4
//Otherwise without this structure you could end with ALL items in PERMRES getting Call Slip links - most likely what was not the original intent. 
//This alternative structure is not the only one that could be required, meaning depending on the scenario another conditional might be required.
//But having said that it is not difficult to construct - just needs some thought on what the implications are on every single resource in the entire collection. 
/////////////////////////////////////////////////////////******************************************************************///////////////////////////////////////////////////////////

//Pass in a Morty Holdings item ( using only itemtype and location )and determine link status. The link can stay on the page or be removed. If none of the items in the calling program have at least one item that remains on the page ( returns true below ) then the CS/PH link is removed from that BDR page.
function G_determineMortyCS_status(itemtype,location) {
if(  ($.inArray(itemtype, global_links_stay_for_MortyITEMTYPE)>=0) || ($.inArray(location, global_links_stay_for_MortyLOCATION)>=0) )return true; //this indicates an item is a good item
return false; //return false when the specific holdings item and for itemtype / location is not found in the GOOD Morty arrays defined above
}//eof function determineMortyCS_status(itemtype,location) {


//Pass in an Allen Holdings item ( using only itemtype and location ) and determine link status. The link can stay on the page or be removed. If none of the items in the calling program have at least one item that remains on the page ( returns true below) then the CS/PH link is removed from that BDR page.
function G_determineAllenCS_status(itemtype,location) {
if(  ($.inArray(itemtype, global_links_stay_for_AllenITEMTYPE)>=0) || ($.inArray(location, global_links_stay_for_AllenLOCATION)>=0) )return true; //this indicates an item is a good item
return false; //return false when the specific holdings item and for itemtype / location is not found in the GOOD Allen arrays defined above
}//eof function G_determineAllenCS_status(itemtype,location) {

/*Original itemtype list exhaustive -  Yes / No below may not be correct
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
NO  ACADAPTER: { itemtype: "ACADAPTER", description: "AC Adapter"}
NO  ACCESSORY: { itemtype: "ACCESSORY", description: "Equipment Accessory"}
NO  ACCESSORY1: {itemtype: "ACCESSORY1", description: "Equipment Accessory, 1-Day Loan"}
NO  ACCESSORY3: {itemtype: "ACCESSORY3", description: "Equipment Accessory, 3-Day Loan"}
NO  ACCESSORYC: {itemtype: "ACCESSORYC", description: "Equipment Accessory, Due at Close"}
NO  ACCS2HR: {itemtype: "ACCS2HR", description: "Equipment Accessory, 2-Hour Loan"}
NO  ACCS4HR: {itemtype: "ACCS4HR", description: "Equipment Accessory, 4-Hour Loan"}
NO  AUDIOREC: {itemtype: "AUDIOREC", description: "Audio Recorder"}
YES BOOK: {itemtype: "BOOK", description: "Book"}
NO  BOOK1: {itemtype: "BOOK1", description: "Book, 1 Hour Loan"}
NO  BOOK2: {itemtype: "BOOK2", description: "Book, 2 Hour Loan"}
YES BOOK3: {itemtype: "BOOK3", description: "Book, 3 Day Loan"}
NO  BOOK4: {itemtype: "BOOK4", description: "Book, 4 Hour Loan"}
YES BOOK7: {itemtype: "BOOK7", description: "Book, 7 Day Loan"}
YES BOOK14: {itemtype: "BOOK14", description: "Book, 14 Day Loan"}
NO  BOOK24: {itemtype: "BOOK24", description: "Book, 24 Hour Loan"}
NO  BOOK48: { itemtype: "BOOK48", description: "Book, 48 Hour Loan"}
NO  BOOK72: {itemtype: "BOOK72", description: "Book, 72 Hour Loan"}
YES BOOKNC: { itemtype: "BOOKNC", description: "Non Circulating Book"}
NO  CALC: {itemtype: "CALC", description: "Calculator"}
NO  CALCKIT: {itemtype: "CALCKIT", description: "Calculator Kit"}
NO  CAMCORDER: {itemtype: "CAMCORDER", description: "Camcorder"}
NO  CAMCORTERM: {itemtype: "CAMCORTERM", description: "Camcorder, Term Loan"}
NO  CASE: {itemtype: "CASE", description: "Carrying Case"}
YES CASSETTE: {itemtype: "CASSETTE", description: "Audio Cassette"}
YES CASSETTE4: {itemtype: "CASSETTE4", description: "Audio Cassette, 4 Hour Loan"}
YES CD: {itemtype: "CD", description: "Audio CD"}
YES CD4: {itemtype: "CD4", description: "Audio CD, 4 Hour Loan"}
YES CD48: {itemtype: "CD48", description: "Audio CD, 48 Hour Loan"}
YES CD72: {itemtype: "CD72", description: "Audio CD, 72 Hour Loan"}
YES CDNC: {itemtype: "CDNC", description: "Non Circulating CD"}
YES CDROM: { itemtype: "CDROM", description: "CD-ROM Computer File"}
YES CDROM4: {itemtype: "CDROM4", description: "CD-ROM, 4 Hour Loan"}
YES CDROMNC: {itemtype: "CDROMNC", description: "Non Circulating CD-ROM"}
YES CLABEQUIP: {itemtype: "CLABEQUIP", description: "Curriculum Lab Equipment"}
NO  COMPKEYB: {itemtype: "COMPKEYB", description: "Computer Keyboard"}
NO  COPY4: {itemtype: "COPY4", description: "Copy, 4 Hour Loan"}
NO  COPY24: {itemtype: "COPY24", description: "Copy, 24 Hour Loan"}
NO  DISCWASHER: {itemtype: "DISCWASHER", description: "Discwasher"}
NO  DRYBOARD: {itemtype: "DRYBOARD", description: "Dry Erase Board"}
YES DVD: {itemtype: "DVD", description: "DVD"}
NO  DVD2: {itemtype: "DVD2", description: "DVD, 2 Hour Loan"}
NO  DVD4: {itemtype: "DVD4", description: "DVD, 4 Hour Loan"}
YES DVD7: { itemtype: "DVD7", description: "DVD, 7 Day Loan"}
NO  DVD24: {itemtype: "DVD24", description: "DVD, 24 Hour Loan"}
YES DVD28: {itemtype: "DVD28", description: "DVD, 28 Day Loan"}
YES DVD48: {itemtype: "DVD48", description: "DVD, 48 Hour Loan"}
YES DVDNC: {itemtype: "DVDNC", description: "Non Circulating DVD"}
YES DVDRNC: {itemtype: "DVDRNC", description: "Non Circulating DVDR"}
YES DVDROM72: {itemtype: "DVDROM72", description: "DVD-ROM 3 Day Loan"}
NO  ELECRES: {itemtype: "ELECRES", description: "Electronic Resource"}
NO  EXTCORD: { itemtype: "EXTCORD", description: "Extension Cord"}
NO  FILMREEL: {itemtype: "FILMREEL", description: "Film Reel, 16 mm"}
NO  HARTTORCH: { itemtype: "HARTTORCH", description: "Hartt Performance Library Printed Music"}
NO  HEADPHONES: {itemtype: "HEADPHONES", description: "Headphones"}
NO  HPO: { itemtype: "HPO", description: "Hartt Performance Library Materials"}
NO  INSTRUMENT: { itemtype: "INSTRUMENT", description: "Instrument"}
NO  IPAD: { itemtype: "IPAD", description: "iPad"}
NO  IPAD3: { itemtype: "IPAD3", description: "iPad, 3-Day Loan"}
NO  KEY: {itemtype: "KEY", description: "Key"}
NO  KEYBOARDS: { itemtype: "KEYBOARDS", description: "Midi Keyboards"}
YES KIT: { itemtype: "KIT", description: "Kit"}
NO  LAPTOP: { itemtype: "LAPTOP", description: "Laptop"}
YES LP: {itemtype: "LP", description: "LP"}
NO  LP4: { itemtype: "LP4", description: "LP, 4 Hour Loan"}
NO  MARKERSET: {itemtype: "MARKERSET", description: "Dry Erase Marker Set"}
NO  METRONOME: { itemtype: "METRONOME", description: "Metronome"}
NO  MIC: {itemtype: "MIC", description: "Microphone"}
NO  MICROFORM: { itemtype: "MICROFORM", description: "Microform"}
YES MINISCORE: {itemtype: "MINISCORE", description: "Mini Score"}
YES MINISCORE4: {itemtype: "MINISCORE4", description: "Mini Score, 4 Hour Loan"}
YES MIXM: {itemtype: "MIXM", description: "Mixed Media"}
YES MIXM4: {itemtype: "MIXM4", description: "Mixed Media, 4 Hour Loan"}
NO  MOUSE: {itemtype: "MOUSE", description: "Mouse"}
NO  MUSINSTSEM: { itemtype: "MUSINSTSEM", description: "MusInstSem"}
NO  NEWSPAPER: { itemtype: "NEWSPAPER", description: "Newspaper"}
YES OVER: { itemtype: "OVER", description: "Oversized Book"}
NO  OVER2: { itemtype: "OVER2", description: "Oversized, 2 Hour Loan"}
YES PARTS: {itemtype: "PARTS", description: "Parts"}
YES PARTS4: { itemtype: "PARTS4", description: "Parts, 4 Hour Loan"}
YES PARTSNC: {itemtype: "PARTSNC", description: "Non Circulating Parts"}
NO  PER2: {itemtype: "PER2", description: "Periodical, 2 Hour Loan"}
NO  PER4: { itemtype: "PER4", description: "Periodical, 4 Hour Loan"}
YES PERIODICAL: {itemtype: "PERIODICAL", description: "Periodical"}
NO  PERS2: { itemtype: "PERS2", description: "Personal Copy, 2 Hour Loan"}
NO  PERS4: { itemtype: "PERS4", description: "Personal Copy, 4 Hour Loan"}
YES PERS7DAY: {itemtype: "PERS7DAY", description: "Personal Copy, 7 Day Loan"}
NO  PERS24: { itemtype: "PERS24", description: "Personal Copy, 24 Hour Loan"}
NO  PERS48: {itemtype: "PERS48", description: "Personal Copy, 48 Hour Loan"}
NO  PERS72: {itemtype: "PERS72", description: "Personal Copy, 72 Hour Loan"}
YES PERSTERM: { itemtype: "PERSTERM", description: "Personal Copy, Term Loan"}
NO  PLAYBACK7: { itemtype: "PLAYBACK7", description: "Playback Equipment, 7 Day Loan"}
NO  PRAYERRUG: { itemtype: "PRAYERRUG", description: "Prayer Rug (4 hour loan)"}
NO  PROJECTOR: { itemtype: "PROJECTOR", description: "Projector"}
YES REF: { itemtype: "REF", description: "Reference"}
NO  REMOTECTRL: { itemtype: "REMOTECTRL", description: "Remote Control"}
YES SC: { itemtype: "SC", description: "Score and Parts"}
YES SCORE: {itemtype: "SCORE", description: "Score"}
YES SCORE4: { itemtype: "SCORE4", description: "Score, 4 Hour Loan"}
YES SCORECD: { itemtype: "SCORECD", description: "Score and CD"}
YES SCORENC: { itemtype: "SCORENC", description: "Non Circulating Score"}
YES SCPT: {itemtype: "SCPT", description: "Score and Part"}
YES SCPT4: {itemtype: "SCPT4", description: "Score and Part, 4 Hour Loan"}
YES SCPTNC: { itemtype: "SCPTNC", description: "Non Circulating Score and Part"}
NO  STREAMVID: { itemtype: "STREAMVID", description: "Streaming Video"}
NO  STYLUS: { itemtype: "STYLUS", description: "Stylus"}
NO  SURGPRO: { itemtype: "SURGPRO", description: "Surge Protector"}
YES THESIS: {itemtype: "THESIS", description: "Thesis"}
YES THESIS4: {itemtype: "THESIS4", description: "Thesis, 4 Hour Loan"}
YES THESISNC: {itemtype: "THESISNC", description: "Non Circulating Thesis"}
YES TMPCOPY: {itemtype: "TMPCOPY", description: "Temporary copy created via fast add"}
NO  TRIPOD: {itemtype: "TRIPOD", description: "Tripod"}
YES TRIPODTERM: {itemtype: "TRIPODTERM", description: "Tripod, Term Loan"}
YES VHS: { itemtype: "VHS", description: "VHS Videocassette"}
YES VHS4: {itemtype: "VHS4", description: "VHS, 4 Hour Loan"}
YES VHSNC: { itemtype: "VHSNC", description: "Non Circulating VHS"}
YES VIDEOGUIDE: { itemtype: "VIDEOGUIDE", description: "Video Guide"}
YES VSCORE: {itemtype: "VSCORE", description: "Vocal Score"}
YES VSCORE4: {itemtype: "VSCORE4", description: "Vocal Score, 4 Hour Loan"}
YES VSCORENC: { itemtype: "VSCORENC", description: "Non Circulating VScore"}
NO  WEBCAM: { itemtype: "WEBCAM", description: "Webcam"}
NO  YJACK: { itemtype: "YJACK", description: "Y-Jack"}

CASSETTE4 no
CD4 no
CD48 no
CD72 no
CDROM4 no
DVD48 no
MINISCORE4 no
MIXM4 no
PARTS4 no
SCORE4 no
SCPT4 no
THESIS4 no
VHS4 no
VSCORE4 no

*/