/* eslint-disable react-hooks/exhaustive-deps */
import photo from "../media/images/user.webp"

export const CompOurTeam = () => {

  return (
    <>
	  <section className="s_our_team box" id="s_our_team">
		  <nav id="s_m_our_team"></nav>
		  <h2 className="team_title" id="team_title">Our Team</h2>
		  <div className="team_box " id="team_box">
			<div className="team_card">
			  <div className="team_card_img">
				<img src={photo} alt="Walfrido Winta Pérez" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Walfrido Winta P.</h3>
				<span>CEO & Co-Founder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={photo} alt="Yoandra Rodríguez Reyes" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Yoandra Rodríguez R.</h3>
				<span>Marketing & Co-Founder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={photo} alt="Yoander Góngora Rodríguez" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Yoander Góngora R.</h3>
				<span>Team Manager</span>
			  </div>
			</div>

		  </div>
		</section>
    </>
  )
}
