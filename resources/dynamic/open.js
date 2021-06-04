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
        inputId = inputName + "_" + i
        If strInputIds <> "" Then
        	strInputIds = strInputIds + ","
        Endif
        strInputIds = strInputIds + inputId
      Next i
    EndIf
  EndIf

%}

currentcount({
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
    showTrafficLight : {%=CurrentADC.PropValue("showTrafficLight")%},
    trafficLightMax:{%=CurrentADC.PropValue("trafficLightMax")%},
    trafficLightMin:{%=CurrentADC.PropValue("trafficLightMin")%}
});
