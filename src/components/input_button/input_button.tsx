import React from "react";
import { Link } from "react-router-dom";
import "./input_button.scss";

interface inputButtonModel {
  text: string;
  primary?: boolean;
  disabled?: boolean;
  clickAction?: any;
  href?: string;
}

const inputButton = ({
  text,
  primary,
  disabled,
  clickAction,
  href,
}: inputButtonModel) => {
  return (
    <Link
      to={href ? href : ""}
      className='input-button'
      data-testid='input-button'>
      <button
        className={primary ? "primary" : ""}
        onClick={clickAction}
        disabled={disabled}>
        {text}
      </button>
    </Link>
  );
};

export default inputButton;
