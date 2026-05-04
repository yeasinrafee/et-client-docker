import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
