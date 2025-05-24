import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialProducts = {
  Electronics: [
    { name: "Smartphone X", price: "₹19,999", description: "Latest smartphone with 5G." },
    { name: "Bluetooth Speaker", price: "₹1,299", description: "Portable and powerful sound." }
  ],
  Clothing: [
    { name: "Men's T-Shirt", price: "₹499", description: "Comfortable cotton T-shirt." },
    { name: "Women's Kurti", price: "₹799", description: "Elegant printed kurti." }
  ],
  Jewellery: [
    { name: "Gold Plated Necklace", price: "₹1,999", description: "Stylish traditional wear." },
    { name: "Silver Earrings", price: "₹899", description: "Trendy and lightweight." }
  ]
};

export default function QuickShopZone() {
  const [products, setProducts] = useState(initialProducts);
  const [adminMode, setAdminMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [newProduct, setNewProduct] = useState({ category: "Electronics", name: "", price: "", description: "" });

  const handleAddProduct = () => {
    const updated = { ...products };
    updated[newProduct.category].push({
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description
    });
    setProducts(updated);
    setNewProduct({ category: newProduct.category, name: "", price: "", description: "" });
  };

  const handleDeleteProduct = (category, index) => {
    const updated = { ...products };
    updated[category].splice(index, 1);
    setProducts(updated);
  };

  const handleLogin = () => {
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setLoggedIn(true);
      setAdminMode(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdminMode(false);
    setLoginForm({ username: "", password: "" });
  };

  const categories = Object.keys(products);

  return (
    <div className="p-4 space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold">QUICK SHOP ZONE</h1>
        <p className="text-gray-600">Best products at your doorstep - COD Available</p>
        {!loggedIn ? (
          <div className="mt-4 max-w-xs mx-auto">
            <Input
              placeholder="Username"
              className="mb-2"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              className="mb-2"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <Button onClick={handleLogin}>Admin Login</Button>
          </div>
        ) : (
          <Button className="mt-4 bg-red-500 hover:bg-red-600" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </header>

      {adminMode && (
        <section className="bg-gray-100 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-2">Add New Product</h2>
          <select
            className="mb-2 p-2 border rounded w-full"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Input
            placeholder="Product Name"
            className="mb-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            placeholder="Price"
            className="mb-2"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            className="mb-2"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <Button onClick={handleAddProduct}>Add Product</Button>
        </section>
      )}

      {categories.map((category) => (
        <section key={category} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products[category].map((product, index) => (
              <Card key={index} className="rounded-2xl shadow p-4">
                <CardContent>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-lg font-semibold text-green-600">{product.price}</p>
                  {!adminMode && <Button className="mt-4">Order Now (COD)</Button>}
                  {adminMode && (
                    <Button className="mt-4 bg-red-500 hover:bg-red-600" onClick={() => handleDeleteProduct(category, index)}>
                      Delete
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <footer className="text-center mt-10 text-sm text-gray-500">
        <p>Contact: +91-XXXXXXXXXX | Location: Your City, India</p>
        <p>&copy; 2025 QUICK SHOP ZONE</p>
      </footer>
    </div>
  );
}