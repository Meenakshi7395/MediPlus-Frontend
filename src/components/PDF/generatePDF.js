function generatePDF(formData,action) {
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    var img = new Image();
    img.src = "../components/Images/image.png";
    doc.addImage(img, "png", 10, 10, 18, 18);

    if(action=="Download")
        doc.save(formData["applicationType"]+" "+formData["firstLastName"]+".pdf");
        else
        doc.output("dataurlnewwindow",formData["applicationType"]+" "+formData["firstLastName"]+".pdf");
}