import { Card } from "antd";

interface CardCustomProps {
  datetime: string;
  body: string;
}

export default function CardCustom({ datetime, body }: CardCustomProps) {
  return (
    <Card title={datetime} bordered={true} style={{ margin: "10px" }}>
      {body}
    </Card>
  );
}
