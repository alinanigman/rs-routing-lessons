import { Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";

const MainPage = () => <div className="main-page">Main page</div>;
const CatalogPage = () => <div className="catalog-page">Catalog page</div>;
const ContactsPage = () => <div className="contacts-page">Contacts page</div>;

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
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
