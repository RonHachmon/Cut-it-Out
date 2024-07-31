import './App.css'
import DropFileInput from './components/DropFileInput/DropFileInput'
import Footer from './components/Footer/Footer'
import Title from './components/Title/Title';
const App = () => {

  return (
    <>
      <Title/>
      <div className="card">
        <DropFileInput></DropFileInput>
      </div>
      <Footer/>
    </>
  )
}

export default App
