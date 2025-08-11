import { useEffect } from 'react'
import { useNotify } from '../hooks/useNotify.js'

// App Component
const CompNotification = ({ icon, text }) => {
  const notiPopup = useNotify()
  
  useEffect(()=>{
	notiPopup.showNotification(icon, text)
  },[])
  
  return (
      <>
    	{/* Notification */}
      	  <div className="ntf_box" id="ntf_box" ref={notiPopup.ntf_box} >
        	<div className="ntf_msg" id="ntf_msg" ref={notiPopup.ntf_msg} >
        	  <div className="ntf_icon" ref={notiPopup.ntf_icon}>
				{notiPopup.notifyIcon}
        	  </div>
        	  <div className="ntf_text" ref={notiPopup.ntf_text} id="ntf_text">
				{notiPopup.notifyText}
        	  </div>
            </div>
          </div>
        <br />
      </>
  )
}

export default CompNotification
