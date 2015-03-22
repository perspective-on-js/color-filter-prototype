;(function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var original;

	var threshold = 50;
    var thresholdSlider = document.getElementById('threshold');
    thresholdSlider.value = threshold;
    thresholdSlider.addEventListener('change', function(){
	    threshold = thresholdSlider.value;
    });

    function loadImage(url, callback){
        var image = new Image();
        image.onload = function(){
            callback(this);
        }
        image.src = url;
    }

    function filter() {
        var width = canvas.width, height = canvas.height
        var imageData = context.getImageData(0, 0, width, height);

        var filterImageData = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
        var code = jsfeat.COLOR_RGBA2GRAY;
        jsfeat.imgproc.filter(imageData.data, width, height, filterImageData, code, function(r, g, b, a){
            var target_r = 150, target_g = 175, target_b = 75;

            var d = Math.abs(r - target_r) + Math.abs(g - target_g) + Math.abs(b - target_b);

            return (d < threshold) ? 255: 0;
        });

        var data_u32 = new Uint32Array(imageData.data.buffer);
        var alpha = (0xff << 24);
        var i = filterImageData.cols*filterImageData.rows, pix = 0;
        while(--i >= 0) {
            pix = filterImageData.data[i];
            data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
        }

        context.putImageData(imageData, 0, 0)
    }

    function draw() {
	    context.drawImage(original, 0, 0, canvas.width, canvas.height);
        filter();
        requestAnimationFrame(draw);
    }

    loadImage('/image/sample.jpg', function(image){
        original = image;
        draw();
    });
})()
