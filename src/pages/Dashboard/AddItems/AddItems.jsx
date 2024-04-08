import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

// imgbb api setup
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // imgbb img setup
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const itemInfo = {
        brand: data.brand,
        model: data.model,
        processor: data.processor,
        ram: data.ram,
        storage: data.storage,
        graphics: data.graphics,
        price: parseInt(data.price),
        description: data.description,
        image: res.data.data.display_url,
      };

      axiosSecure.post("/laptops", itemInfo).then((res) => {
        if (res.data.insertedId) {
          // alert
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.model} is added successful`,
            showConfirmButton: false,
            timer: 1500,
          });

          // reset
          reset();
        }
      });
    }
  };

  return (
    <div>
      <section className="bg-gray-400">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 ">
            <div className="rounded-lg bg-gray-200 p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("brand", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="brand"
                      type="text"
                      id="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("model", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="model"
                      type="text"
                      id="text"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("price", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="price"
                      type="number"
                      id="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("graphics", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="graphics"
                      type="text"
                      id="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("processor", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="processor"
                      type="text"
                      id="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("storage", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="storage"
                      type="text"
                      id="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      brand
                    </label>
                    <input
                      {...register("ram", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="ram"
                      type="text"
                      id="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      className="file-input w-full max-w-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    {...register("description", { required: true })}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    rows="8"
                    id="message"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddItems;
