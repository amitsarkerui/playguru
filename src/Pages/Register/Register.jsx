import React from "react";
import logo from "../../assets/logo/Logo.png";
import svgImg from "../../assets/signin/signin.gif";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   Onsubmit
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("photoURL", data.image[0]);
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
                        <h4 className="mb-4">Please Register</h4>

                        <div className="mb-4">
                          <label className="label">Name</label>
                          <input
                            type="text"
                            {...register("name", { required: true })}
                            name="name"
                            placeholder="Type your name here"
                            className="input input-bordered w-full"
                          />
                          {errors.name?.type === "required" && (
                            <p className="text-red-600">Name is required</p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="label">Email</label>
                          <input
                            type="email"
                            {...register("email", { required: true })}
                            name="email"
                            placeholder="Type your email here"
                            className="input input-bordered w-full"
                          />
                          {errors.email?.type === "required" && (
                            <p className="text-red-600">Email is required</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="label">Password</label>
                          <input
                            type="password"
                            {...register("password", {
                              required: true,
                              minLength: 6,
                              pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/,
                            })}
                            name="password"
                            placeholder="Type your password here"
                            className="input input-bordered w-full"
                          />
                          {errors.password?.type === "required" && (
                            <p className="text-red-600">Password is required</p>
                          )}
                          {errors.password?.type === "minLength" && (
                            <p className="text-red-600">
                              Password must be 6 characters
                            </p>
                          )}

                          {errors.password?.type === "pattern" && (
                            <p className="text-red-600">
                              Password must have one Uppercase one lower case
                              and one number.
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="label">Upload Image</label>
                          <input
                            {...register("photoURL", { required: true })}
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.6rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.6rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.6rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFile"
                          />
                          {errors.photoURL?.type === "required" && (
                            <p className="text-red-600">Photo is required</p>
                          )}
                        </div>
                        <div className="mb-2 pb-1 pt-1 text-center mt-6">
                          <input
                            type="submit"
                            value="Login"
                            className="  btn btn-block btn-primary text-white border-none"
                          />
                        </div>
                      </form>
                      {/* <button className="btn btn-block mb-12 bg-[#4285F4] border-none text-white">
                        Continue with Google
                      </button> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <Link to={"/register"}>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light"
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

export default Register;
