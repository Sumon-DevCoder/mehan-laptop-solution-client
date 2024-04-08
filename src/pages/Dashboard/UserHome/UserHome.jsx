import useAuthContext from "../../../hooks/useAuthContext";

const UserHome = () => {
  const { user } = useAuthContext();

  console.log("ccc", user);
  return (
    <div>
      <h3>Welcome {user?.displayName || "back"}</h3>
    </div>
  );
};

export default UserHome;
