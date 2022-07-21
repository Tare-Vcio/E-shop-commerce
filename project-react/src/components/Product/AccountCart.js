import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AccountCart() {
  const [items, setItems] = useState({})
  const [locals, setLocals] = useState({})
  const [newLocals, setNewLocals] = useState({})
  useEffect(() => {
    let itemCart = localStorage.getItem("itemCart")
    if (itemCart) {
      itemCart = JSON.parse(itemCart);
      setLocals(itemCart)
    }
    axios.post("http://localhost/API/laravel/public/api/product/cart", itemCart).then((res) => {
      setItems(res.data.data)
      console.log(res.data.data)
    });
  }, [])

  function handlePlus(id, quantity) {
    console.log("id", id)
    console.log("quantity", quantity)
    let itemApis = {};
    let itemLocals = {};
    itemApis = { ...items }
    itemLocals = { ...locals }
    console.log(locals)
    Object.keys(itemApis).map((item) => {
      if (itemApis[item].id == id) {
        itemApis[item]['qty'] += 1;
        locals[id] = quantity + 1;
        itemLocals[id] = locals[id]
      }
    })
    setItems(itemApis)
    localStorage.setItem("itemCart", JSON.stringify(itemLocals));
  }
  function handleMinus(id, quantity) {
    console.log("id", id)
    console.log("quantity", quantity)
    let itemApis = {};
    let itemLocals = {};
    itemApis = { ...items }
    itemLocals = { ...locals }
    console.log(locals)
    Object.keys(itemApis).map((item) => {
      if (itemApis[item].id == id) {
        itemApis[item]['qty'] -= 1;
        locals[id] = quantity - 1;
        itemLocals[id] = locals[id]
      }
    })
    setItems(itemApis)
    localStorage.setItem("itemCart", JSON.stringify(itemLocals));
  }

  function handleRemove(id) {

    const newList = items.filter((item) => item.id !== id);
    let saveRemoveLocals = {};
    newList.map((list) => {
      saveRemoveLocals = { ...saveRemoveLocals, [list.id]: list.qty }
    })
    console.log(saveRemoveLocals)
    setItems(newList)
    localStorage.setItem("itemCart", JSON.stringify(saveRemoveLocals));
  }
  function handleTotal() {
      let total = 0;
      Object.keys(items).map((item) => {
        console.log(items[item])
        total += items[item].price * items[item].qty;
      })
      console.log(total)
      return <span>{total}</span>
  }
  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li><a href="#">Home</a> </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Image</td>
                  <td className="description">Description</td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {Object.keys(items).map((item, key) => {
                  let imageItem = JSON.parse(items[item].image);
                  return (
                    <tr key={key}>
                      <td className="cart_product">
                        <a href=''><img src={"http://localhost/API/laravel/public/upload/user/product/" + items[item].id_user + "/" + imageItem[0]} alt="" /></a>
                      </td>
                      <td className="cart_description">
                        <h4>{items[item].detail}</h4>
                        <p>Web ID: {items[item].web_id}</p>
                      </td>
                      <td className="cart_price">
                        <p>{items[item].price}</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <a className="cart_quantity_up" onClick={() => handlePlus(items[item].id, items[item].qty)}> + </a>
                          <input className="cart_quantity_input" type="text" name="quantity" defaultValue={items[item].qty} value={items[item].qty} autoComplete="off" size={2} />
                          <a className="cart_quantity_down" onClick={() => handleMinus(items[item].id, items[item].qty)}>-</a>
                        </div>
                        {/* <a className="cart_quantity_down" href>
                        </a> */}
                      </td>
                      <td className="cart_total">
                        <p className="cart_total_price">{items[item].price * items[item].qty}</p>
                      </td>
                      <td className="cart_delete">
                        <a className="cart_quantity_delete" onClick={() => handleRemove(items[item].id)} href><i className="fa fa-times" />
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section> {/*/#cart_items*/}
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>Get Quotes
                </a><a className="btn btn-default check_out" href>Continue
                </a></div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>$59</span></li>
                  <li>Eco Tax <span>$2</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total {handleTotal()}</li>
                </ul>
                <a className="btn btn-default update" href>Update
                </a>
                <a className="btn btn-default check_out" href>Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>{/*/#do_action*/}
    </div>
  )
}

export default AccountCart