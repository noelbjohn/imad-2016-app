console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="Hello World";
var img=document.getElementById("madi");
var moveLeft=0;

function moveRight(){
    moveLeft = moveLeft + 10;
    img.style.moveLeft = moveLeft + 'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,100);
};