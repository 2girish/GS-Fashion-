import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  // Build cart data whenever cart changes
  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  // If products are still loading or empty
  if (!products || products.length === 0) {
    return (
      <div className="w-[99vw] min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
        <p className="text-[22px] animate-pulse text-[#aaf4e7]">
          Loading your cart...
        </p>
      </div>
    );
  }

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {cartData.length === 0 ? (
          <div className="text-center w-full mt-20 text-[#aaf4e7] text-[22px]">
            Your cart is empty 🛒
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            // Show a fallback if product not found
            if (!productData) {
              return (
                <div
                  key={index}
                  className="w-full border-t border-b border-[#9ff9f9] py-4 text-[#f3f9fc] text-center"
                >
                Your ordered product (ID: {item._id})
                </div>
              );
            }

            return (
              <div key={index} className='w-[100%] h-[10%] border-t border-b'>
                <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>
                  <img
                    className='w-[100px] h-[100px] rounded-md'
                    src={productData?.image1 || productData?.image || '/placeholder.jpg'}
                    alt={productData?.name || 'Product'}
                  />

                  <div className='flex items-start justify-center flex-col gap-[10px]'>
                    <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{productData?.name}</p>
                    <div className='flex items-center gap-[20px]'>
                      <p className='text-[20px] text-[#aaf4e7]'>
                        {currency} {productData?.price}
                      </p>
                      <p className='w-[40px] h-[40px] text-[16px] text-[white] bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9]'>
                        {item.size}
                      </p>
                    </div>
                  </div>

                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className='md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[white] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md'
                    onChange={(e) =>
                      (e.target.value === ' ' || e.target.value === '0')
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                  />

                  <RiDeleteBin6Line
                    className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1 cursor-pointer hover:scale-110 transition-all duration-200'
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-start items-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <button
              className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'
              onClick={() => {
                if (cartData.length > 0) navigate("/placeorder");
                else console.log("Your cart is empty!");
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart
