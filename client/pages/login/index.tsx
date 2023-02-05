import { AuthContext } from "@/components/context/authContext";
import { useContext } from "react";

const Login = () => {
  const { login } = useContext<any>(AuthContext);

  const handleLogin = () => {
    login();
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui,
            deserunt officiis quaerat at reiciendis cum. Voluptatibus
            reprehenderit itaque quia voluptatem modi vero ipsum deleniti odio
            nihil? Adipisci ullam quia necessitatibus!
          </p>
          <span>Dont you have an account?</span>
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
