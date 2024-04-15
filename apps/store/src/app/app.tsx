import { Route, Routes } from 'react-router-dom';

// Importing the component from the library.
import { ProductList } from '@nxdev-react-monorepo/products';
import { OrderList } from '@nxdev-react-monorepo/orders';

function Home() {
  return <h1>Home</h1>;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<ProductList />}></Route>
      <Route path="/orders" element={<OrderList />}></Route>
    </Routes>
  );
}

export default App;
