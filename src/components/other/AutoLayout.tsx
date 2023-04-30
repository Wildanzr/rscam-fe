import React from "react";

interface IAutoLayout {
  children?: React.ReactNode;
}

const AutoLayout = (props: IAutoLayout) => {
  //   Props destructure
  const { children } = props;

  return (
    <div className="flex w-full flex-col lg:flex-row gap-5">
      {children}
    </div>
  );
};

export default AutoLayout;
