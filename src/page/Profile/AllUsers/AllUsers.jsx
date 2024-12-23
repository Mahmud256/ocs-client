import { FaTrashAlt, FaUser, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useUsers from "../../../hooks/useUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const { users, refetch } = useUsers(); // Custom hook to fetch users
    const axiosSecure = useAxiosSecure(); // Secure Axios instance

    const handleMakeSeller = (user) => {
        axiosSecure
            .patch(`/users/seller/${user._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.name} is now a Seller!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error("Error making user a seller:", error);
            });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user.name} has been deleted successfully!`,
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                    });
            }
        });
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
                <h3 className="text-xl text-gray-600">Total Users: {users.length}</h3>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white">
                    {/* Table Head */}
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`text-center border-b hover:bg-gray-100 transition-colors duration-200 ${user.role === "admin" ? "bg-gray-50" : ""
                                    }`}
                            >
                                <td className="py-3 px-4 font-medium text-gray-700">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-4 text-gray-800">{user.name}</td>
                                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                <td className="py-3 px-4">
                                    {user.role === "admin" ? (
                                        <span className="inline-flex items-center text-red-600 font-bold">
                                            <FaUserShield className="mr-2" /> {user.role}
                                        </span>
                                    ) : user.role === "seller" ? (
                                        <span className="inline-flex items-center text-green-600 font-bold">
                                            <FaUser className="mr-2" /> {user.role}
                                        </span>
                                    ) : (
                                        <div className="flex justify-center items-center gap-3">
                                            <span className="inline-flex items-center text-blue-600 font-bold">
                                                <FaUser className="mr-2" /> {user.role}
                                            </span>

                                            {user.role !== "admin" && user.role !== "seller" && (
                                                <button
                                                    onClick={() => handleMakeSeller(user)}
                                                    className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                >
                                                    Make Seller
                                                </button>
                                            )}
                                        </div>

                                    )}
                                </td>
                                <td className="py-3 px-4 flex justify-center">

                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <FaTrashAlt className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
