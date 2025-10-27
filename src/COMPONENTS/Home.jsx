import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { sampleContext } from '../App';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const nav=useNavigate()

  const {  srch, setsrch ,count,addpro} = useContext(sampleContext);

  const getchange = (e) => {
    setsrch(e.target.value);
    console.log(srch);
   
  };

  const submit = (e) => {
    e.preventDefault();
    // const searchdata = srch.toLowerCase();
    // const filterdata = products.filter((item) => item.products[0].title.toLowerCase().includes(searchdata));
    // console.log(filterdata);
  };

  const get=()=>{
   nav('/cart')
  }

  return (
    <div style={{ marginBottom: '30px', display: 'flex', backgroundColor: 'skyblue' }}>
      <h3 style={{ fontFamily: 'cursive', marginTop: '10px', marginLeft: "80px" }}> E-Commerce</h3>
      <Form
        onSubmit={submit}
        className="d-flex ms-auto me-5 "
        style={{
          padding: '10px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
        }}>

        <Form.Control
          placeholder="Search"
          className="me-2"
          aria-label="Search "
          style={{ margin: "auto" }}
          onChange={getchange}
          name="title"
        />
        <FaSearch style={{ marginLeft: '-30px', color: 'gray' }} />
        <FaShoppingCart onClick={get} style={{ width: "50px", height: "25px", marginLeft: "20px" }} /><span style={{ marginBottom: "15pX" }}>{addpro.length}</span>

      </Form>
    </div>
  );
};

export default Home;