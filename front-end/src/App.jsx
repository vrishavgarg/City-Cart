import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Home from "./pages/home/Home";
import Registration from "./pages/Registration/Registration";
import BusinessList from "./pages/BusinessList/BusinessList";
import ProductList from "./pages/ProductList/ProductList";
import LoginPage from "./pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
import AddProduct from "./pages/AddProduct/AddProduct";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/:CityId" element={<Home />} />
            <Route path="/:CityId/:CategoryId" element={<BusinessList />} />
            <Route path="/products/:BusinessName" element={<ProductList />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
