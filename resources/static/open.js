function CounterManager(options){
    return options.openbox;
    /*this.updatecounter = function(){
        console.log("toto");
    }
    this.
    }*/
}

function currentcount(options){
     options.adcSelector = '#adc_'+ options.instanceId;
    document.getElementById(options.inputId).addEventListener('keyup',function(){
        var inputcontent= this.value.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n'); //handling of line-break characters
        if(options.direction=='desc'){
            options.val =  options.maxchar - inputcontent.length;
            printcounter(options);
        }
        else{
            options.val = inputcontent.length;
            printcounter(options);
        }  
        if (window.askia) {
           askia.triggerAnswer();
        }
    });   
    
}

function printcounter(options){
    var counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter");
    if (options.direction != "none"){
        counterdiv.innerHTML = options.val;
    }
}

