import { useState, useEffect, useRef } from 'react'
import { IoMdStar, IoMdStarOutline, IoMdStarHalf } from "react-icons/io";

export const CompRates = ({ mainContainer, data })=> {
  const [totalRates, setTotalRates] = useState('')
  const [totalOneStar, setTotalOneStar] = useState(0)
  const [totalTwoStars, setTotalTwoStars] = useState(0)
  const [totalThreeStars, setTotalThreeStars] = useState(0)
  const [totalFourStars, setTotalFourStars] = useState(0)
  const [totalFiveStars, setTotalFiveStars] = useState(0)
  const [rate, setRate] = useState(0)
  
  const rateTableContainer = document.querySelector('.rateTableContainer')
  const ratingStars = document.querySelectorAll('.rateStar')  
  const rateBars = document.querySelectorAll('.rateBar')
  const ratePercentBars = document.querySelectorAll('.ratePercentBarProgress')
  
  useEffect(()=>{
	getRates()
	if(mainContainer){
	  mainContainer.addEventListener('scroll', ()=>{
		if(rateTableContainer.getBoundingClientRect().top <= 160){
		  rateTableContainer.style.transform = 'scale(0.7)'
		} else {
		  rateTableContainer.style.transform = 'scale(1)'		
		}
	  })
	}
  },[mainContainer, data])
  
  const getRates = ()=> {
	if(data){
	  let sum = 0
	  for(let i = 0; i < data.length; i++){
		sum += data[i].rate
	  }
	  if(data.length !== 0)setRate((sum / data.length).toFixed(1))

	  setTotalRates(data.length)
	  rateBars.forEach(rb => {
		const rateId = rb.id[0].toUpperCase() + rb.id.substring(1)
		const setRateBars = `set${rateId}(data.filter(e => e.rate === ${rb.firstChild.innerText}).length)`
		eval(setRateBars)
	  })

	}
  }
  
  useEffect(()=>{
	ratePercentBars.forEach(bar => {
	  if(totalRates){
		const rate = eval(bar.parentElement.parentElement.id)
		const width = Math.ceil(rate / totalRates * 100)
		bar.style.width = `${width}%`
	  }
	})
  },[ratePercentBars])
  
return (
  <>
  <div className="rateTableContainer">
	<div className="rateGeneral">
	  <p className="rate">{rate && rate !== 'NaN' ? rate : 0}</p>
	  <div className="rateStarsGeneral">
		<span className="rateStar">{rate && rate >= 1 ? <IoMdStar /> : <IoMdStarOutline />}</span>
		<span className="rateStar">{rate && rate > 1 && rate < 2 ? <IoMdStarHalf /> : rate >= 2 ? <IoMdStar /> : <IoMdStarOutline />}</span>
		<span className="rateStar">{rate && rate > 2 && rate < 3 ? <IoMdStarHalf /> : rate >= 3 ? <IoMdStar /> : <IoMdStarOutline />}</span>
		<span className="rateStar">{rate && rate > 3 && rate < 4 ? <IoMdStarHalf /> : rate >= 4 ? <IoMdStar /> : <IoMdStarOutline />}</span>
		<span className="rateStar">{rate && rate > 4 && rate < 5 ? <IoMdStarHalf /> : rate >= 5 ? <IoMdStar /> : <IoMdStarOutline />}</span>
	  </div>
	</div>
	<div className="rateStats">
	  <p className="rateTotal"><b>Total reviews: </b>{totalRates}</p>
	  <div className="rateBar" id="totalFiveStars">
		<span>5</span>
		<IoMdStar className="rateStar"/>
		<div className="ratePercentBar">
		  <div className="ratePercentBarProgress"/>
		</div>
	  </div>
	  <div className="rateBar" id="totalFourStars">
		<span>4</span>
		<IoMdStar className="rateStar"/>
		<div className="ratePercentBar">
		  <div className="ratePercentBarProgress"/>
		</div>
	  </div>
	  <div className="rateBar" id="totalThreeStars">
		<span>3</span>
		<IoMdStar className="rateStar"/>
		<div className="ratePercentBar">
		  <div className="ratePercentBarProgress"/>
		</div>
	  </div>
	  <div className="rateBar" id="totalTwoStars">
		<span>2</span>
		<IoMdStar className="rateStar"/>
		<div className="ratePercentBar">
		  <div className="ratePercentBarProgress"/>
		</div>
	  </div>
	  <div className="rateBar" id="totalOneStar">
		<span>1</span>
		<IoMdStar className="rateStar"/>
		<div className="ratePercentBar">
		  <div className="ratePercentBarProgress"/>
		</div>
	  </div>
	</div>
  </div>
  </>
  )
}
