currentcount({
    instanceId : {%= CurrentADC.InstanceID %},
    inputId : '{%=CurrentQuestion.InputName()%}',
    direction:"{%=CurrentADC.PropValue("counter")%}", 
    maxchar:{%=CurrentADC.PropValue("maxChar")%},
    currentQuestion: '{%:= CurrentQuestion.Shortcut %}'
});
