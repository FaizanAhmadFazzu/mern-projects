import React, { useEffect, useState } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import axios from "axios";

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const fetchNotes = async () => {
        const { data } = await axios("/api/notes")
        setNotes(data);
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <MainScreen title="Welcome back Faizan Ahmad Khan">
            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            <Accordion defaultActiveKey={0} flush>
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
                                    <Button>Edit</Button>
                                    <Button
                                        variant="danger"
                                        className="mx-2"

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