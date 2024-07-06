$(document).ready(function() {
    // Function to handle download of both images
    $("#downloadBothImages").click(function() {
        var zip = new JSZip();

        // Add images to the zip
        zip.file("image1.png", getBase64Image("images/1.png"), { base64: true });
        zip.file("image2.png", getBase64Image("images/2.png"), { base64: true });

        // Generate the zip file asynchronously
        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                // Save the zip file
                saveAs(content, "giftCard.zip");
                // Show success message
                Swal.fire({
                    icon: "success",
                    title: "Tải rùi nhé ạ ^^",
                });
            })
            .catch(function(error) {
                // Show error message if any
                console.error('Error generating zip file:', error);
            });
    });

    // Function to convert image to base64 format
    function getBase64Image(imgSrc) {
        var img = new Image();
        img.src = imgSrc;
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
});