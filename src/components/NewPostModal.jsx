import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");

  const handleSave = () => {
    //Get stored JWT Token
    const token = localStorage.getItem("authToken");
    // const token = '3lk21jj213lkj123lkjlkj21.2l1k3jl1k2j3kl12j3.1k2l3j1l2k3

    //Decode the token to fetch user id
    const decode = jwtDecode(token);
    // const decodedToken = {id: 6, username: 'haris@haris.com'}
    const userId = decode.id // May change depending on how the server encode the token
    // const userId = 6

    //Prepare data to be sent
    const data = {
      title: "Post Title",  //Add functionality to set this properly
      // content: 'backend and front end is amazing', 
      // user_id: 6,
      content: postContent,
      user_id: userId,
    };

    //Make your API call here
    axios
      .post("https://4ddaf311-075a-43b6-a973-68c4f9683cf7-00-udyo542f7ipz.pike.repl.co/posts", data)
      .then((response) => {
        console.log("Success:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control
                placeholder="What is happening?!"
                as="textarea"
                rows={3}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
          >
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

