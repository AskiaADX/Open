function exclusiveResponse(resElement){
  if (resElement.checked) {

  }
  return true;
}

function currentcount(options) {
    var showTrafficLight = options.showTrafficLight || 0;

    document.addEventListener("DOMContentLoaded", function(){
      var exclusiveResponses = document.querySelectorAll('.myresponse');
      for (var i = 0; i < exclusiveResponses.length; i++) {
        exclusiveResponses[i].style.display = "none";
      }
    });

    if (options.strExclusiveResponseIds != "") {

      let strExclusiveResponseIds = options.strExclusiveResponseIds;
      let arrIds = strExclusiveResponseIds.split(',');
      for (var i = 0; i < arrIds.length; i++) {

        if (document.getElementById(arrIds[i]).checked) {
          document.getElementById(options.inputId).value = '';
          document.getElementById(options.inputId).disabled = true;
          document.getElementById(options.inputId).readOnly = true;
        }

        document.getElementById(arrIds[i]).addEventListener('change', function (e) {
          if (e.srcElement.checked) {
            document.getElementById(options.inputId).value = '';
            document.getElementById(options.inputId).disabled = true;
            document.getElementById(options.inputId).readOnly = true;
          } else {
            document.getElementById(options.inputId).disabled = false;
            document.getElementById(options.inputId).readOnly = false;
          }
        });
      }

      if (window.askia
          && window.arrLiveRoutingShortcut
          && window.arrLiveRoutingShortcut.length > 0
          && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
          askia.triggerAnswer();
      }
    }
    options.adcSelector = '#adc_' + options.instanceId;

    var openInputDK = document.querySelector('#adc_' + this.instanceId + ' .openDK input[type="checkbox"]');

    document.getElementById(options.inputId).addEventListener('keyup', function (e) {
        //var inputcontent= this.value.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n'); //handling of line-break characters
        var inputcontent = this.value;
        options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");


        if (options.direction == 'desc') {
            options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
            printcounter(options);
        } else {
            options.val = inputcontent.length;
            printcounter(options);
        }
        if (options.suggestedchar > 0 && options.showcongrats && inputcontent.length >= options.suggestedchar) {
            options.congratsdiv.style = "display:block";
        }
        else {
            options.congratsdiv.style = "display:none";
        }

        if(showTrafficLight) setCounterMeter(inputcontent.length,options);

        if (window.askia
            && window.arrLiveRoutingShortcut
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    });

    document.getElementById(options.inputId).addEventListener('input', function (e) {
        var inputcontent = this.value;
        options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");

        if (options.maxchar > 0 && options.maxchar - inputcontent.length < 0) {
            this.value = this.value.substring(0, options.maxchar);
        }

        if (options.direction == 'desc') {
            options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
            printcounter(options);
        }
        else {
            options.val = inputcontent.length;
            printcounter(options);
        }
        if (options.suggestedchar > 0 && options.showcongrats && inputcontent.length >= options.suggestedchar) {
            options.congratsdiv.style = "display:block";
        }
        else {
            options.congratsdiv.style = "display:none";
        }

        if(showTrafficLight) setCounterMeter(inputcontent.length,options);

        if (window.askia
            && window.arrLiveRoutingShortcut
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    });

    document.getElementById(options.inputId).addEventListener('focus', function (e) {
      var inputcontent = this.value;
      options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");

      if (options.direction == 'desc') {
          options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
          printcounter(options);
      }
      else {
          options.val = inputcontent.length;
          printcounter(options);
      }

      if(showTrafficLight) setCounterMeter(inputcontent.length,options);
    });

    document.getElementById(options.inputId).addEventListener('paste', function () {
        var inputcontent = this.value;
        options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");

        if (options.direction == 'desc') {
            options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
            printcounter(options);
        }
        else {
            options.val = inputcontent.length;
            printcounter(options);
        }
        if (options.suggestedchar > 0 && options.showcongrats && inputcontent.length >= options.suggestedchar) {
            options.congratsdiv.style = "display:block";
        }
        else {
            options.congratsdiv.style = "display:none";
        }

        if(showTrafficLight) setCounterMeter(inputcontent.length,options);

        if (window.askia
            && window.arrLiveRoutingShortcut
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }

    });

}

function changeGradient(f,meterDiv){
  for (var i = 0; i < f; i++) {
    meterDiv.children[i].children[0].classList.add("color"+(i+1));
  }
}

function setCounterMeter(charCount,options){
  var maxchar = options.trafficLightMax;
  var percentage = (charCount/maxchar) * 100;
  var intg = Math.ceil(percentage/10);
  var meterDiv = document.querySelector('.meterDiv');

  if (intg <= 10) {
    for (var i = 0; i < 10; i++) {
        meterDiv.children[i].children[0].classList.remove("color"+(i+1));
    }
  }


  switch (intg) {
    case 1:
      changeGradient(intg,meterDiv);
      break;
    case 2:
      changeGradient(intg,meterDiv);
      break;
    case 3:
      changeGradient(intg,meterDiv);
      break;
    case 4:
      changeGradient(intg,meterDiv);
      break;
    case 5:
      changeGradient(intg,meterDiv);
      break;
    case 6:
      changeGradient(intg,meterDiv);
      break;
    case 7:
      changeGradient(intg,meterDiv);
      break;
    case 8:
      changeGradient(intg,meterDiv);
      break;
    case 9:
      changeGradient(intg,meterDiv);
      break;
    case 10:
      changeGradient(intg,meterDiv);
      break;

    default:

  }
}

function printcounter(options) {
    if (options.direction != "none") {
        options.counterdiv.innerHTML = options.val;
    }
}

//onkeydown event
function imposeMaxLengthOnKeydown(Event, Object, MaxLen) {
    if ((Object.value.length < MaxLen) || (Event.keyCode == 8 || Event.keyCode == 46 || (Event.keyCode >= 35 && Event.keyCode <= 40))) {
        return true;
    } else {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) //android detects
            Object.value = (Object.value).substring(0, MaxLen - 1);

        (Event.preventDefault ? Event.preventDefault() : event.returnValue = false);
    }

}

//onkeypress event
function imposeMaxLength(Event, Object, MaxLen) {
    if ((Object.value.length < MaxLen) || (Event.keyCode == 8 || Event.keyCode == 46 || (Event.keyCode >= 35 && Event.keyCode <= 40))) {
        return true;
    } else {
        (Event.preventDefault ? Event.preventDefault() : event.returnValue = false);
    }

}

//onpaste event
function imposeMaxLengthOnPaste(Event, Object, MaxLen) {
    let paste = (Event.clipboardData || window.clipboardData).getData('text');
    var endP = (Object.value + paste);
    if (endP.length >= MaxLen) {
        paste = endP.substring(0, MaxLen);
        Object.value = paste;
        (Event.preventDefault ? Event.preventDefault() : event.returnValue = false);
    } else {
        return true;
    }
}
