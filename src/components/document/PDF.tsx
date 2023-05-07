/* eslint-disable react-refresh/only-export-components */
import React from "react";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";

import Header from "./Header";
import Border from "./Border";

import Chanel from "./assets/chanel.png";

const PDF: React.FC = () => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
    },
  });

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document
          title="Laporan A"
          subject="Laporan A"
          author="Dokter A"
          language="id"
          creator="Dokter A"
          producer="Dokter A"
        >
          <Page size="A4" style={styles.page}>
            <Header
              logo={Chanel}
              title="RS Bunga Mawar"
              address="Jl. Mawar Asri No.47, Malang, Jawa Timur"
              phone="0341-XXXXXXXX"
              cp="081 XXX XXX XXX"
              email="admin@roses.id"
            />

            <Border />
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDF;
