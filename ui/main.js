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
var nameInput=document.getElementById("name");
var name=nameInput.value;
var submit=document.getElementById("submit_btn");
submit.onclick=function(){
    var names=['name1','name2','name3','name4'];
    var list='';
    for(var i=0;i<name.length;i++){
        list+='<li>'+names[i]+'</li>';
    }
    ul=document.getElementById("namelist");
    ul.innerHTMl=list;
};