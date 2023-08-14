import { useState } from "react";
import "./App.css";
import ButtonCustom from "./components/form/ButtonCustom";
import Textarea from "./components/form/TextareaCustom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ProgressBar from "./components/form/ProgressBar";

function App() {
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleTextareaChange = (newValue: string) => {
    setTextareaValue(newValue);
  };

  const save = async () => {
    setSaving(true);
    const data = {
      id: uuidv4(),
      datetime: moment(new Date()).format("DD-MM-YYYY HH:mm A"),
      body: textareaValue,
    };

    await fetch(
      "https://8uap7azxq5.execute-api.us-east-1.amazonaws.com/items",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    setSaving(false);
  };

  return (
    <div className="App">
      <h1>Como te ha ido?</h1>
      <Textarea
        value={textareaValue}
        onChange={handleTextareaChange}
      ></Textarea>
      <ButtonCustom handleOnClick={save}></ButtonCustom>
      {saving && <ProgressBar></ProgressBar>}
    </div>
  );
}

export default App;
