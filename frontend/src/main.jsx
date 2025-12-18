import ReactDOM from "react-dom/client";


// ReactDOM.createRoot(document.getElementById("root")).render(<App />);


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import './styles/variables.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
