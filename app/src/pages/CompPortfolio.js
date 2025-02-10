/* eslint-disable react-hooks/exhaustive-deps */
import { CompMenu } from '../components/CompMenu.js'

const CompPortfolio = ({ ss, path })=> {
  
  return (
    <>
  	  <CompMenu ss={ss} path={path} />
  	  <div className="main">
		<h3> Here goes the Portfolio </h3>
	  </div>
    </>
  )
}

export default CompPortfolio


  