;(function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var original;

    function loadImage(url, callback){
        var image = new Image();
        image.onload = function(){
            callback(this);
        }
        image.src = url;
    }


    loadImage('/image/sample.jpg', function(image){
        original = image;
	    context.drawImage(original, 0, 0);
    });
})()
