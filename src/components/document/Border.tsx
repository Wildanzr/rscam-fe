import React from "react";

import { View } from "@react-pdf/renderer";

const Border: React.FC = () => {
  return <View style={{ border: "1px dashed red ", margin: 10 }} />;
};

export default Border;
