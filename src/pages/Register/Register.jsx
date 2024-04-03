import { useForm } from "react-hook-form";
import proflePic from "../../assets/logo.jpg";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

// imgbb api setup
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signUp, updateUserProfile } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // handleSubmit
  const onSubmit = async (data) => {
    // imgbb img setup
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const image = res.data.data.display_url;

      signUp(email, password)
        .then((result) => {
          console.log(result.user);

          // update user profile
          updateUserProfile(name, image).then(() =>
            console.log("profile update successfull")
          );

          // user entry to database
          const userInfo = { name, email };
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res.data);

            if (res.data.insertedId) {
              // reset
              reset();

              // alert
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Registration Successful",
                showConfirmButton: false,
                timer: 1500,
              });

              // navigate
              navigate(from, { replace: true });
            }
          });
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-400 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-row-reverse justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="w-full flex-1">
                <SocialLogin />
                <div className="my-6 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or Create an Account!
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto max-w-xs space-y-4"
                >
                  <div className="max-w-sm">
                    <label
                      htmlFor="photobutton"
                      className="text-xs font-medium text-gray-500"
                    >
                      Upload Photo
                    </label>
                    <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                      <input
                        {...register("image", { required: true })}
                        id="photobutton"
                        name="image"
                        type="file"
                        className="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                      />
                    </div>
                    {errors.image?.type === "required" && (
                      <p className="text-red-400 font-bold" role="alert">
                        Please upload your image
                      </p>
                    )}
                  </div>

                  <input
                    {...register("name", { required: true })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-400 font-bold" role="alert">
                      Please submit your name
                    </p>
                  )}
                  <input
                    {...register("email", { required: true })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-400 font-bold" role="alert">
                      Please select your email
                    </p>
                  )}

                  <input
                    {...register("password", {
                      required: true,
                      maxLength: 18,
                      minLength: 6,
                      pattern:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).+$/i,
                    })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Password"
                    name="password"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-400 font-bold" role="alert">
                      Please set strong password
                    </p>
                  )}

                  {errors.password && (
                    <p className="text-red-400 font-bold" role="alert">
                      password must have 6 characters, atleast one uppercase,
                      lowercase, special characters & number;
                    </p>
                  )}
                  {error && <p className="text-red-400 font-bold">{error}</p>}
                  <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img src={proflePic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
