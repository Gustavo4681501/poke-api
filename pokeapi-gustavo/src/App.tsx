
import './App.css';
import NotFound from './pages/Notfound/NotFound';
import PaginaDeDetalles from './pages/PaginaDeDetalles/PaginaDeDetalles';
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {

  const router = createBrowserRouter([


    {
      path: "/",
      element: <PaginaPrincipal></PaginaPrincipal>
    },
    {
      path:"*",
      element:<NotFound/>
    },
    {
      path:"/pokemon/:id",
      element:<PaginaDeDetalles></PaginaDeDetalles>
    }

  ]);


  return (
    <div id='globlaContainer container  '>
      <RouterProvider router={router}></RouterProvider>
    </div> 
  );
}

export default App;
