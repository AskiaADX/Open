function currentcount(options){
    options.adcSelector = '#adc_'+ options.instanceId;
    document.getElementById(options.inputId).addEventListener('keyup',function(){
        //var inputcontent= this.value.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n'); //handling of line-break characters
       var inputcontent= this.value;
       options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");
        
        
        
        if(options.direction=='desc'){
            options.val =  options.maxchar - inputcontent.length;
            printcounter(options);
        }
        else{
            options.val = inputcontent.length;
            printcounter(options);
        }
        if(options.suggestedchar >0 && options.showcongrats && inputcontent.length>=options.suggestedchar){
           options.congratsdiv.style="display:block";
         }
           else{
				options.congratsdiv.style="display:none";
           }
        if (window.askia 
            && window.arrLiveRoutingShortcut 
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    });
    
}

function printcounter(options){
    if (options.direction != "none"){
        options.counterdiv.innerHTML = options.val;
    }
}

function imposeMaxLength(Event, Object, MaxLen)
{
        return (Object.value.length < MaxLen)||(Event.keyCode == 8 ||Event.keyCode==46||(Event.keyCode>=35&&Event.keyCode<=40))
}
