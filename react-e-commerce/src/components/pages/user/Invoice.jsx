import React,{useEffect} from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
// import { font } from '../../../assets/fonts/Hinsiew-normal'

const Invoice = ({order}) => {

    useEffect(() => {
        
    },[])

    const exportPDF = () => {
        const doc = new jsPDF();
        // doc.addFileToVFS("MyFont.ttf", font);
        // doc.addFont("MyFont.ttf", "MyFont", "normal");
        // doc.setFont("MyFont");

        let width = doc.internal.pageSize.getWidth();

        doc.text("KO GAMING", 10, 10,{align:'left'});
        doc.text("Date: ", 10, 20,{align:'left'});
        doc.text("Reciept", width/2, 30,{align:'center'});

        let data = order.products.map((p,i) => [p.product.title, p.price, p.qty])

        let content = {
            startY: 40,
            head: [["Product", "Price", "Qty"]],
            body: data
        }

        doc.autoTable(content)

        doc.text(`Grand Total: ${order.grandTotal}`, 190, 70, {align: 'right'})

        doc.save("reciept.pdf");
    }

    return (
        <button type="button" className='btn btn-danger fw-bold float-end w-25' onClick={exportPDF}>
            <i class="fas fa-download"></i> Export
        </button>
    )
}

export default Invoice