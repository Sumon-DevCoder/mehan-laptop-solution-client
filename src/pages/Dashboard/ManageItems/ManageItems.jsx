import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useLaptops from "../../../hooks/useLaptops";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [laptops, refetch] = useLaptops();
  const axiosSecure = useAxiosSecure();

  const handleDeletelaptop = (laptop) => {
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
        axiosSecure.delete(`/laptops/${laptop?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // alert
            Swal.fire({
              title: "Deleted!",
              text: `${laptop?.model || "items"} is deleted successful`,
              icon: "success",
            });

            // refetch
            refetch();
          }
        });
      }
    });
  };

  //   const handleUpdateItems = (laptop) => {
  //     // alert
  //     axiosSecure.patch(`/laptops/${laptop?._id}`).then((res) => {
  //       if (res.data.modifiedCount > 0) {
  //         // alert
  //         Swal.fire({
  //           title: "success!",
  //           text: `${laptop?.model || "items"} is update successful`,
  //           icon: "success",
  //         });

  //         // refetch
  //         refetch();
  //       }
  //     });
  //   };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Admin Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {laptops?.map((laptop, index) => (
              <tr key={laptop?._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={laptop?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{laptop?.model}</div>
                      <div className="text-sm opacity-50">{laptop?.brand}</div>
                    </div>
                  </div>
                </td>
                <td>{laptop?.price}</td>

                <th>
                  <Link to={`/dashboard/updateItem/${laptop?._id}`}>
                    <button className="btn btn-ghost btn-xs">Update</button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDeletelaptop(laptop)}
                    className="btn btn-primary btn-xs"
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

export default ManageItems;
