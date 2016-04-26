
var pw = $('#point-gun');
var offset = pw.offset();

function mouse(e) {
    var center_x = (offset.left) + ( $('#point-gun').width() / 2 );
    var center_y = (offset.top) + ( $('#point-gun').height() / 2 );
    var radians = Math.atan2(e.pageX - center_x, e.pageY- center_y);
    var degree = (radians * (180 / Math.PI) * -1) + 180;
    var viewPortWidth = document.documentElement.clientWidth;
    var half = viewPortWidth/2;

    if(e.clientX>half){
        pw.css('-webkit-transform', 'rotate3d(-2,0, 1,'+degree+'deg)');
    }else{
        pw.css('-webkit-transform', 'rotate3d(2 ,0, 1,'+degree+'deg)');
    }

}

$('.center').mousemove(mouse);