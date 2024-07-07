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
                        <h1>Hi, I'm Akash</h1>
                        <p>Web Developer</p>
                        </Col>
                    <Col ><img src={heropic}></img></Col>
                </Row>
            </Container>
        </section>
    )
}

export {Hero } ;