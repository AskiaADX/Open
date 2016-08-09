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
    });   
    
}

function printcounter(options){
    var counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter");
    if (options.direction != "none"){
        counterdiv.innerHTML = options.val;
    }
}

function concatEmail(options){
	document.getElementById(options.inputId+"_open1").addEventListener('change',function(){validateEmail(options);});
    document.getElementById(options.inputId+"_open2").addEventListener('change',function(){validateEmail(options);});
    document.getElementById(options.inputId+"_open3").addEventListener('change',function(){validateEmail(options);});
}

function validateEmail(options){
        var box1 = document.getElementById(options.inputId+"_open1");
        var box2 = document.getElementById(options.inputId+"_open2");
        var box3 = document.getElementById(options.inputId+"_open3");
        var emailaddress =  document.getElementById(options.inputId);
    console.dir(box1);
        emailaddress.value= box1.value + "@" + box2.value +"." + box3.value;
        if((box1.value) && (box2.value) && (box3.value)){
            options.address = emailaddress.value; 
            options.adcSelector = '#adc_'+ options.instanceId;
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;  
            if(options.address.match(mailformat)){
                options.val="";
                    printcounter(options);
                var inputs = document.querySelector(options.adcSelector + " .contentinput");
                inputs.className = "emailwrapper contentinput";
            }
            else {
               options.val=options.emailvalidationmessage;
                console.dir(options);
               printcounter(options);
               var inputs = document.querySelector(options.adcSelector + " .contentinput");
               inputs.className = "contentinput invalidemail";
               /*var inputs = select3input();
                inputs[0].className = "invalidemail";
                inputs[1].className = "invalidemail";
                inputs[2].className = "invalidemail";*/

            }
       }                              
	return false
}

