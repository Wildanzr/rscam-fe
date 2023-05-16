import React from "react";

import { Description } from ".";
import { View, Font, StyleSheet } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

interface IPersona {
  name: string;
  age: string;
  gender: boolean;
  address: string;
  doctor: string;
  date: string;
  time: string;
}

const Persona: React.FC<IPersona> = ({
  name,
  age,
  gender,
  address,
  doctor,
  date,
  time,
}: IPersona) => {
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
    persona_container: {
      flexDirection: "row",
      width: "100%",
    },
    persona_p: {
      flexDirection: "column",
      width: "50%",
    },
  });
  return (
    <View style={styles.persona_container}>
      <View style={styles.persona_p}>
        <Description title="Nama" value={name} />
        <Description title="Umur" value={`${age} tahun`} />
        <Description
          title="Jenis Kelamin"
          value={gender ? "Lak-laki" : "Perempuan"}
        />
        <Description title="Alamat" value={address} />
      </View>
      <View style={styles.persona_p}>
        <Description title="Dari Dokter" value={doctor} />
        <Description title="Tanggal" value={date} />
        <Description title="Waktu" value={time} />
      </View>
    </View>
  );
};

export default Persona;
