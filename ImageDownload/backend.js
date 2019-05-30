var pdf = new jsPDF(),
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    pageWidth = pdf.internal.pageSize.width,
    pageHeight = pdf.internal.pageSize.height,
    prevY = 0;

var img = document.getElementsByTagName('img');

for (var i = 0; i < img.length; ++i) {
    canvas.width = img[i].width;
    canvas.height = img[i].height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img[i], 0, 0, canvas.width, canvas.height);

    try {
        // Pixel to mm
        var _w = Math.floor(canvas.width * 0.2645833333), _h = Math.floor(canvas.height * 0.2645833333);
        if (_w > pageWidth) {
            _h = pageWidth * _h / _w;
            _w = pageWidth;
        }
        if (_h > pageHeight) {
            _w = pageHeight * _w / _h;
            _h = pageHeight;
        }
        var imgData = canvas.toDataURL("image/jpeg");
        if (imgData) {
            pdf.addImage(imgData, 'JPEG', 0, prevY, _w, _h);
            prevY += _h;
        }
        if (prevY > pageHeight && i < img.length - 1)
            pdf.addPage();
    } catch (_) {}
}
pdf.save(Date.now() + '.pdf')