// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import BlogList from './Pages/BlogList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/FinanceAdmin" element={<Layout />}>
          <Route path="/FinanceAdmin/dashboard" element={<Dashboard />} />
          <Route path="/FinanceAdmin/blog" element={<BlogList />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
