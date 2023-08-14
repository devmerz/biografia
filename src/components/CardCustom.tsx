import { Card } from "antd";

interface CardCustomProps {
  datetime: string;
  body: string;
}

export default function CardCustom({ datetime, body }: CardCustomProps) {
  const theObj = { __html: body };
  return (
    <Card title={datetime} bordered={true} style={{ margin: "10px" }}>
      <div dangerouslySetInnerHTML={theObj} />
    </Card>
  );
}
