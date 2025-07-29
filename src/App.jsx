import { Routes, Route, Link, Outlet } from "react-router-dom";
import styles from "./App.module.css";

const fetchProductsList = [
  {
    id: 1,
    name: "4K Smart TV Samsung 55",
    price: 749,
  },
  {
    id: 2,
    name: "iPhone 16 Pro Max 1024GB",
    price: 999,
  },
  {
    id: 3,
    name: "Dyson Supersonic Hair Dryer",
    price: 429,
  },
];
const MainPage = () => <div className="main-page">Main page</div>;
const CatalogPage = () => (
  <div className="catalog-page">
    <h3>Catalog</h3>
    <ul>
      {fetchProductsList.map(({ id, name }) => (
        <li key={id}>
          <Link to="product">{name}</Link>
        </li>
      ))}
    </ul>
    <Outlet />
  </div>
);
const ContactsPage = () => <div className="contacts-page">Contacts page</div>;
const ProductPage = () => <div className="product-page">Product page</div>;

function App() {
  return (
    <div className={styles.App}>
      <div>
        <h3>Menu</h3>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />}>
          <Route path="product" element={<ProductPage />} />
        </Route>
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
