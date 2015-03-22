;(function(jsfeat){
    jsfeat.imgproc.filter = jsfeat.imgproc.filter || function(src, w, h, dst, code, transform) {
        dst.resize(w, h, 1);
        var dst_u8 = dst.data;

        for (var y = 0; y < h; y++) {
            for (var x = 0; x <= w; x++) {
                var dst_index = y * w + x;
                var src_index = 4 * dst_index

                var r = src[src_index + 0];
                var g = src[src_index + 1];
                var b = src[src_index + 2];
                var a = src[src_index + 3];

                dst_u8[dst_index] = transform(r, g, b, a);
            }
        }
    }
})(jsfeat)
