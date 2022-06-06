import './App.css'
import Card from './components/Card'
import images from './assets/js/images'

function App() {
  return (
    <div className="App">
      <img src={images[0].img} alt={images[1].title} className="img-weather" />
      <Card />
    </div>
  )
}

export default App
