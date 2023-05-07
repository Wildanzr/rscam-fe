/* eslint-disable react-refresh/only-export-components */
import { ReportProps } from "../../@types";
import React from "react";
import {
  Document,
  Page,
  View,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";

import { Header, Border, Persona, Checkup, Footer, Signature } from ".";

import Chanel from "./assets/chanel.png";
import dayjs from "dayjs";
import "dayjs/locale/id"

dayjs.locale("id");

const PDF: React.FC<ReportProps> = ({
  address,
  advice,
  complaint,
  conclusion,
  dob,
  gender,
  id,
  name,
  pictures,
  result,
  videos,
  _id,
  _rev
}: ReportProps) => {
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
      alignItems: "stretch",
      justifyContent: "space-between",
      gap: 5,
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

  const checkupProps = {
    complaint,
    result,
    conclusion,
    advice,
  }

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document
          title={`Laporan Pemeriksaan - ${name}`}
          subject={`Laporan Pemeriksaan - ${name}`}
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
                name={name}
                age={dayjs().diff(dob, 'year')}
                gender={gender}
                address={address}
                doctor="dr. Gunazar Gesang, Sp.PK., M.Kes"
                date={dayjs(id).format('dddd, DD MMMM YYYY')}
                time={dayjs(id).format('HH:mm:ss [WIB]')}
              />
              <Checkup {...checkupProps} />
            </View>

            <View style={styles.footer}>
              <Signature />
              <Footer />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDF;
