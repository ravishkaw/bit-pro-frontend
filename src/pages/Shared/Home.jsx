import { useNavigate } from "react-router";
const Home = () => {
  let navigate = useNavigate();

  return (
    <>
      <div>Home</div>
      <button onClick={() => navigate("/login")}>Login page</button>
    </>
  );
};
export default Home;
