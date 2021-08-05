import React, { Component } from 'react';
import store from '../../redux/store';
import './Orders.css';
import axios from 'axios';


export class Orders extends Component {
    constructor()
    {
    super();
    this.state={
        orders:[],


    } 
   }

   componentDidMount()
   {
    this.getOrders();
   }
   getOrders=()=>
   {
    const url =localStorage.getItem('email')
    axios.get("http://ec2-3-239-106-130.compute-1.amazonaws.com/get/orders/"+url)
    .then((response)=>
        {
           console.log(response.data.orders)
           this.setState({orders:response.data.orders})
           
        })
        .catch((e)=>
        {
            console.log(e)
        })
   }
    render() {
        return (

            <div className='ordersComponent'>
                <h2 className='ordersHeader'>Orders</h2>
                {this.state.orders.map((item,index)=>
              {
                return(
                <div className='ordersContainer'>
                    <div className='ordersCard'>
                        <img src='https://picsum.photos/200/100' />
                        <div className='ordersContent'>
                            <h2>{item.product.title}</h2>
                            <h4>Order ID - {item.order_id}</h4>
                        </div>
                        <div className='ordersDetails'></div>
                        <div className="orderStatus">Order placed ✔</div>
                    </div>
                </div>
                )
              })
             }
            </div>
            
        )
    }
}

export default Orders
