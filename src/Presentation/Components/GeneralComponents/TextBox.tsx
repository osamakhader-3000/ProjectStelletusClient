import { BasicTextBox } from "project-manager-client-component-library";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import textBoxStyles from './TextBox.module.css'

interface TextBoxProps {
    placeholder: string;
    keyUpFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    textInputStyle?: string;
    textInputType?: string;
    innerDivStyle?: string;
    innerDivStyleActive?: string;
    outerDivStyle?: string;
  }
  
  
  export interface TextBoxRef {
    getValue: () => string | undefined;
    setValue: (value: string) => void;
  }

  const TextBox = forwardRef<TextBoxRef,TextBoxProps>(
    ({  
    placeholder,
    keyUpFunc,
    textInputType,
    textInputStyle,
    innerDivStyle,
    innerDivStyleActive,
    outerDivStyle
  }, ref) => {

    const localRef = useRef<TextBoxRef>(null);
    useImperativeHandle(ref, () => ({
        getValue: () => localRef.current?.getValue(),
        setValue: (value: string) => {
          if (localRef.current) {
            localRef.current.setValue(value);
          }
        },
      }));

    return (<BasicTextBox textInputType={textInputType?textInputType:'text'} keyUpFunc={keyUpFunc} ref={localRef} placeholder={placeholder} textInputStyle={textInputStyle?textInputStyle:textBoxStyles.inputTextbox} innerDivStyle={innerDivStyle?innerDivStyle:textBoxStyles.divTextbox} innerDivStyleActive={innerDivStyleActive?innerDivStyleActive:textBoxStyles.divTextboxActive} outerDivStyle={outerDivStyle?outerDivStyle:textBoxStyles.outerDivTextbox} />);
});

export default TextBox;