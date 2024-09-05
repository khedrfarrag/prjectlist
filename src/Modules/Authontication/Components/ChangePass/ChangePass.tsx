import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../../../constans/VALIDATIONS";
import axios from "axios";
import { AuthorizedToken, USERS_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";

export default function ChangePass() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onBlur" });

  const toggleVisibility = (setterFunction: any) => {
    setterFunction((prevState: any) => !prevState);
  };

  const onSubmit =  async(data: any) => {
    try {
      const response: any =await axios.put(USERS_URLs.ChangePassword, AuthorizedToken, data);
      toast.success(
        response.data.message || "Your password has been successfully changed!"
      );
    } catch (error: any) {
      toast.error(
        error.message || "Password change unsuccessful. Please try again"
      );
    }
  };

  return (
    <>
      <div className="auth-title my-4">
        <p className="text-white">Welcome to PMS</p>
        <h3 className="main-color title">
          <span className="frist-ch position-relative">C</span>hange Password
        </h3>
      </div>

      <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <label className="main-color my-1">Old Password</label>
          <div className="input-group">
            <input
              type={showOldPassword ? "text" : "password"}
              className="form-control form-input"
              placeholder="Enter your Old Password"
              aria-label="oldPassword"
              {...register("oldPassword", PasswordValidation)}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => toggleVisibility(setShowOldPassword)}
              className="input-group-text bg-transparent border-0"
            >
              <span className="sr-only">
                {showOldPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showOldPassword
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.oldPassword && (
            <span className="text-danger">
              {String(errors.oldPassword.message)}
            </span>
          )}
        </div>

        <div className="my-4">
          <label className="main-color my-1">New Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-input "
              placeholder="Enter your New Password"
              aria-label="newPassword"
              {...register("newPassword", PasswordValidation)}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => toggleVisibility(setShowPassword)}
              className="input-group-text bg-transparent border-0"
            >
              <span className="sr-only">
                {showPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showPassword
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.newPassword && (
            <span className="text-danger">
              {String(errors.newPassword.message)}
            </span>
          )}
        </div>

        <div className="my-4">
          <label className="main-color my-">Confirm New Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control form-input "
              placeholder="Confirm New Password"
              aria-label="confirmNewPassword"
              {...register("confirmNewPassword", {
                validate: (value) =>
                  value === getValues("newPassword") || "password dont match",
              })}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => toggleVisibility(setShowConfirmPassword)}
              className="input-group-text bg-transparent border-0"
            >
              <span className="sr-only">
                {showConfirmPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showConfirmPassword
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.confirmNewPassword && (
            <span className="text-danger">
              {String(errors.confirmNewPassword.message)}
            </span>
          )}
        </div>


        <div className="main-bg-color rounded-pill py-1 py-md-2">
          <button
            type="submit"
            className="btn text-white border-0  w-100 rounded-pill"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
