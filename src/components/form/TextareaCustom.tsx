import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextareaCustom({ value, onChange }: TextareaProps) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
