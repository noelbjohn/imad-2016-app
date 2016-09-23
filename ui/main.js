console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="Hello World";
var img=document.getElementById("madi");
var marginLeft=0;

function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = moveLeft + 'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,100);
};