import { Button } from "antd";

interface ButtonProps {
  handleOnClick: () => void;
}

export default function ButtonCustom({ handleOnClick }: ButtonProps) {
  return (
    <Button type="primary" onClick={handleOnClick}>
      Save
    </Button>
  );
}
