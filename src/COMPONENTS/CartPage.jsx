import React, { useContext, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { sampleContext } from '../App';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { addpro, setaddpro } = useContext(sampleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (addpro.length === 0) {
      navigate('/');
    }
  }, [addpro.length, navigate]);

  const removeFromCart = (productId) => {
    const updatedCart = addpro.filter(item => item.id !== productId);
    setaddpro(updatedCart);
    toast.success('Product removed from cart!');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = addpro.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setaddpro(updatedCart);
  };

  const getTotalPrice = () => {
    return addpro.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const clearCart = () => {
    setaddpro([]);
    toast.success('Cart cleared!');
  };

  if (addpro.length === 0) {
    return (
      <Container className="mt-4">
        <h2>Your Cart</h2>
        <div className="text-center mt-5">
          <h4>Your cart is empty</h4>
          <p>Add some products to get started!</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>Your Cart ({addpro.length} items)</h2>
          {addpro.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>{item.title}</h5>
                    <p className="text-muted">{item.brand}</p>
                    <p><strong>${item.price}</strong></p>
                  </Col>
                  <Col md={3} className="text-center">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash /> Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Order Summary</h4>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total: ${getTotalPrice()}</strong>
              </div>
              <Button variant="success" className="w-100 mb-2">
                Proceed to Checkout
              </Button>
              <Button variant="outline-danger" className="w-100" onClick={clearCart}>
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
