import ButtonCustom from "./form/ButtonCustom";
import Textarea from "./form/TextareaCustom";
import ProgressBar from "./form/ProgressBar";
import CardCustom from "./CardCustom";
import { useEffect, useState } from "react";
import moment from "moment";
import { Constants } from "../constants/Constants";
import { ProfileInterface } from "../interfaces/types";
import { v4 as uuidv4 } from "uuid";

interface PrincipalInterface {
  profile: ProfileInterface;
}

export default function Principal({ profile }: PrincipalInterface) {
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [posts, setPosts] = useState([]);

  const handleTextareaChange = (newValue: string) => {
    setTextareaValue(newValue);
  };

  const save = async () => {
    setSaving(true);
    const data = {
      id: uuidv4(),
      user: profile.id,
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch(`${Constants.API}/items/${profile.id}`, {
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

  return (
    <>
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
    </>
  );
}
