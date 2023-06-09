import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/Routes';

function App() {
  return (
    <div className='bg-black'>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
