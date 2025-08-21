import { useState, useCallback, useMemo } from 'react'
// Main hook
export const useLoader = ()=> {
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
      { id, type, title, message, duration }
    ])

    // Auto-delete after 'duration'
    setTimeout(()=> {
      removeNotification(id)
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