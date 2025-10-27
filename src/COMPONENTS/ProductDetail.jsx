import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { sampleContext } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const { addpro, setaddpro, products } = useContext(sampleContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        
        // Get related products from the same category
        const allProductsResponse = await axios.get('https://dummyjson.com/products');
        const related = allProductsResponse.data.products
          .filter(p => p.category === response.data.category && p.id !== parseInt(id))
          .slice(0, 4);
        setRelatedProducts(related);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    const existingProduct = addpro.find(item => item.id === product.id);
    
    if (existingProduct) {
      const updatedCart = addpro.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setaddpro(updatedCart);
    } else {
      setaddpro([...addpro, { ...product, quantity: 1 }]);
    }
    
    toast.success('Product added to cart!');
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h4>Product not found</h4>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Carousel>
            {product.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <h1>{product.title}</h1>
          <p className="text-muted">{product.brand}</p>
          <h3 className="text-success">${product.price}</h3>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>Stock:</strong> {product.stock} available</p>
          <p><strong>Category:</strong> {product.category}</p>
          
          <div className="mt-4">
            <h5>Description:</h5>
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mt-3">
              <strong>Tags: </strong>
              {product.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h3>Related Products</h3>
            <Row>
              {relatedProducts.map((relatedProduct) => (
                <Col md={3} key={relatedProduct.id} className="mb-3">
                  <Card 
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.location.href = `/product/${relatedProduct.id}`}
                  >
                    <Card.Img 
                      variant="top" 
                      src={relatedProduct.images[0]} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '14px', height: '40px' }}>
                        {relatedProduct.title}
                      </Card.Title>
                      <Card.Text>
                        <strong>${relatedProduct.price}</strong>
                      </Card.Text>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(relatedProduct);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetail;
