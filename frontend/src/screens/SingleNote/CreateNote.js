import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from 'react-redux';
import { createNoteAction } from '../../actions/noteActions';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';


const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const noteCreate = useSelector(state => state.noteCreate);
    const { loading, error } = noteCreate;


    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createNoteAction(title, content, category));
        if (!title || !content || !category) return;


        resetHandler();
        navigate("/mynotes")
    }

    return (
        <MainScreen title="Create a Note">
            <Card>
                <Card.Header>Create a New Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="category"
                                value={category}
                                placeholder="Enter the category"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary">
                            Create Note
                        </Button>
                        <Button className='mx-2' variant='danger' onClick={resetHandler}>Reset</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default CreateNote