const { jsPDF } = require("jspdf");
const QRCode = require("qrcode");
const Autotable = require('jspdf-autotable')
var fs = require("fs");


// Creating a document

let createPDF = async(paquete,usuario,origen,destino,destinatario) => {
  const pdf = new jsPDF({
    orientation: "portrait", // should it be portrait or landscape?
    unit: "mm", // unit of measure while adding stuff
    format: "a4", // format can be string or array [x, y] in above units
  });
  //console.log("Ancho: ", pdf.internal.pageSize.getWidth());
  //console.log("Altura: ", pdf.internal.pageSize.getHeight());
  var logo = fs.readFileSync(__dirname+'/logo_sendiit-light.png').toString('base64');
  //var logo = fs.readFileSync('sendiit-original.png').toString('base64');
  //HEADER
  pdf.setFillColor(33,46,70);
  pdf.rect(0,0,210,20,'F');
  pdf.addImage(logo,'PNG',105-25,5,50,10);

  pdf.setTextColor(0,0,0);
  pdf.setFontSize(30)
  pdf.setFont("helvetica");
  pdf.text("Datos del envío",105,40,"center");
  //CONTENIDO
  pdf.setTextColor(0,0,0);
  pdf.setFontSize(10)
  pdf.setFont("helvetica");
  pdf.autoTable( {
    styles: { fillColor: [0, 0, 0], lineWidth: 1, lineColor: 0},
    columnStyles: { 0: { halign: 'center', fillColor: [174, 174, 174], cellWidth: 50}, 
                    1: {fillColor: [255,255,255]}
                  }, // Cells in first column centered and green
    margin: { top: 60 },
    body: [
      ['Cliente', usuario.name],
      ['Destinatario', destinatario.nombre],
      ['Descripción', paquete.descripcion],
      ['Locker de origen', origen],
      ['Locker de destino', destino],
      ['Tamaño', paquete.tamano],
      ['Fecha de pago', paquete.estadosFechas.porRecibir],
      ['Estado del paquete', 'Por recibir'],
    ],
  })

  pdf.setTextColor(0,0,0);
  pdf.setFontSize(10)
  pdf.setFont("helvetica");
  pdf.text("Código QR para desbloquear el locker de origen "+ origen,60,120,"center");
  // Inserting qrCode
  pdf.addImage(paquete.qrOrigen, "JPEG", 105-25, 130, 50, 50);

  // Adding lines
  pdf.setLineWidth(0.10);
  pdf.line(10, 210, 200, 210);

  let pdfOutput = pdf.output("datauristring", {
    filename: paquete.id
  });
  //pdf.save("prueba.pdf");
  return pdfOutput;
};



module.exports = { createPDF };