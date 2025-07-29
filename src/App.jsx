import { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Outlet,
  useParams,
  useMatch,
} from "react-router-dom";
import styles from "./App.module.css";
import { useEffect } from "react";

const db = {
  products: [
    {
      id: 1,
      name: "4K Smart TV Samsung 55",
      price: 749,
      amount: 6,
    },
    {
      id: 2,
      name: "iPhone 16 Pro Max 1024GB",
      price: 999,
      amount: 9,
    },
    {
      id: 3,
      name: "Dyson Supersonic Hair Dryer",
      price: 429,
      amount: 3,
    },
  ],
};

const fetchProductsList = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.products);
    }, 2500);
  });

const fetchProductById = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.products.find((product) => product.id === Number(id)));
    }, 500);
  });

const MainPage = () => <div className="main-page">Main page</div>;
const CatalogPage = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchProductsList().then((responce) => setList(responce));
  }, []);
  return (
    <div className="catalog-page">
      <h3>Catalog</h3>
      <ul>
        {list.map(({ id, name }) => (
          <li key={id}>
            <NavLink to={`product/${id}`}>{name}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
const ContactsPage = () => <div className="contacts-page">Contacts page</div>;

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const match = useMatch("/catalog/:type/:id");
  console.log("match ", match.params.type);
  const type = match?.params?.type ?? "";

  useEffect(() => {
    fetchProductById(params.id).then((responce) => {
      console.log("responce: ", responce);
      setProduct(responce);
    });
  }, [params]);

  if (!product) {
    return <ProductNotFoundPage type={type} />;
  }
  const { name, price, amount } = product;
  return (
    <div className="product-page">
      <h3>Product</h3>
      <p>Name: {name}</p>
      <p>Price: {price}</p>
      <p>Amount: {amount}</p>
    </div>
  );
};
const ProductNotFoundPage = ({ type }) => (
  <div className="product-not-found-page">
    <h3>{type === "service" ? "Service" : "Product"} Not Found</h3>
    <p>
      The {type === "service" ? "service" : "product"} you are looking for does
      not exist or is unavailable.
    </p>
  </div>
);
const NotFoundPage = () => <div>404 - Page not found</div>;

const ExtendedLink = ({ to, children }) => (
  <NavLink to={to}>
    {({ isActive }) => children + (isActive ? "*" : "")}
  </NavLink>
);

function App() {
  return (
    <div className={styles.App}>
      <div>
        <h3>Menu</h3>
        <ul>
          <li>
            <ExtendedLink to="/" children="Main" />
          </li>
          <li>
            <ExtendedLink to="/catalog" children="Catalog" />
          </li>
          <li>
            <ExtendedLink to="/contacts" children="Contacts" />
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />}>
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="service/:id" element={<ProductPage />} />
        </Route>
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
