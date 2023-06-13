import React, { useContext, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import svgImg from "../../assets/signin/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthContextProvider } from "../../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const imageHostingToken = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;

const Register = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const [imageURL, setImageURL] = useState("");
  //   console.log("img--->", imageURL);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { createUser, googleLogin } = useContext(AuthContextProvider);

  //   Onsubmit register -------------------------->

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.photoURL[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          setImageURL(imgURL);

          createUser(data.email, data.password)
            .then((result) => {
              const registeredUser = result.user;
              updateProfile(registeredUser, {
                displayName: data.name,
                photoURL: imgURL,
              });

              const newCreatedUser = {
                name: data.name,
                email: data.email,
                photoURL: imgURL,
                role: "student",
              };
              fetch("https://play-guru-server.vercel.app", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(newCreatedUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    reset();
                    Swal.fire({
                      title: "Success!",
                      text: "Registration Successfully",
                      icon: "success",
                      confirmButtonText: "Okay",
                    });
                    navigate("/");
                  }
                })
                .catch((error) => console.log(error));
            })
            .catch((err) => console.log(err.message));
        } else {
          console.error("Image upload failed:", imgResponse.error);
        }
      })
      .catch((error) => {
        console.error("Error during image upload:", error);
      });
  };

  //   google login -------------------------->
  const continueWithGoogle = () => {
    googleLogin()
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const newCreatedUser = {
          name: displayName,
          email: email,
          photoURL: photoURL,
          role: "student",
        };
        fetch("https://play-guru-server.vercel.app", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newCreatedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Registration Successfully",
                icon: "success",
                confirmButtonText: "Okay",
              });
            }
            navigate("/");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error("Google login error:", error);
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
                          Please Register
                        </h4>

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
                        <div className=" pb-1 pt-1 text-center mt-6">
                          <input
                            type="submit"
                            value="Create Account"
                            className="  btn btn-block btn-primary text-white border-none"
                          />
                        </div>
                      </form>
                      <button
                        onClick={continueWithGoogle}
                        className="btn btn-block mb-12 bg-[#4285F4] border-none text-white"
                      >
                        Continue with Google
                      </button>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <Link to={"/login"}>
                          <button className="btn btn-accent text-white">
                            Login
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
