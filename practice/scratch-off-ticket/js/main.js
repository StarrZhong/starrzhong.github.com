const scratchBox = document.getElementById("scratch-box")
const frontBoard = document.getElementById('scratch-front')
const backBoard = document.getElementById('scratch-back')

const board = {
  width: scratchBox.clientWidth,
  height: scratchBox.clientHeight,
  mousedown: false
}

frontBoard.width =  board.width
frontBoard.height =  board.height
// backBoard.width = board.width
// backBoard.height = board.height

let ctxFront = frontBoard.getContext("2d");
// let ctxBack = backBoard.getContext('2d');

ctxFront.fillStyle = '#808080';
ctxFront.fillRect(0, 0, board.width, board.height);


frontBoard.addEventListener('touchstart', eventDown);
frontBoard.addEventListener('mousedown', eventDown);
frontBoard.addEventListener('touchmove', eventMove);
frontBoard.addEventListener('mousemove', eventMove);
frontBoard.addEventListener('touchend', eventUp);
document.addEventListener('mouseup', eventUp);

function eventDown(ev){
  console.log('eventDown')
    ev = ev || event;
    ev.preventDefault();
    board.mousedown=true;
}

function eventUp(ev){
  console.log('eventUp')
    ev = ev || event;
    ev.preventDefault();
    board.mousedown=false;
}

function eventMove(ev){
  console.log('eventMove')
    ev = ev || event;
    ev.preventDefault();
    if(board.mousedown) {
        if(ev.changedTouches){
            ev=ev.changedTouches[ev.changedTouches.length-1];
        }
        console.log("draw")
        var x = ev.pageX - this.offsetLeft;
        var y = ev.pageY - this.offsetTop;
        ctxFront.beginPath();
        ctxFront.arc(x, y, 10, 0, Math.PI * 2);
        ctxFront.fill();
        // alertInfo();
    }
}