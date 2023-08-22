import React, { useEffect } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const MyNotes = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const noteList = useSelector(state => state.noteList);
    const { loading, notes, error } = noteList;
    const noteCreate = useSelector(state => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteDelete = useSelector(state => state.noteDelete);
    const noteUpdate = useSelector(state => state.noteUpdate);
    const { success: successUpdate  } = noteUpdate;
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = noteDelete;


    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
            navigate("/");
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successCreate,
        successDelete,
        successUpdate
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?"))
            dispatch(deleteNoteAction(id));
    }

    return (
        <MainScreen title="Welcome back Faizan Ahmad Khan">
            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            <Accordion defaultActiveKey={0} flush>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
                {loading && <Loading />}
                {loadingDelete && <Loading />}
                {notes && notes.length > 0 && notes.map(note => (
                    <Accordion.Item eventKey={note.id}>
                        <Card style={{ margin: 10 }} key={note.id}>
                            <Card.Header style={{ display: "flex" }}>
                                <span
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18
                                    }}
                                >
                                    <Accordion.Header>
                                        {note.title}
                                    </Accordion.Header>
                                </span>
                                <div>
                                    <Link to={`/note/${note._id}`}>
                                        <Button>Edit</Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => deleteHandler(note._id)}

                                    >Delete</Button>
                                </div>
                            </Card.Header>
                            <Accordion.Body eventKey='0'>
                                <Card.Body>
                                    <h4>
                                        <Badge variant="success">
                                            Category - {note.category}
                                        </Badge>
                                    </h4>
                                    <blockquote className="blockquote mb-0">
                                        {note.content}
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Body>
                        </Card>
                    </Accordion.Item>
                ))}
            </Accordion>
        </MainScreen>
    )
}

export default MyNotes