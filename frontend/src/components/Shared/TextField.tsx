import { Form, Input } from "antd";
import React from "react";

export type SizeType = "small" | "middle" | "large" | undefined;

type TextFieldProps = {
  label: string;
  name: string;
  size?: SizeType;
  placeholder?: string;
  rules?: any;
  type?: string;
};

export default function TextField({
  label,
  rules,
  name,
  type,
  size = 'large',
  placeholder,
  ...props
}: TextFieldProps) {
  return (
    <Form.Item label={label} rules={rules} name={name} {...props}>
      <Input  type={type} size={size} placeholder={placeholder} />
    </Form.Item>
  );
}
