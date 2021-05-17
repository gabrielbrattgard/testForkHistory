import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddInvoice from "./components/invoices/AddInvoice";
import NavBar from "./components/header/NavBar";
import ProductPage from "./components/products/ProductPage";
import HomePage from "./components/home/HomePage";
import InvoiceService from "./services/InvoiceService";
import InvoiceList from "./components/invoices/InvoiceList";
import ProductService from "./services/ProductService";
import "./styles/index.css";
import Header from "./components/header/Header";
import FacebookLogin from "react-facebook-login";
import FacebookService from "./services/FacebookService";

const App = () => {
  const owner = "appa@gmail.se";
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    InvoiceService.getInvoice("appa@gmail.se").then((res) => {
      setInvoices(res.data);
    });
    ProductService.getProducts("appa@gmail.se").then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Add a product
  const addProduct = async (product) => {
    await ProductService.createProduct(product).then((res) => console.log(res));
  };

  // Delete a product
  const deleteProduct = async (productName) => {
    await ProductService.deleteProduct(owner, productName).then((res) => {
      res.status === 204
        ? setProducts(
            products.filter((product) => product.name !== productName)
          )
        : alert("Error Deleting This Product");
    });
  };

  const responseFacebook = (response) => {
    /*console.log(response);
    localStorage.setItem("ACCESS_TOKEN", response.accessToken);*/

    console.log("BACKATITAGAIN: " + JSON.stringify(FacebookService.getFeed()));
    /*window.FB.api("/me/feed", function (response) {
      if (response && !response.error) {
        /* handle the result */
    /* console.log("FEED:");
        console.log(JSON.stringify(response));
        response.data.forEach((element) => {
          window.FB.api(
            `/${element.id}/reactions?summary=total_count`,
            "GET",
            function (response) {
              if (response && !response.error) {
                /* handle the result */
    //       console.log("WOOHOO BABY THATS WHAT IM TALKING ABOUT");
    //      console.log(JSON.stringify(response));
    /*      }
            }
          );
        });
      }
    });*/
  };

  return (
    <Router>
      <div className="background">
        <NavBar />
        <Header />
        <FacebookLogin
          appId="470469467364255"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          version="10.0"
        />
        <Route path="/" exact render={(props) => <HomePage props={props} />} />
        <Route
          path="/all-invoices"
          render={(props) => (
            <>
              <InvoiceList props={props} invoiceList={invoices} />
            </>
          )}
        />
        <Route
          path="/products"
          exact
          render={() => (
            <ProductPage
              owner={owner}
              products={products}
              onAdd={addProduct}
              onDelete={deleteProduct}
            />
          )}
        />
        <Route
          path="/newinvoice"
          exact
          render={() => <AddInvoice owner={owner} productList={products} />}
        />
      </div>
    </Router>
  );
};

export default App;
