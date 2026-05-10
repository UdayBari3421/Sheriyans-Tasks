import React from "react";

type ButtonProps = {
  title: string;
  style?: string;
  isIcon?: boolean;
  IconElement?: React.ComponentType<any>;
  isRightIcon?: boolean;
};
const Button = ({
  IconElement,
  title = "give me",
  isIcon = false,
  style,
  isRightIcon = false,
}: ButtonProps) => {
  return (
    <button
      className={`${style} font-[roboto_sens_serif] hover:cursor-pointer flex justify-between px-4 py-2.5 rounded-2xl`}>
      {!isRightIcon && isIcon && IconElement && <IconElement />}
      {title}
      {isRightIcon && isIcon && IconElement && <IconElement />}
    </button>
  );
};

export default Button;
