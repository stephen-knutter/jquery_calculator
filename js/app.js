$(function(){
  var calculator = {
    screen: null,
    oButtons: {},
    nButtons: {},
    operator: null,
    equals: null,
    cNum: null,
    oNum: null,
    aCheck: function(){
      if(this.operator && this.cNum && this.oNum) return true;
      return false;
    },
    opCheck: function(){
      if(!this.operator && this.cNum) return true;
      return false;
    },
    eCheck: function(){
      if(this.cNum && this.oNum && this.operator) return true;
      return false;
    },
    cCheck: function(){
      if(this.cNum && !this.operator && !this.oNum) return true;
      return false;
    },
    oCheck: function(){
      if(this.operator && this.oNum) return true;
      return false;
    },
    calculate: function(operator){
      if(this.operator && this.cNum && this.oNum){
        var result = 0;
        var cNum = parseInt(this.cNum);
        var oNum = parseInt(this.oNum);
        switch(this.operator){
          case '-':
            result = cNum-oNum;
          break;
          case '+':
            result = cNum+oNum;
          break;
          case '÷':
            result = cNum/oNum;
          break;
          case 'x':
            result = cNum*oNum;
          break;
        }
        if(result){
          this.screen.html(result);
          this.cNum = result;
          this.oNum = null;
          this.operator = null;
        }
        return false;
      }
    }
  }

  //OPERATOR BUTTONS
  calculator.oButtons = $("span.operator").not("span#equals").not("span#clear");
  calculator.oButtons.on("click", function(){
    $this = $(this);
    var opCheck = calculator.opCheck();
    if(opCheck){
      var value = calculator.operator = $this.text();
      calculator.screen.append(value);
    }
  });

  //EQUALS BUTTON
  calculator.equals = $("#equals");
  calculator.equals.on("click", function(){
    var eCheck = calculator.eCheck;
    if(eCheck) calculator.calculate();
  });

  //CLEAR BUTTONS
  calculator.clear = $("#clear");
  calculator.clear.on("click", function(){
    calculator.cNum = calculator.oNum = calculator.operator = null;
    calculator.screen.html("");
  })

  //NUMBER BUTTONS
  calculator.nButtons = $(".buttons span[class!='operator']");
  calculator.nButtons.on("click", function(){
    $this = $(this);
    var num = $this.text().toString();
    var aCheck = calculator.aCheck(); //this.operator && this.cNum && this.oNum
    if(aCheck){
      //APPEND TO LAST NUMBER
      calculator.oNum += num;
      calculator.screen.text(calculator.oNum);
    } else {
      var cCheck = calculator.cCheck(); //this.cNum && !this.operator && !this.oNum
      if(cCheck){
        //APPEND TO FIRST NUMBER
        calculator.cNum += num;
        calculator.screen.text(calculator.cNum);
      } else {
        if(!calculator.cNum){
          //ADD FIRST NUMBER
          calculator.cNum = num;
          calculator.screen.text(calculator.cNum);
        } else {
          //CHECK FOR SECOND NUMBER
          oCheck = calculator.oCheck(); //this.operator && this.oNum
          if(oCheck){
            //ADD SECOND NUMBER
            calculator.oNum += num;
            calculator.screen.text(calculator.oNum);
          } else {
            if(calculator.oNum){
              //APPEND TO SECOND NUMBER
              calculator.oNum += num;
              calculator.screen.text(calculator.oNum);
            } else {
              //ADD SECOND NUMBER
              calculator.oNum = num;
              calculator.screen.text(calculator.oNum);
            }
          }
        }
      }
    }
  });
  calculator.screen = $("#screen");
})
