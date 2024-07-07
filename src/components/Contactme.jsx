import "../styling/Contactme.css"

function Contactme(){
    return (
        <>
        <div className="contact">
            <form>
                <h2>Let's get in touch</h2>
                <div className="input-box">
                    <label>Name</label>
                    <input type="text" className="field" placeholder="Enter your Name" required/>
                </div>
                <div className="input-box">
                    <label >Email Address</label>
                    <input type="email" className="field" placeholder="Enter your email" required/>
                </div>
                <div className="input-box">
                    <label >Your Message</label>
                    <textarea name="" className="field mess" id="" cols="30" rows="10" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
        </>
    )
}


export {Contactme};