import React from "react";

import { View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

interface IAttachment {
  pictures: string[];
  videos: string[];
  qrCode: string | undefined | null;
}

interface IImageDisplay {
  pictures: string[];
}

const Attachment: React.FC<IAttachment> = ({
  pictures,
  qrCode,
}: IAttachment) => {
  // Register font
  Font.register({
    family: "opensans",
    fonts: [
      {
        src: OpenSans_Regular,
        fontWeight: 400,
      },
      {
        src: OpenSans_SemiBold,
        fontWeight: 600,
      },
    ],
  });

  const styles = StyleSheet.create({
    result_container: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "15 0 0 0",
      gap: 5,
    },
    image_container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid black",
      gap: 5,
    },
    result_title: {
      backgroundColor: "#1677FF",
      color: "white",
      width: "100%",
      textAlign: "center",
      fontFamily: "opensans",
      fontSize: 12,
      fontWeight: 600,
    },
    qr_code: {
      width: "100",
      height: "100",
      objectFit: "cover",
      margin: "0 0 5 0",
    },
  });
  return (
    <>
      <View style={styles.result_container}>
        <View style={styles.image_container}>
          <Text style={styles.result_title}>Lampiran Pemeriksaan</Text>
          <ImageDisplay pictures={[pictures[0], pictures[1]]} />
          <ImageDisplay pictures={[pictures[2], pictures[3]]} />
          <ImageDisplay pictures={[pictures[4], pictures[5]]} />
        </View>
        <Image style={styles.qr_code} src={qrCode} />
      </View>
    </>
  );
};

const ImageDisplay: React.FC<IImageDisplay> = ({ pictures }: IImageDisplay) => {
  // Register font
  Font.register({
    family: "opensans",
    fonts: [
      {
        src: OpenSans_Regular,
        fontWeight: 400,
      },
      {
        src: OpenSans_SemiBold,
        fontWeight: 600,
      },
    ],
  });

  const styles = StyleSheet.create({
    result_container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 0 5 0",
      gap: 5,
    },
    image: {
      width: "130",
      height: "130",
      objectFit: "cover",
    },
  });
  return (
    <>
      <View style={styles.result_container}>
        {pictures.map((picture, index) => (
          <Image key={index} style={styles.image} src={picture} />
        ))}
      </View>
    </>
  );
};

export default Attachment;
