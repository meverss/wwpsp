/* eslint-disable react-hooks/exhaustive-deps */
import winta from "../media/images/team/winta.jpg"
import yoandra from "../media/images/team/yoandra.jpg"
import yoander from "../media/images/team/yoander.jpg"
import elon from "../media/images/team/elon.jpg"
import joshua from "../media/images/team/joshua.jpg"
import cinthia from "../media/images/team/cinthia.jpg"
import igor from "../media/images/team/igor.jpg"
import tasha from "../media/images/team/tasha.jpg"
import stephen from "../media/images/team/stephen.jpg"

export const CompOurTeam = () => {

  return (
    <>
	  <section className="s_our_team box" id="s_our_team">
		  <nav id="s_m_our_team"></nav>
		  <h2 className="team_title" id="team_title">Our Team</h2>
		  <div className="team_box " id="team_box">
			<div className="team_card">
			  <div className="team_card_img">
				<img src={winta} alt="Walfrido Winta Pérez" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Walfrido Winta P.</h3>
				<span>CEO & Co-Founder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={yoandra} alt="Yoandra Rodríguez Reyes" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Yoandra Rodríguez R.</h3>
				<span>Marketing & Co-Founder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={yoander} alt="Yoander Góngora Rodríguez" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Yoander Góngora R.</h3>
				<span>Manager & Logistics</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={tasha} alt="Tasha Bolton" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Tasha Bolton</h3>
				<span>Secretary</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={joshua} alt="Joshua Washington" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Joshua Wasington</h3>
				<span>Welder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={igor} alt="Igor Jovovich" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Igor Jovovich</h3>
				<span>Welder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={cinthia} alt="Cinthia Smithson" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Cinthia Smithson</h3>
				<span>Painter</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={elon} alt="Elon Roquefuente" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Elon Roquefuente</h3>
				<span>Fence Builder</span>
			  </div>
			</div>
			<div className="team_card">
			  <div className="team_card_img">
				<img src={stephen} alt="Stephen McNamara" />
			  </div>
			  <hr />
			  <div className="team_card_text" id="team_card_text">
				<h3>Sephen McNamara</h3>
				<span>Fence Builder</span>
			  </div>
			</div>
		  </div>
		</section>
    </>
  )
}
