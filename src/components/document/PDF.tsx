/* eslint-disable react-refresh/only-export-components */
import { ReportProps } from "../../@types";
import React from "react";
import { useGlobalContext } from "../../contexts/Global";

import { Header, Border, Persona, Checkup, Footer, Signature, Attachment } from ".";
import {
  Document,
  Page,
  View,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

interface IGlobalContext {
  qrCode: string | undefined | null;
}

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
  at
}: ReportProps) => {
  // Global states
  const { globalStates } = useGlobalContext() as { globalStates: IGlobalContext };
  const { qrCode } = globalStates;

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 20,
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
    result: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 5,
    },
  });

  const checkupProps = {
    complaint,
    result,
    conclusion,
    advice,
  };

  const attachmentProps = {
    pictures,
    videos
  }

  const signatureProps = {
    qrCode,
    id
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
                age={`${dayjs().diff(dob, "year")}`}
                gender={gender}
                address={address}
                doctor="dr. Gunazar, Sp.PK., M.Kes"
                date={dayjs(at).format("dddd, DD MMMM YYYY")}
                time={dayjs(at).format("HH:mm:ss [WIB]")}
              />
              <View style={styles.result}>
                <Checkup {...checkupProps} />
                <Attachment {...attachmentProps} />
              </View>
            </View>

            <View style={styles.footer}>
              <Signature {...signatureProps} />
              <Footer />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDF;
