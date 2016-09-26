var span=document.getElementById("count");
var button=document.getElementById("counter");
var httprequest=new XMLHttpRequest();
var counter=0;
button.onclick=function(){
    httprequest.onreadystatechange=function(){
      if(httprequest.readyState===XMLHttpRequest.DONE){
        if(httprequest.status===200){
          counter=httprequest.responseText;
          span.innerHTML=counter.toString();
        }
      }
    };
    httprequest.open('GET','http://noelbjohn.imad.hasura-app.io/counter',true);
    httprequest.send(null);
};