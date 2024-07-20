import { Col, Container,Row } from "react-bootstrap"
import heropic from "../assets/heropic.png"
import "../styling/Hero.css"
 function Hero(){
 
    return (
        <section className="banner" id= "home">
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1 className="nametext">Hi, I'm Akash</h1>
                        <p className="designation">Web Developer</p>
                        </Col>
                    <Col ><img className="profilepic" src={heropic}></img></Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero;