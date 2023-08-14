import { useEffect, useState } from "react";
import "./App.css";
import ButtonCustom from "./components/form/ButtonCustom";
import Textarea from "./components/form/TextareaCustom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ProgressBar from "./components/form/ProgressBar";
import { Constants } from "./constants/Constants";
import CardCustom from "./components/CardCustom";

function App() {
  const [posts, setPosts] = useState([]);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleTextareaChange = (newValue: string) => {
    setTextareaValue(newValue);
  };

  const save = async () => {
    setSaving(true);
    const data = {
      id: uuidv4(),
      datetime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss A"),
      body: textareaValue,
    };

    await fetch(Constants.API + "/items", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setTextareaValue("");
    fetchPosts();
  };

  const fetchPosts = () => {
    fetch(Constants.API + "/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => await response.json())
      .then((data) => {
        const sortedPosts = data.sort((a: any, b: any) =>
          moment(a.datetime, "DD-MM-YYYY HH:mm:ss A").isBefore(
            moment(b.datetime, "DD-MM-YYYY HH:mm:ss A")
          )
            ? 1
            : -1
        );
        setPosts(sortedPosts);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <center>
        <h1>Como te ha ido?</h1>
      </center>
      <Textarea
        value={textareaValue}
        onChange={handleTextareaChange}
      ></Textarea>
      <br />
      <center>
        <ButtonCustom handleOnClick={save}></ButtonCustom>
      </center>
      {saving && <ProgressBar></ProgressBar>}
      <br />

      {posts.map((card: any, index) => (
        <CardCustom
          key={index}
          datetime={card.datetime}
          body={card.body}
        ></CardCustom>
      ))}
    </div>
  );
}

export default App;
