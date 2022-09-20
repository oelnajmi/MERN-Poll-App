import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { PollsContextProvider} from './context/PollContext.js'

// pages
import Home from './pages/Home'

// components
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <PollsContextProvider>
          <div className="pages">
            <div className="button-section">
            </div>
            <Routes>
              <Route path="/" element={<Home/>}/>
            </Routes>
          </div>
        </PollsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
