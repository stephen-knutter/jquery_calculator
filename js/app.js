$(function(){
  var calculator = {
    screen: null,
    oButtons: {},
    nButtons: {},
    operator: null,
    equals: null,
    cNum: null,
    oNum: null,
    opCheck: function(){
      if(!this.operator && this.cNum) return true;
      return false;
    },
    eCheck: function(){
      if(this.cNum && this.oNum && this.operator) return true;
      return false;
    },
    cCheck: function(){
      if(this.cNum) return true;
      return false;
    },
    oCheck: function(){
      if(this.oNum) return true;
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
  calculator.oButtons = $("span.operator[id!='equals']");
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

  //NUMBER BUTTONS
  calculator.nButtons = $(".buttons span[class!='operator']");
  calculator.nButtons.on("click", function(){
    $this = $(this);
    var cCheck = calculator.cCheck();
    if(cCheck){
      oCheck = calculator.oCheck();
      if(!oCheck){
        var value = calculator.oNum = $this.text();
        calculator.screen.append(value);
      }
    } else {
      var value = calculator.cNum = $this.text();
      calculator.screen.html(value);
    }
  });

  calculator.screen = $("#screen");
})
