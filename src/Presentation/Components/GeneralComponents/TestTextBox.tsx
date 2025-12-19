import React, { useEffect, useRef, useState } from "react";
import formTextBoxStyles from './FormTextBox.module.css';

interface FormTextBoxProps {
  placeholder?: string;
  keyUpFunc?: (inputText: string) => void;
  onClick?: () => void;
  onUnClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textInputStyle?: string;
  textInputType?: string;
  value?: string;
  isValid?: boolean;  // parent can control it
  onBlur?: () => void;
}

export function TestTextBox({
  placeholder,
  keyUpFunc,
  onClick,
  onUnClick,
  onChange,
  textInputType,
  textInputStyle,
  value,
  isValid: isValidFromParent,
  onBlur,
}: FormTextBoxProps) {

  const localRef = useRef<HTMLInputElement>(null);

  // This is the key: internal state that starts from parent, but can be overridden
  const [internalIsValid, setInternalIsValid] = useState<boolean | null>(null);

  // Final value: use internal override if exists, otherwise use parent's value (or default true)
  const isValid = internalIsValid ?? (isValidFromParent ?? true);

  // When clicking outside → FORCE valid, no matter what parent says
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (localRef.current && !localRef.current.contains(event.target as Node)) {
        setInternalIsValid(true);  // This is your "force valid from inside"
        onUnClick?.();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [onUnClick]);

  const handleInsideClick = () => {
    localRef.current?.focus();
    onClick?.();
  };

  return (
    <input
      onClick={handleInsideClick}
      value={value ?? ""}
      aria-invalid={!isValid}
      onKeyUp={(e) => keyUpFunc?.((e.target as HTMLInputElement).value)}
      onChange={onChange}
      placeholder={placeholder || ""}
      type={textInputType || "text"}
      className={`
        ${formTextBoxStyles.textbox}
        ${!isValid ? formTextBoxStyles.inValid : ''}
        ${textInputStyle || ''}
      `.trim()}
      ref={localRef}
      onBlur={onBlur}
    />
  );
}