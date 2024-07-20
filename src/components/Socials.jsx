import "../styling/Socials.css";
import pic from "../assets/heropic.png";

export default function Socials() {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="social_container">
        <img className="profilepicsocial" src={pic} alt="Profile Picture" />
        <h1 className="socialusername">
          Akash Naik <span className="socialusernamespan">Goa, India</span>
        </h1>
        <p className="socialdesc">Development and Competitive Coding</p>

        <ul className="socialsitems">
          <li>
            <button className="socialbuttons"
              onClick={() => openLink("https://github.com/cakesandcarrots")}
            >
              Github
            </button>
          </li>
          <li>
            <button className="socialbuttons"
              onClick={() =>
                openLink(
                  "https://www.linkedin.com/in/akash-naik-8a0733286/?originalSubdomain=in"
                )
              }
            >
              LinkedIn
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
