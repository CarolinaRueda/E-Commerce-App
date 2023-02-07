import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h3>
          Welcome to this E-Commerce{user && <span>, {user.first_name}</span>}!
        </h3>
        <br />
        <p>
          Here you will find a great variety of clothes,
          <br />
          which you can order through this website!
          <br />
          {!user && "Login and"} have fun shopping!
        </p>
      </section>
    </>
  );
};

export default Dashboard;
