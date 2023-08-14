import { Input } from "antd";
const { TextArea } = Input;

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextareaCustom({ value, onChange }: TextareaProps) {
  return (
    <TextArea
      rows={4}
      placeholder="Como te ha ido?"
      maxLength={10000}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
