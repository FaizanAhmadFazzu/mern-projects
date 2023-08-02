import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage';
import MainScreen from '../../components/MainScreen';
import "./RegisterScreen.css";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister

    const postDetails = (pics) => {
        if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
            return setPicMessage("Please select an image");
        }
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "dibvqortn");
            fetch("https://api.cloudinary.com/v1_1/dibvqortn/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    setPic(data.url.toString())
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setPicMessage("Please select an Image");
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            dispatch(register(name, email, password, pic))
        }
    }

    useEffect(() => {
        if (userInfo)
            navigate("/");
    }, [userInfo, navigate])


    return (
        <MainScreen title="REGISTER">
            <div className='loginContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder='Enter name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    {picMessage && (
                        <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
                    )}
                    <Form.Group controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            id="custom-file"
                            type="file"
                            label='Upload Profile Picture'
                            onChange={(e) => postDetails(e.target.files[0])}
                            custom
                        />
                    </Form.Group>
                    <Button variant='primary' type="submit">Register</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an account ? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen