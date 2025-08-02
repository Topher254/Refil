import { BsStar } from "react-icons/bs";
import { HiPlus, HiStar } from "react-icons/hi";
import { UseAppContext } from "../../context/context";
import { useState, useEffect } from "react";

const Productcard = ({ product, vendor }) => {
  const { addtoCart, updateCartItems, removeItem, CartItems } = UseAppContext();
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    if (showAdded) {
      const timer = setTimeout(() => setShowAdded(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showAdded]);

  // Handle both old product structure and new vendor product structure
  const finalPrice = product.finalPrice || product.offerPrice;
  const basePrice = product.basePrice || product.price;
  const offerPrice = product.offerPrice;
  const deliveryFee = vendor?.deliveryFee || 0;

  return product && (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image} alt={product.name} />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
        <div className="flex items-center gap-0.5">
          {Array(5).fill('').map((_, i) => (
            product._id > i ? <BsStar key={i}/> : <HiStar key={i}/>
          ))}
          <p>(4)</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="md:text-xl text-base font-medium text-indigo-500">
              Kshs{finalPrice}
            </p>
            {basePrice !== offerPrice && (
              <span className="text-gray-500/60 md:text-sm text-xs line-through">Kshs{basePrice}</span>
            )}
            {vendor && (
              <p className="text-xs text-gray-500">+ Kshs{deliveryFee} delivery</p>
            )}
          </div>
          <div className="text-indigo-500">
            {!CartItems[product._id] ? (
              <button
                className={`flex items-center justify-center gap-1 px-2 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded font-medium transition-all ${
                  showAdded
                    ? "bg-green-100 text-green-600 border-green-300"
                    : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                }`}
                onClick={() => {
                  addtoCart(product._id);
                  setShowAdded(true);
                }}
              >
                {showAdded ? "Added!" : <><HiPlus className="text-sm" /> Add</>}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-2 px-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded">
                  <button
                    onClick={() => {
                      if (CartItems[product._id] === 1) {
                        removeItem(product._id);
                      } else {
                        updateCartItems(product._id, CartItems[product._id] - 1);
                      }
                    }}
                    className="cursor-pointer text-md w-6 h-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {product._id}
                  </span>
                  <button
                    onClick={() =>
                      updateCartItems(product._id, CartItems[product._id] + 1)
                    }
                    className="cursor-pointer text-md w-6 h-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(product._id)}
                  className="text-red-600 text-sm border border-red-300 px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productcard;