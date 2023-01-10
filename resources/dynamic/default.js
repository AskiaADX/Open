{%
 Dim strInputIds = ""
 Dim inputName  =  CurrentQuestion.InputName()
 Dim exclusiveQuestion = CurrentADC.PropQuestion("exclusiveResponsesQuestion")
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

$(window).on("load",function() {
	$('#adc_{%= CurrentADC.InstanceId %}').adcOpen({
     instanceId : {%= CurrentADC.InstanceID %},
     inputId : '{%=CurrentQuestion.InputName()%}',
     direction:"{%=CurrentADC.PropValue("counter")%}",
     maxchar:{%=CurrentADC.PropValue("maxChar")%},
     minchar:{%=CurrentADC.PropValue("minChar")%},
     currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
     showcongrats:{%=CurrentADC.PropValue("showCongrats")%},
     suggestedchar:{%=CurrentADC.PropValue("suggestedChar").ToNumber()%},
     usebrowservalidation: {%=CurrentADC.PropValue("useBrowserValidation")%},
     strExclusiveResponseIds : '{%=strInputIds %}',
     isInLoop : {%= (CurrentADC.PropValue("isInLoop") = "1") %},
     items : [
       {% IF CurrentADC.PropValue("isInLoop") = "1" Then %}
           {%:= CurrentADC.GetContent("dynamic/open_loop.js").ToText() %}
       {% EndIF %}
     ]
 });
});
