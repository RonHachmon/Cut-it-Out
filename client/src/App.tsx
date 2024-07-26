import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'
import DropFileInput from './components/DropFileInput/DropFileInput'
import Footer from './components/Footer/Footer'
import Title from './components/Title/Title';
function App() {
  const [count, setCount] = useState("loading")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setCount(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <Title/>
      <div className="card">
        <DropFileInput></DropFileInput>
      </div>
      <Footer/>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
