/* eslint-disable react-refresh/only-export-components */
import React from "react";
import {
  Document,
  Page,
  View,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";

import { Header, Border, Persona, Checkup, Footer } from ".";

import Chanel from "./assets/chanel.png";

const PDF: React.FC = () => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 10,
    },
    header: {
      width: "100%",
      height: "10%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    footer: {
      width: "100%",
      height: "15%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 5,
      backgroundColor: 'red'
    },
    body: {
      width: "100%",
      height: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
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
            <View style={styles.header}>
              <Header
                logo={Chanel}
                title="RS Bunga Mawar"
                address="Jl. Mawar Asri No.47, Malang, Jawa Timur"
                phone="0341-XXXXXXXX"
                cp="081 XXX XXX XXX"
                email="admin@roses.id"
              />
              <Border />
            </View>

            <View style={styles.body}>
              <Persona
                name="Muhammad Sodikin"
                age={40}
                gender={true}
                address="Jl. Ahmad Yani No. 10, Kel. Cemp. Putih Barat, Kec. Cemp. Putih, Kota Jkt. Pusat, Prov. DKI Jakarta, Kode Pos 10510"
                doctor="dr. Gunazar Gesang, Sp.PK., M.Kes"
                date="Senin, 4 Desember 2022"
                time="13:30:45 WIB"
              />
              <Checkup />
            </View>

            <View style={styles.footer}>
              <Footer />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDF;
