import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import CategoryPage from './components/CategoryPage'; 
import AdminDashboard from './components/AdminDashboard';

 // ✅ important

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/category/:name" element={<CategoryPage />} /> 
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

