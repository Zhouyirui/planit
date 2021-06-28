import React, { useState } from "react";
import { database } from "../../config/firebase";
import Box from "../Box";
import Form from "react-bootstrap/Form";

function PostThread(props) {
  const { newThreadUser, setPostNewThread } = props;
  const [newThreadText, setNewThreadText] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");

  async function handleAddThread(event) {
    event.preventDefault();
    const date = new Date();
    addThread(newThreadText, newThreadUser, newThreadTitle, date);
    setPostNewThread(false);
  }

  async function addThread(newThreadText, newThreadUser, newThreadTitle, time) {
    await database.board
      .add({
        title: newThreadTitle,
        content: newThreadText,
        user: newThreadUser,
        createdAt: time.toLocaleString(),
      })
      .then((docRef) => docRef.update({ id: docRef.id }));
  }

  return (
    <Box>
      <form onSubmit={handleAddThread}>
        <h3>Create New Thread</h3>
        <Form.Group>
          <Form.Control
            type="text"
            value={newThreadTitle}
            placeholder="Title"
            onChange={(event) => setNewThreadTitle(event.target.value)}
            required //Input cannot be empty
            pattern=".*\S.*" //Input must have at least one character that is not a space
          />
          <br />
          <Form.Control
            as="textarea"
            rows={4}
            value={newThreadText}
            placeholder="Text (optional)"
            onChange={(event) => setNewThreadText(event.target.value)}
          />
        </Form.Group>
        <input type="submit" value="Post" />
      </form>
    </Box>
  );
}

export default PostThread;
