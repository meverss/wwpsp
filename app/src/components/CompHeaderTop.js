const logo = "/media/images/logo.webp"
const top_background = "/media/images/top_background.png"

export const CompHeaderTop = () => {
  return (
    <>
	  <section className="header_top" id="header_top"
		style={{
		  backgroundImage: `url(${top_background})`,
		  backgroundSize: 'cover',
  		  backgroundRepeat: 'no-repeat',
  		  backgroundPosition: 'left',
  		  backdropFilter: 'grayscale(100%)',
  		  objectFit: 'contain'
		}}>
		<div className="header_box" id="header_box">
		  <div className="logo" id="logo">
			<img id="h_logo" src={logo} alt="WWP Screening & Painting LLC" />
		  </div>
		  <div className="header_text_box" id="header_text_box">
			  <h1 className="header_title" id="h_title">
				WWP SCREENING & PAINTING LLC
			  </h1>
			  <p className="header_slogan" id="h_slogan">
				Bringing you quality, safety and comfort
			  </p>
		  </div>
		  </div>
		</section>
    </>
  )
}
