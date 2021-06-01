/*
 * Inline Form Validation Engine 1.3.9.5, jQuery plugin
 *
 * Copyright(c) 2009, Cedric Dugas
 * http://www.position-relative.net
 *
 * Form validation engine which allow custom regex rules to be added.
 * Licenced under the MIT Licence
 */

(function($) {
    $.fn.validationEngine = function(settings) {
        if($.validationEngineLanguage){				// IS THERE A LANGUAGE LOCALISATION ?
            allRules = $.validationEngineLanguage.allRules
        }else{
            allRules = 	{
                "required":{    			// Add your regex rules here, you can take telephone as an example
                    "regex":"/^\s+|\s+$/g",
                    "alertText":"* This field is required",
                    "alertTextCheckboxMultiple":"* Please select an option",
                    "alertTextCheckboxe":"* This checkbox is required"
                },
                "length":{
                    "regex":"none",
                    "alertText":"*Between ",
                    "alertText2":" and ",
                    "alertText3": " characters allowed"
                },
                "lengthh":{
                    "regex":"none",
                    "alertText":"* Enter",
                    "alertText2":"  Digits",
                    "alertText3": ""
                },
                "minCheckbox":{
                    "regex":"none",
                    "alertText":"* Please select ",
                    "alertText2":"  option"
                },
                "minSelectkbox":{
                    "regex":"none",
                    "alertText":"* Please select ",
                    "alertText2":"  option"
                },
                "minSalesPerson":{
                    "regex":"none",
                    "alertText":"* Please select ",
                    "alertText2":"  Sales Person"
                },
                "maxCheckbox":{
                    "regex":"none",
                    "alertText":"* Checks allowed Exceeded "
                },
                "confirm":{
                    "regex":"none",
                    "alertText":"* Your field is not matching"
                },
                "lessThanOrEqualTo":{
                    "regex":"none",
                    "alertText":"* Shortlisted Students should be less than OR equal to Students Came."
                },
                "candidateExperience":{
                    "regex":"none",
                    "alertText":"* Total Experience should be greater than OR equal to Relevant Experience."
                },
                "relevantexperience":{
                    "regex":"none",
                    "alertText":"* Relevant Experience should be greater than 0."
                },
                "sumequalto":{
                    "regex":"none",
                    "alertText":"* Shortlisted Students should be less than OR equal to Students Came."
                },
                "projectprercent":{
                    "regex":"none",
                    "alertText":"* Sum of all % should be 100%."
                },
                "telephone":{
                    "regex":"/^[0-9\-\(\)\ ]+$/",
                    "alertText":"* Invalid phone number"  
                },
                "mobilenumber":{
                    "regex":"/^[0-9]{10,11}$/",
                    "alertText":"* Invalid mobile / phone number"
                },
                "colorcode":{
                    "regex":"/(?:#|0x)?(?:[0-9A-F]{2}){3,4}/g",
                    "alertText":"* Invalid Colour Code"
                },
                "contactmobile":{
                    "regex":"/^[0-9]{10,10}$/",
                    "alertText":"* Invalid mobile phone number"
                },                
                "extension":{
                    "regex":"/^[0-9]{1,4}$/",
                    "alertText":"* Invalid Extension Number"
                },
                "email":{ 
                    "regex":/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    "alertText":"* Invalid E-Mail address"
                },
                "website":{
                    "regex":"/^[wW]{3}\.\[a-zA-Z0-9]{2,4}\.\[a-zA-Z0-9]{2,4}/",
                    "alertText":"* Invalid web site"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL, must be in http://google.com OR http://www.google.com format"
                },
                "date":{
                    "regex":"/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/",
                    "alertText":"* Invalid date, must be in YYYY-MM-DD format"
                }, 
                "indiandate":{
                    "regex":/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
                    "alertText":"* Invalid date, must be in DD/MM/YYYY format"
                }, 
                "onlyNumber":{
                    "regex":"/^[0-9\ ]+$/",
                    "alertText":"* Numbers only"
                },
                "allNumbers":{
                    "regex":/^-?[0-9]\d*(\d+)?$/,
                    "alertText":"* Numbers only"
                },
                "money":{
                    //"regex":"/^[0-9.(0-9)\ ]+$/",
                    "regex": /^\d+(\.(\d{1,2}))?$/,
                    "alertText":"* Invalid Amount"
                },
                "percent":{
                    "regex":"/^[0-9.(0-9)\ ]+$/",
                    "alertText":"* Invalid Percentage"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "float":{
                    "regex":"/^[0-9.(0-9)\ ]+$/",
                    "alertText":"* Invalid Field"
                },
                "hours":{
                    "regex":"/^[0-9.(0-9)\ ]+$/",
                    "alertText":"* Invalid Hours"
                },
                "onlyDomain":{
                    "regex":"/^[a-zA-Z\-\']+$/",
                    "alertText":"* Only characters and '-' are allowed."
                },
                "noSpecialCharacters":{
                    "regex":"/^[0-9a-zA-Z]+$/",
                    "alertText":"* No special characters allowed."
                },
                "onlyName":{
                    "regex":"/^[0-9a-zA-Z]+$/",
                    "alertText":"* No special characters allowed in File name. Rename it."
                },
                "add_candidate_dob":{
                    "file":"http://mis.neosofttech.in/User/php/add_candidate_dob_validate.php",
                    "alertTextOk":"* Correct",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* Wrong Date"
                },
                "ajaxUser":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateUser.php?hidAction=adduserform",
                    "alertTextOk":"* This user is available",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This user is already taken"
                },
                "trackerDomain":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/ajaxClientTracker.php?hidAction=ajaxTrackerDomain&clientid="+$("#hideClient").val(),
                    "alertTextOk":"* This domain is available",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This domain is already taken"
                },
                "ajaxTrackerUsername":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/ajaxClientTracker.php?hidAction=ajaxTrackerUsername",
                    "alertTextOk":"* This username is available",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This username is already taken"
                },
                "candidateemail":{
                    "file":"http://mis.neosofttech.in/User/php/validateHRMSCandidateEmail.php?candidate="+$('#hidecandidate').val(),
                    "alertTextOk":"* Success",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This E-mail is already exist."
                },
                "candidatemobile":{
                    "file":"http://mis.neosofttech.in/User/php/validateHRMSCandidateMobile.php?candidate="+$('#hidecandidate').val(),
                    "alertTextOk":"* Success",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This Mobile Number is already exist."
                },
                "expenditures":{
                    "file":"http://mis.neosofttech.in/User/php/validateExpendituresMonth.php",
                    "alertTextOk":"* Success",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* Expenditures for this month is already available."
                },
                "userseatnum":{
                    "file":"http://mis.neosofttech.in/User/php/userseatnum.php",
                    "alertTextOk":"* Success",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This seat is already assigned to someone."
                },
                "useripaddress":{
                    "file":"http://mis.neosofttech.in/User/php/useripaddress.php",
                    "alertTextOk":"* Success",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This IP-Address is already assigned to someone."
                },
                "ajaxDemo":{
                    "file":"http://mis.neosofttech.in/php/demoUser.php?hidAction=findUser",
                    "alertTextOk":"* This user name is available",
                    "alertTextLoad":"* Loading, please wait...",
                    "alertText":"* This user name is already taken"
                },
                "ajaxUser1":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateUser.php?hidAction=addclient",
                    "alertTextOk":"* This user is available",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* This user is already taken"
                },
                "ajaxName":{
                    "file":"php/validateUser.php",
                    "alertText":"* This name is already taken",
                    "alertTextOk":"* This name is available",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxSalaryParameter":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateParameter.php",
                    "alertText":"* This parameter already exists",
                    "alertTextOk":"* This name is available",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxCountry":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateCountry.php",
                    "alertText":"* This country already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxspecialisation":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateSpecialisation.php",
                    "alertText":"* This country already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxCompany":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateCompany.php",
                    "alertText":"* This company already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxCampaign":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateCampaign.php",
                    "alertText":"* This campaign already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxDepartment":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateDepartment.php",
                    "alertText":"* This Department already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxUniversity":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateUniversity.php",
                    "alertText":"* This University already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxLanguage":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateLanguage.php",
                    "alertText":"* This Language already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                // added on 10 june
                "ajaxAddResourceLeasingCategory":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateResourceLeasingCategory.php?hidAction=add",
                    "alertText":"* This category already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxEditResourceLeasingCategory":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateResourceLeasingCategory.php?hidAction=edit",
                    "alertText":"* This category already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxEditResourceLeasingSubcategory":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateResourceLeasingSubcategory.php?hidAction=edit",
                    "alertText":"* This category already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxAddResourceLeasingSubcategory":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateResourceLeasingSubcategory.php?hidAction=add",
                    "alertText":"* This category already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxAddCurrency":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateCurrency.php?hidAction=add",
                    "alertText":"* This name already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxEditCurrency":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validateCurrency.php?hidAction=edit",
                    "alertText":"* This name already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxAddPaymentMethod":{

                    "file":"http://mis.neosofttech.in/neocontrol/php/validatePaymentMethod.php?hidAction=add",
                    "alertText":"* This Name already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                "ajaxEditPaymentMethod":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/validatePaymentMethod.php?hidAction=edit",
                    "alertText":"* This Name already exists",
                    "alertTextLoad":"* Loading, please wait"
                },
                //added on 29th july 2011 by sudik
                "ajaxValidateUser":{
                    "file":"http://mis.neosofttech.in/neocontrol/php/chkUserEmail.php",
                    "alertTextOk":"* valid user",
                    "alertTextLoad":"* Loading, please wait",
                    "alertText":"* Invalid user email Id"
                },
                "onlyLetter":{
                    "regex":"/^[a-zA-Z\ \']+$/",
                    "alertText":"* Letters only"
                },
                "onlyNameAndNumber":{
                    "regex":"/^[a-zA-Z0-9\ \']+$/",
                    "alertText":"* Letters & Numbers Only"
                }

            }
        }
        settings = jQuery.extend({
            allrules:allRules,
            inlineValidation: true,
            ajaxSubmit: false,
            promptPosition: "topRight",	// OPENNING BOX POSITION, IMPLEMENTED: topLeft, topRight, bottomLeft, centerRight, bottomRight
            success : false,
            beforeSend : false,
            failure : function() {}
        }, settings);



        $.validationEngine.ajaxValidArray = new Array()	// ARRAY FOR AJAX: VALIDATION MEMORY

        $(this).bind("submit", function(caller){   // ON FORM SUBMIT, CONTROL AJAX FUNCTION IF SPECIFIED ON DOCUMENT READY
            $.validationEngine.onSubmitValid = true;

            if($.validationEngine.submitValidation(this,settings) == false){
                if($.validationEngine.submitForm(this,settings) == true) {
                    return false;
                }
            }else{
                settings.failure && settings.failure();
                return false;
            }
        })
        if(settings.inlineValidation == true){ 		// Validating Inline ?
            $(this).find("[class^=validate]").not("[type=checkbox]").bind("blur", function(caller){
                _inlinEvent(this)
            })
            $(this).find("[class^=validate][type=checkbox]").bind("click", function(caller){
                _inlinEvent(this)
            })

            function _inlinEvent(caller){
                if($.validationEngine.intercept == false || !$.validationEngine.intercept){		// STOP INLINE VALIDATION THIS TIME ONLY
                    $.validationEngine.onSubmitValid=false;
                    $.validationEngine.loadValidation(caller,settings);
                }else{
                    $.validationEngine.intercept = false;
                }
            }
        }
    };
    $.validationEngine = {
        submitForm : function(caller){
            if($.validationEngine.settings.ajaxSubmit){
                
                if ($.validationEngine.settings.beforeSend){	// AJAX SUCCESS, STOP THE LOCATION UPDATE
                    $.validationEngine.settings.beforeSend && $.validationEngine.settings.beforeSend();
                }
                
                var ajaxSubmitMessage = $.validationEngine.settings.ajaxSubmitMessage;
                $.ajax({
                    type: "POST",
                    url: $.validationEngine.settings.ajaxSubmitFile,
                    async: true,
                    data: $(caller).serialize(),
                    beforeSend: function(){},
                    success: function(data){
                        data = data.trim();
                        if(data == "true"){			// EVERYTING IS FINE, SHOW SUCCESS MESSAGE
                            $(caller).css("opacity",1)
                            $(caller).animate({
                                opacity: 0,
                                height: 0
                            }, function(){
                                $(caller).css("display","none")
                                $(caller).before("<div class='ajaxSubmit'>"+ajaxSubmitMessage+"</div>")
                                $.validationEngine.closePrompt(".formError",true)
                                $(".ajaxSubmit").show("slow")
                                if ($.validationEngine.settings.success){	// AJAX SUCCESS, STOP THE LOCATION UPDATE
                                    $.validationEngine.settings.success && $.validationEngine.settings.success();
                                    return false;
                                }
                            })
                        }else{						// HOUSTON WE GOT A PROBLEM (SOMETING IS NOT VALIDATING)
                            data = eval( "("+data+")");
                            errorNumber = data.jsonValidateReturn.length;
                            for(index=0; index<errorNumber; index++){
                                
                                if(data.jsonValidateReturn[index][0] === 'success') {
                                    $('#' + data.jsonValidateReturn[index][1]).html( data.jsonValidateReturn[index][2] );
                                    //$.validationEngine.settings.success && $.validationEngine.settings.success();
                                    $('#' + data.jsonValidateReturn[index][3] ).dialog( 'close' );
                                    return false;
                                } else {
                                    fieldId = data.jsonValidateReturn[index][0];
                                    promptError = data.jsonValidateReturn[index][1];
                                    type = data.jsonValidateReturn[index][2];
                                    $.validationEngine.buildPrompt(fieldId,promptError,type);
                                }
                            }
                            
                            if($('#sendbtn, #closebtn').length)
                                $('#sendbtn, #closebtn').show();
                        }
                    }
                })
                return true;
            }
            if ($.validationEngine.settings.success){	// AJAX SUCCESS, STOP THE LOCATION UPDATE
                $.validationEngine.settings.success && $.validationEngine.settings.success();
                return true;
            }
            return false;
        },
        buildPrompt : function(caller,promptText,type,ajaxed) {			// ERROR PROMPT CREATION AND DISPLAY WHEN AN ERROR OCCUR
            var divFormError = document.createElement('div')
            var formErrorContent = document.createElement('div')

            $(divFormError).addClass("formError")

            if(type == "pass"){
                $(divFormError).addClass("greenPopup")
            }
            if(type == "load"){
                $(divFormError).addClass("blackPopup")
            }
            if(ajaxed){
                $(divFormError).addClass("ajaxed")
            }
            
            $(divFormError).addClass($(caller).attr("id"))
            $(formErrorContent).addClass("formErrorContent")

            $("body").append(divFormError)
            $(divFormError).append(formErrorContent)

            if($.validationEngine.showTriangle != false){		// NO TRIANGLE ON MAX CHECKBOX AND RADIO
                var arrow = document.createElement('div')
                $(arrow).addClass("formErrorArrow")
                $(divFormError).append(arrow)
                if($.validationEngine.settings.promptPosition == "bottomLeft" || $.validationEngine.settings.promptPosition == "bottomRight"){
                    $(arrow).addClass("formErrorArrowBottom")
                    $(arrow).html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                }
                if($.validationEngine.settings.promptPosition == "topLeft" || $.validationEngine.settings.promptPosition == "topRight"){
                    $(divFormError).append(arrow)
                    $(arrow).html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                }
            }
            $(formErrorContent).html(promptText)

            callerTopPosition = $(caller).offset().top;
            callerleftPosition = $(caller).offset().left;
            callerWidth =  $(caller).width()
            inputHeight = $(divFormError).height()

            /* POSITIONNING */
            if($.validationEngine.settings.promptPosition == "topRight"){
                callerleftPosition +=  callerWidth -30;
                callerTopPosition += -inputHeight -10;
            }
            if($.validationEngine.settings.promptPosition == "topLeft"){
                callerTopPosition += -inputHeight -10;
            }

            if($.validationEngine.settings.promptPosition == "centerRight"){
                callerleftPosition +=  callerWidth +13;
            }

            if($.validationEngine.settings.promptPosition == "bottomLeft"){
                callerHeight =  $(caller).height();
                callerleftPosition = callerleftPosition;
                callerTopPosition = callerTopPosition + callerHeight + 15;
            }
            if($.validationEngine.settings.promptPosition == "bottomRight"){
                callerHeight =  $(caller).height();
                callerleftPosition +=  callerWidth -30;
                callerTopPosition +=  callerHeight + 15;
            }
            $(divFormError).css({
                top:callerTopPosition,
                left:callerleftPosition,
                opacity:0
            })
            return $(divFormError).animate({
                "opacity":0.87
            },function(){
                return true;
            });
        },
        updatePromptText : function(caller,promptText,type,ajaxed) {	// UPDATE TEXT ERROR IF AN ERROR IS ALREADY DISPLAYED
            updateThisPrompt =  $(caller).attr("id");
            updateThisPrompt = "."+updateThisPrompt;

            (type == "pass") ? $(updateThisPrompt).addClass("greenPopup") : $(updateThisPrompt).removeClass("greenPopup");
            (type == "load") ? $(updateThisPrompt).addClass("blackPopup") : $(updateThisPrompt).removeClass("blackPopup");
            (ajaxed) ? $(updateThisPrompt).addClass("ajaxed") : $(updateThisPrompt).removeClass("ajaxed");

            $(updateThisPrompt).find(".formErrorContent").html(promptText)
            callerTopPosition  = $(caller).offset().top;
            inputHeight = $(updateThisPrompt).height()

            if($.validationEngine.settings.promptPosition == "bottomLeft" || $.validationEngine.settings.promptPosition == "bottomRight"){
                callerHeight =  $(caller).height()
                callerTopPosition =  callerTopPosition + callerHeight + 15
            }
            if($.validationEngine.settings.promptPosition == "centerRight"){
                callerleftPosition +=  callerWidth +13;
            }
            if($.validationEngine.settings.promptPosition == "topLeft" || $.validationEngine.settings.promptPosition == "topRight"){
                callerTopPosition = callerTopPosition  -inputHeight -10
            }
            $(updateThisPrompt).animate({
                top:callerTopPosition
            });
        },
        loadValidation : function(caller,settings) {		// GET VALIDATIONS TO BE EXECUTED
            $.validationEngine.settings = settings
            rulesParsing = $(caller).attr('class');
            rulesRegExp = /\[(.*)\]/;
            getRules = rulesRegExp.exec(rulesParsing);
            str = getRules[1]
            pattern = /\W+/;
            result= str.split(pattern);

            var validateCalll = $.validationEngine.validateCall(caller,result)
            return validateCalll
        },
        validateCall : function(caller,rules) {	// EXECUTE VALIDATION REQUIRED BY THE USER FOR THIS FIELD
            var promptText =""
            var prompt = $(caller).attr("id");
            var caller = caller;
            ajaxValidate = false
            var callerName = $(caller).attr("name");
            $.validationEngine.isError = false;
            $.validationEngine.isErrorPrompt = false; // added for mincheckbox validation
            $.validationEngine.showTriangle = true
            callerType = $(caller).attr("type");
            for (i=0; i<rules.length;i++){
                
                /*
                 * Making this code hardcoded 
                 * We are using this code on Payment Terms in Add / Edit Client Project
                 * This will help us to display error message on Top textbox among percent group
                 * Date: 28th Oct, 2016
                 */
                if(rules[i] === 'projectprercent')   {
                    callerName = prompt = 'txttotalper';
                    caller = $('#'+prompt);
                }
                if(rules[i] === 'projectmoney')   {
                    callerName = prompt = 'txtAmount';
                    caller = $('#'+prompt);
                }
                if(rules[i] === 'categorymoney')   {
                    callerName = prompt = 'txtCategoryAmount';
                    caller = $('#'+prompt);
                }
                
                switch (rules[i]){ 
                    case "optional":
                        if(!$(caller).val()){
                            $.validationEngine.closePrompt(caller)
                            return $.validationEngine.isError
                        }
                        break;
                    case "required":
                        _required(caller,rules);
                        break;
                    case "custom":
                        _customRegex(caller,rules,i);
                        break;
                    case "ajax":
                        if(!$.validationEngine.onSubmitValid){
                            _ajax(caller,rules,i);
                        }
                        break;
                    case "length":
                        _length(caller,rules,i);
                        break;
                    case "lengthh":
                        _lengthh(caller,rules,i);
                        break;
                    case "minCheckbox":
                        _minCheckbox(caller,rules,i);
                        break;
                    case "minSelectkbox":
                        _minSelectkbox(caller,rules,i);
                        break;
                    case "minSalesPerson":
                        _minSalesPerson(caller,rules,i);
                        break;
                    case "maxCheckbox":
                        _maxCheckbox(caller,rules,i);
                        break;
                    case "confirm":
                        _confirm(caller,rules,i);
                        break;
                    case "lessThanOrEqualTo":
                        _lessThanOrEqualTo(caller,rules,i);
                        break;
                    case "candidateExperience":
                        _candidateExperience(caller,rules,i);
                        break;
                    case "relevantexperience":
                        _relevantexperience(caller,rules,i);
                        break;
                    case "sumequalto":
                        _sumequalto(caller,rules,i);
                        break;
                    case "projectprercent":
                        _projectprercent(caller,rules,i);
                        break;
                    case "projectmoney":
                        _projectmoney(caller,rules,i);
                        break;
                    case "categorymoney":
                        _categorymoney(caller,rules,i);
                        break;
                    default :
                        ;
                };
            };
            if ($.validationEngine.isError == true){
                radioHackOpen();
                if ($.validationEngine.isError == true){ // show only one
                    if(!$.validationEngine.isErrorPrompt) // added for mincheckbox validation
                        ($("div."+prompt).size() ==0) ? $.validationEngine.buildPrompt(caller,promptText,"error")	: $.validationEngine.updatePromptText(caller,promptText);
                }
            }else{
                radioHackClose();
                $.validationEngine.closePrompt(caller);
            }
            /* UNFORTUNATE RADIO AND CHECKBOX GROUP HACKS */
            /* As my validation is looping input with id's we need a hack for my validation to understand to group these inputs */
            function radioHackOpen(){
                if($("input[name="+callerName+"]").size()> 1 && callerType == "radio") {		// Hack for radio group button, the validation go the first radio
                    caller = $("input[name="+callerName+"]:first");
                    $.validationEngine.showTriangle = false;
                    var callerId ="."+ $(caller).attr("id");
                    if($(callerId).size()==0){
                        $.validationEngine.isError = true;
                    }else{
                        $.validationEngine.isError = false;
                    }
                }
                if($("input[name="+callerName+"]").size()> 1 && callerType == "checkbox") {		// Hack for checkbox group button, the validation go the first radio
                    caller = $("input[name="+callerName+"]:first");
                    $.validationEngine.showTriangle = false;
                    var callerId ="div."+ $(caller).attr("id");
                    //if($(callerId).size()==0){ $.validationEngine.isError = true; }else{ $.validationEngine.isError = false;}
                    if($(callerId).size()==0){
                        $.validationEngine.isErrorPrompt = false;
                    }else{
                        $.validationEngine.isErrorPrompt = true;
                    }
                }
            }
            function radioHackClose(){
                if($("input[name="+callerName+"]").size()> 1 && callerType == "radio") {		// Hack for radio group button, the validation go the first radio
                    caller = $("input[name="+callerName+"]:first");
                }
                if($("input[name="+callerName+"]").size()> 1 && callerType == "checkbox") {		// Hack for checkbox group button, the validation go the first radio
                    caller = $("input[name="+callerName+"]:first");
                }
            }
            /* VALIDATION FUNCTIONS */
            function _required(caller,rules){   // VALIDATE BLANK FIELD
                callerType = $(caller).attr("type");
                if(callerType === undefined)
                    callerType = $(caller).prop("type");
                
                if (callerType == "file" ||callerType == "text" || callerType == "password" || callerType == "textarea"){
                    if(!$(caller).val()){
                        $.validationEngine.isError = true;
                        promptText += $.validationEngine.settings.allrules[rules[i]].alertText+"<br />";
                    }
                }
                if (callerType == "radio" || callerType == "checkbox" ){
                    callerName = $(caller).attr("name");
                    if($("input[name="+callerName+"]:checked").size() == 0) {
                        $.validationEngine.isError = true;
                        if($("input[name="+callerName+"]").size() ==1) {
                            promptText += $.validationEngine.settings.allrules[rules[i]].alertTextCheckboxe+"<br />";
                        }else{
                            promptText += $.validationEngine.settings.allrules[rules[i]].alertTextCheckboxMultiple+"<br />";
                        }
                    }
                }
                if (callerType == "select-one") { // added by paul@kinetek.net for select boxes, Thank you
                    callerName = $(caller).attr("id");
                    if(!$("select[name="+callerName+"]").val()) {
                        $.validationEngine.isError = true;
                        promptText += $.validationEngine.settings.allrules[rules[i]].alertText+"<br />";
                    }
                }
                if (callerType == "select-multiple") { // added by paul@kinetek.net for select boxes, Thank you
                    callerName = $(caller).attr("id");

                    if(!$("#"+callerName).val()) {
                        $.validationEngine.isError = true;
                        promptText += $.validationEngine.settings.allrules[rules[i]].alertText+"<br />";
                    }
                }
            }
            function _customRegex(caller,rules,position){		 // VALIDATE REGEX RULES
                customRule = rules[position+1];
                pattern = eval($.validationEngine.settings.allrules[customRule].regex);
                //if(!pattern.test($(caller).attr('value'))){
                if(!pattern.test($('#' + $(caller).attr('id')).val())){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules[customRule].alertText+"<br />";
                }
            }
            function _ajax(caller,rules,position){				 // VALIDATE AJAX RULES
                customAjaxRule = rules[position+1];
                postfile = $.validationEngine.settings.allrules[customAjaxRule].file;
                fieldValue = $(caller).val();
                ajaxCaller = caller;
                fieldId = $(caller).attr("id");
                ajaxValidate = true;
                ajaxisError = $.validationEngine.isError;

                /* AJAX VALIDATION HAS ITS OWN UPDATE AND BUILD UNLIKE OTHER RULES */
                if(!ajaxisError){
                    $.ajax({
                        type: "POST",
                        url: postfile,
                        async: true,
                        data: "validateValue="+fieldValue+"&validateId="+fieldId+"&validateError="+customAjaxRule,
                        beforeSend: function(){		// BUILD A LOADING PROMPT IF LOAD TEXT EXIST
                            if($.validationEngine.settings.allrules[customAjaxRule].alertTextLoad){
                                if(!$("div."+fieldId)[0]){
                                    return $.validationEngine.buildPrompt(ajaxCaller,$.validationEngine.settings.allrules[customAjaxRule].alertTextLoad,"load");
                                }else{
                                    $.validationEngine.updatePromptText(ajaxCaller,$.validationEngine.settings.allrules[customAjaxRule].alertTextLoad,"load");
                                }
                            }
                        },
                        success: function(data){					// GET SUCCESS DATA RETURN JSON
                            //alert(data);
                            data = eval( "("+data+")");				// GET JSON DATA FROM PHP AND PARSE IT
                            ajaxisError = data.jsonValidateReturn[2];
                            customAjaxRule = data.jsonValidateReturn[1];
                            ajaxCaller = $("#"+data.jsonValidateReturn[0])[0];
                            fieldId = ajaxCaller;
                            ajaxErrorLength = $.validationEngine.ajaxValidArray.length
                            existInarray = false;

                            if(ajaxisError == "false"){			// DATA FALSE UPDATE PROMPT WITH ERROR;
                                _checkInArray(false)				// Check if ajax validation alreay used on this field
                                if(!existInarray){		 			// Add ajax error to stop submit
                                    $.validationEngine.ajaxValidArray[ajaxErrorLength] =  new Array(2)
                                    $.validationEngine.ajaxValidArray[ajaxErrorLength][0] = fieldId
                                    $.validationEngine.ajaxValidArray[ajaxErrorLength][1] = false
                                    existInarray = false;
                                }
                                $.validationEngine.ajaxValid = false;
                                promptText += $.validationEngine.settings.allrules[customAjaxRule].alertText+"<br />";
                                $.validationEngine.updatePromptText(ajaxCaller,promptText,"",true);

                                //add edit candidate email validation in HRMS module
                                if(fieldId.id == 'txtcandidatecontactemail' || fieldId.id == 'txtcandidatecontactemail1' || fieldId.id == 'txtcandidatecontactemail2')
                                    fetchExistCandidatesWithGivenEmailId(fieldId.id);

                                //add edit candidate contact number validation in HRMS module
                                if(fieldId.id == 'txtcandidatecontactnumber')
                                    fetchExistCandidatesWithGivenMobileNumber(fieldId.id);

                            }else{
                                _checkInArray(true)

                                $.validationEngine.ajaxValid = true;
                                if($.validationEngine.settings.allrules[customAjaxRule].alertTextOk){	// NO OK TEXT MEAN CLOSE PROMPT
                                    $.validationEngine.updatePromptText(ajaxCaller,$.validationEngine.settings.allrules[customAjaxRule].alertTextOk,"pass",true);
                                }else{
                                    ajaxValidate = false;
                                    $.validationEngine.closePrompt(ajaxCaller);
                                }
                            }
                            function  _checkInArray(validate){
                                for(x=0;x<ajaxErrorLength;x++){
                                    if($.validationEngine.ajaxValidArray[x][0] == fieldId){
                                        $.validationEngine.ajaxValidArray[x][1] = validate
                                        existInarray = true;

                                    }
                                }
                            }
                        }
                    });
                }
            }
            function _confirm(caller,rules,position){		 // VALIDATE FIELD MATCH
                confirmField = rules[position+1];

                if($(caller).attr('value') != $("#"+confirmField).attr('value')){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["confirm"].alertText+"<br />";
                }
            }
            function _relevantexperience(caller,rules,position){		 // VALIDATE FIELD MATCH
                //lesserField = rules[position+1];
                if(parseInt($(caller).attr('value')) < 1) {
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["relevantexperience"].alertText+"<br />";
                }
            }
            function  _lessThanOrEqualTo(caller,rules,position){		 // VALIDATE FIELD MATCH
                lesserField = rules[position+1];
                if(!(parseInt($(caller).attr('value')) <= parseInt($("#"+lesserField).attr('value')))){
                    $.validationEngine.isError = true;
                    //promptText += $.validationEngine.settings.allrules["lessThan"].alertText+"<br />";
                    promptText += '* ' + $(caller).attr('title') + ' should be less than OR equal to ' + $("#"+lesserField).attr('title') +"<br />";
                }
            }
            function  _candidateExperience(caller,rules,position){		 // VALIDATE FIELD MATCH
                lesserField = rules[position+1];
                if(!(parseInt($(caller).attr('value')) >= parseInt($("#"+lesserField).attr('value')))){
                    $.validationEngine.isError = true;
                    //promptText += $.validationEngine.settings.allrules["lessThan"].alertText+"<br />";
                    promptText += '* ' + $(caller).attr('title') + ' should be greater than OR equal to ' + $("#"+lesserField).attr('title') +"<br />";
                }
            }
            function _sumequalto(caller,rules,position){		 // VALIDATE FIELD MATCH
                netField = rules[position+1];
                pliField = rules[position+2];
                if(!(parseInt($(caller).attr('value')) === (parseInt($("#"+netField).attr('value')) + parseInt($("#"+pliField).attr('value'))) )){
                    $.validationEngine.isError = true;
                    //promptText += $.validationEngine.settings.allrules["lessThan"].alertText+"<br />";
                    promptText += '* ' + $(caller).attr('title') + ' should be equal to sum of ' + $("#"+netField).attr('title') + " and " + $("#"+pliField).attr('title') +"<br />";
                }
            }
            function _projectprercent(caller,rules,position){		 // VALIDATE FIELD MATCH
                var total = 0;
                $(".percentsum").each(function() {
                    if($(this).val() !== '') 
                        total += parseFloat($(this).val());
                });

                netField = rules[position+1];
                prompt = rules[position+1];
                if(total !== 100){
                    $.validationEngine.isError = true;
                    promptText += "* Sum of all fields of % of Total Amount should be equal to 100%.<br />";
                }
            }
            function _projectmoney(caller,rules,position){		 // VALIDATE FIELD MATCH
                var total = 0;
                $(".percentmoneysum").each(function() {
                    if($(this).val() !== '') 
                        total += parseFloat($(this).val());
                });

                var amount = parseFloat($('#txtAmt').val());
                if($('input[name=rdtds]:checked').val() === '1') {
                    amount += parseFloat($('#txttds').val());
                }
                if(total.toFixed(2) !== amount.toFixed(2)){
                    $.validationEngine.isError = true;
                    promptText += "* Sum of all fields of Amount should be equal to Amount.<br />";
                }
            }
            function _categorymoney(caller,rules,position){		 // VALIDATE FIELD MATCH
                var total = 0;
                $(".categorymoneysum").each(function() {
                    if($(this).val() !== '') 
                        total += parseFloat($(this).val());
                });
                var amount = parseFloat($('#txtAmt').val());
                if($('input[name=rdtds]:checked').val() === '1') {
                    amount += parseFloat($('#txttds').val());
                }
                
                if(total !== amount){
                    $.validationEngine.isError = true;
                    promptText += "* Sum of all fields of Amount should be equal to Amount.<br />";
                }
            }
            function _length(caller,rules,position){    	  // VALIDATE LENGTH
                startLength = eval(rules[position+1]);
                endLength = eval(rules[position+2]);
                feildLength = $(caller).attr('value').length;

                if(feildLength<startLength || feildLength>endLength){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["length"].alertText+startLength+$.validationEngine.settings.allrules["length"].alertText2+endLength+$.validationEngine.settings.allrules["length"].alertText3+"<br />"
                }
            }
            function _lengthh(caller,rules,position){    	  // VALIDATE LENGTH

                startLength = eval(rules[position+1]);
                endLength = eval(rules[position+2]);
                feildLength = $(caller).attr('value').length;

                if(feildLength<startLength || feildLength>endLength){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["lengthh"].alertText+startLength+$.validationEngine.settings.allrules["lengthh"].alertText2+"<br />"
                }
            }

            function _minSelectkbox(caller,rules,position){  	  // VALIDATE CHECKBOX NUMBER
                nbCheck = eval(rules[position+1]);
                groupname = $(caller).attr("name");
                groupSize = $('#' + $(caller).attr("id") + " :selected").length;
                if(groupSize < nbCheck){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["minSelectkbox"].alertText + " " + nbCheck + " " + $.validationEngine.settings.allrules["minSelectkbox"].alertText2+"<br />";
                }
            }

            function _minCheckbox(caller,rules,position){  	  // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position+1]);
                groupname = $(caller).attr("name");
                groupSize = $("input[name="+groupname+"]:checked").size();
                
                if(groupSize < nbCheck){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["minCheckbox"].alertText + " " + nbCheck + " " + $.validationEngine.settings.allrules["minCheckbox"].alertText2+"<br />";
                }
            }

            function _minSalesPerson(caller,rules,position){  	  // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position+1]);
                groupname = $(caller).attr("name");
                groupSize = $("input[name="+groupname+"]:checked").size();

                if(groupSize < nbCheck){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["minSalesPerson"].alertText + " " + nbCheck + " " + $.validationEngine.settings.allrules["minSalesPerson"].alertText2+"<br />";
                }
            }

            function _maxCheckbox(caller,rules,position){  	  // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position+1]);
                groupname = $(caller).attr("name");
                groupSize = $("input[name="+groupname+"]:checked").size();

                if(groupSize > nbCheck){
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["maxCheckbox"].alertText+"<br />";
                }
            }
            //alert($.validationEngine.isError);
            return($.validationEngine.isError) ? $.validationEngine.isError : false;
        },
        closePrompt : function(caller,outside) {						// CLOSE PROMPT WHEN ERROR CORRECTED
            if(outside){
                $(caller).fadeTo("fast",0,function(){
                    $(caller).remove();
                });
                return false;
            }
            if(!ajaxValidate){
                closingPrompt = $(caller).attr("id");

                $("."+closingPrompt).fadeTo("fast",0,function(){
                    $("."+closingPrompt).remove();
                });
            }
        },
        submitValidation : function(caller,settings) {					// FORM SUBMIT VALIDATION LOOPING INLINE VALIDATION
            var stopForm = false;
            $.validationEngine.settings = settings
            $.validationEngine.ajaxValid = true
            $(caller).find(".formError").remove();
            var toValidateSize = $(caller).find("[class^=validate]").size();

            $(caller).find("[class^=validate]").each(function(){
                callerId = $(this).attr("id")
                if(!$("."+callerId).hasClass("ajaxed")){	// DO NOT UPDATE ALREADY AJAXED FIELDS (only happen is no normal errors, don't worry)

                    var validationPass = $.validationEngine.loadValidation(this,settings);
                    //alert(validationPass);
                    return(validationPass) ? stopForm = true : "";
                }
            });
            ajaxErrorLength = $.validationEngine.ajaxValidArray.length		// LOOK IF SOME AJAX IS NOT VALIDATE
            for(x=0;x<ajaxErrorLength;x++){
                if($.validationEngine.ajaxValidArray[x][1] == false){
                    $.validationEngine.ajaxValid = false
                }
            }
            //alert(stopForm);
            if(stopForm || !$.validationEngine.ajaxValid){	    	// GET IF THERE IS AN ERROR OR NOT FROM THIS VALIDATION FUNCTIONS
                destination = $(".formError:not('.greenPopup'):first").offset().top;
                $("html:not(:animated),body:not(:animated)").animate({
                    scrollTop: destination
                }, 1100);
                return true;
            }else{
                return false
            }
        }
    }
})(jQuery);