import React from "react";

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container m-5 mx-auto mt-3">{children}</div>;
};

export default Container;
