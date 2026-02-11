import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./LandingPage";
import Charities from "./Charities";
import Subscriptions from "./Subscriptions";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import About from "./About";
import Privacy from "./Privacy";
import Terms from "./Terms";
import FAQ from "./FAQ";

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/charities" element={<Charities />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/faq" element={<FAQ />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
