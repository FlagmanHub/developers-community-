function compile() {

    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;

     document.body.onkeyup = function(){
      code.open();
      code.writeln("<script>" + js.value + "</script>");
      code.close();
        };
      };
  compile();