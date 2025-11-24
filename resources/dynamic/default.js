
{%
 Dim strInputIds = ""
 Dim inputName  =  CurrentQuestion.InputName()
 Dim exclusiveQuestion = CurrentADC.PropQuestion("exclusiveResponsesQuestion")
 Dim promptQuestion = CurrentADC.PropQuestion("promptQuestion")
 Dim aiQuestion = CurrentADC.PropQuestion("aiQuestion")

 If exclusiveQuestion <> "" Then
   If (exclusiveQuestion.Type = "single") Then
     Dim inputId
     Dim ar = exclusiveQuestion.AvailableResponses
     Dim i
     For i = 1 To ar.Count
       inputId = (exclusiveQuestion.InputName() + "_" + ar[i].InputValue()).Replace("U", "askia-input")
       If strInputIds <> "" Then
         strInputIds = strInputIds + ","
       Endif
       strInputIds = strInputIds + inputId
     Next i
   EndIf
 EndIf

%}

$(window).on("load", function() {
    var $el = $('#adc_{%= CurrentADC.InstanceId %}');

    $el.adcOpen({
        instanceId: {%= CurrentADC.InstanceID %},
        inputId: '{%= InputName %}',
        direction: "{%=CurrentADC.PropValue("counter")%}",
        maxchar: {%=CurrentADC.PropValue("maxChar")%},
        minchar: {%=CurrentADC.PropValue("minChar")%},
        currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
        showcongrats: {%=CurrentADC.PropValue("showCongrats")%},
        suggestedchar: {%=CurrentADC.PropValue("suggestedChar").ToNumber()%},
        usebrowservalidation: {%=CurrentADC.PropValue("useBrowserValidation")%},
        strExclusiveResponseIds: '{%=strInputIds %}',
        isInLoop: {%= (CurrentADC.PropValue("isInLoop") = "1") %},
        items: [
            {% IF CurrentADC.PropValue("isInLoop") = "1" Then %}
                {%:= CurrentADC.GetContent("dynamic/open_loop.js").ToText() %}
            {% EndIF %}
        ]
    });

    $el.adcPrompt({
        instanceId: {%= CurrentADC.InstanceID %},
        inputId: '{%=CurrentQuestion.InputName()%}',
        currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
        questionText: "{%= Replace(CurrentQuestion.LongCaption, "'", "\\'") %}",
        maxPrompts: {%=CurrentADC.PropValue("maxPrompts")%},
        promptQuestion: "{%= promptQuestion.Shortcut %}",
        useAI: {%=CurrentADC.PropValue("useAI")%},
        aiQuestion: "{%=  aiQuestion.Shortcut %}",
        aiQuestionId: "{%=  aiQuestion.InputName() %}",
        timePrompt: {%=CurrentADC.PropValue("timePrompts")%},
        timeDelay: {%=CurrentADC.PropValue("timeDelay")%},
        minChars: {%=CurrentADC.PropValue("minChars")%},
        useSpace: {%=CurrentADC.PropValue("useSpace")%},
        useEnd: {%=CurrentADC.PropValue("useEnd")%},
        useNext: {%=CurrentADC.PropValue("hideNext")%},
        promptArray:  [
        {%
          Dim i
          Dim myQuestion = CurrentADC.PropQuestion("promptQuestion")
          For i = 1 To  myQuestion.Responses.Count 
          %}"{%:= myQuestion.Responses[i].Caption %}" {%:= On(i <> myQuestion.Responses.Count, ",", "") %}
          {%
              Next
          %}
          ]
    });
});

// Disable Enter key from submitting the page, except for TEXTAREAs
{% Dim hideNextButton = CurrentADC.PropValue("hideNext").ToNumber() %}
{% IF hideNextButton = 1 Then %}
AskiaScript.addReadyEvent(function () {
    NavigatorHandler.keydown = function (e) {
        e = e || window.event;
        var elt = e.target || e.srcElement;

        // Only handle Enter key
        var key = e.key || e.keyCode || e.which;
        if (key !== 'Enter' && key !== 13) return true;

        // Allow line breaks in TEXTAREAs
        if (elt && elt.tagName && elt.tagName.toUpperCase() === "TEXTAREA") return true;

        // Stop Enter from submitting or navigating
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        e.returnValue = false;
        e.cancelBubble = true;

        return false;
    };
 });
{% EndIf %}


