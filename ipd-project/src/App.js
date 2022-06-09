import Header from "./Components/Header";
import ProductCard from "./Components/ProductCard";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <ProductCard />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
