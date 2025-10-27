import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { sampleContext } from '../App';

const Addproduct = () => {
  const { addpro,setaddpro } = useContext(sampleContext);
  const [quantity, setquantity] = useState(0);
  console.log(addpro);

  return (
    <div className='row justify-content-center' style={{flexWrap:"wrap"}}>
      {addpro.map((arg, index) => {
        return (
          <Card style={{ width: '18rem', margin: '20px', borderColor:"Highlight"}} key={index}>
            <Card.Img variant='top' style={{height:"200px"}} src={arg.images[0]} />
            <Card.Body>
              <Card.Title>{arg.title}</Card.Title>
              <Card.Text>
                $: {arg.price * arg.quantity}
              </Card.Text>
              {/* <Card.Text>
                Discount Price: {arg.discountedPrice}%
              </Card.Text> */}
              <Card.Text>
                Quantity: {arg.quantity && arg.quantity}
              </Card.Text> 
              <Button onClick={()=>{
                const _cart=addpro.map((item,ind)=>{
                  return index === ind ? {...item,quantity:item.quantity && item.quantity>0 ? item.quantity-1:0}:item
                })
                setaddpro(_cart)
              }}>-</Button>
             <span>{arg.quantity}</span> 
              <Button  onClick={()=>{
                const _cart=addpro.map((item,ind)=>{            
                  return index === ind ? {...item,quantity:item.quantity+1}:item
             })
                setaddpro(_cart)
                console.log(_cart);
              }}>+</Button>
            </Card.Body>
          </Card>
      
        );
      })}
      <h4 style={{textAlign:"center"}}>
       Sub Total:{" "}
        {addpro.map((item) => item.price * item.quantity).reduce(
          (total, val) => total + val,
          0
        )}
      </h4>
    </div>
  );
}

export default Addproduct;
