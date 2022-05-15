import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);

  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>First Candidate Name</Form.Label>
          <Form.Control
            ref={candidateName1}
            placeholder='Enter the first Candidate'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidate 1 Image URL</Form.Label>
          <Form.Control
            ref={candidateName1URL}
            placeholder='Enter Candidate Picture'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Second Candidate Name</Form.Label>
          <Form.Control
            ref={candidateName2}
            placeholder='Enter the second Candidate'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidate 2 Image URL</Form.Label>
          <Form.Control
            ref={candidateName2URL}
            placeholder='Enter Candidate Picture'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Poll Question</Form.Label>
          <Form.Control ref={promptRef} placeholder='Poll Question'></Form.Control>
        </Form.Group>
      </Form>

      <Button
        style={{justifyContent: "center", display: "flex", alignItems: "center",}}
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant='primary'
      >
        Create
      </Button>
    </Container>
  );
};

export default NewPoll;
