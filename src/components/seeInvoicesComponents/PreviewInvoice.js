import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import logo from "../../logo.png";

import {
  Page,
  Document,
  Text,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
  View,
} from "@react-pdf/renderer";
import InvoiceTitle from "./pdfComponents/InvoiceTitle";
import InvoiceNo from "./pdfComponents/InvoiceNo";
import BillTo from "./pdfComponents/BillTo";
import InvoiceItemsTable from "./pdfComponents/InvoiceItemsTable2";

const invoice1 = {
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 5,
      rate: 405.89,
    },
    {
      sno: 2,
      desc: "cillum quis sunt qui aute",
      qty: 5,
      rate: 373.11,
    },
    {
      sno: 3,
      desc: "ea commodo labore culpa irure",
      qty: 5,
      rate: 458.61,
    },
    {
      sno: 4,
      desc: "nisi consequat et adipisicing dolor",
      qty: 10,
      rate: 725.24,
    },
    {
      sno: 5,
      desc: "proident cillum anim elit esse",
      qty: 4,
      rate: 141.02,
    },
  ],
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const PreviewInvoice = ({ invoice }) => {
  const [tempInvoice, setTempInvoice] = useState("");

  useEffect(() => {
    setTempInvoice(invoice);
  }, []);

  /*if (tempInvoice !== undefined && tempInvoice.items !== undefined && tempInvoice.items[0] !== undefined) {
    console.log("DATA 1" + JSON.stringify(tempInvoice));
    console.log("DATA 2" + tempInvoice.customerName);
    console.log("DATA 3" + tempInvoice.items[0].name);
    tempInvoice.items.forEach((item) => console.log(item.name));
  }*/

  return (
    <div>
      <PDFViewer
        style={{
          minHeight: "800px",
          minWidth: "800px",
          height: "99%",
          width: "100%",
          border: "0px",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Temporary solution */}
            {tempInvoice !== undefined &&
            tempInvoice.items !== undefined &&
            tempInvoice.items[0] !== undefined ? (
              <div>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title="Invoice" />
                <InvoiceNo invoice={tempInvoice} />
                <BillTo invoice={tempInvoice} />
                <InvoiceItemsTable invoice={tempInvoice} />
              </div>
            ) : null}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

ReactDOM.render(<PreviewInvoice />, document.getElementById("root"));

export default PreviewInvoice;
