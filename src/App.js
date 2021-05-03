import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AddInvoice from './components/AddInvoice'
import About from './components/About'
import NavBar from './components/NavBar'
import ProductPage from "./components/ProductPage";
import HomePageButton from "./components/HomePageButton";
import InvoiceService from "./api-services/InvoiceService";
import InvoiceList from './components/seeInvoicesComponents/InvoiceList'
import ProductService from "./api-services/ProductService";


//TODO: Remove Items-state here. It is in AddInvoice instead.

const App = () => {
    const [invoices, setInvoices] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        InvoiceService.getInvoice("appa@gmail.se").then(res => {
           setInvoices(res.data);
        });
        ProductService.getProducts("appa@gmail.se").then(res => {
            setProducts(res.data);
        })
    }, [])

    // Fetch the array of pre-defined products
    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/products')
        const data = await res.json()

        return data
    }

    // Fetch a single product
    const fetchProduct = async (id) => {
        const res = await fetch(`http://localhost:5000/products/${id}`)
        const data = await res.json()

        return data
    }

    // Add a product
    const addProduct = async (product) => {
        const res = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(product),
        })

        const data = await res.json()

        setProducts([...products, data])
    }

    // Delete a product
    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        })
        res.status === 200
            ? setProducts(products.filter((product) => product.id !== id))
            : alert('Error Deleting This Product')
    }

    // Fetch previously added Invoices
    const fetchInvoices = async () => {
        const res = await fetch('http://localhost:5000/invoices')
        const data = await res.json()

        return data
    }

    // Fetch a specific Invoice
    const fetchInvoice = async (id) => {
        const res = await fetch(`http://localhost:5000/invoices/${id}`)
        const data = await res.json()

        return data
    }

    // Add Invoice
    const addInvoice = async (invoice) => {
        const res = await fetch('http://localhost:5000/invoices', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(invoice),
        })

        const data = await res.json()

        setInvoices([...invoices, data])
    }

    // Delete Invoice
    const deleteInvoice = async (id) => {
        const res = await fetch(`http://localhost:5000/invoices/${id}`, {
            method: 'DELETE',
        })
        res.status === 200
            ? setInvoices(invoices.filter((invoice) => invoice.id !== id))
            : alert('Error Deleting This Invoice')
    }


    return (
        <Router>
            <div className='background'>
                <NavBar/>
                <Header/>
                <Route
                    path='/'
                    exact
                    render={(props) => (
                        <HomePageButton text1={'CREATE'} text2={'invoice'}/>
                    )}
                />
                <Route
                    path='/all-invoices'
                    render={(props) => (
                        <>
                            <InvoiceList props={props} invoiceList={invoices}/>
                        </>
                    )}
                />
                <Route path='/products'
                       exact
                       render={() => (
                           <ProductPage products={products} onAdd={addProduct} onDelete={deleteProduct}/>
                       )}/>
                <Route path='/newinvoice'
                       exact
                       render={() => (
                           <AddInvoice productList={products} onAddInvoice={addInvoice}/>
                       )}/>
                <Route path='/about' component={About}/>
                <Footer/>
            </div>
        </Router>
    );
};

export default App
