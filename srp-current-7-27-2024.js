//var ourDefaultCDNpath=$('#cdn').html();   
//console.log('========================= srp', ourDefaultCDNpath );
    var process_search_results = function(field, bib,ourDefaultCDNpath) {
        //var ourDefaultCDNpath='https://libweb.hartford.edu/koha';
        console.log("field,bib", field, bib,ourDefaultCDNpath);
        var console_debug = true; // send any debug info to console?
        console.log('authvalsObj', window.authvalsObj.LOC);
        /*CCODE   AUDIOCASSE  Audio cassettes
        CCODE   AUDIOCD Audio CDs
        CCODE   BOOK    Books
        CCODE   DVD DVDs
        CCODE   E-RESOURCE  Electronic Resources
        CCODE   EQUIPMENT   Equipment
        CCODE   INSTRUMENT  Instruments
        CCODE   LPS LPs
        CCODE   MIXEDMEDIA  Mixed Media
        CCODE   NEWSPAPERS  Newspapers
        CCODE   PERIODICAL  Periodicals
        CCODE   SCORES  Scores
        CCODE   THESES  Theses
        CCODE   VHS  VHS Videocassettes*/
        var CCodes = {
            "AUDIOCASSE": "Audio cassettes",
            "AUDIOCD": "Audio CDs",
            "BOOK": "Books",
            "CD-ROMS": "CD-ROMs",
            "DVD": "DVDs",
            "E-RESOURCE": "Electronic Resources",
            "EQUIPMENT": "Equipment",
            "INSTRUMENT": "Instruments",
            "LPS": "LPs",
            "MIXEDMEDIA": "Mixed Media",
            "NA": "Periodicals.",
            "NEWSPAPERS": "Newspapers",
            "PERIODICAL": "Periodicals",
            "SCORES": "Scores",
            "THESES": "Theses",
            "VHS": "VHS Videocassettes"
        };
        var relatorTranslators = {
            "abr": "Abridger",
            "acp": "Art copyist",
            "act": "Actor",
            "adi": "Art director",
            "adp": "Adapter",
            "aft": "Author of afterword, colophon, etc.",
            "anl": "Analyst",
            "anm": "Animator",
            "ann": "Annotator",
            "ant": "Bibliographic antecedent",
            "ape": "Appellee",
            "apl": "Appellant",
            "app": "Applicant",
            "aqt": "Author in quotations or text abstracts",
            "arc": "Architect",
            "ard": "Artistic director",
            "arr": "Arranger",
            "art": "Artist",
            "asg": "Assignee",
            "asn": "Associated name",
            "ato": "Autographer",
            "att": "Attributed name",
            "auc": "Auctioneer",
            "aud": "Author of dialog",
            "aui": "Author of introduction, etc.",
            "aus": "Screenwriter",
            "aut": "Author",
            "bdd": "Binding designer",
            "bjd": "Bookjacket designer",
            "bkd": "Book designer",
            "bkp": "Book producer",
            "blw": "Blurb writer",
            "bnd": "Binder",
            "bpd": "Bookplate designer",
            "brd": "Broadcaster",
            "brl": "Braille embosser",
            "bsl": "Bookseller",
            "cas": "Caster",
            "ccp": "Conceptor",
            "chr": "Choreographer",
            "cli": "Client",
            "cll": "Calligrapher",
            "clr": "Colorist",
            "clt": "Collotyper",
            "cmm": "Commentator",
            "cmp": "Composer",
            "cmt": "Compositor",
            "cnd": "Conductor",
            "cng": "Cinematographer",
            "cns": "Censor",
            "coe": "Contestant-appellee",
            "col": "Collector",
            "com": "Compiler",
            "con": "Conservator",
            "cor": "Collection registrar",
            "cos": "Contestant",
            "cot": "Contestant-appellant",
            "cou": "Court governed",
            "cov": "Cover designer",
            "cpc": "Copyright claimant",
            "cpe": "Complainant-appellee",
            "cph": "Copyright holder",
            "cpl": "Complainant",
            "cpt": "Complainant-appellant",
            "cre": "Creator",
            "crp": "Correspondent",
            "crr": "Corrector",
            "crt": "Court reporter",
            "csl": "Consultant",
            "csp": "Consultant to a project",
            "cst": "Costume designer",
            "ctb": "Contributor",
            "cte": "Contestee-appellee",
            "ctg": "Cartographer",
            "ctr": "Contractor",
            "cts": "Contestee",
            "ctt": "Contestee-appellant",
            "cur": "Curator",
            "cwt": "Commentator for written text",
            "dbp": "Distribution place",
            "dfd": "Defendant",
            "dfe": "Defendant-appellee",
            "dft": "Defendant-appellant",
            "dgg": "Degree granting institution",
            "dgs": "Degree supervisor",
            "dis": "Dissertant",
            "dln": "Delineator",
            "dnc": "Dancer",
            "dnr": "Donor",
            "dpc": "Depicted",
            "dpt": "Depositor",
            "drm": "Draftsman",
            "drt": "Director",
            "dsr": "Designer",
            "dst": "Distributor",
            "dtc": "Data contributor",
            "dte": "Dedicatee",
            "dtm": "Data manager",
            "dto": "Dedicator",
            "dub": "Dubious author",
            "edc": "Editor of compilation",
            "edm": "Editor of moving image work",
            "edt": "Editor",
            "egr": "Engraver",
            "elg": "Electrician",
            "elt": "Electrotyper",
            "eng": "Engineer",
            "enj": "Enacting jurisdiction",
            "etr": "Etcher",
            "evp": "Event place",
            "exp": "Expert",
            "fac": "Facsimilist",
            "fds": "Film distributor",
            "fld": "Field director",
            "flm": "Film editor",
            "fmd": "Film director",
            "fmk": "Filmmaker",
            "fmo": "Former owner",
            "fmp": "Film producer",
            "fnd": "Funder",
            "fpy": "First party",
            "frg": "Forger",
            "gis": "Geographic information specialist",
            "-gr": "t Graphic technician",
            "his": "Host institution",
            "hnr": "Honoree",
            "hst": "Host",
            "ill": "Illustrator",
            "ilu": "Illuminator",
            "ins": "Inscriber",
            "inv": "Inventor",
            "isb": "Issuing body",
            "itr": "Instrumentalist",
            "ive": "Interviewee",
            "ivr": "Interviewer",
            "jud": "Judge",
            "jug": "Jurisdiction governed",
            "lbr": "Laboratory",
            "lbt": "Librettist",
            "ldr": "Laboratory director",
            "led": "Lead",
            "lee": "Libelee-appellee",
            "lel": "Libelee",
            "len": "Lender",
            "let": "Libelee-appellant",
            "lgd": "Lighting designer",
            "lie": "Libelant-appellee",
            "lil": "Libelant",
            "lit": "Libelant-appellant",
            "lsa": "Landscape architect",
            "lse": "Licensee",
            "lso": "Licensor",
            "ltg": "Lithographer",
            "lyr": "Lyricist",
            "mcp": "Music copyist",
            "mdc": "Metadata contact",
            "med": "Medium",
            "mfp": "Manufacture place",
            "mfr": "Manufacturer",
            "mod": "Moderator",
            "mon": "Monitor",
            "mrb": "Marbler",
            "mrk": "Markup editor",
            "msd": "Musical director",
            "mte": "Metal-engraver",
            "mtk": "Minute taker",
            "mus": "Musician",
            "nrt": "Narrator",
            "opn": "Opponent",
            "org": "Originator",
            "orm": "Organizer",
            "osp": "Onscreen presenter",
            "oth": "Other",
            "own": "Owner",
            "pan": "Panelist",
            "pat": "Patron",
            "pbd": "Publishing director",
            "pbl": "Publisher",
            "pdr": "Project director",
            "pfr": "Proofreader",
            "pht": "Photographer",
            "plt": "Platemaker",
            "pma": "Permitting agency",
            "pmn": "Production manager",
            "pop": "Printer of plates",
            "ppm": "Papermaker",
            "ppt": "Puppeteer",
            "pra": "Praeses",
            "prc": "Process contact",
            "prd": "Production personnel",
            "pre": "Presenter",
            "prf": "Performer",
            "prg": "Programmer",
            "prm": "Printmaker",
            "prn": "Production company",
            "pro": "Producer",
            "prp": "Production place",
            "prs": "Production designer",
            "prt": "Printer",
            "prv": "Provider",
            "pta": "Patent applicant",
            "pte": "Plaintiff-appellee",
            "ptf": "Plaintiff",
            "pth": "Patent holder",
            "ptt": "Plaintiff-appellant",
            "pup": "Publication place",
            "rbr": "Rubricator",
            "rcd": "Recordist",
            "rce": "Recording engineer",
            "rcp": "Addressee",
            "rdd": "Radio director",
            "red": "Redaktor",
            "ren": "Renderer",
            "res": "Researcher",
            "rev": "Reviewer",
            "rpc": "Radio producer",
            "rps": "Repository",
            "rpt": "Reporter",
            "rpy": "Responsible party",
            "rse": "Respondent-appellee",
            "rsg": "Restager",
            "rsp": "Respondent",
            "rsr": "Restorationist",
            "rst": "Respondent-appellant",
            "rth": "Research team head",
            "rtm": "Research team member",
            "sad": "Scientific advisor",
            "sce": "Scenarist",
            "scl": "Sculptor",
            "scr": "Scribe",
            "sds": "Sound designer",
            "sec": "Secretary",
            "sgd": "Stage director",
            "sgn": "Signer",
            "sht": "Supporting host",
            "sll": "Seller",
            "sng": "Singer",
            "spk": "Speaker",
            "spn": "Sponsor",
            "spy": "Second party",
            "srv": "Surveyor",
            "std": "Set designer",
            "stg": "Setting",
            "stl": "Storyteller",
            "stm": "Stage manager",
            "stn": "Standards body",
            "str": "Stereotyper",
            "tcd": "Technical director",
            "tch": "Teacher",
            "ths": "Thesis advisor",
            "tld": "Television director",
            "tlp": "Television producer",
            "trc": "Transcriber",
            "trl": "Translator",
            "tyd": "Type designer",
            "tyg": "Typographer",
            "uvp": "University place",
            "vac": "Voice actor",
            "vdg": "Videographer",
            "voc": "Vocalist",
            "wac": "Writer of added commentary",
            "wal": "Writer of added lyrics",
            "wam": "Writer of accompanying material",
            "wat": "Writer of added text",
            "wdc": "Woodcutter",
            "wde": "Wood engraver",
            "win": "Writer of introduction",
            "wit": "Witness",
            "wpr": "Writer of preface",
            "wst": "Writer of supplementary textual content"
        };


        var getTitle4SRP = function(bib) {
            //change this to for each if need be, and watch for reaaranged fields
            console.log("getTitle4SRP",bib);
            var properlyFormattedHtmlString = '';
            var strippedH = '',
                strippedA = '',
                strippedB = '';
            if (bib.marc.has('245')) { //if has 245
                if (bib.marc.subfield('245a') !== undefined && bib.marc.subfield('245a') !== null) {
                    strippedA = bib.marc.subfield('245a');
                    strippedA = strippedA.replace("[and]", "and");
                    strippedA = strippedA.replace("[for]", "for");
                    // strippedA = strippedA.replace(/[\[\]']+/g, ''); //remove [] ex. [sound]
                    strippedA = strippedA.replace(/\.$/, ""); //last dot with a space char
                    properlyFormattedHtmlString = '<span class="subfield marc245a">' + strippedA + ' ' + '</span>'; //Simple assignment no +=
                }
                if (bib.marc.subfield('245h') !== undefined && bib.marc.subfield('245h') !== null) {
                    var punctuationOnly = bib.marc.subfield('245h');
                    var punctuationOnly2 = punctuationOnly.replace(/(\[.+\])/g, '');
                    properlyFormattedHtmlString += '<span class="subfield marc245h">' + punctuationOnly2 + ' ' + '</span>';
                }
                if (bib.marc.subfield('245b') !== undefined && bib.marc.subfield('245b') !== null) {
                    strippedB = bib.marc.subfield('245b');
                    strippedB = strippedB.replace(/\.$/, ""); //last dot with a space char
                    strippedB = strippedB.replace("[", ""); //
                    strippedB = strippedB.replace("]", ""); //
                    properlyFormattedHtmlString += '<span class="subfield marc245b">' + strippedB + ' ' + '</span>';
                }
                if (bib.marc.subfield('245c') !== undefined && bib.marc.subfield('245c') !== null) {
                    var strippedH2 = bib.marc.subfield('245c');
                    strippedH2 = strippedH2.replace(/[\[\]]+/g, ''); //remove [] ex. [sound]
                    strippedH2 = strippedH2.replace(/\.$/, ""); //last dot with a space char
                    properlyFormattedHtmlString += '<span class="subfield marc245c">' + strippedH2 + ' ' + '</span>';
                }
                if (bib.marc.subfield('245f') !== undefined && bib.marc.subfield('245f') !== null) {
                    properlyFormattedHtmlString += '<span class="subfield marc245f">' + bib.marc.subfield('245f') + ' ' + '</span>';
                }
                if (bib.marc.subfield('245g') !== undefined && bib.marc.subfield('245g') !== null) {
                    properlyFormattedHtmlString += '<span class="subfield marc245g">' + bib.marc.subfield('245g') + ' ' + '</span>';
                }
                if (bib.marc.subfield('245k') !== undefined && bib.marc.subfield('245k') !== null) {
                    properlyFormattedHtmlString += '<span class="subfield marc245k">' + bib.marc.subfield('245k') + ' ' + '</span>';
                }
                if (bib.marc.subfield('245n') !== undefined && bib.marc.subfield('245n') !== null) {
                    properlyFormattedHtmlString += '<span class="subfield marc245n">' + bib.marc.subfield('245n') + ' ' + '</span>';
                }
                if (bib.marc.subfield('245p') !== undefined && bib.marc.subfield('245p') !== null) {
                    properlyFormattedHtmlString += '<span class="subfield marc245p">' + bib.marc.subfield('245p') + ' ' + '</span>';
                }
                if (bib.marc.subfield('245s') !== undefined && bib.marc.subfield('245s') !== null) {
                    properlyFormattedHtmlString += '<span class="subfield marc245s">' + bib.marc.subfield('245s') + ' ' + '</span>';
                }
                //  properlyFormattedHtmlString = bib.marc.subfield('245a')  + ' ' + bib.marc.subfield('245b')  + ' ' + bib.marc.subfield('245c');
                //    properlyFormattedHtmlString= '<span class="subfield marc245abc font16px">' + properlyFormattedHtmlString + ' ' + '</span>';
            } //end if has 245


            ////////////console.log(properlyFormattedHtmlString);
            //  console.log('<span class="displaylabel_titleSRP"><a class="title" ng-href="/app/work/' + bib.id + '"  href="/app/work/' + bib.id + '">' + properlyFormattedHtmlString + '</a></span>');
            return '<span class="displaylabel_titleSRP"><a class="title" ng-href="/app/work/' + bib.id + '"  href="/app/work/' + bib.id + '">' + properlyFormattedHtmlString + '</a></span>';
        }; //  var getTitle4SRP = function(bib) {

        //////////////////////////////////////////
        var getBy = function(bib) {
            var properlyFormattedHtmlString = '';
            if (bib.marc.rtype() === 'REC') {
                if (bib.marc.has('100')) { //(NR)
                    if (bib.marc.subfield('100') !== null) {
                        properlyFormattedHtmlString += '<span class="marc100">' + bib.marc.subfield('100a') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('100b') !== null) {
                        properlyFormattedHtmlString += '<span class="marc100">' + bib.marc.subfield('100b') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('100c') !== null) {
                        properlyFormattedHtmlString += '<span class="marc100">' + bib.marc.subfield('100c') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('100j') !== null) {
                        properlyFormattedHtmlString += '<span class="marc100">' + bib.marc.subfield('100j') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('100q') !== null) {
                        properlyFormattedHtmlString += '<span class="marc100">' + bib.marc.subfield('100q') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('1004') !== null) {
                        properlyFormattedHtmlString += '<span class="marc100">' + ' - ' + relatorTranslators[bib.marc.subfield('1004')] + '</span>' + '  ';
                    }
                    //properlyFormattedHtmlString = properlyFormattedHtmlString.replace(/\,\s*$/, ""); //Remove last comma (,) & replace it with nothing
                    return '<span class="newbiblabel_inlineSRP">' + 'By:' + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
                } //has 100
                if (bib.marc.has('110')) { //(NR)
                    if (bib.marc.subfield('110a') !== null) {
                        properlyFormattedHtmlString += '<span class="marc110">' + bib.marc.subfield('110a') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('110b') !== null) {
                        properlyFormattedHtmlString += '<span class="marc110">' + bib.marc.subfield('110b') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('110c') !== null) {
                        properlyFormattedHtmlString += '<span class="marc110">' + bib.marc.subfield('110c') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('110j') !== null) {
                        properlyFormattedHtmlString += '<span class="marc110">' + bib.marc.subfield('110j') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('110q') !== null) {
                        properlyFormattedHtmlString += '<span class="marc110">' + bib.marc.subfield('110q') + '</span>' + '  ';
                    }
                    if (bib.marc.subfield('1104') !== null) {
                        properlyFormattedHtmlString += '<span class="marc110">' + ' - ' + relatorTranslators[bib.marc.subfield('1104')] + '</span>' + '  ';
                    }
                    return '<span class="newbiblabel_inlineSRP">' + 'By:' + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
                } //has 110
            } //if( bib.rtype()==='REC' )
            return '';
        }; //eof getBy()
        /////////////////////////////////////////
        //This is By or Performer but in all cases it is the next display text below the title
        var getDisplayTextBelowTitle = function(bib) {
            var properlyFormattedHtmlString = '';
            ////////////console.log("bib.marc.rtype()" , bib.marc.rtype() );
            //If bib record has 511, display output and you are done!
            if (bib.marc.has('511')) { //(NR)
                bib.marc.fields('511').forEach(function(field, i) { //begin forEach
                    for (j = 0; j < field.subfield_data.length; j++) { //for loop
                        if (field.subfield_data[j].code === "a") { //if $a
                            properlyFormattedHtmlString += '<span class="marc511">' + field.subfield_data[j].value + '</span>' + ' | ';
                        } //end if $a
                    } //end for loop
                }); //end forEach
                //code to remove last | char below
                properlyFormattedHtmlString = properlyFormattedHtmlString.replace(/\|\s*$/, ""); //Remove last pipe (|) & replace it with nothing
                return '<span class="newbiblabel_inlineSRP">' + 'Performers:' + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
            } // end if 511 if
            //Row 12 from SS below
            //If no 511 present, show 710 abcdgknp
            //If bib record has 710, show 710 abcdgknp display output and you are done!
            if (bib.marc.rtype() === 'REC') {
                if (bib.marc.has('710')) { //(R)
                    ////////////console.log(bib);
                    bib.marc.fields('710').forEach(function(field, ind) { //(R)
                        for (i = 0; i < field.subfield_data.length; i++) { //for loop
                            if (field.subfield_data[i].code == 'a') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if a
                            if (field.subfield_data[i].code == 'b') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if b
                            if (field.subfield_data[i].code == 'c') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if c
                            if (field.subfield_data[i].code == 'd') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if d
                            if (field.subfield_data[i].code == 'g') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if g
                            if (field.subfield_data[i].code == 'k') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if k
                            if (field.subfield_data[i].code == 'n') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if n
                            if (field.subfield_data[i].code == 'p') {
                                properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                            } //if p
                        } //loop
                        properlyFormattedHtmlString += '| ';
                    }); // end .foreach
                    //   console.log(properlyFormattedHtmlString);
                    properlyFormattedHtmlString = properlyFormattedHtmlString.replace(/\|\s*$/, ""); //Remove last pipe (|) & replace it with nothing
                    return '<span class="newbiblabel_inlineSRP">' + 'Performers:' + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
                } // end  if( bib.has('710') ){ //(R)
                //you are here cuz no 710
                return '';
            } //if( bib.rtype()==='REC' )
            //ss4 abcjq in 100 "$q is not displayed in the DL but should be. Need puncuation to separate 1xx and 7xx name fields (prefer the pipe | but semicolon will work).
            //DL: book with 100 $q not displayed, so can't see fuller form of name. Would also like to suppress $d as it clutters display.
            if (bib.marc.rtype() === 'BKS' || bib.marc.rtype() === 'SCO' || bib.marc.rtype() === 'SER' || bib.marc.rtype() === 'VIS' || bib.marc.rtype() === 'MIX') { //if bks or sco or ser
                properlyFormattedHtmlString = '';
                if (bib.marc.has('100')) { //(NR)
                    /*//////////console.log(    bib.marc.rtype()  );
                    //////////console.log(bib.marc);
                    //////////console.log(bib.id, 'a', bib.marc.subfield('100a')  );
                    //////////console.log(bib.id, 'b', bib.marc.subfield('100b')  );
                    //////////console.log(bib.id, 'c', bib.marc.subfield('100c')  );
                    //////////console.log(bib.id, 'd', bib.marc.subfield('100d')  );      */
                    if (bib.marc.subfield('100a') !== null) {
                        properlyFormattedHtmlString += bib.marc.subfield('100a') + '  ';
                    }
                    if (bib.marc.subfield('100b') !== null) {
                        properlyFormattedHtmlString += bib.marc.subfield('100b') + '  ';
                    }
                    if (bib.marc.subfield('100c') !== null) {
                        properlyFormattedHtmlString += bib.marc.subfield('100c') + '  ';
                    }
                    if (bib.marc.subfield('100j') !== null) {
                        properlyFormattedHtmlString += bib.marc.subfield('100j') + '  ';
                    }
                    if (bib.marc.subfield('100q') !== null) {
                        properlyFormattedHtmlString += bib.marc.subfield('100q') + '  ';
                    }
                    properlyFormattedHtmlString = properlyFormattedHtmlString.replace(/\,\s*$/, ""); //Remove last comma (,) & replace it with nothing
                    //http://hartford.waldo.sandbox.kohalibrary.com/app/search/help%20beatles  result=9 ---->  M.B.A.
                    properlyFormattedHtmlString = '<span class="marc100">' + properlyFormattedHtmlString + '</span>';
                    properlyFormattedHtmlString += ' | ';
                } //if 100
                ////////////console.log ( properlyFormattedHtmlString ); [\s\p{P}]
                if (bib.marc.has('700')) { //(R)
                    ////////////console.log(bib);
                    bib.marc.fields('700').forEach(function(field, ind) { //(R)
                        ////////////console.log("t" , field.subfield('t') );
                        ////////////console.log( "t",  bib.marc.field('700t')  );
                        if (field.subfield('t') == null) {
                            for (i = 0; i < field.subfield_data.length; i++) { //for loop
                                if (field.subfield_data[i].code == 'a') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if a
                                if (field.subfield_data[i].code == 'b') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if b
                                if (field.subfield_data[i].code == 'c') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if c
                                //$d clutters display per TR
                                /* if(field.subfield_data[i].code=='d') {
                                properlyFormattedHtmlString += '<span class="marc700">'  + field.subfield_data[i].value +  '</span>' +  '  ';
                                }//if d*/
                                if (field.subfield_data[i].code == 'g') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if g
                                if (field.subfield_data[i].code == 'k') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if k
                                if (field.subfield_data[i].code == 'n') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if n
                                if (field.subfield_data[i].code == 'p') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if p
                                if (field.subfield_data[i].code == 'q') {
                                    properlyFormattedHtmlString += '<span class="marc700">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if q
                            } //loop
                            properlyFormattedHtmlString += ' | ';
                        } //wrap the for loop
                        // properlyFormattedHtmlString += '| ';
                    }); // end .foreach
                    ////////////console.log(properlyFormattedHtmlString);
                } // end  if( bib.marc.has('700') ){ //(R)
                if (bib.marc.has('710')) { //(R)
                    ////////////console.log(bib);
                    bib.marc.fields('710').forEach(function(field, ind) { //(R)
                        if (field.subfield('t') === null) {
                            for (i = 0; i < field.subfield_data.length; i++) { //for loop
                                if (field.subfield_data[i].code == 'a') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if a
                                if (field.subfield_data[i].code == 'b') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if b
                                if (field.subfield_data[i].code == 'c') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if c
                                //$d clutters display per TR
                                /* if(field.subfield_data[i].code=='d') {
                                properlyFormattedHtmlString += '<span class="marc700">'  + field.subfield_data[i].value +  '</span>' +  '  ';
                                }//if d*/
                                if (field.subfield_data[i].code == 'g') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if g
                                if (field.subfield_data[i].code == 'k') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if k
                                if (field.subfield_data[i].code == 'n') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if n
                                if (field.subfield_data[i].code == 'p') {
                                    properlyFormattedHtmlString += '<span class="marc710">' + field.subfield_data[i].value + '</span>' + '  ';
                                } //if p
                            } //loop
                            properlyFormattedHtmlString += '| ';
                        } //wrap the for loop
                    }); // end .foreach
                    ////////////console.log(properlyFormattedHtmlString);
                } // end  if( bib.marc.has('710') ){ //(R)
                if (properlyFormattedHtmlString !== '') {
                    properlyFormattedHtmlString = properlyFormattedHtmlString.replace(/\|\s*$/, ""); //Remove last pipe (|) & replace it with nothing
                    return '<span class="newbiblabel_inlineSRP">' + 'By:' + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
                }
            } //if bks or sco
            return '';
        }; //end of getDisplayTextBelowTitle
        //////////////////////////////////

        var hrExpand = function() {
            var HRwindowWidth = $('div.newhorizline').width();
            ////////////console.log("-----------------------------------hr.neww", HRwindowWidth  );
            // //////////console.log("-----------------------------------hr.neww",  $('div.newhorizline').width(windowWidth)  );
        };
        ////////////////////////////////////
        //////////////////////////////////
        get856SRP = function get856SRP(bib) {
            var properlyFormattedHtmlString = '';
            var outerFormattedHtmlString = '';
            var hasElectronicLocationAndAccess = false;
            if (bib.marc.has('856')) { //(R)
                hasElectronicLocationAndAccess = true;
                bib.marc.fields('856').forEach(function(field, i) {
                    if (field.subfield('856u') !== undefined && field.subfield('856u') !== null) {
                        properlyFormattedHtmlString = '<span>' + '<a class="u856u" title="' + field.subfield('856u').replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext") + '"  href="' + field.subfield('856u').replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext") + '">' + field.subfield('856u') + '</a>' + '</span> ';
                    }
                    if (field.subfield('8563') !== undefined && field.subfield('8563') !== null) {
                        properlyFormattedHtmlString = '<span>' + '<a class="u8563" title="' + field.subfield('856u').replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext") + '"  href="' + field.subfield('856u').replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext") + '">' + field.subfield('8563') + '</a>' + '</span> ';
                    }
                    //new code below as of 8/3/2015
                    if (field.subfield('856z') !== undefined && field.subfield('856z') !== null) {
                        properlyFormattedHtmlString = '<span>' + '<a class="u856z" title="' + field.subfield('856u').replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext") + '"  href="' + field.subfield('856u').replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext") + '">' + field.subfield('856z') + '</a>' + '</span> ';
                    }
                     console.log("outerFormattedHtmlStringouterFormattedHtmlString",  outerFormattedHtmlString  );
                     outerFormattedHtmlString += properlyFormattedHtmlString + ' | ';
                }); //end for each
            } // end 856 if
            //return '<span class="newbiblabel_inlineSRP">' + displayLabelText + '</span>' + '<span class="indent_data">' + properlyFormattedHtmlString + '</span>';
            if (hasElectronicLocationAndAccess) {
                outerFormattedHtmlString = outerFormattedHtmlString.replace(/\|\s*$/, "");
               //  temp856fix = outerFormattedHtmlString.replace("http://www.eric.ed.gov/PDFS", "https://files.eric.ed.gov/fulltext");
                console.log("outerFormattedHtmlStringouterFormattedHtmlString",  outerFormattedHtmlString  );   
                return '<span class="newbiblabel_inlineSRP">Online Resources: </span>' + '<span class="data_itemSRP indent_data">' + outerFormattedHtmlString + '</span>';
            } else {
                return outerFormattedHtmlString;
            }
        }; //end function get856SRP(bib)
        ////////////////////////////////////////
        var editionStatement250 = function(bib) {
            var theOtherNotes = ''; //Build the format in real-time
            var properlyFormattedHtmlString = '';
            var hasEditionStatement = false;
            if (bib.marc.has('250')) {
                hasEditionStatement = true;
                bib.marc.fields('250').forEach(function(field, i) {
                    properlyFormattedHtmlString = properlyFormattedHtmlString + '<span>' + field.subfield('250a') + '</span> ';
                    //properlyFormattedHtmlString+='<span class="subfield">'+'<a href="/app/search/title:(&#34' + field.subfield('250a') + '&#34)' + '">' + field.subfield('250a') + '</a>' + ' ' + '</span>';
                    if (field.subfield('250b') !== undefined && field.subfield('250b') !== null) {
                        properlyFormattedHtmlString += '<span>' + field.subfield('250b') + '</span> ';
                    }
                    properlyFormattedHtmlString += '<br>';
                }); //end for each
            } // end 490 if
            if (hasEditionStatement) {
                return '<span class="newbiblabel_inlineSRP">' + 'Edition:' + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
                //return '<span class="biblabel">Edition:</span>' + properlyFormattedHtmlString;
            } else {
                return properlyFormattedHtmlString;
            }
        }; //end func var editionStatement250=function(bib) {
        /////////////////////
        var friendly_print_resource_type = function(bib) {
            var which_resource_type = '';
            var which_resource_type_icon = '';
            var which_resource_type_title = bib.marc.title();
            var htmlstring = '';
            if (bib.marc.rtype() === null) {
                ////////////console.log("NULLLLLLLLLLLLLLLLLLLLL");
                which_resource_type_icon = 'newspaper.png';
                which_resource_type = 'Continuing Resource';
            }
            if (bib.marc.rtype() === "COM") {
                which_resource_type = 'Computer File';
                which_resource_type_icon = 'computer_link.png';
            } else if (bib.marc.rtype() === "MAP") {
                which_resource_type = 'Map';
                which_resource_type_icon = 'map.png';
            } else if (bib.marc.rtype() === "MIX") {
                which_resource_type = 'Mixed Materials';
                which_resource_type_icon = 'report_disk.png';
            } else if (bib.marc.rtype() === "REC") {
                which_resource_type = 'Sound Recording';
                which_resource_type_icon = 'sound.png';
            } else if (bib.marc.rtype() === "SCO") {
                which_resource_type = 'Printed Music';
                which_resource_type_icon = 'score.png';
            } else if (bib.marc.rtype() === "SER") {
                which_resource_type = 'Continuing Resource';
                which_resource_type_icon = 'newspaper.png';
            } else if (bib.marc.rtype() === "VIS") {
                which_resource_type = 'Visual Material';
                which_resource_type_icon = 'film.png';
            } else if (bib.marc.rtype() === "BKS") {
                which_resource_type = 'Book';
                which_resource_type_icon = 'book.png';
            }
            ////////////console.log("which_resource_type_icon",which_resource_type_icon);
            var htmlstring = '<span class="gen_info_labelSRP paddingRight2">Type: </span> ' +
                ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/' + which_resource_type_icon +
                '"alt="' + which_resource_type + '" title="' + which_resource_type_title + '">' +
                '<span class="gen_info_dataitemSRP indent_data">' + which_resource_type + '</span>';
            ////////////console.log("zzzzzzzzzzzzzzzzzzzZZZZZZZZZZZZZ", htmlstring);
            ////////////console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
            return htmlstring;
        }; //end function friendly_print_resource_type
        //May 11th code
        var getbibRecordFormat = function(bib) {
            var thebibRecordFormat = ''; //Build the format in real-time keeping in mind a format may have many parts separated by a pipe char |
            var properlyFormattedHtmlString = '';
            var has007 = false;
            var has008 = false;
            var cdFound = false;
            var lpFound = false;
            for (i = 0; i < bib.marc._marc.fields.length; i++) {
                if (bib.marc._marc.fields[i] === "007") {
                    has007 = true;
                }
                if (bib.marc._marc.fields[i] === "008") {
                    has008 = true;
                }
            } //end for
            if (bib.marc.rtype() === 'BKS' || bib.marc.rtype() === 'SER' || bib.marc.rtype() === 'SCO') {
                //return thebibRecordFormat = 'WE ARE AT BKS OR SER or maybe even SCO ?NOW';
                if (has008 == true) {
                    if (bib.marc.ctrl('008[23]') === ' ' && (bib.marc.leader().substr(6, 1) === 'c' || bib.marc.leader().substr(6, 1) === 'd')) { //Print test
                        thebibRecordFormat = thebibRecordFormat + 'Print';
                    } else if (bib.marc.ctrl('008[23]') === ' ' || bib.marc.ctrl('008[23]') === 'r') { //Print test
                        thebibRecordFormat = thebibRecordFormat + 'Print';
                    }
                    if (bib.marc.ctrl('008[24]') === 'b' || bib.marc.ctrl('008[25]') === 'b' || bib.marc.ctrl('008[26]') === 'b' || bib.marc.ctrl('008[27]') === 'b') {
                        //<img src="/opac-tmpl/prog/famfamfam/silk/text_list_bullets.png" alt="bibliography" title="bibliography">
                        thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/text_list_bullets.png" alt="bibliography" title="bibliography"> ' + ' Bibliography';
                    }
                    thebibRecordFormat = thebibRecordFormat + ' | ';
                } //has008
            } //if (bib.marc.rtype() == 'BKS' || bib.marc.rtype() == 'SER' || bib.marc.rtype() == 'SCO') {
            if (has008 == true) {
                if (bib.marc.ctrl('008[23]') === 'b' || bib.marc.ctrl('008[29]') === 'b') { // MicroFiche test
                    // OR 008/23 =b  OR  008/29 =b
                    thebibRecordFormat = thebibRecordFormat + 'Microfiche | ';
                }
                if (bib.marc.ctrl('008[23]') === 'a' || bib.marc.ctrl('008[29]') === 'a') { // Microfilm test
                    // OR 008/23 =a OR 008/29 =a
                    thebibRecordFormat = thebibRecordFormat + 'Microfilm | ';
                }
                if (bib.marc.ctrl('008[23]') === 'o' || bib.marc.ctrl('008[23]') === 's' || bib.marc.leader().substr(6, 1) === 'm' || bib.marc.ctrl('008[29]') === 's') { // Electronic test

                    thebibRecordFormat = thebibRecordFormat + 'Electronic | ';
                }
            }
            if (has007 == true) { //has007 =="T"
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'j') { // Map test
                    // 007/00 =a   AND   007/01=j -> Map
                    thebibRecordFormat = thebibRecordFormat + 'Map | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'e') { // another MicroFiche test
                    // 007/00 =h   AND   007/01=e  -> MicroFiche
                    thebibRecordFormat = thebibRecordFormat + 'Microfiche | ';
                }
                if (bib.marc.ctrl('007[0]') === 'q' && bib.marc.ctrl('007[1]') === 'q') { // Notated music
                    //007/00 =q   AND   007/01=q  Notated music
                    thebibRecordFormat = thebibRecordFormat + 'Notated music | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'o') { // Optical disc test
                    // 007/00 =c   AND   007/01=o -> Optical disc
                    thebibRecordFormat = thebibRecordFormat + 'Optical disc | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'j') { // Print test
                    // 007/00 =k   AND   007/01=j -> Print
                    thebibRecordFormat = thebibRecordFormat + 'Print | ';///'             <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/                 text_list_bullets.png"
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'r') { // Remote test
                    // 007/00 =c   AND   007/01=r -> Remote
                    thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/drive_web.png" alt="Remote" title="Remote"> ' + 'Remote | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 's') { // Sound cassette test
                    // 007/00 =s   AND   007/01=s -> Sound cassette
                    thebibRecordFormat = thebibRecordFormat + 'Sound cassette | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 't') { // Sound-tape reel test
                    // 007/00 =s   AND   007/01=t -> Sound-tape reel
                    thebibRecordFormat = thebibRecordFormat + 'Sound-tape reel | ';
                }
                if (bib.marc.ctrl('007[0]') === 'v' && bib.marc.ctrl('007[1]') === 'f') { // Videocassette test
                    // 007/00 =v   AND   007/01=f -> Videocassette
                    thebibRecordFormat = thebibRecordFormat + '<img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/videocassette.png" alt="videocassette" title="videocassette"> ' + 'Videocassette | ';
                }
                if (bib.marc.ctrl('007[0]') === 'v' && bib.marc.ctrl('007[1]') === 'd') { // Videodisc test
                    // 007/00 =v   AND   007/01=d -> Videodisc
                    thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/dvd.png" alt="DVD" title="DVD"> ' + 'Videodisc | ';
                }
                if (bib.marc.ctrl('007[4]') === 'v') { // Videodisc test
                    // 007/00 =v   AND   007/01=d -> Videodisc
                    thebibRecordFormat = thebibRecordFormat + 'DVD | ';
                    cdFound = true;
                }
                if ((bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'd' && bib.marc.ctrl('007[3]') === 'f')) { // CD test
                    thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/cd.png" alt="CD" title="CD"> ' + ' CD | ';
                    cdFound = true;
                }
                if ((bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'd' && bib.marc.ctrl('007[3]') === 'b')) { // LP test
                    thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/lp.png" alt="LP" title="LP"> ' + ' LP / Vinyl | ';
                    lpFound = true;
                }
            } //has007 =="T"
            if (cdFound === false) {
                if (bib.marc.subfield('300c') === undefined || bib.marc.subfield('300c') === null) {
                    // //////////console.log("300c is undefined AAAA");
                } else {
                    ////////////console.log("300c is defined BBBB", bib.marc.subfield('300c'),bib.marc.subfield('300c').length);
                    if (bib.marc.subfield('300c').search("4 3/4") > -1) {
                        thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/cd.png" alt="CD" title="CD"> ' + ' CD | ';
                        cdFound = true;
                    }
                }
                //end of CD test
                if (bib.marc.subfield('305c') === undefined || bib.marc.subfield('305c') === null) {
                    // //////////console.log("305c is undefined AAAA");
                } else {
                    ////////////console.log("305c is defined BBBB", bib.marc.subfield('305c'),bib.marc.subfield('305c').length);
                    if (bib.marc.subfield('305c').search("4 3/4") > -1) {
                        thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/cd.png" alt="CD" title="CD"> ' + ' CD | ';
                        cdFound = true;
                    }
                }
            }
            if (lpFound === false) {
                if (bib.marc.subfield('300c') === undefined || bib.marc.subfield('300c') === null) {
                    // //////////console.log("300c is undefined AAAA");
                } else {
                    // //////////console.log("300c is defined BBBB", bib.marc.subfield('300c'),bib.marc.subfield('300c').length);
                    if (bib.marc.subfield('300c').search("12 in") > -1 || bib.marc.subfield('300c').search("33 1/3") > -1) {
                        thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/lp.png" alt="LP" title="LP"> ' + ' LP / Vinyl | ';
                        lpFound = true;
                    }
                }
                if (bib.marc.subfield('305c') === undefined || bib.marc.subfield('305c') === null) {
                    // //////////console.log("305c is undefined AAAA");
                } else {
                    // //////////console.log("305c is defined BBBB", bib.marc.subfield('305c'),bib.marc.subfield('305c').length);
                    if (bib.marc.subfield('305c').search("12 in") > -1 || bib.marc.subfield('305c').search("33 1/3") > -1) {
                        thebibRecordFormat = thebibRecordFormat + ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/lp.png" alt="LP" title="LP"> ' + ' LP / Vinyl | ';
                        lpFound = true;
                    }
                }
            }
            //Lower Priority Formats (in case we run short of time) ARE BELOW
            //(These in the order that they were in the XSLT, rather than priority order.)
            if (has008 == true) {
                if (bib.marc.ctrl('008[23]') === 'f' || bib.marc.ctrl('008[29]') === 'f') { // Braille test
                    thebibRecordFormat = thebibRecordFormat + 'Braille | ';
                }
            }
            if (has007 == true) {
                if (bib.marc.ctrl('007[11]') === 'a') { //  Reformatted digital test
                    //
                    thebibRecordFormat = thebibRecordFormat +
                        'Reformatted digital | '; //
                }
                if (bib.marc.ctrl('007[11]') === 'b') { //  Digitized microfilm test
                    //
                    thebibRecordFormat = thebibRecordFormat + 'Digitized microfilm | ';
                }
                if (bib.marc.ctrl('007[11]') === 'd') { //  Digitized other analog test
                    thebibRecordFormat = thebibRecordFormat + 'Digitized other analog | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'b') { // Chip cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Chip cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'c') { // Computer optical disc cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Computer optical disc cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'j') { // Magnetic disc test
                    thebibRecordFormat = thebibRecordFormat + 'Magnetic disc | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'm') { // Magneto-optical disc test
                    thebibRecordFormat = thebibRecordFormat + 'Magneto-optical disc | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'a') { // Tape cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Tape cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'f') { // Tape cassette test
                    thebibRecordFormat = thebibRecordFormat + 'Tape cassette | ';
                }
                if (bib.marc.ctrl('007[0]') === 'c' && bib.marc.ctrl('007[1]') === 'h') { // Tape reel test
                    thebibRecordFormat = thebibRecordFormat + 'Tape reel | ';
                }
                if (bib.marc.ctrl('007[0]') === 'd' && bib.marc.ctrl('007[1]') === 'a') { // Celestial globe print test
                    thebibRecordFormat = thebibRecordFormat + 'Celestial globe | ';
                }
                if (bib.marc.ctrl('007[0]') === 'd' && bib.marc.ctrl('007[1]') === 'e') { // Earth moon globe print test
                    thebibRecordFormat = thebibRecordFormat + 'Earth moon globe | ';
                }
                if (bib.marc.ctrl('007[0]') === 'd' && bib.marc.ctrl('007[1]') === 'b') { // Planetary or lunar globe test
                    thebibRecordFormat = thebibRecordFormat + 'Planetary or lunar globe | ';
                }
                if (bib.marc.ctrl('007[0]') === 'd' && bib.marc.ctrl('007[1]') === 'c') { // Terrestrial globe print test
                    thebibRecordFormat = thebibRecordFormat + 'Terrestrial globe | ';
                }
                if (bib.marc.ctrl('007[0]') === 'o' && bib.marc.ctrl('007[1]') === 'o') { // Kit test
                    thebibRecordFormat = thebibRecordFormat + 'Kit | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'd') { // Atlas test
                    thebibRecordFormat = thebibRecordFormat + 'Atlas | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'g') { // Diagram test
                    thebibRecordFormat = thebibRecordFormat + 'Diagram | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'q') { // Model test
                    thebibRecordFormat = thebibRecordFormat + 'Model | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'k') { // Profile test
                    thebibRecordFormat = thebibRecordFormat + 'Profile | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'r') { // Remote-sensing image test
                    thebibRecordFormat = thebibRecordFormat + 'Remote-sensing image | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 's') { // Section test
                    thebibRecordFormat = thebibRecordFormat + 'Section | ';
                }
                if (bib.marc.ctrl('007[0]') === 'a' && bib.marc.ctrl('007[1]') === 'y') { // View test
                    thebibRecordFormat = thebibRecordFormat + 'View | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'a') { // Aperture card test
                    thebibRecordFormat = thebibRecordFormat + 'Aperture card | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'f') { // Microfiche cassette test
                    thebibRecordFormat = thebibRecordFormat + 'Microfiche cassette | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'b') { // Microfilm cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Microfilm cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'c') { // Microfilm cassette test
                    thebibRecordFormat = thebibRecordFormat + 'Microfilm cassette | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'd') { // Microfilm reel test
                    thebibRecordFormat = thebibRecordFormat + 'Microfilm reel | ';
                }
                if (bib.marc.ctrl('007[0]') === 'h' && bib.marc.ctrl('007[1]') === 'g') { // Microopaque test
                    thebibRecordFormat = thebibRecordFormat + 'Microopaque | ';
                }
                if (bib.marc.ctrl('007[0]') === 'm' && bib.marc.ctrl('007[1]') === 'c') { // Film cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Film cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'm' && bib.marc.ctrl('007[1]') === 'f') { // Film cassette test
                    thebibRecordFormat = thebibRecordFormat + 'Film cassette | ';
                }
                if (bib.marc.ctrl('007[0]') === 'm' && bib.marc.ctrl('007[1]') === 'r') { // Film reel test
                    thebibRecordFormat = thebibRecordFormat + 'Film reel | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'n') { // Chart test
                    thebibRecordFormat = thebibRecordFormat + 'Chart | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'c') { // Collage test
                    thebibRecordFormat = thebibRecordFormat + 'Collage | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'd') { // Drawing test
                    thebibRecordFormat = thebibRecordFormat + 'Drawing | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'o') { // Flash card test
                    thebibRecordFormat = thebibRecordFormat + 'Flash card | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'e') { // Painting test
                    thebibRecordFormat = thebibRecordFormat + 'Painting | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'f') { // Photomechanical print test
                    thebibRecordFormat = thebibRecordFormat + 'Photomechanical print | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'g') { // Photonegative test
                    thebibRecordFormat = thebibRecordFormat + 'Photonegative | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'h') { // Photoprint test
                    thebibRecordFormat = thebibRecordFormat + 'Photoprint | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'i') { // Picture test
                    thebibRecordFormat = thebibRecordFormat + 'Picture | ';
                }
                if (bib.marc.ctrl('007[0]') === 'k' && bib.marc.ctrl('007[1]') === 'l') { // Technical drawing test
                    thebibRecordFormat = thebibRecordFormat + 'Technical drawing | ';
                }
                if (bib.marc.ctrl('007[0]') === 'g' && bib.marc.ctrl('007[1]') === 'd') { // Filmslip test
                    thebibRecordFormat = thebibRecordFormat + 'Filmslip | ';
                }
                if (bib.marc.ctrl('007[0]') === 'g' && bib.marc.ctrl('007[1]') === 'c') { // Filmstrip cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Filmstrip cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'g' && bib.marc.ctrl('007[1]') === 'o') { // Filmstrip roll test
                    thebibRecordFormat = thebibRecordFormat + 'Filmstrip roll | ';
                }
                if (bib.marc.ctrl('007[0]') === 'g' && bib.marc.ctrl('007[1]') === 'f') { // Other filmstrip type test
                    thebibRecordFormat = thebibRecordFormat + 'Other filmstrip type | ';
                }
                if (bib.marc.ctrl('007[0]') === 'g' && bib.marc.ctrl('007[1]') === 's') { // Slide test
                    thebibRecordFormat = thebibRecordFormat + 'Slide | ';
                }
                if (bib.marc.ctrl('007[0]') === 'g' && bib.marc.ctrl('007[1]') === 't') { // Transparency test
                    thebibRecordFormat = thebibRecordFormat + 'Transparency | ';
                }
                if (bib.marc.ctrl('007[0]') === 'r' && bib.marc.ctrl('007[1]') === 'r') { // Remote-sensing image test
                    thebibRecordFormat = thebibRecordFormat + 'Remote-sensing image | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'e') { // Cylinder test
                    thebibRecordFormat = thebibRecordFormat + 'Cylinder | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'q') { // Roll test
                    thebibRecordFormat = thebibRecordFormat + 'Roll | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'g') { // Sound cartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Sound cartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'i') { // Sound-track film test
                    thebibRecordFormat = thebibRecordFormat + 'Sound-track film | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'w') { // Wire recording test
                    thebibRecordFormat = thebibRecordFormat + 'Wire recording | ';
                }
                if (bib.marc.ctrl('007[0]') === 'f' && bib.marc.ctrl('007[1]') === 'c') { // Regular print test
                    thebibRecordFormat = thebibRecordFormat + 'Braille | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'b') { // Combination test
                    thebibRecordFormat = thebibRecordFormat + 'Combination | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'a') { // Moon test
                    thebibRecordFormat = thebibRecordFormat + 'Moon | ';
                }
                if (bib.marc.ctrl('007[0]') === 's' && bib.marc.ctrl('007[1]') === 'd') { // Tactile, with no writing system test
                    //  thebibRecordFormat = thebibRecordFormat + 'Tactile, with no writing system |';
                }
                if (bib.marc.ctrl('007[0]') === 't' && bib.marc.ctrl('007[1]') === 'c') { // Braille test
                    thebibRecordFormat = thebibRecordFormat + 'Braille | ';
                }
                if (bib.marc.ctrl('007[0]') === 't' && bib.marc.ctrl('007[1]') === 'b') { // Large print test
                    thebibRecordFormat = thebibRecordFormat + 'Large print | ';
                }
                if (bib.marc.ctrl('007[0]') === 't' && bib.marc.ctrl('007[1]') === 'a') { // Regular print test
                    thebibRecordFormat = thebibRecordFormat + 'Regular print | ';
                }
                if (bib.marc.ctrl('007[0]') === 't' && bib.marc.ctrl('007[1]') === 'd') { // Text in looseleaf binder test
                    thebibRecordFormat = thebibRecordFormat + 'Text in looseleaf binder | ';
                }
                if (bib.marc.ctrl('007[0]') === 'v' && bib.marc.ctrl('007[1]') === 'c') { // Videocartridge test
                    thebibRecordFormat = thebibRecordFormat + 'Videocartridge | ';
                }
                if (bib.marc.ctrl('007[0]') === 'v' && bib.marc.ctrl('007[1]') === 'r') { // Videoreel test
                    thebibRecordFormat = thebibRecordFormat + 'Videoreel | ';
                }
            }
            properlyFormattedHtmlString = thebibRecordFormat.substring(0, thebibRecordFormat.length - 2);
            if (properlyFormattedHtmlString.length < 1) {
                properlyFormattedHtmlString = "Not specified";
            }
            if (properlyFormattedHtmlString.indexOf("|") == 1) {
                var properlyFormattedHtmlString = properlyFormattedHtmlString.slice(2);
            }
            ////////////console.log("why the pipe?why the pipe?why the pipe?why the pipe?",properlyFormattedHtmlString.indexOf("|"));
            return '<span class="gen_info_labelSRP paddingRight2">Format: </span>' + '<span class="gen_info_dataitemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
        }; //end function getbibRecordFormat(bib)
        //END MAY 11TH CODE
        //Begin May 15th Code part3
        var getTypeOfVisMaterial = function(bib) {
            //33 - Type of visual material (006/16) look in the 008 field
            var theTypeofVisualMaterial = ''; //Build the format in real-time keeping in mind a format may have many parts separated by a pipe char |
            var properlyFormattedHtmlString = '';
            var has007 = 'F';
            var has008 = 'F';
            var cdFound = 'F';
            var TypeofVisualMaterial = {
                "a": "Art original",
                "b": "Kit",
                "c": "Art reproduction",
                "d": "Diorama",
                "f": "Filmstrip",
                "g": "Game",
                "i": "Picture",
                "k": "Graphic",
                "l": "Technical drawing",
                "m": "Motion picture",
                "n": "Chart",
                "o": "Flash card",
                "p": "Microscope slide",
                "q": "Model",
                "r": "Realia",
                "s": "Slide",
                "t": "Transparency",
                "v": "Videorecording",
                "w": "Toy",
                "z": "Other",
                "|": "No attempt to code"
            };
            if (bib.marc.has('008')) { //if 0
                if (bib.marc.rtype() === 'VIS') {
                    if (bib.marc.ctrl('008[33]') !== ' ' && bib.marc.ctrl('008[33]') !== 'z' && bib.marc.ctrl('008[33]') !== '|') {
                        theTypeofVisualMaterial = TypeofVisualMaterial[bib.marc.ctrl('008[33]')];
                        properlyFormattedHtmlString = '<span class="main_divider">|</span><span class="gen_info_labelSRP paddingRight2">Type of visual material: </span>' +
                            '<span class="gen_info_dataitemSRP indent_data">' + theTypeofVisualMaterial + '</span>';
                    }
                }
            } //if 0
            return properlyFormattedHtmlString;
        };
        //End May 15th Code part 3
        //Begin May 15th Code part2
        var getNatureOfContents = function(bib) {
            //24-27 bytes - Nature of contents (006/07-10) look in the 008 field
            var thebibRecordNatureOfContents = ''; //Build the format in real-time keeping in mind a format may have many parts separated by a pipe char |
            var properlyFormattedHtmlString = '';
            var has007 = 'F';
            var has008 = 'F';
            var cdFound = 'F';
            var NatureOfContents = {
                "number_sign": "No specified nature of contents",
                "a": "Abstracts/summaries",
                "b": "Bibliographies",
                "c": "Catalogs",
                "d": "Dictionaries",
                "e": "Encyclopedias",
                "f": "Handbooks",
                "g": "Legal articles",
                "i": "Indexes",
                "j": "Patent document",
                "k": "Discographies",
                "l": "Legislation",
                "m": "Theses",
                "n": "Surveys of literature in a subject area",
                "o": "Reviews",
                "p": "Programmed texts",
                "q": "Filmographies",
                "r": "Directories",
                "s": "Statistics",
                "t": "Technical reports",
                "u": "Standards/specifications",
                "v": "Legal cases and case notes",
                "w": "Law reports and digests",
                "y": "Yearbooks",
                "z": "Treaties",
                "2": "Offprints",
                "5": "Calendars",
                "6": "Comics/graphic novels",
                "|": "No attempt to code"
            };
            if (bib.marc.has('008')) { //if 0
                if (bib.marc.rtype() === 'BKS') { //if 3
                    if (bib.marc.ctrl('008[24]') !== 'number_sign' && bib.marc.ctrl('008[24]') !== ' ' && bib.marc.ctrl('008[24]') !== '|' && bib.marc.ctrl('008[24]') != 'u') { //if 5
                        thebibRecordNatureOfContents = NatureOfContents[bib.marc.ctrl('008[24]')];
                        properlyFormattedHtmlString = '<span class="main_divider">|</span><span class="gen_info_labelSRP paddingRight2">Nature of contents: </span>' +
                            '<img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/user.png" alt="NOC" title="NOC"> ' + '<span class="gen_info_dataitemSRP indent_data">' + thebibRecordNatureOfContents + '</span>';
                    } //if 5
                } //if 3
            } //if 0
            return properlyFormattedHtmlString;
        };
        //End May 15th Code part 2
        //Begin May 15th Code
        var getLiteraryForm = function(bib) {
            //33 byte  - Literary form look in the 008 field
            var thebibRecordLiteraryForm = ''; //Build the format in real-time keeping in mind a format may have many parts separated by a pipe char |
            var properlyFormattedHtmlString = '';
            var has007 = 'F';
            var has008 = 'F';
            var cdFound = 'F';
            var LiteraryForm = {
                "0": "Not fiction",
                "1": "Fiction",
                "d": "Dramas",
                "e": "Essays",
                "f": "Novels",
                "h": "Humor, satires, etc.",
                "i": "Letters",
                "j": "Short stories",
                "m": "Mixed forms",
                "p": "Poetry",
                "s": "Speeches",
                "u": "Unknown",
                "|": "No attempt to code"
            };
            if (bib.marc.has('008')) { //if 0
                if (bib.marc.rtype() === 'BKS') {
                    if (bib.marc.ctrl('008[33]') !== ' ' && bib.marc.ctrl('008[33]') !== '|' && bib.marc.ctrl('008[33]') !== 'u') {
                        thebibRecordLiteraryForm = LiteraryForm[bib.marc.ctrl('008[33]')];
                        properlyFormattedHtmlString = '<span class="main_divider">|</span><span class="gen_info_labelSRP paddingRight2">Literary Form: </span>' +
                            '<span class="gen_info_dataitemSRP indent_data">' + thebibRecordLiteraryForm + '</span>';
                    }
                }
            } //if 0
            return properlyFormattedHtmlString;
        }; //var getLiteraryForm =function(bib) {
        //End May 15th Code
        ///////////////////////////
        //begin may14th code
        var getbibRecordTargetAudience = function(bib) {
            var thebibRecordTargetAudience = ''; //Build the format in real-time keeping in mind a format may have many parts separated by a pipe char |
            var properlyFormattedHtmlString = '';
            var has007 = 'F';
            var has008 = 'F';
            var cdFound = 'F';
            var TargetAudienceType = {
                "number_sign": "Unknown or unspecified",
                "a": "Preschool",
                "b": "Primary",
                "c": "Pre-adolescent",
                "d": "Adolescent",
                "e": "Adult",
                "f": "Specialized",
                "g": "General",
                "j": "Juvenile",
                "|": "No attempt to code"
            }
            //record.has('100')
            if (bib.marc.has('008')) { //if 1
                if (bib.marc.rtype() === 'BKS' || bib.marc.rtype() === 'COM' || bib.marc.rtype() === 'VIS') { //if 3
                    if (bib.marc.ctrl('008[22]') !== ' ' && bib.marc.ctrl('008[22]') !== '#' && bib.marc.ctrl('008[22]') !== '|') { //if 5
                        thebibRecordTargetAudience = TargetAudienceType[bib.marc.ctrl('008[22]')];
                        //   properlyFormattedHtmlString = ' | <span style="font-weight:700;color:black">Audience: ' + '</span>' + thebibRecordTargetAudience;
                        properlyFormattedHtmlString = '<span class="main_divider">|</span><span class="gen_info_labelSRP paddingRight2">Audience: </span>' +
                            '<span class="gen_info_dataitemSRP indent_data">' + thebibRecordTargetAudience + '</span>';
                    } //if 5
                } //if 3
            } //if 1
            return properlyFormattedHtmlString;
        }; //eo func
        //end may14th code
        ///////////////////////////
        //Begin Nov. 5th 2015 Code
        /*21 - Type of continuing resource (006/04)
        //So look at byte/position 21 in the 008 or bib.marc.ctrl('008[21]') to be more specific.
        # - None of the following
        d - Updating database
        l - Updating loose-leaf
        m - Monographic series
        n - Newspaper
        p - Periodical
        w - Updating Web site
        | - No attempt to code */
        //<img src="/opac-tmpl/prog/famfamfam/silk/world_link.png" alt="web site" title="web site">
        // ' <img src="/opac-tmpl/prog/famfamfam/silk/' + which_resource_type_icon + '"alt="' + which_resource_type + '" title="' + which_resource_type_title + '">'
        var getTypeofContRes = function(bib) {
            //33 - Type of visual material (006/16) look in the 008 field
            var theTypeofContRes = ''; //Build the format in real-time keeping in mind a format may have many parts separated by a pipe char |
            var properlyFormattedHtmlString = '';
            var TypeofContRes = {
                "d": "Updating database",
                "l": "Updating loose-leaf",
                "m": "Monographic series",
                "n": "Newspaper",
                "p": "Periodical",
                "w": "Updating Web site",
                "|": "No attempt to code"
            };
            //Is there a note.png file? Otherwise change this to newspaper.png
            var TypeofContResImage = {
                "d": "database.png",
                "l": "note.png",
                "m": "note.png",
                "n": "newspaper.png",
                "p": "newspaper.png",
                "w": "world_link.png",
                "|": "No attempt to code"
            };
            if (bib.marc.has('008')) { //if 0
                if (bib.marc.rtype() === 'SER') {
                    //fix z below to reflect # if # actually occurs as a valid Marc entry
                    if (bib.marc.ctrl('008[21]') !== ' ' && bib.marc.ctrl('008[21]') !== 'z' && bib.marc.ctrl('008[21]') !== '|') {
                        theTypeofContRes = ' <img src="' + ourDefaultCDNpath + 'koha/2024/prod/icons/' + TypeofContResImage[bib.marc.ctrl('008[21]')] + '"alt="' +
                            TypeofContResImage[bib.marc.ctrl('008[21]')] + '" title="' + TypeofContResImage[bib.marc.ctrl('008[21]')] + '">' + TypeofContRes[bib.marc.ctrl('008[21]')];
                        properlyFormattedHtmlString = '<span class="main_divider">|</span><span class="gen_info_labelSRP paddingRight2">Type of continuing resource: </span>' +
                            '<span class="gen_info_dataitemSRP indent_data">' + theTypeofContRes + '</span>';
                    }
                }
            } //if 0
            return properlyFormattedHtmlString;
        }; //var getTypeofContRes =function(bib) {
        //End Nov. 5th 2015 Code
        ///////////////////////////////////
        var isEquipmentTest = function(bib) {
            ////////////console.log("isEquipmentTestisEquipmentTestisEquipmentTest",bib);
            ////////////console.log("isEquipmentTestisEquipmentTestisEquipmentTestbib.marc.rtype()",bib.marc.rtype());
            var callnumstr = '';
            var equipment_test = '';
            var strTester = '';
            var strTesterLen = '';
            var numChars = '';
            //Test record type first, if record is of type SCO and .... and .... then this most likely is NOT equipment. And return false.
            /*"REC": "recording",
            "SCO": "score",
            "SER": "continuing resource",
            "COM": "electronic resource",
            "MIX": "mixed material",
            "MAP": "graphic material",*/
            //Generally speaking when bib.marc.rtype() === BKS is where the Equipment gets falsely flagged as NOT being EQUIPMENT
            if (bib.marc.rtype() === 'SCO' || bib.marc.rtype() === 'REC' || bib.marc.rtype() === 'SER' ||
                bib.marc.rtype() === 'COM' || bib.marc.rtype() === 'MIX' || bib.marc.rtype() === 'MAP') {
                return false;
            }
            ////////////console.log( "33byte from 008", bib.marc.ctrl('008[33]') ); what is here????????????????????
            if (bib.summary.available_count > 0) {
                callnumstr = bib.summary.available_at[0].callnum;
                if (callnumstr === null || callnumstr.length <= 4) { //assume equipment if callnum is null or callnum is 3 digit string like 904
                    //  equipment_test=true; //this is not exactly true but without a call number this bib record may have bogus data
                    return true;
                } //null if test
                strTester = callnumstr.replace(/\s/g, ''); //trim all whitespace
                strTesterLen = strTester.length;
                numChars = strTester.match(/[a-zA-Z]/g).length; //count just letters
                if ((numChars * 2) > strTesterLen) {
                    return true;
                }
                return false;
            } // end of if (summary_object.available_count > 0)
            return false;
        }; //end of function equipmentTest
        //////////////////////////////////
        //246 - Varying Form of Title (R)
        var getVaryingFormOfTitle246 = function(bib) {
            var properlyFormattedHtmlString = '';
            var hasVaryingFormOfTitle = false;
            if (bib.marc.has('246')) {
                hasVaryingFormOfTitle = true;
                bib.marc.fields('246').forEach(function(field, i) {
                    ////////////console.log(field.subfield('a'),i);
                    if (field.subfield('i') !== undefined && field.subfield('i') !== null) {
                        properlyFormattedHtmlString = properlyFormattedHtmlString + '<span>' + field.subfield('i') + '</span>';
                    }
                    //use commas below
                    properlyFormattedHtmlString = properlyFormattedHtmlString + '<span>' + ' ' + field.subfield('a') + '; ' + '</span>';
                });
            }
            //return '<span class="newbiblabel_inlineSRP">' + displayLabelText + '</span>' + '<span class="indent_data">' + properlyFormattedHtmlString + '</span>';
            if (hasVaryingFormOfTitle) {
                var positionOfLastOccurrence = '';
                positionOfLastOccurrence = properlyFormattedHtmlString.lastIndexOf(";");
                properlyFormattedHtmlString = setCharAt(properlyFormattedHtmlString, positionOfLastOccurrence, '');
                ////////////console.log('<span class="newbiblabel_inlineSRP">Other Title:</span>' + '<span class="indent_data">' + properlyFormattedHtmlString + '</span>');
                return '<span class="newbiblabel_inlineSRP">Other Title: </span>' + '<span class="data_itemSRP">' + properlyFormattedHtmlString + '</span>';
            } else {
                return properlyFormattedHtmlString;
            }
        }; //end func
        ///////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        var getSeriesInfo4SRP = function(bib) {
            //init temp vars
            var suba = '';
            var subv = '';
            var subn = '';
            var sub0 = '';
            var subp = '';
            var has_sub0 = false;
            var sp = ' ';
            var field440 = [];
            if (bib.marc.has('440')) { //if has 245
                bib.marc.fields('440').forEach(function(field, i) {
                    suba = '';
                    subv = '';
                    subn = '';
                    sub0 = '';
                    subp = '';
                    for (m = 0; m < field.subfield_data.length; m++) { //loop1
                        if (field.subfield_data[m].code === 'a') {
                            suba = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === 'v') {
                            subv = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === 'n') {
                            subn = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === '0') {
                            sub0 = field.subfield_data[m].value;
                            has_sub0 = true;
                        }
                        if (field.subfield_data[m].code === 'p') {
                            subp = field.subfield_data[m].value;
                        }
                    } //end loop1
                    ////////////console.log(i);
                    field440[i] = new series_data_440(suba, subv, sub0, has_sub0, subn, subp);
                }); //end for each
            } //end if has 440
            //init temp vars
            var suba = '';
            var subv = '';
            var subn = '';
            var sub0 = '';
            var subp = '';
            var has_sub0 = false;
            var field490 = [];
            if (bib.marc.has('490')) { //if has 245
                bib.marc.fields('490').forEach(function(field, i) {
                    suba = '';
                    subv = '';
                    subn = '';
                    sub0 = '';
                    subp = '';
                    for (m = 0; m < field.subfield_data.length; m++) { //loop1
                        if (field.subfield_data[m].code === 'a') {
                            suba = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === 'v') {
                            subv = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === 'n') {
                            subn = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === '0') {
                            sub0 = field.subfield_data[m].value;
                            has_sub0 = true;
                        }
                        if (field.subfield_data[m].code === 'p') {
                            subp = field.subfield_data[m].value;
                        }
                    } //end loop1
                    field490[i] = new series_data_490(suba, subv, sub0, has_sub0, subn, subp);
                }); //end for each
            } //end if has 490
            ////////////console.log(field490);
            //init temp vars
            var suba = '';
            var subv = '';
            var subn = '';
            var sub0 = '';
            var subp = '';
            var has_sub0 = false;
            var field830 = [];
            if (bib.marc.has('830')) { //if has 830
                bib.marc.fields('830').forEach(function(field, i) {
                    suba = '';
                    subv = '';
                    subn = '';
                    sub0 = '';
                    subp = '';
                    for (m = 0; m < field.subfield_data.length; m++) { //loop1
                        if (field.subfield_data[m].code === 'a') {
                            suba = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === 'v') {
                            subv = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === 'n') {
                            subn = field.subfield_data[m].value;
                        }
                        if (field.subfield_data[m].code === '0') {
                            sub0 = field.subfield_data[m].value;
                            has_sub0 = true;
                        }
                        if (field.subfield_data[m].code === 'p') {
                            subp = field.subfield_data[m].value;
                        }
                    } //end loop1
                    // //////////console.log(i);
                    field830[i] = new series_data_830(suba, subv, sub0, has_sub0, subn, subp);
                }); //end for each
            } //end if has 830
            //  //////////console.log(field830);
            //BEFORE Zero conditional: If there is a 440 and a 490
            if (field440.length >= 1 && field490.length >= 1) {
                var properlyFormattedHtml440 = '';
                var properlyFormattedHtml490 = '';
                for (k = 0; k < field440.length; k++) { //for loop k
                    if (field440[k].sub0 !== '') {
                        properlyFormattedHtml440 += '<span class="data_itemSRP indent_data SRPseries440">' + field440[k].subA + sp + field440[k].subV + sp +
                            field440[k].subN + sp + field440[k].subP + '</span>';
                    } else {
                        properlyFormattedHtml440 += '<span class="data_itemSRP indent_data SRPseries440">' + field440[k].subA + sp + field440[k].subV + sp + field440[k].subN + sp + field440[k].subP + '</span>';
                    } //if else
                } //end for loop k
                for (k = 0; k < field490.length; k++) { //for loop k
                    if (field490[k].sub0 !== '') {
                        properlyFormattedHtml490 += '<span class="data_itemSRP indent_data SRPseries490">' + field490[k].subA + sp + field490[k].subV + sp + field490[k].subN + sp + field490[k].subP + '</span>';
                    } else {
                        properlyFormattedHtml490 += '<span class="data_itemSRP indent_data SRPseries490">' + field490[k].subA + sp + field490[k].subV + sp + field490[k].subN + sp + field490[k].subP + '</span>';
                    } //if else
                } //end for loop k
                // bigstr440 +=  properlyFormattedHtmlString440.replace(/,([^,]*)$/, "$1");
                properlyFormattedHtml440 = properlyFormattedHtml440.replace(/,([^,]*)$/, "$1");
                properlyFormattedHtml490 = properlyFormattedHtml490.replace(/,([^,]*)$/, "$1");
                var properlyFormattedHtml440490 = properlyFormattedHtml440 + '|' + properlyFormattedHtml490;
                return '<span class="newbiblabel_inlineSRP">Series: </span>' + properlyFormattedHtml440490;
            } // end if field440.length >= 1 && field490.length >= 1
            //END BEFORE Zero conditional: 440 fields present, and 490 fields present
            //Zero conditional: If there is only a 440
            if (field440.length >= 1 && field830.length == 0 && field490.length == 0) {
                var properlyFormattedHtml440 = '';
                for (k = 0; k < field440.length; k++) { //for loop k
                    if (field440[k].sub0 !== '') {
                        properlyFormattedHtml440 += '<span class="data_itemSRP indent_data SRPseries440">' + field440[k].subA + sp + field440[k].subV + sp +
                            field440[k].subN + sp + field440[k].subP + '</span>';
                    } else {
                        properlyFormattedHtml440 += '<span class="data_itemSRP indent_data SRPseries440">' + field440[k].subA + sp + field440[k].subV + sp +
                            field440[k].subN + sp + field440[k].subP + '</span>';
                    } //if else
                } //end for loop k
                // bigstr440 +=  properlyFormattedHtmlString440.replace(/,([^,]*)$/, "$1");
                properlyFormattedHtml440 = properlyFormattedHtml440.replace(/,([^,]*)$/, "$1");
                // return '<span class="newbiblabel_inlineSRP">' + 'Performers:' + '</span>' + '<span class="indent_data">' + properlyFormattedHtmlString + '</span>';
                return '<span class="newbiblabel_inlineSRP">Series: </span>' + properlyFormattedHtml440;
            } // end if field440.length >= 1 && field830.length >= 1
            //END Zero conditional: If there is one or more 830 fields without any 440 fields present, display the 830 data and search based on the 830 $0.
            //Second conditional: If there is one or more 830 fields without any 440 fields present, display the 830 data and search based on the 830 $0.
            if (field830.length >= 1 && field440.length == 0) { //if
                var properlyFormattedHtmlString830 = '';
                // //////////console.log("Third conditional");
                //build output string
                for (i = 0; i < field830.length; i++) { //for loop i
                    //   this.hasSub0 = has_sub0;
                    properlyFormattedHtmlString830 += '<span class="data_itemSRP indent_data SRPseries830">' + field830[i].subA +
                        sp + field830[i].subV + sp + field830[i].subN + sp + field830[i].subP + '</span>';
                } //end for loop i
                return '<span class="newbiblabel_inlineSRP">Series: </span>' + properlyFormattedHtmlString830;
            } //if
            //END Second conditional: If there is one or more 830 fields without any 440 fields present, display the 830 data and search based on the 830 $0.
            //Third conditional: If there is one or more 490 fields without 830 or 440 fields present, display the 490 data and search based on the text in the 490 $a.
            if (field490.length >= 1 && field440.length == 0 && field830.length == 0) { //begin if only a 490 or 490's
                var properlyFormattedHtmlString490 = '';
                // //////////console.log("Third conditional");
                //build output string
                for (i = 0; i < field490.length; i++) { //for loop i
                    //   this.hasSub0 = has_sub0;
                    properlyFormattedHtmlString490 += '<span class="data_itemSRP indent_data SRPseries490">' + field490[i].subA +
                        sp + field490[i].subV + sp + field490[i].subN + sp + field490[i].subP + '</span>';
                } //end for loop i
                return '<span class="newbiblabel_inlineSRP">Series: </span>' + properlyFormattedHtmlString490;
            } //end if field490.length >= 1  && field440.length == 0 && field830.length == 0
            //END Third conditional: If there is one or more 490 fields without 830 or 440 fields present, display the 490 data and search based on the text in the 490 $a.
            //BEGIN First conditional: If there is one or more 440 with an $n, $p, or $v and one or more 830 without any subfields other than $0; display the 440 data
            var seriesFieldsMerge = [];
            //series_data_merge(suba, subv, sub0, has_sub0, subn, subp)
            if (field440.length >= 1 && field830.length >= 1) {
                var properlyFormattedHtmlStringMerged = '';
                for (i = 0; i < field830.length; i++) { //for loop i
                    //  //////////console.log("830",field830[i].subA, field830[i].subV, field830[i].sub0, field830[i].subP);
                    seriesFieldsMerge[i] = new series_data_merge(field830[i].subA, field830[i].subV, field830[i].sub0, field830[i].hasSub0, field830[i].subN, field830[i].subP);
                } //end for loop i
                for (k = 0; k < field440.length; k++) { //for loop k
                    if (seriesFieldsMerge[k].getVolInfo() === "") { //if
                        seriesFieldsMerge[k].updateVolInfo(field440[k].subV);
                    } //if
                    properlyFormattedHtmlStringMerged += '<span class="data_itemSRP indent_data SRPseries440830">' + seriesFieldsMerge[k].subA +
                        sp + seriesFieldsMerge[k].subV + sp + seriesFieldsMerge[k].subN + sp + seriesFieldsMerge[k].subP + '</span>';
                } //end for loop k
                return '<span class="newbiblabel_inlineSRP">Series: </span>' + properlyFormattedHtmlStringMerged;
            } // end if field440.length >= 1 && field830.length >= 1
            //END First conditional: If there is one or more 440 with an $n, $p, or $v and one or more 830 without any subfields other than $0; display the 440 data
            // //////////console.log(seriesFieldsMerge);
        }; //EOFunction
        ///////////////////////////////
        ///////////////////////////////
        //September 27, 2017 getSeriesInfo4Bib(bib)
        //Fields parsed: "440","490","830" only
        //begin function getSeriesInfo4Bib(bib)
        var getSeriesInfo4SRPage = function(bib) {
            var htmlFrag = '';
            var htmlFrag2 = '';
            var linkText = '';
            if (bib.marc.has('830')) { //
                bib.marc.fields('830').forEach(function(field) {
                    for (m = 0; m < field.subfield_data.length; m++) {
                        if (field.subfield_data[m].code !== '0') {
                            htmlFrag += ' ' + field.subfield_data[m].value;
                        } else {
                            linkText += ' ' + field.subfield_data[m].value;
                        }
                        //if(field.subfield_data[m].code!=='0'){
                    } //for loop
                    linkText = linkText.trim();
                    htmlFrag2 += '<span class="pipe_symbol">' + '<a href="/app/search/(&#34' + linkText + '&#34)' + '">' + '<span class="subfield series830">' + htmlFrag + '</span></a>' + '</span>';
                    linkText = '';
                    htmlFrag = '';

                }); //forEach
                return '<span class="newbiblabel_inline">' + 'Series:' + '</span>' + '<span class="data_item marc830">' + htmlFrag2 + '</span>';
            } //if (bib.marc.has('830') )
            if (bib.marc.has('490')) { //
                bib.marc.fields('490').forEach(function(field) {
                    for (m = 0; m < field.subfield_data.length; m++) {
                        if (field.subfield_data[m].code !== '0') {
                            htmlFrag += ' ' + field.subfield_data[m].value;
                        } else {
                            linkText += ' ' + field.subfield_data[m].value;
                        }
                        //if(field.subfield_data[m].code!=='0'){
                    } //for loop
                    linkText = linkText.trim();
                    htmlFrag2 += '<span class="pipe_symbol">' + '<a href="/app/search/(&#34' + linkText + '&#34)' + '">' + '<span class="subfield series490">' + htmlFrag + '</span></a>' + '</span>';
                    linkText = '';
                    htmlFrag = '';

                }); //forEach
                return '<span class="newbiblabel_inline">' + 'Series:' + '</span>' + '<span class="data_item marc490">' + htmlFrag2 + '</span>';
            } //if (bib.marc.has('490') )
            if (bib.marc.has('440')) { //
                bib.marc.fields('440').forEach(function(field) {
                    for (m = 0; m < field.subfield_data.length; m++) {
                        if (field.subfield_data[m].code !== '0') {
                            htmlFrag += ' ' + field.subfield_data[m].value;
                        } else {
                            linkText += ' ' + field.subfield_data[m].value;
                        }
                        //if(field.subfield_data[m].code!=='0'){
                    } //for loop
                    linkText = linkText.trim();
                    htmlFrag2 += '<span class="pipe_symbol">' + '<a href="/app/search/(&#34' + linkText + '&#34)' + '">' + '<span class="subfield series440">' + htmlFrag + '</span></a>' + '</span>';
                    linkText = '';
                    htmlFrag = '';

                }); //forEach
                return '<span class="newbiblabel_inline">' + 'Series:' + '</span>' + '<span class="data_item marc440">' + htmlFrag2 + '</span>';
            } //if (bib.marc.has('440') )
            return '';
        } //end of function getSeriesInfo4Bib(bib)
        var publication260264 = function(bib) {
            var properlyFormattedHtmlString = '';
            var querybuilder = '';
            var hasPublicationInfo = false;
            if (bib.marc.has('260')) {
                hasPublicationInfo = true;
                bib.marc.fields('260').forEach(function(field, i) { //260 Subfields a,b,c are (R)
                    for (j = 0; j < field.subfield_data.length; j++) {
                        if (field.subfield_data[j].code === "a" || field.subfield_data[j].code === "b" || field.subfield_data[j].code === "c") {
                            if (j == 0) {
                                querybuilder += ' ' + field.subfield_data[j].value + ' ';
                            } else {
                                querybuilder += ' ' + field.subfield_data[j].value + ' ';
                            }
                            properlyFormattedHtmlString += '<span class="subfield">' + field.subfield_data[j].value + '</span>' + ' ';
                            //    //////////console.log("J LOOP SUBFIELD DATA ", j, field.subfield_data[j]);
                        }
                    } //end for loop
                    querybuilder = '';
                    //properlyFormattedHtmlString += '</span>';
                }); //end for each
            } // end 260 if
            if (bib.marc.has('264')) {
                hasPublicationInfo = true;
                bib.marc.fields('264').forEach(function(field, i) { //264 Subfields a,b,c are (R)
                    for (j = 0; j < field.subfield_data.length; j++) {
                        if (field.subfield_data[j].code === "a" || field.subfield_data[j].code === "b" || field.subfield_data[j].code === "c") {
                            if (j == 0) {
                                querybuilder += ' ' + field.subfield_data[j].value + ' ';
                            } else {
                                querybuilder += ' ' + field.subfield_data[j].value + ' ';
                            }
                            properlyFormattedHtmlString += '<span class="subfield">' + field.subfield_data[j].value + '</span>' + ' ';
                        }
                    } //end for loop
                    querybuilder = '';
                    //properlyFormattedHtmlString += '</span>';
                }); //end for each
            } // end 264 if
            if (hasPublicationInfo) {
                properlyFormattedHtmlString = properlyFormattedHtmlString.replace(/\; $/, "");
                return '<span class="newbiblabel_inlineSRP">Publisher: </span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
            } else {
                return '<span class="marc260264">' + properlyFormattedHtmlString + '</span>';
            }
        }; //end of function
        ///////////
        ///////////////////////////////////
        var getTargetAudienceNote521 = function(bib) { //When present highly detailed
            var properlyFormattedHtmlString = '';
            var hasTargetAudienceNote = false; //Assume no data found.
            var displayLabelText = 'Target Audience:'; //Change this to what you like.
            var maxHtmlLength = 75; //Normally the displayLabelText and the resultant data found are on the same line in the patron display.
            if (bib.marc.has('521')) { // Since the 521 is (R) you then use the .forEach below to loop thru all possible 521 entries.
                bib.marc.fields('521').forEach(function(field, i) {
                    if (field.subfield('521a') !== undefined && field.subfield('521a') !== null) {
                        //Just checking for $a here and no other delimiters. You say the subfield a of the 521 field
                        hasTargetAudienceNote = true; //The reason for this variable is to make sure you do not end up printing a displayLabelText and then nothing follows
                        properlyFormattedHtmlString += '<span>' + field.subfield('521a') + '</span> '; // Build an html string which the web browser can render.
                    }
                    properlyFormattedHtmlString += '<br>'; // Add a line break after each subfield a found.
                }); //end forEach
            } // end 521 if
            if (hasTargetAudienceNote) {
                return '<span class="newbiblabel_inlineSRP">' + displayLabelText + '</span>' + '<span class="data_itemSRP indent_data">' + properlyFormattedHtmlString + '</span>';
            } else {
                return properlyFormattedHtmlString;
            }
        }; //end func

        function getWordStr(str) {
            return str.split(/\s+/).slice(0, 100).join(" ");
        }


        var create_wiki_style_hovers520 = function(bib) { //When present highly detailed
            var properlyFormattedHtmlString = '';
            var hasWikiData = false; //Assume no data found.
            var displayLabelText = ''; //'For Wiki Style Hover:'; //Change this to what you like.
            var maxHtmlLength = 75; //Normally the displayLabelText and the resultant data found are on the same line in the patron display.
            if (bib.marc.has('520')) { // Since the 521 is (R) you then use the .forEach below to loop thru all possible 521 entries.
                bib.marc.fields('520').forEach(function(field, i) {
                    if (i < 1) {
                        //console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',i);
                        if (field.subfield('520a') !== undefined && field.subfield('520a') !== null) {
                            //Just checking for $a here and no other delimiters. You say the subfield a of the 521 field
                            hasWikiData = true; //The reason for this variable is to make sure you do not end up printing a displayLabelText and then nothing follows
                            //     properlyFormattedHtmlString += '<span>' + getWordStr(field.subfield('520a')) + '...</span> '; // Build an html string which the web browser can render.

                            var originalStr = field.subfield('520a'); //originalStr.split(' ').length >100

                            if (originalStr.split(' ').length > 100) {
                                console.log("has >100 words");
                                properlyFormattedHtmlString += '<span>' + getWordStr(field.subfield('520a')) + '...</span> '; // Build an html string which the web browser can render.

                            } else {

                                console.log("has <100 words");
                                properlyFormattedHtmlString += '<span>' + getWordStr(field.subfield('520a')) + '</span> '; // Build an html string which the web browser can render.

                            } // end of if 

                        } //if( i < 1){
                        properlyFormattedHtmlString += '<br>'; // Add a line break after each subfield a found.
                    } //
                }); //end forEach
            } // end 521 if
            if (hasWikiData) {

                return '<span class="wiki_label_520">' + displayLabelText + '</span>' + '<span class="wiki_data_520 indent_data">' + properlyFormattedHtmlString + '</span>';
            } else {
                return properlyFormattedHtmlString;
            }
        }; //end func

        var create_wiki_style_hovers505 = function(bib) { //When present highly detailed
            console.log('bib=', bib);
            var properlyFormattedHtmlString = '';
            var properlyFormattedHtmlString2 = '';
            var hasWikiData = false; //Assume no data found.
            var originalStr = '';
            var displayLabelText = '<b>Contents:</b> '; //'For Wiki Style Hover:'; //Change this to what you like.
            var maxHtmlLength = 75; //Normally the displayLabelText and the resultant data found are on the same line in the patron display.
            if (bib.marc.has('505')) { // Since the 521 is (R) you then use the .forEach below to loop thru all possible 521 entries.
                bib.marc.fields('505').forEach(function(field, i) {
                    if (i < 1) {
                        hasWikiData = true; //The reason for this variable is to make sure you do not end up printing a displayLabelText and then nothing follows
                        for (j = 0; j < field.subfield_data.length; j++) {
                            properlyFormattedHtmlString += field.subfield_data[j].value + ' ';
                            originalStr += field.subfield_data[j].value + ' ';
                            console.log("properlyFormattedHtmlString", properlyFormattedHtmlString);
                            console.log('wfield.subfield_data[j].code ===', field.subfield_data[j].code);
                            console.log('wfield.subfield_data[j].value ', field.subfield_data[j].value);
                        } //for
                    } //if( i < 1){
                    console.log('505 iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', i);
                }); //end forEach
            } // end 521 if  getWordStr(field.subfield('520a')
            if (hasWikiData) {
                //return '<span class="wiki_label_505">' + displayLabelText + '</span>' + '<span class="wiki_data_505 indent_data">' + getWordStr(properlyFormattedHtmlString) + '...</span>';
                console.log('originalStr', originalStr, originalStr.split(' ').length);

                if (originalStr.split(' ').length > 100) return '<span class="wiki_label_505">' + displayLabelText + '</span>' + '<span class="wiki_data_505 indent_data">' + getWordStr(properlyFormattedHtmlString) + '...</span>';

                if (originalStr.split(' ').length < 100) return '<span class="wiki_label_505">' + displayLabelText + '</span>' + '<span class="wiki_data_505 indent_data">' + getWordStr(properlyFormattedHtmlString) + '</span>';

            } else {
                return properlyFormattedHtmlString;
            }
        }; //end func      


        var setCharAt = function(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
        };

        function series_data_440(suba, subv, sub0, has_sub0, subn, subp) {
            this.subA = suba;
            this.subV = subv;
            this.subN = subn;
            this.sub0 = sub0;
            this.hasSub0 = has_sub0;
            this.subP = subp;
        }

        function series_data_490(suba, subv, sub0, has_sub0, subn, subp) {
            this.subA = suba;
            this.subV = subv;
            this.subN = subn;
            this.sub0 = sub0;
            this.hasSub0 = has_sub0;
            this.subP = subp;
        }

        function series_data_830(suba, subv, sub0, has_sub0, subn, subp) {
            this.subA = suba;
            this.subV = subv;
            this.subN = subn;
            this.sub0 = sub0;
            this.hasSub0 = has_sub0;
            this.subP = subp;
        }

        function series_data_merge(suba, subv, sub0, has_sub0, subn, subp) {
            this.subA = suba;
            this.subV = subv;
            this.subN = subn;
            this.sub0 = sub0;
            this.hasSub0 = has_sub0;
            this.subP = subp;
            this.updateVolInfo = function(volinfo) {
                this.subV = volinfo;
            }
            this.getVolInfo = function() {
                return this.subV;
            }
        }
        //POSSIBLY USED IN DUE DATES FOR ITEM RETURN
        var monthTranslators = {
            "Jan": "1",
            "Feb": "2",
            "Mar": "3",
            "Apr": "4",
            "May": "5",
            "Jun": "6",
            "Jul": "7",
            "Aug": "8",
            "Sep": "9",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        };
        //////
        var printAvailability = function(bib) {
            var htmlFrag = '';
            var baseURL4icons = "http://maps-jimsapps.rhcloud.com/workspace/maps-jimsappsrhcloudcommap/";
            var allAvailable = baseURL4icons + 'images/accept.png';
            var partialAvailable = baseURL4icons + 'images/some_available.png';
            var noneAvailable = baseURL4icons + 'images/unavailable.png';
            var allThumb = '<img src="' + allAvailable + '" alt="All items available" height="16" width="16">';
            var partialThumb = '<img src="' + partialAvailable + '" alt="Partial availability" width="26" height="16" >';
            var noneThumb = '<img src="' + noneAvailable + '" alt="No items available" height="16" width="16">';
            // //////////console.log("======================--------printAvail = function(bib)-------------===========================", bib);
            htmlFrag = noneThumb + 'just testing icons here blank all none partial 1 item on shelves';
            return htmlFrag;
        };
        /////
        var location_information = function(bib) {
            var htmlFrag = 'Location missing here. Possibly due to KOHA bug. Or brand new addition and not fully cataloged.';
            var total_records = bib.summary.available_count;
            if (total_records > 0) { //if
                htmlFrag = '';
                for (i = 0; i < bib.summary.available_at.length; i++) {
                    var callNumStr = bib.summary.available_at[i].callnum;
                    if (callNumStr == null) callNumStr = 'Call # Not Listed';
                    htmlFrag += '<span class="data_itemSRP indent_data aftercomma">' + bib.summary.available_at[i].branch + '<b>(' + bib.summary.available_at[i].count + ')</b>' + ' - ' + bib.summary.available_at[i].location + ' ' + ' [' + callNumStr + ']' + '</span>';
                    // //////////console.log("1111111111111111111111111111111111111111111111111111bib.summary.available_at[i].branch");
                } //loop
            } //if
            return htmlFrag;
        }; //end of function
        var fixDateFormat = function(thisDate) {
            var newDate = thisDate.split("-");
            return newDate[1] + '/' + newDate[2] + '/' + newDate[0];
        };
        var sortTable = function(tbl_ptr) {
            // var rows = $('.scrll165132 tbody  tr').get();
            var rows = $(tbl_ptr).get();
            rows.sort(function(a, b) {
                var A = $(a).children('td').eq(0).text().toUpperCase();
                var B = $(b).children('td').eq(0).text().toUpperCase();
                if (A < B) {
                    return -1;
                }
                if (A > B) {
                    return 1;
                }
                return 0;
            });
            $.each(rows, function(index, row) {
                $('.scrll165132').children('tbody').append(row);
            });
        };

        function sortTableColumns(tblID, col) {
            var table, rows, switching, i, x, y, shouldSwitch;
            table = document.getElementById(tblID);
            switching = true;
            /*Make a loop that will continue until
            no switching has been done:*/
            while (switching) {
                //start by saying: no switching is done:
                switching = false;
                rows = table.getElementsByTagName("TR");
                /*Loop through all table rows (except the
                first, which contains table headers):*/
                for (i = 1; i < (rows.length - 1); i++) {
                    //start by saying there should be no switching:
                    shouldSwitch = false;
                    /*Get the two elements you want to compare,
                    one from current row and one from the next:*/
                    x = rows[i].getElementsByTagName("TD")[col];
                    y = rows[i + 1].getElementsByTagName("TD")[col];
                    //check if the two rows should switch place:
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    /*If a switch has been marked, make the switch
                    and mark that a switch has been done:*/
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }




    ////////////////////////////////////////////var addMfhdTable = function(data)///////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////var addMfhdTable = function(data)///////////////////////////////////////////////////////////////////
    var addMfhdTable = function(data) {
            var uniqueTableID = 'mfhd_' + bib.id;
            var MfhdTableTop = '<table id="' + uniqueTableID + '" class="srptable2 table ' + ' table-striped">\
    <thead class="thead-default"><tr><th>Location</th><th>Call Number</th><th>Collection</th><th>Holdings</th></tr></thead>';
            var MfhdTableData = '';
            var MfhdTableBottom = '</table>';
            var ccode = '';
            var where = '';


    for (i = 0; i < data.length; i++) {
        if(console_debug)console.log("COLLECTION ISSUE data[i].mfhd", data[i].mfhd );
            var displayStatement='.';
                if(data[i].mfhd.textual_holdings[0]!==undefined){
                displayStatement = data[i].mfhd.textual_holdings[0].statement;   
                }
        if( data[i].mfhd.location.location !==null){
         console.log("1837 window.authvalsObj.LOC", window.authvalsObj.LOC);       
         var zzz = eval('window.authvalsObj.LOC.' + data[i].mfhd.location.location + '.opac');
         console.log("1837 PLANT= dynLoc testobj 1975", zzz);  
         var evalLOC = zzz;     
      ////////////////////////////////////////////////////   var evalLOC = friendlyLocations[data[i].mfhd.location.location]; FEB 6TH ////////////////////////////////////////////////////////////////
         var evalLOCraw = data[i].mfhd.location.location; 
        }else{
         var evalLOC ='';
         var evalLOCraw = ''; 
        }//if( data[i].mfhd.location.location !==null){


        if( data[i].mfhd.location.ccode ==undefined){ //if
            ccode='NA';
        }else{
            ccode=data[i].mfhd.location.ccode;
        }//if( data[i].mfhd.location.ccode ==undefined){

    var data_str = $(".non-staff #app-body").attr("data-branches");
    var my_object_branches = JSON.parse(decodeURIComponent(data_str));
    console.log("my_object_branchesmy_object_branchesmy_object_branches" , my_object_branches );
    if(console_debug)console.log("INSIDE newajax.js in addItemsTable and testing ajax call" , my_object_branches ); 

            where= eval('my_object_branches.' +  data[i].mfhd.location.homebranch + '.branchname' );    
            MfhdTableData =  MfhdTableData +  '<tr>' + '<td>' + where + ' ' + evalLOC + '</td>' +  '<td>' + data[i].mfhd.location.itemcallnumber + '</td>' 
            +  '<td>' + CCodes[ccode] + '</td>' + '<td>' + displayStatement + '</td>' +'</tr>';        
            
    }//for (i = 0; i < data.length; i++) { 

            var moreDetails = '<a href="/app/work/' + bib.id + '">More Details</a>';
            $('<div class="MfhdTable">' + MfhdTableTop + MfhdTableData + MfhdTableBottom + '<span class="moredetailhere">' + moreDetails + '</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            $('<!--LOWER-->').insertBefore($('div#kohabib-' + bib.id + ' div.bib-details-holder'));
            //$('<div></div>').insertBefore($('div#kohabib-' + bib.id + ' div.newtitle4SRP'));//newtitle4SRP
            return;
        };

        function jsUcfirst(string) {
            string = string.toLowerCase();
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


/*
{id: '697424', onloan: null, itemlost: null, holdingbranch: 'ALLEN', on_holdshelf: null, …}

barcode: "0207303449038"

bib_title: "Loisaida, my love"

biblioitemnumber: "611614"

biblionumber: "611616"

booksellerid: null

ccode: "SCORES"

*** circblocked_status: false

*** circulates: false

cn_sort: "m  1624.8 m651 l6 med "

cn_source: "lcc"

copynumber: "1"

*** damaged: 0

dateaccessioned: "2022-06-29"

datelastseen: null

enumchron: null

fields: {staff_note: 'Check for 2 Scores'}

guide: null

guide_site: null

holdingbranch: "ALLEN"

homebranch: "ALLEN"

id: "697424"

*** in_transit: null

itemcallnumber: "M1624.8 M651 L6 Med."

*** itemlost: "missing"

itemnotes: "Check for 2 Scores"

itemnumber: "697424"

itemtype: "SCPT"

location: "SHELVES"

materials: null

*** notforloan: "5"

*** on_hold: false

*** on_holdshelf: null

*** onloan: null

paidfor: null

price: "28.99"

recalled: false

replacementprice: "28.99"

replacementpricedate: "2022-06-29"

*** restricted: null

shelving: null

stack: null

statuses: []

*** suppressed: false

timestamp: "2022-06-29T15:17:06Z"

uri: null

uuid: "58eb3bcd-1083-445c-9ae2-410c7a4f8e82"

*** wthdrawn: 0

_embed: {}
https://hartford.bibliovation.com/app/search/(complete%20poems%20of%20Christina%20Rossetti)?sort=score%20desc&owned-by=%22MORTENSEN%22
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function determineAvailableStatus(holdingItem) {
         // var status='Ask at Circulation';  
          var status='Available';           
var authvals_defs = $("#app-body").data("authvals");
console.log("authvals_defs", authvals_defs );


    if(holdingItem.on_hold!=false)return 'On Hold';
    if(holdingItem.on_holdshelf!=null)return 'On holdshelf';


    if(holdingItem.damaged!=0){//damaged: 0
    //console.log("99999999999999999999999999999999999999999999999999999999999authvals_defs DAMAGED", authvals_defs['DAMAGED']['1'].opac );  

            if(holdingItem.damaged== '1'){
            if(authvals_defs['DAMAGED']['1'].opac!=null)return authvals_defs['DAMAGED']['1'].opac;     
            return 'Damaged';     // if authvals_defs['DAMAGED'][1].opac ==null then use Damaged
            }


            if(holdingItem.damaged== '2'){
            if(authvals_defs['DAMAGED']['2'].opac!=null)return authvals_defs['DAMAGED']['2'].opac;     
            return 'Mending';     // if authvals_defs['DAMAGED'][1].opac ==null then use Damaged
            }

            if(holdingItem.damaged== '3'){
            if(authvals_defs['DAMAGED']['3'].opac!=null)return authvals_defs['DAMAGED']['3'].opac;     
            return 'Damaged';     // if authvals_defs['DAMAGED'][1].opac ==null then use Damaged
            }



            if(holdingItem.damaged== '4'){
            if(authvals_defs['DAMAGED']['4'].opac!=null)return authvals_defs['DAMAGED']['4'].opac;     
            return 'Damaged';     // if authvals_defs['DAMAGED'][1].opac ==null then use Damaged
            }
    }// if(holdingItem.damaged!=0){



    if(holdingItem.itemlost!=null){//itemlost: null
    console.log("authvals_defs['LOST']['longoverdue'].opac", authvals_defs['LOST']['longoverdue'].opac );             

            if(holdingItem.itemlost== 'longoverdue'){
             if(authvals_defs['LOST']['longoverdue'].opac!=null)return authvals_defs['LOST']['longoverdue'].opac;
             return 'Long Overdue';
            }// if(holdingItem.itemlost== 'longoverdue'){


            if(holdingItem.itemlost== 'lost'){
             if(authvals_defs['LOST']['lost'].opac!=null)return authvals_defs['LOST']['lost'].opac;
             return 'Lost';
            }// if(holdingItem.itemlost== 'lost'){


            if(holdingItem.itemlost== 'missing'){
             if(authvals_defs['LOST']['missing'].opac!=null)return authvals_defs['LOST']['missing'].opac;
             return 'Missing';
            }// if(holdingItem.itemlost== 'missing'){



            if(holdingItem.itemlost== 'trace'){
             if(authvals_defs['LOST']['trace'].opac!=null)return authvals_defs['LOST']['trace'].opac;
             return 'Lost';
            }// if(holdingItem.itemlost== 'trace'){

    }//if(holdingItem.itemlost!=null){  


/*NOT_LOAN:
0: {code: 0, opac: null, staff: 'Available for loan'}
1: {code: '1', staff: 'Not For Loan', opac: 'Not For Loan'}
2: {opac: 'Staff Office', staff: 'Staff Collection', code: '2'}
3: {code: '3', opac: 'At Bindery', staff: 'At Bindery'}
4: {staff: 'Display Cabinet', opac: 'Display Cabinet', code: '4'}
5: {opac: 'Cataloging Review - Ask at Circulation Desk', staff: 'Cataloging Review - Ask at Circulation Desk', code: '5'}
-1: {code: '-1', opac: 'Ordered', staff: 'Ordered'}*/


    if(holdingItem.notforloan!=0){//<option label="Available for loan" value="number:0">Available for loan</option>//notforloan: 0

            if(holdingItem.notforloan== '1'){
            if(authvals_defs['NOT_LOAN']['1'].opac!=null)return authvals_defs['NOT_LOAN']['1'].opac;    
             return 'Not For Loan';  
            }//if(holdingItem.notforloan== '1'){
        //    if(holdingItem.notforloan== '1') return 'Not For Loan';  


            if(holdingItem.notforloan== '2'){
            if(authvals_defs['NOT_LOAN']['2'].opac!=null)return authvals_defs['NOT_LOAN']['2'].opac;    
             return 'Staff Collection'; 
            }//if(holdingItem.notforloan== '2'){
         //   if(holdingItem.notforloan== '2') return 'Staff Collection';   


            if(holdingItem.notforloan== '3'){
            if(authvals_defs['NOT_LOAN']['3'].opac!=null)return authvals_defs['NOT_LOAN']['3'].opac;    
             return 'At Bindery';
            }//if(holdingItem.notforloan== '3'){


            if(holdingItem.notforloan== '4'){
            if(authvals_defs['NOT_LOAN']['4'].opac!=null)return authvals_defs['NOT_LOAN']['4'].opac;    
             return 'Display Cabinet';   
            }//if(holdingItem.notforloan== '4'){
          //  if(holdingItem.notforloan== '4') return 'Display Cabinet';          



            if(holdingItem.notforloan== '5'){
            if(authvals_defs['NOT_LOAN']['5'].opac!=null)return authvals_defs['NOT_LOAN']['5'].opac;    
             return 'Cataloging Review - Ask at Circulation Desk';
            }//if(holdingItem.notforloan== '5'){
          //  if(holdingItem.notforloan== '5') return 'Cataloging Review - Ask at Circulation Desk';    


            if(holdingItem.notforloan== 'undefined') return 'Unknown status - see staff';   

    }//if(holdingItem.notforloan!=0)      

/*WITHDRAWN:
0: {code: 0, opac: null, staff: 'Not withdrawn'}
1: {opac: 'Withdrawn', staff: 'Withdrawn', code: '1'}*/


    if(holdingItem.wthdrawn!=0){//<option label="Not withdrawn" value="number:0" selected="selected">Not withdrawn</option> wthdrawn: 0
    if(authvals_defs['WITHDRAWN']['1'].opac!=null)return authvals_defs['WITHDRAWN']['1'].opac;          
    return 'Withdrawn';
    }//if(holdingItem.wthdrawn!=0){    
//    if(holdingItem.wthdrawn== '1') return 'Withdrawn';



/*RESTRICTED:
0: {code: 0, opac: null, staff: 'Not restricted'}
1: {opac: 'Restricted Access', staff: 'Restricted Access', code: '1'}*/


    if(holdingItem.restricted!=0){//<option label="Not restricted" value="number:0" selected="selected">Not restricted</option> restricted: 0
     if(holdingItem.restricted== '1'){
        if(authvals_defs['RESTRICTED']['1'].opac!=null)return authvals_defs['RESTRICTED']['1'].opac;
        return 'Restricted Access';
      } 

    if(holdingItem.restricted== 'undefined') return 'Unknown status - see staff';    
    }//if(holdingItem.restricted!=0){        



    if(holdingItem.onloan!=null){//onloan: null
    status=holdingItem.onloan; 
    return 'Checked out (due ' + status + ')';
    }// if(holdingItem.onloan!=null){

        return status;
}//function determineAvailableStatus(holdingItem) {       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        var addItemsTable = function(data) {
            var data_str_test = $(".non-staff #app-body").attr("data-itemtypes");
            console.log("44444444444444444444444444444444444444444444444444444444444444addItemsTable addItemsTable2020 just entered addItemsTable = function(data) and data =", data);
            //console.log("2019 addItemsTable Items table and a bib object here", bib);
            var uniqueTableID = 'items_' + bib.id;
            var uniqueTableClass = 'scrll' + bib.id;
            var ItemsTableTop = '<table id="' + uniqueTableID + '" class="srptable2 table ' + uniqueTableClass + ' table-striped">\
    <thead class="thead-default"><tr><th>Location</th><th>Call Number</th><th>Format</th><th>Status</th></tr></thead>';
            var ItemsTableBottom = '</table>';
            var ItemsTableData = '';
            var wthCnt = 0,
                loopCnt = 0,
                defaultShow = 5;
            var actualDisplayCnt = 0;
            var CatRev = false;
            var  availStatus ='';


/*if (data.length ==0) {
$('<div class="srptable">' + 'There are no holdings for this title' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
}*/

            if (data.length >= 1) {
                for (i = 0; i < data.length; i++) { //for loop PRODUCTION

         if(navigator.userAgent =='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 OPR/89.0.4447.83' || navigator.userAgent !='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 OPR/89.0.4447.83'){
         // console.log("SRP browserName",navigator.userAgent);
                            if ((data.length == 1) || (data.length > 1 && Number(data[i].item.wthdrawn) == 0)) { //new if condition
                                var exceptionBldr = '';
                                if (data[i].item.itemcallnumber == null) {
                                    var cnInfo = ' ';
                                } else {
                                    var cnInfo = data[i].item.itemcallnumber;
                                } //if(data[i].item.itemcallnumber == null){
                                if (data[i].item.enumchron == null) {
                                    var volInfo = ' ';
                                } else {
                                    var volInfo = data[i].item.enumchron;
                                } //if(data[i].item.enumchron == null){
                                var enumChron = volInfo;
                                if (data[i].item.location !== null) {
                                    ///////////////////////9/28/18  var evalLOC =eval('global_koha_api_config.' + 'authvals' + '.LOC.' + data[i].item.location + '.opac');
                                    //var evalLOC =friendlyLocations[data[i].item.location];
                                    var evalLOC = eval('window.authvalsObj.LOC.' + data[i].item.location + '.opac');
                                    //  var zzz= eval( 'window.authvalsObj.LOC.' + data[i].mfhd.location.location + '.opac' );
                                    console.log("2056 PLANT= dynLoc testobj 2055", evalLOC);
                                    var LOC2056 = evalLOC; //Zachs Family Holocaust Collection
                                } else {
                                    var evalLOC = 'Location missing';
                                } //if( data[i].item.location !==null){
                                if (data[i].item.itemtype == 'CD-ROM') {
                                    evalITEMTYPE = 'CD-ROM';
                                } else if (data[i].item.itemtype == 'CD-ROM4') {
                                    evalITEMTYPE = 'CD-ROM, 4 Hour Loan';
                                } else if (data[i].item.itemtype == 'CD-ROMNC') {
                                    evalITEMTYPE = 'Non Circulating CD-ROM';
                                } else if (data[i].item.itemtype == 'Y-JACK') {
                                    evalITEMTYPE = 'Y-JACK';
                                } else if (data[i].item.itemtype == 'CD-ROMS') {
                                    evalITEMTYPE = 'CD-ROM';
                                } else if (data[i].item.itemtype == null) {
                                    evalITEMTYPE = 'Item type missing';
                                } else {
                                    var data_str = $(".non-staff #app-body").attr("data-itemtypes");
                                    var my_object_itemtypes = JSON.parse(decodeURIComponent(data_str));
                                    var evalITEMTYPE = eval('my_object_itemtypes.' + data[i].item.itemtype + '.description');
                                    var evalITEMTYPE_notforloan_indicator = eval('my_object_itemtypes.' + data[i].item.itemtype + '.notforloan');
                                } //if (data[i].item.itemtype=='CD-ROM') {
                                var data_str = $(".non-staff #app-body").attr("data-authvals");
                                var my_object_authvals = JSON.parse(decodeURIComponent(data_str));
                                var evalWTHDRAWN = eval('my_object_authvals' + '.WITHDRAWN[' + parseInt(data[i].item.wthdrawn) + '].opac');
                                var evalNOT_LOAN = eval('my_object_authvals' + '.NOT_LOAN[' + parseInt(data[i].item.notforloan) + '].opac');
                                var evalDAMAGED = eval('my_object_authvals' + '.DAMAGED[' + parseInt(data[i].item.damaged) + '].opac');
                         //  var evalDAMAGED = eval('my_object_authvals' + '.DAMAGED[' + parseInt(data[i].item.damaged) + '].opac');
                        //  var evalDAMAGED = data[i].item.itemtype
                        //        if(data[i].item.damaged=="2") var evalDAMAGED= "In mending";                         
//temp tweak 8/15
                                if (data[i].item.itemtype) {
                                    if (data[i].item.itemtype == 'CD-ROM') {
                                        var evalTCPCNC = "";
                                    } else {
                                        var evalTCPCNC = eval('my_object_itemtypes.' + data[i].item.itemtype + '.summary');
                                    } //if(data[i].item.itemtype == 'CD-ROM'){
                                } else {
                                    var evalTCPCNC = 'The summary field for this item type needs a ? followed by a delimeter in Admin interface';
                                } //if(data[i].item.itemtype){

                                var onLoan = '';
                                if (data[i].item.catstat == null) {
                                    var evalCATSTAT = 'This is a normal catstat';
                                } else {} //if(data[i].item.catstat == null){

                                if (data[i].item.onloan !== null) {
                                    onLoan = fixDateFormat(data[i].item.onloan);
                                    console.log("SRP 2053 data[i].item.onloan ", data[i].item.onloan);
                                    console.log("SRP 2054 onLoan ", onLoan);
                                } //if(data[i].item.onloan !==null){

                                //http://hartford.waldo.sandbox.kohalibrary.com/api/work/149464/mfhds ---- <a class="missingenumchron" href="">More Info</a>
                                if (enumChron == ' ' && (data[i].item.holdingbranch == 'MORTENSEN' && evalITEMTYPE == 'Periodical')) enumChron = '<a class="missingenumchron" href="" id="getenum' +
                                    bib.id + '">More Info</a>'; //admins can NOT rename 'Periodical'  unless this changes as well.
                                var ItemsTableToptr = '<tr>';
                                if (actualDisplayCnt >= 5) ItemsTableToptr = '<tr class="seemoreitems' + bib.id + ' hidethese">';
                                var cmore = '';
                                if (volInfo == ' ' && (data[i].item.holdingbranch == 'MORTENSEN' && evalITEMTYPE == 'Periodical')) volInfo = '<a class="missingvolprod" href="" id="volinfo' + bib.id + '">See Volume Info</a>'; //admins can NOT rename 'Periodical'  unless this changes as well.
                                if (data[i].item.onloan == null) { //if(data[i].item.onloan == null
                                    var availStatus = ' Available ';
                                } else {
                                    var availStatus = ' Due back ' + fixDateFormat(data[i].item.onloan);
                                } //if(data[i].item.onloan == null
                                var circStatus = '';
                                if (data[i].item.recalled !== false) availStatus = 'Item recalled';
                                if (data[i].item.in_transit !== null) availStatus = 'Item in transit';




                                if (availStatus == 'Cataloging Review - Ask at Circulation Desk') {
                                    CatRev = true;
                                } //if(availStatus=='Cataloging Review - Ask at Circulation Desk')




                                if (availStatus == 'Ordered') //////////console.log("wtf",availStatus);

if (availStatus == 'Item withdrawn' || availStatus == 'Item not for loan' || availStatus == 'Item long overdue or lost' || availStatus == 'Item damaged' || availStatus == 'Item recalled') circStatus = '';
                                

if (data[i].item.location == 'ONLINE') circStatus = 'Available online';


                                var data_str = $(".non-staff #app-body").attr("data-branches");

                                var my_object_branches = JSON.parse(decodeURIComponent(data_str));

                                //console.log("2137 INSIDE newajax.js" , my_object );

                                var homeBranch = eval('my_object_branches.' + data[i].item.holdingbranch + '.branchname');
                                console.log("2140 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch1", homeBranch); //The Maurice Greenberg Center for Judaic Studies
                                console.log("2141 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch2", data[i].item.location); //zachs


                                if (data[i].item.location == 'ZACHS') evalLOC = '';


                                if (data[i].item.location != 'ZACHS') {
                                    if (data[i].item.location != null) {
                                        var evalLOC = eval('window.authvalsObj.LOC.' + data[i].item.location + '.opac');
                                        console.log("2147 PLANT= dynLoc testobj 2145", window.authvalsObj.LOC);
                                        console.log("2147 PLANT= dynLoc testobj 2145", data[i].item.location);
                                        var zzz = eval('window.authvalsObj.LOC.' + data[i].item.location + '.opac');
                                        console.log("2151 PLANT= dynLoc testobj 2145 HG", zzz);
                                    } else {
                                        var evalLOC = '';
                                    } //if( data[i].item.location !==null){
                                } //if( data[i].item.location !='ZACHS'){


                                if (!CatRev) var availStatus = 'Available';




                                if (Number(data[i].item.itemlost) != null) {
                                 //   console.log("DATA data[i].item.itemlost here1",data[i].item.itemlost); //itemlost
                                    // console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch" , data[i].item.itemlost );
                                    // console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch" , my_object_authvals );
                                    // console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch" , my_object_authvals );
                               //     var tempstr = 'my_object_authvals' + '.lost[' + data[i].item.itemlost + '].staff';
                                  //  console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch", tempstr);
                                 //   availStatus = eval('my_object_authvals' + '.lost[' + '"' + data[i].item.itemlost + '"' + '].staff'); // 'Item long overdue or lost';
                                 availStatus =  data[i].item.itemlost; // 'Item long overdue or lost';
                                 var tempstr =  data[i].item.itemlost; // 'Item long overdue or lost';
                                    //eval('config.itemtypes[' + '"' + s + '"' + '].description');
                                  ///////////  if (data[i].item.onloan != 8) availStatus += ' ' + '(due ' + fixDateFormat(data[i].item.datelastseen) + ')'; //due mm/dd/yyy
                                } //if(data[i].item.itemlost !==0){*/






                                if (data[i].item.onloan !== null) {
                                  //  var availStatus = 'Checked out (due ' + fixDateFormat(data[i].item.onloan) + ')'; //DA
                                    var availStatus = 'Checked out (due ' + data[i].item.onloan + ')';                            
                                    console.log("DATA data[i].item.onloan",data[i].item.onloan);
                                } //if(data[i].item.onloan!==null){

if(data[i].item.circblocked_status==false && data[i].item.circulates==false && data[i].item.damaged==0 && data[i].item.in_transit==null && data[i].item.itemlost==null && data[i].item.on_hold==false  && data[i].item.on_holdshelf ==null && data[i].item.onloan==null && data[i].item.suppressed==false && data[i].item.wthdrawn==0) var availStatus = 'Available'; 

if(data[i].item.circblocked_status==false && data[i].item.circulates==true && data[i].item.damaged==0 && data[i].item.in_transit==null && data[i].item.itemlost==null && data[i].item.on_hold==false  && data[i].item.on_holdshelf ==null && data[i].item.onloan==null && data[i].item.suppressed==false && data[i].item.wthdrawn==0) var availStatus = 'Available';                                     


//itemlost: "missing" itemlost: "trace"  itemlost: "longoverdue"  itemlost: "lost"

if (data[i].item.itemlost == 'missing') availStatus = 'Missing';
if (data[i].item.itemlost == 'trace') availStatus = 'Ask at Circulation Desk';
if (data[i].item.itemlost == 'longoverdue') availStatus = 'Long Overdue';
if (data[i].item.itemlost == 'lost') availStatus = 'Lost';


                        if (Number(data[i].item.damaged) == 2)availStatus='In mending'; //8/13/20222 QFix //temp tweak 8/15

                                if (Number(data[i].item.notforloan) == 5) availStatus = 'Available'; // availStatus = 'Ask at Circulation Desk';  //notforloan: "5"  Ask at Circulation Desk


            //                    if (Number(data[i].item.wthdrawn) !== 0) availStatus = 'Item withdrawn';


                                if (Number(data[i].item.wthdrawn) == 1){//temp tweak 8/15
                                 availStatus = 'Item withdrawn';
                                 var homeBranch='N/A';
                                } 


                                if (Number(data[i].item.wthdrawn) == 0) { // when data[i].item.wthdrawn =="0" this implies not withdrawn.

                                    if (parseInt(data[i].item.notforloan) == -1) availStatus = "Ordered";

                                    if (evalLOC == 'Online') {
                                        ItemsTableData += ItemsTableToptr + '<td  class="c1">' + homeBranch + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                            '<td class="c4 z99">' + availStatus + '</td>' + '<td class="hidden">' + volInfo + '</td>' + '</tr>';
                                        console.log("SRP 2181 TABLE PRINT", evalLOC);
                                    } else {
                                        console.log("SRP 2182 evalLOC1", evalLOC);
                                        console.log("SRP 2183 evalLOC1", homeBranch, evalLOC, cnInfo);
                                        console.log("SRP 2185 TABLE PRINT EVALloc", evalLOC);
                                        console.log("SRP 2186 TABLE PRINT homeBranch", homeBranch);
                                        console.log("SRP 2186 TABLE PRINT availStatus", availStatus);
                                        var column1_4srpTable = homeBranch + ' ' + LOC2056;
                                        if (Number(data[i].item.wthdrawn) ==1)column1_4srpTable='N/A'; //temp tweak 8/15
                                        if (Number(data[i].item.damaged) >0 )availStatus='Damaged'; //temp tweak 8/15     
                                        if (data[i].item.itemlost == 'trace' )availStatus='Lost'; //temp tweak 8/15  
                                        if (data[i].item.on_hold==true )availStatus='On hold'; //temp tweak 8/15                                                
                                        var availStatus2= determineAvailableStatus(data[i].item); //temp tweak 8/15  
                                        console.log("SRP availStatus2*********************************************************************************************************************", availStatus2);                          
                                        console.log("SRP 2188 column1Table = homeBranch+LOC2056", column1_4srpTable);
                                        ItemsTableData += ItemsTableToptr + '<td  class="c1">' + column1_4srpTable + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                            '<td class="c4 z100">' + availStatus2 + '</td>' + '<td class="hidden">' + volInfo + '</td>' + '</tr>';
                                    } //if(evalLOC=='Online'){

                                    actualDisplayCnt++;
                                } //if(data[i].item.wthdrawn =="0" ){ // when data[i].item.wthdrawn =="0" this implies not withdrawn.



                                if (Number(data[i].item.wthdrawn) != 0) { // when data[i].item.wthdrawn =="0" this implies not withdrawn.
                                    if (data[i].item.notforloan == "-1") availStatus = "Ordered";

                                    if (evalLOC == 'Online') {
                                        ItemsTableData += ItemsTableToptr + '<td  class="c1">' + homeBranch + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                            '<td class="c4 z101">' + availStatus + '</td>' + '</tr>';
                                        console.log("SRP 2209 evalLOC Online", evalLOC);
                                    } else {
                                        if (Number(data[i].item.wthdrawn) ==1) var column1_4srpTable='N/A'; //temp tweak 8/15
                                        console.log("2211 evalLOC else", evalLOC);
                                        console.log("SRP 2211 evalLOC else", data[i].item);
                                        var availStatus2= determineAvailableStatus(data[i].item); //temp tweak 8/15 
                                        ItemsTableData += ItemsTableToptr + '<td  class="c1">' + column1_4srpTable + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                            '<td class="c4 z102">' + availStatus2 + '</td>' + '</tr>';
                                    } //if(evalLOC=='Online'){

                                } //if(data[i].item.wthdrawn !=="0" ){ // when data[i].item.wthdrawn =="0" this implies not withdrawn.






                                var eval1 = data[i].item.location; //eval('x + y + 1');
                            } //new if condition         
          console.log("SRP data[i].item",data[i].item);
         }//if(navigator.userAgent =='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 OPR/89.0.4447.83'){





















//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(navigator.userAgent =='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 OPR/89.0.4447.83NOEXECUTERIGHTNOW'){
                    if ((data.length == 1) || (data.length > 1 && Number(data[i].item.wthdrawn) == 0)) { //new if condition
                        var exceptionBldr = '';
                        if (data[i].item.itemcallnumber == null) {
                            var cnInfo = ' ';
                        } else {
                            var cnInfo = data[i].item.itemcallnumber;
                        } //if(data[i].item.itemcallnumber == null){
                        if (data[i].item.enumchron == null) {
                            var volInfo = ' ';
                        } else {
                            var volInfo = data[i].item.enumchron;
                        } //if(data[i].item.enumchron == null){
                        var enumChron = volInfo;
                        if (data[i].item.location !== null) {
                            ///////////////////////9/28/18  var evalLOC =eval('global_koha_api_config.' + 'authvals' + '.LOC.' + data[i].item.location + '.opac');
                            //var evalLOC =friendlyLocations[data[i].item.location];
                            var evalLOC = eval('window.authvalsObj.LOC.' + data[i].item.location + '.opac');
                            //  var zzz= eval( 'window.authvalsObj.LOC.' + data[i].mfhd.location.location + '.opac' );
                            console.log("2056 PLANT= dynLoc testobj 2055", evalLOC);
                            var LOC2056 = evalLOC; //Zachs Family Holocaust Collection
                        } else {
                            var evalLOC = 'Location missing';
                        } //if( data[i].item.location !==null){
                        if (data[i].item.itemtype == 'CD-ROM') {
                            evalITEMTYPE = 'CD-ROM';
                        } else if (data[i].item.itemtype == 'CD-ROM4') {
                            evalITEMTYPE = 'CD-ROM, 4 Hour Loan';
                        } else if (data[i].item.itemtype == 'CD-ROMNC') {
                            evalITEMTYPE = 'Non Circulating CD-ROM';
                        } else if (data[i].item.itemtype == 'Y-JACK') {
                            evalITEMTYPE = 'Y-JACK';
                        } else if (data[i].item.itemtype == 'CD-ROMS') {
                            evalITEMTYPE = 'CD-ROM';
                        } else if (data[i].item.itemtype == null) {
                            evalITEMTYPE = 'Item type missing';
                        } else {
                            var data_str = $(".non-staff #app-body").attr("data-itemtypes");
                            var my_object_itemtypes = JSON.parse(decodeURIComponent(data_str));
                            var evalITEMTYPE = eval('my_object_itemtypes.' + data[i].item.itemtype + '.description');
                            var evalITEMTYPE_notforloan_indicator = eval('my_object_itemtypes.' + data[i].item.itemtype + '.notforloan');
                        } //if (data[i].item.itemtype=='CD-ROM') {
                        var data_str = $(".non-staff #app-body").attr("data-authvals");
                        var my_object_authvals = JSON.parse(decodeURIComponent(data_str));
                        var evalWTHDRAWN = eval('my_object_authvals' + '.WITHDRAWN[' + parseInt(data[i].item.wthdrawn) + '].opac');
                        var evalNOT_LOAN = eval('my_object_authvals' + '.NOT_LOAN[' + parseInt(data[i].item.notforloan) + '].opac');
                        var evalDAMAGED = eval('my_object_authvals' + '.DAMAGED[' + parseInt(data[i].item.damaged) + '].opac');

                        if (data[i].item.itemtype) {
                            if (data[i].item.itemtype == 'CD-ROM') {
                                var evalTCPCNC = "";
                            } else {
                                var evalTCPCNC = eval('my_object_itemtypes.' + data[i].item.itemtype + '.summary');
                            } //if(data[i].item.itemtype == 'CD-ROM'){
                        } else {
                            var evalTCPCNC = 'The summary field for this item type needs a ? followed by a delimeter in Admin interface';
                        } //if(data[i].item.itemtype){

                        var onLoan = '';
                        if (data[i].item.catstat == null) {
                            var evalCATSTAT = 'This is a normal catstat';
                        } else {} //if(data[i].item.catstat == null){

                        if (data[i].item.onloan !== null) {
                            onLoan = fixDateFormat(data[i].item.onloan);
                        } //if(data[i].item.onloan !==null){

                        //http://hartford.waldo.sandbox.kohalibrary.com/api/work/149464/mfhds ---- <a class="missingenumchron" href="">More Info</a>
                        if (enumChron == ' ' && (data[i].item.holdingbranch == 'MORTENSEN' && evalITEMTYPE == 'Periodical')) enumChron = '<a class="missingenumchron" href="" id="getenum' +
                            bib.id + '">More Info</a>'; //admins can NOT rename 'Periodical'  unless this changes as well.
                        var ItemsTableToptr = '<tr>';
                        if (actualDisplayCnt >= 5) ItemsTableToptr = '<tr class="seemoreitems' + bib.id + ' hidethese">';
                        var cmore = '';
                        if (volInfo == ' ' && (data[i].item.holdingbranch == 'MORTENSEN' && evalITEMTYPE == 'Periodical')) volInfo = '<a class="missingvolprod" href="" id="volinfo' + bib.id + '">See Volume Info</a>'; //admins can NOT rename 'Periodical'  unless this changes as well.
                        if (data[i].item.onloan == null) { //if(data[i].item.onloan == null
                            var availStatus = ' Available ';
                        } else {
                            var availStatus = ' Due back ' + fixDateFormat(data[i].item.onloan);
                        } //if(data[i].item.onloan == null
                        var circStatus = '';
                        if (data[i].item.recalled !== false) availStatus = 'Item recalled';
                        if (data[i].item.in_transit !== null) availStatus = 'Item in transit';
                        if (availStatus == 'Cataloging Review - Ask at Circulation Desk') {
                            CatRev = true;
                        } //if(availStatus=='Cataloging Review - Ask at Circulation Desk')
                        if (availStatus == 'Ordered') //////////console.log("wtf",availStatus);
                            if (availStatus == 'Item withdrawn' || availStatus == 'Item not for loan' || availStatus == 'Item long overdue or lost' || availStatus == 'Item damaged' || availStatus == 'Item recalled') circStatus = '';
                        if (data[i].item.location == 'ONLINE') circStatus = 'Available online';
                        var data_str = $(".non-staff #app-body").attr("data-branches");
                        var my_object_branches = JSON.parse(decodeURIComponent(data_str));
                        //console.log("2137 INSIDE newajax.js" , my_object );
                        var homeBranch = eval('my_object_branches.' + data[i].item.holdingbranch + '.branchname');
                        console.log("2140 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch1", homeBranch); //The Maurice Greenberg Center for Judaic Studies
                        console.log("2141 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch2", data[i].item.location); //zachs
                        if (data[i].item.location == 'ZACHS') evalLOC = '';
                        if (data[i].item.location != 'ZACHS') {
                            if (data[i].item.location !== null) {
                                var evalLOC = eval('window.authvalsObj.LOC.' + data[i].item.location + '.opac');
                                console.log("2147 PLANT= dynLoc testobj 2145", window.authvalsObj.LOC);
                                console.log("2147 PLANT= dynLoc testobj 2145", data[i].item.location);
                                var zzz = eval('window.authvalsObj.LOC.' + data[i].item.location + '.opac');
                                console.log("2151 PLANT= dynLoc testobj 2145 HG", zzz);
                            } else {
                                var evalLOC = '';
                            } //if( data[i].item.location !==null){
                        } //if( data[i].item.location !='ZACHS'){
                        if (!CatRev) var availStatus = 'Available';
                        if (data[i].item.onloan !== null) {
                            var availStatus = 'Checked out (due ' + fixDateFormat(data[i].item.onloan) + ')';
                        } //if(data[i].item.onloan!==null){
                        if (Number(data[i].item.itemlost) !== 0) {
                            // console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch" , data[i].item.itemlost );
                            // console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch" , my_object_authvals );
                            // console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch" , my_object_authvals );
                            var tempstr = 'my_object_authvals' + '.lost[' + data[i].item.itemlost + '].staff';
                            console.log("2169 INSIDE var homeBranchvar homeBranchvar homeBranchvar homeBranch", tempstr);
                            availStatus = eval('my_object_authvals' + '.lost[' + '"' + data[i].item.itemlost + '"' + '].staff'); // 'Item long overdue or lost';
                            //eval('config.itemtypes[' + '"' + s + '"' + '].description');
                            if (Number(data[i].item.itemlost) == 8) availStatus += ' ' + '(due ' + fixDateFormat(data[i].item.datelastseen) + ')'; //due mm/dd/yyy
                        } //if(data[i].item.itemlost !==0){*/

                        if (Number(data[i].item.wthdrawn) !== 0) availStatus = 'Item withdrawn';

                        if (Number(data[i].item.wthdrawn) == 0) { // when data[i].item.wthdrawn =="0" this implies not withdrawn.

                            if (parseInt(data[i].item.notforloan) == -1) availStatus = "Ordered";

                            if (evalLOC == 'Online') {
                                ItemsTableData += ItemsTableToptr + '<td  class="c1">' + homeBranch + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                    '<td class="c4 y100">' + availStatus + '</td>' + '<td class="hidden">' + volInfo + '</td>' + '</tr>';
                                console.log("SRP 2181 TABLE PRINT", evalLOC);
                            } else {
                                console.log("2182 evalLOC1", evalLOC);
                                console.log("2183 evalLOC1", homeBranch, evalLOC, cnInfo);
                                console.log("2185 TABLE PRINT EVALloc", evalLOC);
                                console.log("2186 TABLE PRINT homeBranch", homeBranch);
                                var column1_4srpTable = homeBranch + ' ' + LOC2056;
                                console.log("SRP 2188 column1Table = homeBranch + LOC2056", column1_4srpTable);
                                ItemsTableData += ItemsTableToptr + '<td  class="c1">' + column1_4srpTable + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                    '<td class="c4 y101">' + availStatus + '</td>' + '<td class="hidden">' + volInfo + '</td>' + '</tr>';
                            } //if(evalLOC=='Online'){

                            actualDisplayCnt++;
                        } //if(data[i].item.wthdrawn =="0" ){ // when data[i].item.wthdrawn =="0" this implies not withdrawn.
                        if (Number(data[i].item.wthdrawn) !== 0) { // when data[i].item.wthdrawn =="0" this implies not withdrawn.
                            if (data[i].item.notforloan == "-1") availStatus = "Ordered";

                            if (evalLOC == 'Online') {
                                ItemsTableData += ItemsTableToptr + '<td  class="c1">' + homeBranch + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                    '<td class="c4 y102">' + availStatus + '</td>' + '</tr>';
                                console.log("SRP 2209 evalLOC Online", evalLOC);
                            } else {
                                console.log("SRP 2211 evalLOC else", evalLOC);
                                ItemsTableData += ItemsTableToptr + '<td  class="c1">' + column1_4srpTable + '</td>' + '<td class="c2">' + cnInfo + ' ' + volInfo + '</td>' + '<td class="c3">' + evalITEMTYPE + '</td>' +
                                    '<td class="c4 y103">' + availStatus + '</td>' + '</tr>';
                            } //if(evalLOC=='Online'){

                        } //if(data[i].item.wthdrawn !=="0" ){ // when data[i].item.wthdrawn =="0" this implies not withdrawn.

                        var eval1 = data[i].item.location; //eval('x + y + 1');
                    } //new if condition

                  }//if(navigator.userAgent !=  

                } //for loop PRODUCTION

                if (actualDisplayCnt >= 5) cmore = '<p class="cmoreres"' + ' id="moreitems' + bib.id + '"' + ' style="text-align: left !important">Display more results</p>';
                $('<div class="srptable">' + ItemsTableTop + ItemsTableData + ItemsTableBottom + cmore + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
                console.log("2222 actualDisplayCnt", actualDisplayCnt);
            } else {
                $('<div class="srptable">' + 'This title no longer has any items associated with it.' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
                console.log("2225 actualDisplayCnt else", actualDisplayCnt);
            } //if( data.length >= 1 ){
            $('<!--LOWER-->').insertBefore($('div#kohabib-' + bib.id + ' div.bib-details-holder'));
            return;
        }; //var addItemsTable = function(data) {


    /////////////////////////////////////////////////////// var addItems_or_Mfhd_Table = function(bib) ///////////////////////////////////////////////////////////    
    /////////////////////////////////////////////////////// var addItems_or_Mfhd_Table = function(bib) ///////////////////////////////////////////////////////////    
        var addItems_or_Mfhd_Table = function(bib) {
            console.log("2720 addItems_or_Mfhd_Table", bib);
            var theItemsURL = '/api/work/' + bib.id + '/items';
            var theMFHDsURL = '/api/work/' + bib.id + '/mfhds';
            if (bib.marc.leader().substr(6, 2) === 'ab' || bib.marc.leader().substr(6, 2) === 'ai' || bib.marc.leader().substr(6, 2) === 'as') {
                $.getJSON(theMFHDsURL, function(data) { //outer JSON
                    if (data.length !== 0) { //999 if(data.length===0){
                        console.log("888888888888882726getJSON(theMFHDsURL", data);
                        addMfhdTable(data);
                    } else {
                        $.getJSON(theItemsURL, function(data) {
                            console.log("888888888888888getJSON(theItemsURL", theItemsURL, data);
                            if (data.length !== 0) { //if(data.length===0){
                                addItemsTable(data);
                            } else {
                                var moreDetails = '<br><span><a href="/app/work/' + bib.id + '">More Details</a></span>';
                                $('<div class="srptable">' + 'This item is in the process of being added to the library collection. If you need the item right away, you may ask a library supervisor to expedite processing.' + moreDetails + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
                            } //if(data.length!==0){//if(data.length===0){
                        }); //inner JSON $.getJSON(theItemsURL, function(data) {
                    } // if(data.length!==0){//999 if(data.length===0){
                }); //outer JSON $.getJSON(theMFHDsURL, function(data) { //outer JSON
            } else {
                $.getJSON(theItemsURL, function(data) { //outer JSON
                    console.log("8888888888888888getJSON(theItemsURL", theItemsURL, data);
                    if (data.length !== 0) { //if(data.length===0){
                        addItemsTable(data);
                    } else {
                        var moreDetails = '<br><span><a href="/app/work/' + bib.id + '">More Details</a></span>';
                        $('<div class="srptable">' + 'This item is in the process of being added to the library collection. If you need the item right away, you may ask a library supervisor to expedite processing.' + moreDetails + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
                    }
                }); //outer JSON $.getJSON(theItemsURL, function(data) {
            } //if( bib.marc.leader().substr(6, 2) === etc. If Leader/06 = a and Leader/07 = b, i, or s: Continuing Resources
        }; //var addItems_or_Mfhd_Table = function(bib) {


    ///////////////////////////////////////////////////////////////////////////////MAIN CODE BELOW ///////////////////////////////////////////////////////////////////////////        
        //MAIN CODE BELOW
//This code is used in production and for an external JS file:
//https://libweb.hartford.edu/koha/bvation/js/srp-sept2023.js   <--- production file for the SRP in addition to the SRP from the DL. There may be NO changes to the SRP within the DL, check on this.
// $('<!--UPPER--><div class="newtitle4SRP allnew"> ' + getTitle4SRP(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
//BECOMES  $('<!--UPPER--><div class="newtitle4SRP allnew"> ' + getTitle4SRP_ext(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
//getTitle4SRP_ext
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/lah/getTitle4BDR_ext.js"></script> <--- add to header.html for BDR title
//<script type="text/javascript" src="https://libweb.hartford.edu/koha/lah/getTitle4SRP_ext.js"></script> <--- add to header.html for SRP title

        //$('#search-results-list-holder ul.pagination').remove();  $('<!-- LOWER  -->')
        //if( $('#search-results-list-holder ul.pagination').length == 0 )$('ul.pagination').clone(true,true).prependTo( "#search-results-list-holder" );
        var isEquipment4Loan = true; //assume is equipment, but prove otherwise
        var pipe = '<span class="afterpipe"></span>';
        $("div#kohabib-" + bib.id + " div.allnew").remove();
        $("div#kohabib-" + bib.id + " div.textwrap").remove();
        $('<div class="textwrap">' + '</div>').insertBefore($('div#kohabib-' + bib.id + ' div.bib-details-holder'));
        //$('<!--UPPER--><div class="newtitle4SRP allnew"> ' + getTitle4SRP(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap')); //removed on 11/16/2023 and see below      
        $('<!--UPPER--><div class="newtitle4SRP allnew"> ' + getTitle4SRP_ext(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));


        if (bib.marc.has('520')) {
            $('<div class="wiki_style allnew"> ' + create_wiki_style_hovers520(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            $('#kohabib-' + bib.id + ' .newtitle4SRP').append('<i class="icon-info-sign"></i>');
        } else {
            if (bib.marc.has('505')) {
                console.log("bib=", bib);
                $('<div class="wiki_style allnew"> ' + create_wiki_style_hovers505(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
                $('#kohabib-' + bib.id + ' .newtitle4SRP').append('<i class="icon-info-sign"></i>'); //<i class="icon-list-ul"></i>
            }
        } //    if (    bib.marc.has('520')     ){



        $("div#kohabib-" + bib.id).find('ul.inline li').eq(0).hide(); //This removes all holds links and text from each of the items in the search - 6/3/16

var this_items_number=  $("div#kohabib-" + bib.id).find('.search-results-number').text(); //This removes all holds links and text from each of the items in the search - 6/3/16



//Make sure you are on the SRP page
if(  window.location.pathname.includes('/app/search')  ){
var bibIDwidth= $("#search-results-list").width();
console.log("resize222bibIDwidth",bibIDwidth );
var bibIDwidthNext= $("#search-results-list").children().find('.search-results-number').width();
if(bibIDwidth >1255)$('.textwrap').css('margin-left', bibIDwidthNext+ 29 + 'px');
if(bibIDwidth <=1255)$('.textwrap').css('margin-left', bibIDwidthNext+ 25 + 'px');
if(bibIDwidth <=760)$('.textwrap').css('margin-left', bibIDwidthNext+10+ 'px');
}//if(  window.location.pathname.includes('/app/search')  ){



$(window).resize(function(){
if(  window.location.pathname.includes('/app/search')  ){    
var bibIDwidth= $("#search-results-list").width();
console.log("resize222bibIDwidth",bibIDwidth );
var bibIDwidthNext= $("#search-results-list").children().find('.search-results-number').width();
if(bibIDwidth >1255)$('.textwrap').css('margin-left', bibIDwidthNext+ 29 + 'px !important');
if(bibIDwidth <=1255)$('.textwrap').css('margin-left', bibIDwidthNext+ 25 + 'px');
if(bibIDwidth <=760)$('.textwrap').css('margin-left', bibIDwidthNext+10 + 'px');
}//if(  window.location.pathname.includes('/app/search')  ){
});//$(window).resize(function(){


        $("div#kohabib-" + bib.id).addClass("allnewsearchresults" + bib.id);
        //This would be the BY:
        if (bib.marc.rtype() === 'REC') {
            $('<div class="bybelowtitle allnew getBy"> ' + getBy(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        }
        $('<div class="bybelowtitle allnew getDisplayTextBelowTitle"> ' + getDisplayTextBelowTitle(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        if (bib.marc.has('856')) {
            $('<div class="newonlineresource allnew"> ' + get856SRP(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        }
        if (bib.marc.has('250')) {
            $('<div class="neweditionstatement allnew"> ' + editionStatement250(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        }
        //EQUIPMENT TESTS
        if ((isEquipmentTest(bib)) && ((bib.marc.rtype() === 'SER') || (bib.marc.rtype() === 'BKS') || (bib.marc.rtype() === 'REC'))) {
            $('<div class="newformatinfo allnew"> ' + friendly_print_resource_type(bib) + pipe + getbibRecordFormat(bib) +
                getTypeOfVisMaterial(bib) + getNatureOfContents(bib) + getLiteraryForm(bib) +
                getbibRecordTargetAudience(bib) + getTypeofContRes(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            isEquipment4Loan = false;
        }
        if (!isEquipmentTest(bib)) {
            $('<div class="newformatinfo allnew"> ' + friendly_print_resource_type(bib) + pipe + getbibRecordFormat(bib) +
                getTypeOfVisMaterial(bib) + getNatureOfContents(bib) + getLiteraryForm(bib) +
                getbibRecordTargetAudience(bib) + getTypeofContRes(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            isEquipment4Loan = false;
        }
        //END EQUIPMENT TESTS
        //if(!bib.marc.has('260') && !bib.marc.has('264')){
        if (isEquipment4Loan && bib.marc.has('008')) {
            if (bib.marc.ctrl('008[33]') === 'g') {
                $('<div class="newequipment4loan allnew"> ' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Game</span>' +
                    '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else if (bib.marc.ctrl('008[33]') === 'o') {
                $('<div class="newequipment4loan allnew">' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Flash card</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else if (bib.marc.ctrl('008[33]') === 'a') {
                $('<div class="newequipment4loan allnew">' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Art original</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else if (bib.marc.ctrl('008[33]') === 'c') {
                $('<div class="newequipment4loan allnew">' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Art reproduction</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else if (bib.marc.ctrl('008[33]') === 'w') {
                $('<div class="newequipment4loan allnew">' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Toy</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else if (bib.marc.ctrl('008[33]') === 'q') {
                $('<div class="newequipment4loan allnew">' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Model</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else if (bib.marc.ctrl('008[33]') === 'b') {
                $('<div class="newequipment4loan allnew">' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Kit</span>' + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            } else {
                $('<div class="newequipment4loan allnew"> ' + '<span class="newbiblabel_inlineSRP">Type: </span><span class="gameorequip">Equipment</span>' +
                    '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
            }
        } //end if(isEquipment4Loan)
        if (bib.marc.has('246')) {
            $('<div class="newvaryingformoftitle allnew"> ' + getVaryingFormOfTitle246(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        }
        if (bib.marc.has('440') || bib.marc.has('490') || bib.marc.has('830')) {
            $('<div class="newseriesinformation allnew"> ' + getSeriesInfo4SRP(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        }





        //Publisher below
        $('<div class="newpublisherinfo allnew"> ' + publication260264(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        if (bib.marc.has('521')) {
            $('<div class="newtargetaudience allnew"> ' + getTargetAudienceNote521(bib) + '</div>').appendTo($('div#kohabib-' + bib.id + ' div.textwrap'));
        }
        var newblurb = '<b><font color="red">Waiting on new data from LibLime for complete location and availability info here.</font></b>';
        var circRules = 'Univ. of Hartford has 3 rules of circulation. FC( full circulation ), PC ( partial circulation ) and NC ( no circulation )';

        ///$('.allnew').prepend($(".textwrap"));
        addItems_or_Mfhd_Table(bib);
        $("body").on("click", ".popthis", function(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
            $(this).next().toggle();
            $(this).text($(this).text() == 'Hide debug table - click here' ? "Show debug table - click here" : "Hide debug table - click here"); //
        });
        $("body").on("click", ".missingenumchron", function(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
            var res = $(this).attr('id').substring(7);
            var resOrig = $(this).attr('id');
            var theURL = '/api/work/' + res + '/mfhds';
            $.getJSON(theURL, function(data) { //outer JSON
                for (i = 0; i < data.length; i++) { //for loop
                    if (data[i].mfhd.location.homebranch === 'MORTENSEN') {
                        var foundEnumChron = data[i].mfhd.textual_holdings[0].statement;
                        $('#' + resOrig).replaceWith(foundEnumChron);

                    } //if(data[i].mfhd.location.homebranch === 'MORTENSEN'){
                } //for loop
            }); //AJAX CALL GETJSON
        });
        $("body").on("click", ".missingvolprod", function(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
            var res = $(this).attr('id').substring(7); // the number after volinfo where volinfo is the prefix for the ID
            var resOrig = $(this).attr('id');
            var theURL = '/api/work/' + res + '/mfhds';
            $.getJSON(theURL, function(data) { //outer JSON
                for (i = 0; i < data.length; i++) { //for loop
                    if (data[i].mfhd.location.homebranch === 'MORTENSEN') {
                        if( data[i].mfhd.textual_holdings.length > 0){
                            if( data[i].mfhd.textual_holdings[0].statement){
                            var foundEnumChron = data[i].mfhd.textual_holdings[0].statement;
                            $('#' + resOrig).replaceWith(foundEnumChron);
                            }//if( data[i].mfhd.textual_holdings[0].statement !=null){
                        }//if( data[i].mfhd.textual_holdings.length > 0){

                        if( data[i].mfhd.textual_holdings.length == 0)alert("No further Volume Info can be found");


                    } //if(data[i].mfhd.location.homebranch === 'MORTENSEN'){
                } //for loop
            }); //AJAX CALL GETJSON
        });




     // $(".newtitle4SRP .icon-eye-open").hover(function(){
      $(".newtitle4SRP i").hover(function(){    
        $(this).parent().next().filter('.wiki_style').show();
        }, function(){
         $(this).parent().next().filter('.wiki_style').hide();
      });


        $("body").on("click", "p.cmoreres", function(event) {
            event.stopImmediatePropagation();
            var res = $(this).attr('id').substring(9);

            if ($('.seemoreitems' + res).hasClass('showthese')) {
                $('.seemoreitems' + res).removeClass('showthese').addClass('hidethese');
                $(this).text('Display more results');
                $('html,body').animate({ scrollTop: $(".scrll" + res).offset().top - 200 }, 2000);
            } else {
                $('.seemoreitems' + res).removeClass('hidethese').addClass('showthese');
                $(this).text('Display fewer results');
            }
        });
        $('freezable').hide();
        //MAIN CODE END
    }; //var process_search_results = function(field,bib) {