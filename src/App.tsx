import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// import { CartProvider } from './context/CartContext';

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
