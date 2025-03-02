/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { CompMenu } from '../components/CompMenu.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { serverContext } from '../App.js'
import { formatDate } from '../libs/formatDate.js'
import { FaRegImages } from "react-icons/fa6"
import { GiPhotoCamera, GiFilmSpool } from "react-icons/gi"

const CompPortfolio = ({ ss, mediaServer })=> {
  const server = useContext(serverContext)
  const URI = `${server}/albums/`
  
  const [albums, setAlbums] = useState('')
  const [activeTag, setActiveTag] = useState('images_tag')
  
  const tags = document.querySelectorAll('.media_tag')
  
  useEffect(()=> {
	getAlbums()
  },[])
  
  useEffect(()=> {
	tags.forEach(tag => {
	  tag.addEventListener('click', ()=> {
		setActiveTag(tag.id)
	  })
	})
  },[tags])
  
  const getAlbums = async ()=> {
	const res = await axios.get(URI)
	setAlbums(res.data)
  }

  useEffect(()=> {
	switch(activeTag){
	  case"images_tag":
		  document.querySelector('.images_tag').classList.remove('tag_inactive')
		  document.querySelector('.images_tag').classList.add('tag_active')
		  document.querySelector('.images_tag').firstChild.style.color = '#eee'
		  document.querySelector('.images_box').style.display = 'flex'
		  document.querySelector('.videos_tag').classList.add('tag_inactive')
		  document.querySelector('.videos_tag').classList.remove('tag_active')
		  document.querySelector('.videos_tag').firstChild.style.color = '#555'
		  document.querySelector('.videos_box').style.display = 'none'
		break
	  case"videos_tag":
		  document.querySelector('.videos_tag').classList.remove('tag_inactive')
		  document.querySelector('.videos_tag').classList.add('tag_active')
		  document.querySelector('.videos_tag').firstChild.style.color = '#eee'
		  document.querySelector('.videos_box').style.display = 'flex'
		  document.querySelector('.images_tag').classList.add('tag_inactive')
		  document.querySelector('.images_tag').classList.remove('tag_active')
		  document.querySelector('.images_tag').firstChild.style.color = '#555'
		  document.querySelector('.images_box').style.display = 'none'
		break
	}
  },[tags, activeTag])

  return (
    <>
  	  <CompMenu ss={ss} />
  	  <div className="main">
		<section className="s_portfolio" id="s_portfolio">
		  <h2>Gallery</h2><br />
		  <div className="video_popup" id="video_popup">
			<span id="close_video">&times;</span>
			<video id="video_popup_player" autoplay controls></video>
		  </div>
		  <div className="portfolio_box" id="portfolio_box">
			<div className="media_tags" id="media_tags">
			  <div className="images_tag media_tag" id="images_tag">
				<h3 id="imagesLabel"><GiPhotoCamera className="tagIcon" />&nbsp;Images</h3>
			  </div>
			  <div className="videos_tag media_tag" id="videos_tag">
				<h3 id="videosLabel"><GiFilmSpool className="tagIcon" />&nbsp;Videos</h3>
			  </div>
			</div>
			<div className="images_box " id="images_box">
			  {
				albums && albums.map((album)=> (
				  <>
					<div className="images_album" key={album.id}>
					  <div className="img_thumbnaill album_thumbnail">
						{album.medias.map(image => (
						  <img src={`${mediaServer}/media/images/portfolio/1/${image.name}`} />
						  )
						)}
					  </div>
					  <p className="album_label"><b style={{color: '#37a1c6'}}>Album:</b> {album.name}</p>
					  <p className="album_label"><b style={{color: '#37a1c6'}}>Images:</b> {album.medias.length}</p>
					</div>
				  </>
				  )
				)
			  }
			  {/* <div className="images" id="images"><p>Images</p></div> */}
			</div>
			<div className="videos_box" id="videos_box">
			  {/* <div className="videos" id="videos"><p>Videos</p></div> */}
			</div>
		  </div>
		</section>
	  </div>
    </>
  )
}

export default CompPortfolio


  