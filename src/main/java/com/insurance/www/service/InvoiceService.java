package com.insurance.www.service;

import java.awt.Color;
import java.io.IOException;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.VerticalPositionMark;

import jakarta.servlet.http.HttpServletResponse;

public class InvoiceService {
private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(new Color(253, 240, 213));
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(new Color(31, 53, 65));

        cell.setPhrase(new Phrase("Market Value", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Premium Amount", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("No of years", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Address", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Due Date", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Transaction Time", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        table.addCell("1300000");
        table.addCell("5000");
        table.addCell(String.valueOf(1));
        table.addCell("lb nagar, Hyderabad");
        table.addCell("18/08/2002");
        table.addCell("10:20");
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        try {
            // Load image from resources folder
            Image image = Image.getInstance("C:\\Users\\ADMIN\\Pictures\\RS Logo.jpeg");
            image.scalePercent(8.0f, 8.0f);
            document.add(image);

            // Add header
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            headerFont.setSize(25);
            headerFont.setColor(new Color(120, 0, 0));
            Paragraph pHeader = new Paragraph("RS Insurance Pvt ltd. \n", headerFont);
            pHeader.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(pHeader);

            // Add bank details
            Font fontP = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontP.setSize(18);
            fontP.setColor(new Color(120, 0, 0));
            Chunk glue = new Chunk(new VerticalPositionMark());
            Paragraph pp = new Paragraph("\nCompany Details", fontP);
            pp.add(new Chunk(glue));
            pp.add("Custumer Details:");
            document.add(pp);

            Font fontN = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontN.setSize(12);
            fontN.setColor(Color.BLACK);
            Paragraph pN = new Paragraph("Company Name: RS Insurance pvt ltd.");
            pN.add(new Chunk(glue));
            pN.add("Custumer ID: 1234235426");
            document.add(pN);

            Font fontA = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontA.setSize(12);
            fontA.setColor(Color.BLACK);
            Paragraph pA = new Paragraph("Agency No: 10012");
            pA.add(new Chunk(glue));
            pA.add("Refernce ID: FHFH3949EH");
            document.add(pA);

            Font fontC = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontC.setSize(12);
            fontC.setColor(Color.BLACK);
            Paragraph pC = new Paragraph("Email : support@rsinsurance.com", fontC);
            pC.add(new Chunk(glue));
            pC.add("Mobile No: 9923784723");
            document.add(pC);

            // Add transaction section header
            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            font.setSize(22);
            font.setColor(new Color(120, 0, 0));
            Paragraph p = new Paragraph("\n Invoice\n", font);
            p.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(p);

            // Add statement range
            Font fontStatementRange = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontStatementRange.setSize(14);
            fontStatementRange.setColor(new Color(120, 0, 0));
            Paragraph pStatementRange = new Paragraph("\n Premium applied  from 18/08/2001 to 17/08/2002 \n", fontStatementRange);
            pStatementRange.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(pStatementRange);

            // Add table
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100f);
            table.setWidths(new float[]{2.0f, 2.0f, 1.5f, 2.0f, 3.1f, 3.2f});
            table.setSpacingBefore(10);

            writeTableHeader(table);
            writeTableData(table);

            document.add(table);
            
            Font fontP1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontP1.setSize(18);
            fontP1.setColor(new Color(120, 0, 0));
            Chunk glue1 = new Chunk(new VerticalPositionMark());
            Paragraph pp1 = new Paragraph("\n", fontP1);
            pp1.add(new Chunk(glue1));
            pp1.add("Best Regards");
            document.add(pp1);

            Font fontN1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontN1.setSize(12);
            fontN1.setColor(Color.BLACK);
            Paragraph pN1 = new Paragraph("");
            pN1.add(new Chunk(glue1));
            pN1.add("Rs Insurance pvt ltd");
            document.add(pN1);

            Font fontA1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontA1.setSize(12);
            fontA1.setColor(Color.BLACK);
            Paragraph pA1 = new Paragraph("");
            pA1.add(new Chunk(glue1));
            pA1.add("Madhapur, Hyderbad");
            document.add(pA1);

            Font fontC1= FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontC1.setSize(12);
            fontC1.setColor(Color.BLACK);
            Paragraph pC1 = new Paragraph("");
            pC1.add(new Chunk(glue1));
            pC1.add("India, 500081\n");
            document.add(pC1);
            
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            footerFont.setSize(12);
            footerFont.setColor(new Color(120, 0, 0));
            Paragraph fHeader = new Paragraph("\n Thank you choosing Rs Insurance.If any querys feel free to Contact us at support@ramanasoft.com or +91 9951489432 \n");
            fHeader.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(fHeader);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }
}
