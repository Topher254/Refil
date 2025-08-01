import { BsStar } from "react-icons/bs";
import { HiPlus, HiStar } from "react-icons/hi";
import { UseAppContext } from "../../context/context";

const Productcard = ({ product }) => {
  const { addtoCart, updateCartItems, removeItem, CartItems } = UseAppContext();

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
          <p className="md:text-xl text-base font-medium text-indigo-500">
            Kshs{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">kshs{product.price}</span>
          </p>
          <div className="text-indigo-500">
            {!CartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
                onClick={() => addtoCart(product._id)}
              >
                <HiPlus />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                <button
                  onClick={() => {
                    if (CartItems[product._id] === 1) {
                      removeItem(product._id);
                    } else {
                      updateCartItems(product._id, CartItems[product._id] - 1);
                    }
                  }}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">Add</span>
                <button
                  onClick={() =>
                    updateCartItems(product._id, CartItems[product._id] + 1)
                  }
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
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
