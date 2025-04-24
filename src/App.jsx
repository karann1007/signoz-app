import './App.css'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className='flex flex-col p-10 w-full'>
      <h1>
        <div className='font-bold flex justify-center'> MY WIDGETS</div>
      </h1>
      <Dashboard />
    </div>
  )
}

export default App;
