$("li.doinline.open").removeClass("open"); //remove the open for the navbar dropdown

$(document).on("click", ".pager-container", function(event) {
    console.log("window.location.pathname", window.location.pathname);


    if (window.location.pathname.indexOf("/app/search/") >= 0) {
        console.log("SRR PAGE CLICK0", event.currentTarget); //currentTarget 
        console.log("SRR PAGE CLICK2", $(event));
        console.log("SRR PAGE CLICK3", event.target);

        if (Number.isInteger(parseInt($(event.target).text(), 10)) || $(event.target).text() == 'Last' || $(event.target).text() == 'Previous' || $(event.target).text() == 'Next' || $(event.target).text() == '...' || $(event.target).text() == 'First') {
            console.log("looks like pagination");
            console.log("ccccclick#sortcol1", event.target);
            console.log("ccccclick#sortcol1", event);
            console.log("ccccclick#sortcol1", $(event.target).text());
            console.log("ccccclick#sortcol1", Number.isInteger(parseInt($(event.target).text(), 10)));
        } else {

            console.log("eleselooks like pagination");
            console.log("elese ccccclick#sortcol1", event.target);

            var par = $(event.target).parent();
            var par2 = $(event.target);

            if ($(par2).hasClass("glyphicon-minusrla")) {
                $(par).addClass("ng-hide");
                $("div.allcustomacqdate").hide();
                $("h6.facet-field-header.rla div.collapser .parrla").removeClass('ng-hide');
                $("h6.facet-field-header.rla div.collapser .parrla2").addClass('ng-hide');
            } //if($(par2).hasClass("glyphicon-minusrla")){

            if ($(par2).hasClass("glyphicon-plusrla")) {
                $(par).addClass("ng-hide");
                $("div.allcustomacqdate").show();
                $("h6.facet-field-header.rla div.collapser .parrla2").removeClass('ng-hide');
                $("h6.facet-field-header.rla div.collapser .parrla").addClass('ng-hide');
            } //if($(par2).hasClass("glyphicon-minusrla")){    

            console.log("eleseccccclick#sortcol1 par", par);

            console.log("eleseccccclick#sortcol1", event);
            console.log("eleseccccclick#sortcol1", $(event.target).text());

            if ($(event.target).text() == 'Added in the last 30 days') {
                $("li.doinline.open").removeClass("open"); //remove the open for the navbar dropdown
            }

            if ($(event.target).text() === 'Acquired within the last 2 years' || $(event.target).text() === 'Acquired within the last year') {

                if ($(event.target).text() === 'Acquired within the last 2 years') var car = {
                    type: "2",
                    model: "730",
                    color: "twoyear"
                };
                if ($(event.target).text() === 'Acquired within the last year') var car = {
                    type: "1",
                    model: "365",
                    color: "oneyear"
                };
                console.log("TESTING LOOK AHEAD IN PAGINATION.JS");

                var qs = getQS(); //defined inside facets.js

                console.log("var qs =PAGINATION.JS ", qs);
                var current_url = window.location.href;
                console.log("date range click queryParams ", qs);
                var forFacets = getUrlParams(window.location.search);
                var OPACstring2 = buildOPAC_url(forFacets, qs, 'pubyear');

                console.log("FOR DATES AND NEW CODE OPACstring2= ", OPACstring2);
                var tester_date = '&fq=acqdate:%5BNOW-1YEARS+TO+*%5D';
                var OPACstring3 = OPACstring2 + tester_date;
                console.log("FOR DATES AND NEW CODE OPACstring3= ", OPACstring3);
                $.getJSON(OPACstring3, car, function(result) {
                    var hits = result.total_hits;

                    console.log("car =", car);
                    console.log("FOR DATES AND NEW CODE result.total_hits= ", result.total_hits);

                    if (result.total_hits > 0) {

                        $("div.allcustomacqdate span.custom-facet-remove").remove();
                        $('.' + car.color).append('<span class="custom-facet-remove"><i class="glyphicon glyphicon-remove"></i></span>');
                        var urlparams = getParams(window.location.href);
                        console.log("ENTER KEY TEST facets 520 .js says urlparams = ", urlparams);
                        var kb = '';

                        if (window.location.search !== '') {
                            for (let [key, value] of Object.entries(urlparams)) {
                                if (key !== 'pubyear' && key !== 'sort' && key !== 'page') {
                                    if (value !== 'acqdate:[NOW-2YEARS TO *]' && value !== 'acqdate:[NOW-1YEARS TO *]') {
                                        console.log("key=", key);
                                        console.log("value=", value);
                                        kb += key + '=' + value + '&';
                                    } //inner if
                                }
                            } //for
                        } //if(window.location.search !== ''){

                        console.log("ENTER KEY TEST kb ENTER KEY TEST kbENTER KEY TEST kb= ", kb);
                        kb = kb.replace(/\&$/, ''); /////////////////////////////////////////////////////
                        console.log("ENTER KEY TEST kb ENTER KEY TEST kbENTER KEY TEST kb= and dupe", kb);
                        var kb2 = kb.replace(/&page=[0-9]+/, ''); ///////////////////////////////////////////
                        console.log("ENTER KEY TEST kb2 ENTER KEY TEST kb2ENTER KEY TEST kb2= ", kb2);
                        //$("#toppager").remove();

                        if (kb2 === '') {
                            var enterKeyURL = '?' + 'fq=acqdate:%5BNOW-' + (car.type * 1) + 'YEARS%20TO%20*%5D';
                            console.log("kb2 === '' ENTER KEY TEST facets enterKeyURL enterKeyURL ", enterKeyURL);
                            window.location.pathname + enterKeyURL;
                            console.log("kb2 === '' ENTER KEY TEST facets  window.location.pathname +  enterKeyURL =", window.location.pathname + enterKeyURL); //
                            window.history.replaceState({}, null, window.location.pathname + enterKeyURL + '&sort=acqdate%20desc');
                        } else {
                            var enterKeyURL = encodeURI(kb2) + '&' + 'fq=acqdate:%5BNOW-' + (car.type * 1) + 'YEARS%20TO%20*%5D';
                            console.log("!kb2 === '' ENTER KEY TEST facets enterKeyURL enterKeyURL ", enterKeyURL);
                            console.log("!kb2 === '' ENTER KEY TEST facets  window.location.pathname + '?' +  enterKeyURL =", window.location.pathname + '?' + enterKeyURL);
                            window.history.replaceState({}, null, window.location.pathname + '?' + enterKeyURL + '&sort=acqdate%20desc');

                        } //if kb2 
                    } else {
                        //something wrong
                        //alert("UH OH - no results");
                    } //if(result.total_hits >0)


                }); //json  
            } else {
                console.log("eleseccccclick#sortcol1", $(event.target).parent().html());
                window.history.replaceState({}, null, window.location.href.replace(/&page=[0-9]+/, '').replace(/\?page=[0-9]+/, ''));
            }

        } //if( Number.isInteger(  parseInt($(event.target).text(), 10)) ||  $(event.target).text()=='Previous'  ||  $(event.target).text()=='Next'  ){ 


    } //if(window.location.pathname.indexOf("/app/search/")>=0 ){

}); //$(document).on("click", function(event) {