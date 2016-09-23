var span=document.getElementById("count");
var button=document.getElementById("counter");
var counter=0;
button.onclick=function(){
    counter=counter + 1;
    span.innerHTML=counter;
};
