/* eslint-disable react-hooks/exhaustive-deps */
import { CompMenu } from '../components/CompMenu.js'

const CompPortfolio = ({ navs, ss })=> {
  
  return (
    <>
  	  <CompMenu navs={navs} ss={ss}/>
  	  <div className="main">
		<h3> Here goes the Portfolio </h3>
	  </div>
    </>
  )
}

export default CompPortfolio


  