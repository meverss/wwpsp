import logo from "../media/images/logo.webp"

export const CompHeaderTop = () => {
  return (
    <>
	  <section className="header_top" id="header_top">

		<div className="header_box" id="header_box">
		  <div className="logo" id="logo">
			<img id="h_logo" src={logo} alt="WWP Screening & Painting LLC" />
		  </div>
		  <div className="header_text_box" id="header_text_box">
			<div className="header_title" id="header_title">
			  <h1 className="h_title" id="h_title">
				WWP SCREENING & PAINTING LLC
			  </h1>
			</div>
			<div className="header_slogan" id="header_slogan">
			  <p className="h_slogan" id="h_slogan">
				Bringing you quality, safety and comfort
			  </p>
			</div>
		  </div>
		  </div>
		</section>
    </>
  )
}
