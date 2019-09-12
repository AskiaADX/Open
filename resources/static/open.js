function currentcount(options){
    options.adcSelector = '#adc_'+ options.instanceId;

    document.getElementById(options.inputId).addEventListener('keyup',function(e){
        //var inputcontent= this.value.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n'); //handling of line-break characters
       var inputcontent= this.value;
       options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");


        if(options.direction=='desc'){
            options.val =  (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
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


    document.getElementById(options.inputId).addEventListener('paste',function(){
      var inputcontent= this.value;
      options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
       options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");

       if(options.direction=='desc'){
           options.val =  (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
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
