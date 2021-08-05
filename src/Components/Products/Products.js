import React, { Component } from 'react';
import store from '../../redux/store';
import './Products.css';

export class Products extends Component {
    constructor()
    {
    super();
    this.state={
        products:[],
    } 
   }



   componentDidMount()
   {
       this.getProducts();
   }

   getProducts=()=>
   {
    fetch("http://ec2-3-239-106-130.compute-1.amazonaws.com/get/products")
    .then((res)=>{return res.json()})
        .then((response)=>
        {
           console.log(response)
           this.setState({products:response.products})
        })
        .catch((e)=>
        {
            console.log(e)
        })
   }

   placeOrder=(id)=>
   {
    fetch("http://ec2-3-239-106-130.compute-1.amazonaws.com/place/order",
    {
    method:"Post",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({'email':store.getState().login.email,'product_id':id})
    })
    .then((res)=>{return res.json()})
    .then((response)=>
    {
       if(response.order_id!=undefined)
       {
           window.alert(response.message+"\n"+"your order id is "+response.order_id)
       }
       else
       {
           window.alert("some error")
       }
    })
    .catch((e)=>
    {
        console.log(e)
    })
   }

    render() {
        return (
            <div className="productComponent">
                <h2 className='componentHeader'>Products</h2>
                <div className="cardContainer">
               {
               this.state.products.map((item,index)=>
                {
                return (
               
                    <div className="productCard">
                        <img src={`http://ec2-3-239-106-130.compute-1.amazonaws.com${item.img}`} />
                        <div className="productContent">
                            <div className="productDetails">
                                <h2>{item.title}</h2>
                                <p>{item.desc}</p>
                            </div>
                            <div className="productActions">
                                <button onClick={()=>this.placeOrder(item.id)}> Buy</button>
                            </div>
                        </div>
                    
                </div>
                  )
                })
              }
              </div>

            </div>
              
        )
    }
}

export default Products
