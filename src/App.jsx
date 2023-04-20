import axios from 'axios';
import { useRef, useState } from 'react';
import { youtube_parser } from './utils';

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,

        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = ''; 
  }

  return (
    <div className="app">
      <span className="logo">youtube &gt; mp3</span>
      <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Transform YouTube videos into MP3s in just a few clicks!
        </p>

        <form 
          className="form"
          onSubmit={handleSubmit}
        >
          <input 
            ref={inputUrlRef}
            placeholder="Paste a YouTube video URL link..."  
            className="form_input" 
            type="text" 
          />
          <button type="submit" className="form_button">Search</button>
        </form>

        {urlResult ? <a target='_blank' rel='noreferrer' href={urlResult} className="download_btn">Download MP3</a> : '' }
        
      </section>
    </div>
  )
}

export default App

// 28:28
// d113bf2857mshf1bf82bbecd02d8p1e9d1djsn2f5b44680886
// c58a95058fmshc32d7b988dfc852p128ae4jsnca9a5f66e85b

