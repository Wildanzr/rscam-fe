import React from "react";

import { View } from "@react-pdf/renderer";

const Border: React.FC = () => {
  return <View style={{ border: "1px double black ", margin: 10, width: '100%' }} />;
};

export default Border;
