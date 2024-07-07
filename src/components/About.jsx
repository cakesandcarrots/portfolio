import pic from "../assets/heropic_nobg.png"
import "../styling/About.css"
function About(){
    return (
        <>
        <div className="about">
            <div class = "content">
                <img src={pic} alt="" />
                <div className="text">
                <h1>About Me</h1>
                <p>I'm a web developer with a competent proficiency in creating websites. With a typing speed of over 100 words per minute, I excel in efficiency and productivity. Beyond my technical abilities, I have a deep interest in philosophy, which allows me to explore and contemplate complex ideas and theories. I also enjoy beatboxing, using my voice to produce rhythmic sounds and beats, and gaming, where I immerse myself in various virtual worlds for both challenge and entertainment. These diverse interests not only provide a balance between my professional and personal life but also contribute to my creative and analytical thinking.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export {About}