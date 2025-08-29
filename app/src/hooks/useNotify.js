import { useState, useCallback, useMemo } from 'react'
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6"
import { IoInformationCircle } from "react-icons/io5"
import { PiGearFill } from "react-icons/pi"

// Single notification component
const NotificationItem = ({ id, type, title, message, duration, onClose })=> {
  let icon
  switch (type) {
    case "ok":
      icon = <FaCircleCheck className="ntf_icon" style={{ fontSize:'32px', color: 'green' }} />
      break
    case "err":
      icon = <FaTriangleExclamation className="ntf_icon" style={{ fontSize:'32px',color: 'red' }} />
      break
    case "inf":
      icon = <IoInformationCircle className="ntf_icon" style={{ fontSize:'40px',color: 'yellow' }} />
      break
    case "sys":
      icon =  <PiGearFill className="ntf_icon" style={{ fontSize:'32px',color: 'chocolate' }} />
      break
    default:
      icon = <IoInformationCircle className="ntf_icon" style={{ fontSize:'40px',color: 'yellow' }} />
  }

  return (
	<>
    <div className="ntf_box animate-show" id={id} onClicks={onClose}>
      <div className="ntf_msg">
        <div className="ntf_text">
          <h3>{icon}{title}<span onClick={onClose}>x</span></h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
    </>
  )
}

// Main hook
export const useNotify = ()=> {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id)=> {
  	setNotifications(prev => prev.filter(noti => noti.id !== id))	
  }, [])

  const showNotification = useCallback((type, message, options = {})=> {
    const id = Date.now()
    const title = options.title || 'Notification'
    const duration = options.duration || 5000
    
    setNotifications(prev => [
      ...prev, 
      { 
        id, 
        type, 
        title, 
        message,
        duration
      }
    ])

    // Auto-delete after 'duration'
    setTimeout(()=> {
      //removeNotification(id)
    }, duration)
  }, [removeNotification])
  
  
  // Container for ALL notifications
  const NotificationsContainer = useMemo(()=> {
    return ()=> (
      <section className="s_notifications" id="s_notifications" onLoad={()=> alert('fgggg')}>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={()=> removeNotification(notification.id)}
          />
        ))}
      </section>
    )
  }, [notifications, removeNotification])

  return { showNotification, NotificationsContainer }
}