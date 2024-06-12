import React from 'react';
import jsPDF from 'jspdf';
import {  Button } from "react-bootstrap";
import image1 from '../Images/image1.png';
import logo from '../Images/logo.png';
import { frequencyData } from './Options';
import { medicineCategoryData } from './Options';
function PdfGenerator(props){

    function generatePdf(){
        const doc = new jsPDF("p", "mm", "a4");
         console.log(props.OPD);
        
         // Add content to the PDF

        var img = new Image();
        img.src = image1;
        doc.addImage(img, "png", 14, 10, 24, 18);             //here 14 & 10 are x,y cordinates & 22,18 are size of image

        doc.setFont("Times New Roman");
        doc.setFontSize(20);
        doc.setTextColor(255,0,0);
        doc.text("HEALTH CARE CLINIC", 70, 20);           

        doc.setFontSize(13);
        doc.setTextColor("#191970");
        doc.text("a multi super speciality hospital",72,25)

        var img = new Image();
        img.src = logo;
        doc.addImage(img, "png", 175, 10, 22, 18);    // 175 & 10 these are x,y coordinates
        

        doc.setDrawColor("#191970");    // draw  lines
        doc.setLineWidth(1);
        doc.line(10, 30, 200, 30);

        doc.setFont("Times New Roman");
        doc.setFontSize(16);
        doc.setTextColor('#191970');
        doc.text("OPD Prescription", 80, 38);

        doc.setDrawColor("#191970");    // draw  lines
        doc.setLineWidth(0.5);
        doc.line(20, 30, 200, 30);

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Doctor : ", 10, 47);

        doc.setFont("Times New Roman","normal");    //assiging the value
        doc.text(props.OPD["doctor"],30, 47);        //doctor name
        doc.setFontSize(13)
        doc.text("Physician",10,52);
        doc.text("MBBS,MD,MS",10,57);
        //doc.text("8220136604",10,57);

     
        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Patient name:", 85, 47);
        doc.setFont("Times New Roman","normal");    //assiging the value
        doc.text(props.OPD.incident.patient["name"],115, 47);  
        
        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Date: ",10, 65);
        doc.setFont("Times New Roman","normal");    //assiging the date
        doc.text(props.OPD["date"],30, 65);

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);    
        doc.setTextColor('#191970');
        doc.text("Fees: ",10, 73);
        doc.setFont("Times New Roman","normal");    //assiging the date
        doc.text(props.OPD["fees"],30, 73);

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Age/Gender:", 85, 55);
        doc.setFont("Times New Roman","normal");    //assiging the value
        doc.text(props.OPD.incident.patient.age+"/"+props.OPD.incident.patient.gender,115, 55);  

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Address:", 85, 63);
        doc.setFont("Times New Roman","normal");    
        doc.text(props.OPD.incident.patient.address,115, 63);  

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Care-Taker:", 85, 71);
        doc.setFont("Times New Roman","normal");    
        doc.text(props.OPD.incident.patient.careTaker,115, 71); 
        
        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Mob.No. :", 150, 71);
        doc.setFont("Times New Roman","normal");    
        doc.text(String(props.OPD.incident.patient.mobile),170, 71); 

        doc.setDrawColor("#191970");    // draw  lines
        doc.setLineWidth(0.5);
        doc.line(10, 78, 200, 78);

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Temperature: ", 10,84);
        doc.text("B.P. : ", 70,84);
        doc.text("Sugar: ", 120,84);
        doc.text("Pulse: ", 160,84);
        doc.setFont("Times New Roman","normal");    
        doc.text(String(props.OPD.temp)+"°F",40, 84); 
        doc.text(String(props.OPD.bp)+"/"+String(props.OPD.bp)+"mm Hg",83, 84); 
        doc.text(String(props.OPD.sugar)+"mmol/L",135, 84); 
        doc.text(String(props.OPD.pulse)+"mmHg",175, 84); 

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Diagnosis : ", 10, 95);
        doc.setFont("Times New Roman","normal");    
        doc.text(props.OPD.incident.diagnosis,40, 95);
        
        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Chief Complaint : ", 10, 105);
        doc.setFont("Times New Roman","normal");    
        doc.text(props.OPD.incident.chiefComplaint,53,105);

         
        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Advice : ", 10, 228);
        doc.setFont("Times New Roman","normal");    
        doc.text(props.OPD.advice,53,228);

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("Allergy : ", 10, 235);
        doc.setFont("Times New Roman","normal");    
        doc.text(props.OPD.allergy,53,235);

        doc.setDrawColor("#191970");    // draw  lines
        doc.setLineWidth(1);
        doc.line(10, 260 ,200,260);

        doc.setFont("Times New Roman","bold");
        doc.setFontSize(13);
        doc.setTextColor('#191970');
        doc.text("#",10,120);
        doc.text("Category ", 20,120);
        doc.text("Medicine ", 45,120);
        doc.text("Dosage ", 120,120);
        doc.text("Days ", 160,120);
        //doc.text("Quantity ", 170,120);
        // doc.text("Amount ", 190,120);
        doc.setFont("Times New Roman","normal"); 

        var {prescriptions,totalQuantity,totalAmount} = calculatePrescriptionTotals(props.OPD.prescriptions)
        for(let i=0; i<prescriptions.length; i++) {
            doc.text(String(i+1),10,130 +i*7 ); 
            doc.text(prescriptions[i].medicine.category,20,130 +i*7)  
            doc.text(prescriptions[i].medicine.brandName,45,130 +i*7)  
            doc.text(prescriptions[i].dosage,120, 130 +i*7); 
            doc.text(String(prescriptions[i].duration),160, 130 +i*7);
           // doc.text(String(prescriptions[i].totalQuantity),170, 130 +i*7);
           // doc.text("Rs. "+String(prescriptions[i].totalAmount),190, 130 +i*7);
        }     
        
        
        var bill = totalAmount+Number(props.OPD.fees)
        doc.setFont("Times New Roman");
        doc.setFontSize(13);
        doc.setTextColor(255, 0, 0);
        doc.text("CLOSED ON SUNDAY", 10, 270);
        doc.setTextColor("#191970")
        doc.text("Total Bill : "+String(bill), 150, 270);
        doc.text("ADDRESS :", 10, 280);
        doc.text("Near XYZ, New Delhi", 10, 288);
        doc.text("00983", 10, 293);
        doc.text("TIMMING : ",150, 280);
        doc.text("Monday To Saturday,", 150, 288);
        doc.text("9:00 am to 5:00 pm", 150, 293);
        // Save the PDF
        //doc.save("generated.pdf");

        doc.output('dataurlnewwindow',{filename:"myopd.pdf"})
    }


    function calculatePrescriptionTotals(prescriptions) {
        const results = prescriptions.map(prescription => {
          const frequencyObj = frequencyData.find(freq => freq.abbr === prescription.dosage);
          if (frequencyObj) {
            const dailyQuantity = frequencyObj.times;
            const totalPrescriptionQuantity =Math.floor(dailyQuantity * prescription.duration);
            const totalPrescriptionAmount = totalPrescriptionQuantity * prescription.medicine.unitPrice;
            return {
              ...prescription,
              totalQuantity: totalPrescriptionQuantity,
              totalAmount: totalPrescriptionAmount,
              dosage:frequencyObj.description
            };
          } else {
            return {
              ...prescription,
              totalQuantity: 0,
              totalAmount: 0
            };
          }
        });
      
        const totalQuantity = results.reduce((sum, prescription) => sum + prescription.totalQuantity, 0);
        const totalAmount = results.reduce((sum, prescription) => sum + prescription.totalAmount, 0);
        
        return { prescriptions: results, totalQuantity, totalAmount };
      }

    return<>
         <div>
          <Button className='btn btn-success' onClick={generatePdf} style={{marginBottom:5}}>Open PDF</Button>
            
           
      </div>
    </>
}

export default PdfGenerator;
