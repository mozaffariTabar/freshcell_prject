import React, { useEffect, useState } from "react";
import "./input_text.scss";

type inputTypeModel = "text" | "password" | "email";

interface inputTextModel {
  label: string;
  type: inputTypeModel;
  allowShowPassword?: boolean;
  initValue?: string;
  required?: boolean;
  changeAction?: any;
  iconName?: string;
  isFormatWrong?: boolean;
}

const InputText = ({
  label,
  type,
  allowShowPassword,
  initValue,
  required,
  changeAction,
  iconName,
  isFormatWrong,
}: inputTextModel) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordShowable, setPasswordShowable] = useState(false);
  const [formatWrong, setFormatWrong] = useState(false);
  const [warningHint, setWarningHint] = useState("");

  useEffect(() => {
    initValue && !value && setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    allowShowPassword && setPasswordShowable(allowShowPassword);
    isFormatWrong && setFormatWrong(true);
    setIsFocused(!!value);
  }, [allowShowPassword, isFormatWrong, value]);

  const validateInputFormat = (value: string) => {
    let regexPattern: any;

    if (type === "email") {
      regexPattern = new RegExp(/[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    } else if (type === "password") {
      regexPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    } else if (type === "text") {
      regexPattern = new RegExp(/[\w]{5,}/);
    }

    return regexPattern.test(value);
  };

  const handleInputChange = (value: string) => {
    setValue(value);
    setFormatWrong(!!value);

    let hintText = "";
    let isFormatValid = validateInputFormat(value);

    if (!isFormatValid) {
      switch (type) {
        case "email":
          hintText = "Should includes (@ / . / letter)";
          break;
        case "password":
          hintText = "Should be least 8 char with (digit / letter)";
          break;
        case "text":
          hintText = "Should be least 5 characters!";
          break;
      }
    }

    setWarningHint(hintText);
    setFormatWrong(!isFormatValid);
    changeAction(isFormatValid ? value : null);
  };

  return (
    <div className={"input-text" + (formatWrong ? " warning" : "")}>
      <label className={isFocused ? "focused" : "not-focused"}>
        {label + (required ? "*" : "")}
      </label>
      <input
        type={showPassword ? "text" : type}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          !value && setFormatWrong(true);
        }}
        onBlur={() => !value && setIsFocused(false)}
      />
      {warningHint && (
        <div className='hint'>
          <i className='las la-exclamation-triangle'></i>
          <span>{warningHint}</span>
        </div>
      )}
      {type === "password" && isPasswordShowable && value && (
        <i
          className={"las la-eye" + (showPassword ? "-slash" : "")}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
      <i className={"las la-" + iconName} />
    </div>
  );
};

export default InputText;
