import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/usewishlist";


const ProductDetailsCard = ({ product }) => {
  const { _id, name, brand, price, photos, description } = product || {};

  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [, refetchCart] = useCart();
  const [, refetchWishlist] = useWishlist();
  const axiosSecure = useAxiosSecure();


  const handleAddToCart = () => {
    if (user && user.email) {
      const cartProduct = {
        productId: _id,
        email: user.email,
        name,
        photos,
        price,
      };
      console.log(cartProduct);
      axiosSecure.post('cart', cartProduct)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${name} added to your cart`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetchCart();
          }
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please log in to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  const handleAddToWishlist = () => {
    if (user && user.email) {
      const wishlistProduct = {
        productId: _id,
        email: user.email,
        name,
        photos,
        price,
      };

      console.log(wishlistProduct);

      axiosSecure.post('wishlist', wishlistProduct)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${name} added to your wishlist`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetchWishlist();
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            Swal.fire({
              position: "top-center",
              icon: "info",
              title: "Product already in your wishlist",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Something went wrong. Please try again later.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please log in to add to the wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Left Side - Product Image */}
      <div className="w-1/2 flex justify-center">
        <img src={photos} alt="Product" className="w-[60%] max-h-full" />
      </div>

      {/* Right Side - Product Details */}
      <div className="w-1/2 px-8">
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600 mb-2">Brand: {brand}</p>
        <p className="text-gray-800 mb-4">{description}</p>
        <p className="text-xl font-bold mb-4">Price: <span className='text-blue-500'>$ {price}</span></p>

        {/* Conditionally render Add to Cart and Wishlist Buttons */}

          <div className="flex gap-2">
            <button onClick={handleAddToCart} className="bg-blue-200 hover:bg-blue-600 text-blue-500 hover:text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600">
              Add to Cart
            </button>
            <button onClick={handleAddToWishlist} className="bg-blue-200 hover:bg-blue-600 text-blue-500 hover:text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600">
              Add to Wishlist
            </button>
          </div>
    
      </div>
    </div>
  );
};

export default ProductDetailsCard;
