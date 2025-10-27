import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { sampleContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Carts = () => {
  const { products, setproducts, srch, count, setcount, addpro, setaddpro } = useContext(sampleContext);
  const cartapi = "https://dummyjson.com/products";
  const navigate = useNavigate();

  // Price filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Available categories
  const categories = [
    { slug: 'beauty', name: 'Beauty' },
    { slug: 'fragrances', name: 'Fragrances' },
    { slug: 'furniture', name: 'Furniture' },
    { slug: 'groceries', name: 'Groceries' },
    { slug: 'home-decoration', name: 'Home Decoration' },
    { slug: 'kitchen-accessories', name: 'Kitchen Accessories' },
    { slug: 'laptops', name: 'Laptops' },
    { slug: 'mens-shirts', name: 'Mens Shirts' },
    { slug: 'mens-shoes', name: 'Mens Shoes' },
    { slug: 'mens-watches', name: 'Mens Watches' },
    { slug: 'mobile-accessories', name: 'Mobile Accessories' },
    { slug: 'motorcycle', name: 'Motorcycle' },
    { slug: 'skin-care', name: 'Skin Care' },
    { slug: 'smartphones', name: 'Smartphones' },
    { slug: 'sports-accessories', name: 'Sports Accessories' },
    { slug: 'sunglasses', name: 'Sunglasses' },
    { slug: 'tablets', name: 'Tablets' },
    { slug: 'tops', name: 'Tops' },
    { slug: 'vehicle', name: 'Vehicle' },
    { slug: 'womens-bags', name: 'Womens Bags' },
    { slug: 'womens-dresses', name: 'Womens Dresses' },
    { slug: 'womens-jewellery', name: 'Womens Jewellery' },
    { slug: 'womens-shoes', name: 'Womens Shoes' },
    { slug: 'womens-watches', name: 'Womens Watches' }
  ];

  useEffect(() => {
    axios.get(cartapi).then((res) => setproducts(res.data.products));
  }, [setproducts]);

  // Filter products by search, category, and price
  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(srch.toLowerCase())
  );

  // Apply category filter
  if (selectedCategory !== '') {
    filteredProducts = filteredProducts.filter(item => item.category === selectedCategory);
  }

  // Apply price filters
  if (minPrice !== '') {
    filteredProducts = filteredProducts.filter(item => item.price >= parseFloat(minPrice));
  }
  if (maxPrice !== '') {
    filteredProducts = filteredProducts.filter(item => item.price <= parseFloat(maxPrice));
  }

  // Apply sorting
  if (sortBy === 'price-low-high') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high-low') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const add = (arg) => {
    const existingProduct = addpro.find(item => item.id === arg.id);
    
    if (existingProduct) {
      // If product already exists, increase quantity
      const updatedCart = addpro.map(item => 
        item.id === arg.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setaddpro(updatedCart);
    } else {
      // Add new product to cart
      setaddpro([...addpro, {...arg, quantity: 1}]);
    }
    
    toast.success('Product added to cart!');
  };

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      {/* Filter Section */}
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', margin: '20px' }}>
        <Row>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button 
              variant="outline-secondary" 
              onClick={() => {
                setSelectedCategory('');
                setMinPrice('');
                setMaxPrice('');
                setSortBy('');
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </div>

      {/* Products Grid */}
      <div style={{ justifyContent: "center", display:"flex" ,flexWrap:"wrap", padding: '0 20px'}}>
        {filteredProducts.map((arg) => {
          return (
            <Card 
              style={{ 
                width: '17rem', 
                margin:"10px", 
                borderColor:"violet",
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }} 
              key={arg.id}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div onClick={() => goToProductDetail(arg.id)}>
                <Card.Img 
                  variant='top' 
                  style={{height:"200px", objectFit: 'cover'}} 
                  src={arg.images[0]}
                />
                <Card.Body>
                  <div style={{ height: "180px" }}>
                    <Card.Text style={{ fontSize: "16px", fontFamily: "cursive", fontWeight: "bold", height: "50px", overflow: "hidden" }}>
                      {arg.title}
                    </Card.Text>
                    
                    <Card.Text style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>
                      ${arg.price}
                    </Card.Text>
                    <Card.Text>
                      ⭐ {arg.rating}
                    </Card.Text>
                    <Card.Text>
                      Stock: {arg.stock}
                    </Card.Text>
                    <Card.Text>
                      Brand: {arg.brand}
                    </Card.Text>
                  </div>
                </Card.Body>
              </div>
              <div style={{ padding: "0 15px 15px" }}>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    add(arg);
                  }} 
                  variant="primary" 
                  className="w-100"
                  disabled={arg.stock === 0}
                >
                  {arg.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <h4>No products found</h4>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default Carts;
