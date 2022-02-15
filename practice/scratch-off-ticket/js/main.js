var Scratch = function(box,frontBoard){
  this.stage = {
    element: box,
    width: box.clientWidth,
    height: box.clientHeight,
    mousedown: false,
  }
  this.frontBoard = {
    element: frontBoard,
    ctx: frontBoard.getContext("2d")
  }
  this.mPos = {
    x: 0,
    y: 0
  }
}
Scratch.prototype.init = function(){
  this.setStage()
  this.initFront()
}
Scratch.prototype.setStage = function(){
  this.frontBoard.element.width = this.stage.width
  this.frontBoard.element.height = this.stage.height
}
Scratch.prototype.initFront = function(){
  this.frontBoard.ctx.fillStyle = '#808080';
  this.frontBoard.ctx.fillRect(0, 0, this.stage.width, this.stage.height);
  console.log(this.frontBoard.ctx)
}
Scratch.prototype.eventDown = function(ev){
  ev = ev || event
  ev.preventDefault()
  this.stage.mousedown = true
  this.mPos.x = ev.offsetX;
  this.mPos.y = ev.offsetY;
  this.frontBoard.ctx.globalCompositeOperation = 'destination-out';
  this.frontBoard.ctx.lineWidth = '30';
  this.frontBoard.ctx.lineCap = 'round';
  this.frontBoard.ctx.lineTo(this.mPos.x, this.mPos.y);
  this.frontBoard.ctx.beginPath();
}
Scratch.prototype.eventMove = function(ev){
  ev = ev || event;
  ev.preventDefault();
  
  if(this.stage.mousedown){
    if(ev.changedTouches){
        ev=ev.changedTouches[ev.changedTouches.length-1];
    }
    console.log(this.frontBoard.ctx.canvas)
    this.mPos.x = ev.offsetX * this.frontBoard.ctx.canvas.width / this.frontBoard.ctx.canvas.clientWidth | 0
    this.mPos.y = ev.offsetY * this.frontBoard.ctx.canvas.height / this.frontBoard.ctx.canvas.clientHeight | 0
    
    this.frontBoard.ctx.lineTo(this.mPos.x, this.mPos.y);
    this.frontBoard.ctx.stroke();

    this.alertInfo()
  }
}

Scratch.prototype.eventUp = function(ev){
  ev = ev || event;
  ev.preventDefault();
  this.stage.mousedown = false
}
Scratch.prototype.alertInfo = function(){
  var data = this.frontBoard.ctx.getImageData(0,0,this.stage.width,this.stage.height).data;
  var n = 0 ;
  for (var i = 0; i < data.length; i++) {
    if (data[i] == 0) {
      n++;
    };
  };
  if (n >= data.length * 0.5) {
    this.frontBoard.ctx.globalCompositeOperation = 'destination-over';
    this.frontBoard.ctx.canvas.style.opacity = 0;
  }
}


const frontBoard = document.getElementById('scratch-front')
const backBoard = document.getElementById('scratch-back')
const scratchBox = document.getElementById("scratch-box")
var scratch = new Scratch(scratchBox,frontBoard)
scratch.init()

scratch.frontBoard.element.addEventListener('touchstart', function(ev){
  scratch.eventDown(ev)
});
scratch.frontBoard.element.addEventListener('mousedown', function(ev){
  scratch.eventDown(ev)
});
scratch.frontBoard.element.addEventListener('touchmove', function(ev){
  scratch.eventMove(ev)
});
scratch.frontBoard.element.addEventListener('mousemove', function(ev){
  scratch.eventMove(ev)
});
scratch.frontBoard.element.addEventListener('touchend', function(ev){
  scratch.eventUp(ev)
});
document.addEventListener('mouseup', function(ev){
  scratch.eventUp(ev)
});



