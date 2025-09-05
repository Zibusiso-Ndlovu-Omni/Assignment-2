import Display from "./pages/Display"
import Page from "./pages/Page"
import NotFound from "./pages/errors/NotFound"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/page" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
