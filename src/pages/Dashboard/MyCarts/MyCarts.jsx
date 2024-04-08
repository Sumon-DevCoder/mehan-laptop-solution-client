import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import Swal from "sweetalert2";

const MyCarts = () => {
  const [carts, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    // alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't delete this item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${item?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // alert
            Swal.fire({
              title: "Deleted!",
              text: `${item.model} is deleted successful`,
              icon: "success",
            });

            // refetch
            refetch();
          }
        });
      }
    });
  };

  const price = carts.reduce((prev, item) => prev + item.price, 0);

  return (
    <div>
      <div className="m-4 bg-blue-400 p-4 flex justify-between">
        <h2 className="font-bold text-lg">Items: {carts.length}</h2>
        <h2 className="font-bold text-lg">Total: ${price}</h2>
        {price > 0 ? (
          <Link to={"/dashboard/payment"} className="btn btn-secondary btn-sm">
            Pay
          </Link>
        ) : (
          <button disabled className="btn disabled btn-secondary btn-sm">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts?.map((item, index) => (
              <tr key={item?._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.model}</div>
                      <div className="text-sm opacity-50">{item?.brand}</div>
                    </div>
                  </div>
                </td>
                <td>{item?.price}</td>

                <th>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCarts;
