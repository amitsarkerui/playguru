import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContextProvider } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const imageHostingToken = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;

const AddClass = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const { user } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("image", data.image_url[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const newClass = {
            className: data.className,
            instructor: user.displayName,
            instructor_email: user.email,
            duration: data.duration,
            description: data.description,
            capacity: data.capacity,
            enrolledStudents: 0,
            location: data.location,
            price: data.price,
            image_url: imgURL,
            status: "pending",
          };
          //   console.log(newClass);
          axiosSecure.post("/classes", newClass).then((res) => {
            // console.log(res.data);
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class added successfully !",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } else {
          console.error("Image upload failed:", imgResponse.error);
        }
      })
      .catch((error) => {
        console.error("Error during image upload:", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Add Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="mb-4">
            <label className="label">Class Name</label>
            <input
              type="text"
              {...register("className", { required: true })}
              name="className"
              placeholder="Class Name here"
              className="input input-bordered w-full"
            />
            {errors.className?.type === "required" && (
              <p className="text-red-600">Class Name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label">Duration (in weeks)</label>
            <input
              type="text"
              {...register("duration", { required: true })}
              placeholder="Duration: i.e : 6 weeks"
              className="input input-bordered w-full"
            />
            {errors.duration?.type === "required" && (
              <p className="text-red-600">Duration is required</p>
            )}
          </div>
        </span>
        <span className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="mb-4">
            <label className="label">Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              name="description"
              placeholder="Description here"
              className="input input-bordered w-full"
            />
            {errors.description?.type === "required" && (
              <p className="text-red-600">Description is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label">Total seat</label>
            <input
              type="number"
              {...register("capacity", { required: true })}
              placeholder="Total number of seats"
              className="input input-bordered w-full"
            />
            {errors.capacity?.type === "required" && (
              <p className="text-red-600">Total seat is required</p>
            )}
          </div>
        </span>
        <span className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="mb-4">
            <label className="label">Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              name="location"
              placeholder="Location here"
              className="input input-bordered w-full"
            />
            {errors.location?.type === "required" && (
              <p className="text-red-600">Location is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price of the course"
              className="input input-bordered w-full"
            />
            {errors.price?.type === "required" && (
              <p className="text-red-600">Price is required</p>
            )}
          </div>
        </span>
        <div className="mb-4">
          <label className="label">Upload Image</label>
          <input
            {...register("image_url", { required: true })}
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.6rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.6rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.6rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="formFile"
          />
          {errors.image_url?.type === "required" && (
            <p className="text-red-600">Photo is required</p>
          )}
        </div>
        <div className="pb-1 pt-1 text-center mt-6">
          <input
            type="submit"
            value="+ Add Class"
            className="btn btn-block btn-primary text-white border-none"
          />
        </div>
      </form>
    </div>
  );
};

export default AddClass;
