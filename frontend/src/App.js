import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './Componentes/InicioSesion'
import Menu from './Componentes/general/MenuPrincipal'
import MenuTercero from './Componentes/terceros/MenuTercero'
import MenuUsuario from './Componentes/usuarios/MenuUsuario'
import MenuProducto from './Componentes/productos/MenuProducto'
import MenuBodega from './Componentes/bodegas/MenuBodega'
import MenuFactura from './Componentes/facturas/MenuFactura'
import MenuInformes from './Componentes/informes/MenuInformes'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/menu/tercero' element={<MenuTercero />}></Route>
          <Route path='/menu/usuario' element={<MenuUsuario />}></Route>
          <Route path='/menu/producto' element={<MenuProducto />}></Route>
          <Route path='/menu/bodega' element={<MenuBodega />}></Route>
          <Route path='/menu/factura' element={<MenuFactura />}></Route>
          <Route path='/menu/informes' element={<MenuInformes />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
