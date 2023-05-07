/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Document, Page, PDFViewer, StyleSheet } from "@react-pdf/renderer";

import { Header, Border, Persona, Result } from ".";

import Chanel from "./assets/chanel.png";

const PDF: React.FC = () => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 10,
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
            <Persona
              name="Muhammad Sodikin"
              age={40}
              gender={true}
              address="Jl. Ahmad Yani No. 10, Kel. Cemp. Putih Barat, Kec. Cemp. Putih, Kota Jkt. Pusat, Prov. DKI Jakarta, Kode Pos 10510"
              doctor="dr. Gunazar Gesang, Sp.PK., M.Kes"
              date="Senin, 4 Desember 2022"
              time="13:30:45 WIB"
            />
            <Result
              color="#00B96B"
              title="Keluhan Pasien"
              text="Pasien mengalami sakit kepala selama beberapa hari terakhir, disertai dengan mual, muntah, penurunan nafsu makan, dan rasa lelah. Keluhan tersebut mengganggu aktivitas sehari-hari dan tidak mereda meski sudah istirahat."
            />
            
            <Result
              color="#00B96B"
              title="Hasil Pemeriksaan"
              text="Pasien didiagnosis menderita migrain vestibular dengan peningkatan tekanan darah. Diberikan resep obat untuk mengatasi sakit kepala dan menurunkan tekanan darah, serta instruksi untuk menjaga pola makan dan tidur yang teratur."
            />
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDF;
