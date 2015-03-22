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
        var width = canvas.width, height = canvas.height
	    context.drawImage(original, 0, 0, width, height);
        var imageData = context.getImageData(0, 0, width, height);

        var grayImageData = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
        var code = jsfeat.COLOR_RGBA2GRAY;
        jsfeat.imgproc.filter(imageData.data, width, height, grayImageData, code);

        var data_u32 = new Uint32Array(imageData.data.buffer);
        var alpha = (0xff << 24);
        var i = grayImageData.cols*grayImageData.rows, pix = 0;
        while(--i >= 0) {
            pix = grayImageData.data[i];
            data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
        }

        context.putImageData(imageData, 0, 0)
    });
})()
