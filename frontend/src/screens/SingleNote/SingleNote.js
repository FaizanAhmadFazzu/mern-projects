import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../../components/MainScreen';
import { deleteNoteAction, updateNoteAction } from "../../actions/noteActions";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const SingleNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");


    const dispatch = useDispatch();
    const { noteId } = useParams();
    const navigate = useNavigate();

    const noteUpdate = useSelector(state => state.noteUpdate);
    const { loading, error } = noteUpdate

    const noteDelete = useSelector(state => state.noteDelete);

    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${noteId}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }
        fetching();
    }, [noteId, date])


    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(noteId, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");
    }

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?"))
            dispatch(deleteNoteAction(id));
        navigate("/mynotes");
    }

    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading size={50} />}
                        {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
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
                                placeholder="Enter the content"
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
                            Update Note
                        </Button>
                        <Button className='mx-2' variant='danger' onClick={() => deleteHandler(noteId)}>Delete Note</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote