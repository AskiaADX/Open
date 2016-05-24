currentcount({
    instanceId : {%= CurrentADC.InstanceID %},
    inputId : '{%=CurrentQuestion.InputName()%}',
    direction:"{%=CurrentADC.PropValue("counter")%}", 
    maxchar:{%=CurrentADC.PropValue("maxChar")%}
    
});

if({%= CurrentADC.PropValue("inputType")="email"%}){
    concatEmail({
    instanceId : {%= CurrentADC.InstanceID %},
    inputId : "{%=CurrentQuestion.InputName()%}",
    direction:"{%=CurrentADC.PropValue("counter")%}", 
    maxchar:{%=CurrentADC.PropValue("maxChar")%},
    emailvalidationmessage:"{%=CurrentADC.PropValue("emailValidationMessage")%}"
	});
}
