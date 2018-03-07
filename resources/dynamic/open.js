currentcount({
    instanceId : {%= CurrentADC.InstanceID %},
    inputId : '{%=CurrentQuestion.InputName()%}',
    direction:"{%=CurrentADC.PropValue("counter")%}", 
    maxchar:{%=CurrentADC.PropValue("maxChar")%},
    currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
    showcongrats:{%=CurrentADC.PropValue("showCongrats")%},
    suggestedchar:{%=CurrentADC.PropValue("suggestedChar").ToNumber()%}
});
