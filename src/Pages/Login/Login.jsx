import React, { useContext } from "react";
import logo from "../../assets/logo/Logo.png";
import svgImg from "../../assets/signin/signin.gif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useContext(AuthContextProvider);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Navigate exact route ---------->
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((res) => {
        const user = res.user;
        Swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          title: `${err.message}`,
          text: "Please check and try again",
          icon: "warning",
          confirmButtonText: "Okey",
        });
      });
  };
  return (
    <div className="mb-5 mt-16 container mx-auto">
      <section className="gradient-form h-full bg-neutral-50 dark:bg-neutral-700 rounded-xl">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48 mb-10"
                          src={logo}
                          alt="logo"
                        />
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="mb-4 text-2xl font-bold">
                          Please login to your account
                        </h4>

                        <div className="mb-4">
                          <label className="label">Email</label>
                          <input
                            type="email"
                            {...register("email")}
                            name="email"
                            placeholder="Type your email here"
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="label">Password</label>
                          <input
                            type="password"
                            {...register("password")}
                            name="password"
                            placeholder="Type your password here"
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="mb-2 pb-1 pt-1 text-center mt-6">
                          <input
                            type="submit"
                            value="Login"
                            className="  btn btn-block btn-primary text-white border-none"
                          />
                        </div>
                      </form>

                      <div className="flex items-center justify-between pb-6 mt-10">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <Link to={"/register"}>
                          <button
                            type="button"
                            className="btn btn-accent text-white "
                          >
                            Register
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background: "#F7F7F7",
                    }}
                  >
                    <div className="px-4 py-6 text-gray-800 md:mx-6 md:p-12">
                      <img src={svgImg} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
