import React from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import "./LandingStyles.css";

const LandingPage = () => {
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Note Zipper</h1>
                            <p className='subtitle'>One safe place for all your notes.</p>
                        </div>
                        <div className='buttonContainer'>
                            <a href="#">
                                <Button size="lg" className='landingbutton'>
                                    Login
                                </Button>
                            </a>
                            <a href="#">
                                <Button
                                    variant='outline-primary'
                                    size="lg"
                                    className='landingbutton'
                                >
                                    Signup
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage