package com.insurance.www.service;

import java.awt.Color;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.www.model.CustomerPaymentDetails;
import com.insurance.www.model.CustomerSignup;
import com.insurance.www.model.FillDetails;
import com.insurance.www.model.StructureAndDetails;
import com.insurance.www.repository.CustomerPaymentDetailsRepository;
import com.insurance.www.repository.CustomerSignupRepository;
import com.insurance.www.repository.FillDetailsRepository;
import com.insurance.www.repository.PropertyInsuranceRepository;
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

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class InvoiceService {
    private final PropertyInsuranceRepository propertyDetailsRepository;
    private final CustomerPaymentDetailsRepository quotepageRepository;
    private final  FillDetailsRepository fullDetailRepository;
    private final CustomerSignupRepository signupRepository;

    private List<StructureAndDetails> propertyDetails;
    private List<CustomerPaymentDetails> quoteDetails;
    private List<FillDetails> fullDetails;
    private List<CustomerSignup> signupDetails;

    @Autowired
    public InvoiceService( PropertyInsuranceRepository propertyDetailsRepository,
                            CustomerPaymentDetailsRepository quotepageRepository,
                            FillDetailsRepository fullDetailRepository,
                            CustomerSignupRepository signupRepository) {
        this.propertyDetailsRepository = propertyDetailsRepository;
        this.quotepageRepository = quotepageRepository;
        this.fullDetailRepository = fullDetailRepository;
        this.signupRepository=signupRepository;
    }

    
    public List<StructureAndDetails> getPropertyDetails() {
        return propertyDetails;
    }

    public List<CustomerPaymentDetails > getQuoteDetails() {
        return quoteDetails;
    }

    public List< FillDetails> getFullDetails() {
        return fullDetails;
    }

    
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

        cell.setPhrase(new Phrase("Start Date", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Due Date", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
    	
    		table.addCell(propertyDetails.get(0).getMarketValue());
    		// table.addCell(quoteDetails.get(0).getPremium().toString());
            table.addCell(String.valueOf(quoteDetails.get(0).getPremium()));
        	table.addCell(String.valueOf(quoteDetails.get(0).getYear()));
    	
    	
    		table.addCell(fullDetails.get(0).getPropertyhouseNo()+", "+fullDetails.get(0).getPropertystreetNo()+", "+fullDetails.get(0).getCity()+", "+fullDetails.get(0).getState()+","+fullDetails.get(0).getPincode());
    	
    	
    		table.addCell(quoteDetails.get(0).getStartingDate().toString());
            table.addCell(quoteDetails.get(0).getExpiryDate().toString());
    	
    	
    	
    }
    
   
    public void export(HttpServletResponse response, String paymentId) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

     
      
         this.propertyDetails = propertyDetailsRepository.findByPaymentId(paymentId);
         this.quoteDetails = quotepageRepository.findByPaymentId(paymentId);
        this.fullDetails = fullDetailRepository.findByPaymentId(paymentId);
        this.signupDetails=signupRepository.findByCustomerId(fullDetails.get(0).getCustomerId());
    


        try {
            // Load image from resources folder
        	
 
            Image image = Image.getInstance("src/main/java/image.png");
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
            pp.add("Custumer Details");
            document.add(pp);

            Font fontN = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontN.setSize(12);
            fontN.setColor(Color.BLACK);
            Paragraph pN = new Paragraph("Company Name: RS Insurance pvt ltd.");
            pN.add(new Chunk(glue));

            pN.add("CustumerID: "+fullDetails.get(0).getCustomerId());
           
            document.add(pN);

            Font fontA = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontA.setSize(12);
            fontA.setColor(Color.BLACK);
            Paragraph pA = new Paragraph("Agency No: 10012");
            pA.add(new Chunk(glue));
            pA.add("Mobile Number: "+signupDetails.get(0).getMobileno());
           
            document.add(pA);

            Font fontC = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontC.setSize(12);
            fontC.setColor(Color.BLACK);
            Paragraph pC = new Paragraph("Email : accounts@ramanasoft.com", fontC);
            pC.add(new Chunk(glue));
            pC.add("Email: " + signupDetails.get(0).getEmail());
            document.add(pC);

            // Add transaction section header
            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            font.setSize(22);
            font.setColor(new Color(120, 0, 0));
            Paragraph p = new Paragraph("\n Invoice\n", font);
            p.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(p);

            // Add statement range
//            Font fontStatementRange = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
//            fontStatementRange.setSize(14);
//            fontStatementRange.setColor(new Color(120, 0, 0));
//            Paragraph pStatementRange = new Paragraph("\n ", fontStatementRange);
//            pStatementRange.setAlignment(Paragraph.ALIGN_LEFT);
//            document.add(pStatementRange);

            // Add table
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100f);
            table.setWidths(new float[]{2.0f, 2.0f, 1.0f, 3.0f, 2.5f, 2.5f});
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
            Paragraph fHeader = new Paragraph("\n Thank you choosing Rs Insurance.If any querys feel free to Contact us at support@ramanasoft.com or 1800-258-2465 \n");
            fHeader.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(fHeader);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            document.close(); 
        }
    }
}
