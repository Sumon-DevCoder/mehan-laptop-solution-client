import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LaptopDetails = () => {
  const item = useLoaderData();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    brand,
    model,
    price,
    graphics,
    processor,
    ram,
    storage,
    _id,
    image,
    description,
  } = item[0];

  const handleAddToCart = (laptop) => {
    if (user && user?.email) {
      const laptopInfo = {
        email: user?.email,
        brand,
        model,
        price,
        graphics,
        processor,
        ram,
        storage,
        laptop_id: _id,
        description,
        image,
      };

      axiosSecure.post(`/carts`, laptopInfo).then((res) => {
        if (res.data.insertedId) {
          // alert
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${laptop?.model} is added your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      // alert
      Swal.fire({
        title: "Please Login?",
        text: "please login then add to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <>
      <div className="px-2 py-20 w-full flex justify-center">
        <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
          <div className="lg:w-1/2">
            <div className="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"></div>
          </div>
          <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
            <h2 className="text-3xl  text-indigo-600 font-bold">{model}</h2>
            <p className="mt-4 text-gray-600">
              project aims to create a web-based platform that encourages
              individuals to adopt sustainable lifestyle choices and actively
              contribute to environmental conservation. The platform will
              provide users with personalized tracking, education, and
              engagement features to empower them to make eco-friendly decisions
              in various aspects of their lives.
            </p>
            <div className="mt-8">
              <button
                onClick={() => handleAddToCart(item[0])}
                href="#"
                className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaptopDetails;
