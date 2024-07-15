import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { GenericPaths } from "../../services/genericPaths";
import { localStorageProvider } from "../../utils/methods";
import style from "./profile.module.scss";
import Swal from "sweetalert2";
import { addAuthData } from "../../redux/slices/authSlice";
import { authProvider } from "../../services/Auth/authProvider";

const authFromLocalStorage = localStorageProvider.get(
  GenericPaths.AUTH_DATA_LOCAL_STORAGE
);

export default function Profile({ load, setLoad }: any) {
  const dispatch = useAppDispatch();
  const [profileData, setProfileData] = useState({
    accessToken: "",
    city: "",
    email: "",
    isAuthenticated: true,
    name: "",
    phoneNo: "",
    refreshToken: "",
    state: "",
    userId: "",
  });
  const authFromRedux: any = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;

  const updateProfileData = (key: any, value: any) => {
    setProfileData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(addAuthData({ ...authFromRedux, ...profileData }));
    localStorageProvider.save(GenericPaths.AUTH_DATA_LOCAL_STORAGE, {
      ...authFromRedux,
      ...profileData,
    });
    const response: any = await authProvider.updateUser(profileData.userId, {
      name: profileData?.name,
      email: profileData?.email,
      phoneNo: profileData?.phoneNo,
      city: profileData?.city,
      state: profileData?.state,
    });
    if (response.error) {
      Swal.fire({
        icon: "error",
        title: response.error,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoad(!load);
  };

  useEffect(() => {
    if (authData) {
      setProfileData(
        localStorageProvider.get(GenericPaths.AUTH_DATA_LOCAL_STORAGE)
      );
    }
  }, [authData, load]);

  return (
    <>
      <div className={style.container_div}>
        <div className={style.heading_div}>
          <h3>Profile details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.main_div}>
            <div className={style.input_container}>
              <p>Full name</p>
              <div className={style.input_div}>
                <p>:</p>
                <div className={style.input}>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => updateProfileData("name", e.target.value)}
                  />
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.9679 2.03261C13.5206 1.58529 12.9139 1.33398 12.2812 1.33398C11.6486 1.33398 11.0419 1.58529 10.5946 2.03261L2.62658 10.0006C2.35577 10.2714 2.16538 10.6121 2.07658 10.9846L1.34658 14.0526C1.32681 14.1357 1.32867 14.2225 1.35196 14.3047C1.37526 14.3869 1.41922 14.4617 1.47965 14.5221C1.54008 14.5824 1.61497 14.6263 1.69718 14.6495C1.77939 14.6727 1.86617 14.6745 1.94924 14.6546L5.01658 13.9239C5.38937 13.8353 5.73024 13.6449 6.00125 13.3739L13.9679 5.40728C14.4152 4.95994 14.6665 4.35323 14.6665 3.72061C14.6665 3.08799 14.4152 2.48128 13.9679 2.03395V2.03261ZM11.3012 2.73928C11.4299 2.61058 11.5827 2.5085 11.7509 2.43885C11.919 2.3692 12.0992 2.33335 12.2812 2.33335C12.4632 2.33335 12.6435 2.3692 12.8116 2.43885C12.9798 2.5085 13.1325 2.61058 13.2612 2.73928C13.3899 2.86798 13.492 3.02076 13.5617 3.18891C13.6313 3.35706 13.6672 3.53728 13.6672 3.71928C13.6672 3.90128 13.6313 4.0815 13.5617 4.24965C13.492 4.4178 13.3899 4.57058 13.2612 4.69928L12.6666 5.29328L10.7066 3.33395L11.3012 2.73995V2.73928ZM9.99991 4.04195L11.9599 6.00061L5.29325 12.6673C5.15325 12.8073 4.97725 12.9053 4.78458 12.9513L2.50724 13.4939L3.04924 11.2166C3.09524 11.0233 3.19391 10.8473 3.33391 10.7073L9.99991 4.04061V4.04195Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={style.input_container}>
              <p>Mobile number</p>
              <div className={style.input_div}>
                <p>:</p>
                <div className={style.input}>
                  <input
                    type="text"
                    value={profileData.phoneNo}
                    onChange={(e) =>
                      updateProfileData("phoneNo", e.target.value)
                    }
                  />
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.9679 2.03261C13.5206 1.58529 12.9139 1.33398 12.2812 1.33398C11.6486 1.33398 11.0419 1.58529 10.5946 2.03261L2.62658 10.0006C2.35577 10.2714 2.16538 10.6121 2.07658 10.9846L1.34658 14.0526C1.32681 14.1357 1.32867 14.2225 1.35196 14.3047C1.37526 14.3869 1.41922 14.4617 1.47965 14.5221C1.54008 14.5824 1.61497 14.6263 1.69718 14.6495C1.77939 14.6727 1.86617 14.6745 1.94924 14.6546L5.01658 13.9239C5.38937 13.8353 5.73024 13.6449 6.00125 13.3739L13.9679 5.40728C14.4152 4.95994 14.6665 4.35323 14.6665 3.72061C14.6665 3.08799 14.4152 2.48128 13.9679 2.03395V2.03261ZM11.3012 2.73928C11.4299 2.61058 11.5827 2.5085 11.7509 2.43885C11.919 2.3692 12.0992 2.33335 12.2812 2.33335C12.4632 2.33335 12.6435 2.3692 12.8116 2.43885C12.9798 2.5085 13.1325 2.61058 13.2612 2.73928C13.3899 2.86798 13.492 3.02076 13.5617 3.18891C13.6313 3.35706 13.6672 3.53728 13.6672 3.71928C13.6672 3.90128 13.6313 4.0815 13.5617 4.24965C13.492 4.4178 13.3899 4.57058 13.2612 4.69928L12.6666 5.29328L10.7066 3.33395L11.3012 2.73995V2.73928ZM9.99991 4.04195L11.9599 6.00061L5.29325 12.6673C5.15325 12.8073 4.97725 12.9053 4.78458 12.9513L2.50724 13.4939L3.04924 11.2166C3.09524 11.0233 3.19391 10.8473 3.33391 10.7073L9.99991 4.04061V4.04195Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={style.input_container}>
              <p>Email address</p>
              <div className={style.input_div}>
                <p>:</p>
                <div className={style.input}>
                  <input
                    type="text"
                    value={profileData.email}
                    onChange={(e) => updateProfileData("email", e.target.value)}
                  />
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.9679 2.03261C13.5206 1.58529 12.9139 1.33398 12.2812 1.33398C11.6486 1.33398 11.0419 1.58529 10.5946 2.03261L2.62658 10.0006C2.35577 10.2714 2.16538 10.6121 2.07658 10.9846L1.34658 14.0526C1.32681 14.1357 1.32867 14.2225 1.35196 14.3047C1.37526 14.3869 1.41922 14.4617 1.47965 14.5221C1.54008 14.5824 1.61497 14.6263 1.69718 14.6495C1.77939 14.6727 1.86617 14.6745 1.94924 14.6546L5.01658 13.9239C5.38937 13.8353 5.73024 13.6449 6.00125 13.3739L13.9679 5.40728C14.4152 4.95994 14.6665 4.35323 14.6665 3.72061C14.6665 3.08799 14.4152 2.48128 13.9679 2.03395V2.03261ZM11.3012 2.73928C11.4299 2.61058 11.5827 2.5085 11.7509 2.43885C11.919 2.3692 12.0992 2.33335 12.2812 2.33335C12.4632 2.33335 12.6435 2.3692 12.8116 2.43885C12.9798 2.5085 13.1325 2.61058 13.2612 2.73928C13.3899 2.86798 13.492 3.02076 13.5617 3.18891C13.6313 3.35706 13.6672 3.53728 13.6672 3.71928C13.6672 3.90128 13.6313 4.0815 13.5617 4.24965C13.492 4.4178 13.3899 4.57058 13.2612 4.69928L12.6666 5.29328L10.7066 3.33395L11.3012 2.73995V2.73928ZM9.99991 4.04195L11.9599 6.00061L5.29325 12.6673C5.15325 12.8073 4.97725 12.9053 4.78458 12.9513L2.50724 13.4939L3.04924 11.2166C3.09524 11.0233 3.19391 10.8473 3.33391 10.7073L9.99991 4.04061V4.04195Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={style.input_container}>
              <p>City</p>
              <div className={style.input_div}>
                <p>:</p>
                <div className={style.input}>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => updateProfileData("city", e.target.value)}
                  />
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.9679 2.03261C13.5206 1.58529 12.9139 1.33398 12.2812 1.33398C11.6486 1.33398 11.0419 1.58529 10.5946 2.03261L2.62658 10.0006C2.35577 10.2714 2.16538 10.6121 2.07658 10.9846L1.34658 14.0526C1.32681 14.1357 1.32867 14.2225 1.35196 14.3047C1.37526 14.3869 1.41922 14.4617 1.47965 14.5221C1.54008 14.5824 1.61497 14.6263 1.69718 14.6495C1.77939 14.6727 1.86617 14.6745 1.94924 14.6546L5.01658 13.9239C5.38937 13.8353 5.73024 13.6449 6.00125 13.3739L13.9679 5.40728C14.4152 4.95994 14.6665 4.35323 14.6665 3.72061C14.6665 3.08799 14.4152 2.48128 13.9679 2.03395V2.03261ZM11.3012 2.73928C11.4299 2.61058 11.5827 2.5085 11.7509 2.43885C11.919 2.3692 12.0992 2.33335 12.2812 2.33335C12.4632 2.33335 12.6435 2.3692 12.8116 2.43885C12.9798 2.5085 13.1325 2.61058 13.2612 2.73928C13.3899 2.86798 13.492 3.02076 13.5617 3.18891C13.6313 3.35706 13.6672 3.53728 13.6672 3.71928C13.6672 3.90128 13.6313 4.0815 13.5617 4.24965C13.492 4.4178 13.3899 4.57058 13.2612 4.69928L12.6666 5.29328L10.7066 3.33395L11.3012 2.73995V2.73928ZM9.99991 4.04195L11.9599 6.00061L5.29325 12.6673C5.15325 12.8073 4.97725 12.9053 4.78458 12.9513L2.50724 13.4939L3.04924 11.2166C3.09524 11.0233 3.19391 10.8473 3.33391 10.7073L9.99991 4.04061V4.04195Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={style.input_container}>
              <p>State</p>
              <div className={style.input_div}>
                <p>:</p>
                <div className={style.input}>
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) => updateProfileData("state", e.target.value)}
                  />
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.9679 2.03261C13.5206 1.58529 12.9139 1.33398 12.2812 1.33398C11.6486 1.33398 11.0419 1.58529 10.5946 2.03261L2.62658 10.0006C2.35577 10.2714 2.16538 10.6121 2.07658 10.9846L1.34658 14.0526C1.32681 14.1357 1.32867 14.2225 1.35196 14.3047C1.37526 14.3869 1.41922 14.4617 1.47965 14.5221C1.54008 14.5824 1.61497 14.6263 1.69718 14.6495C1.77939 14.6727 1.86617 14.6745 1.94924 14.6546L5.01658 13.9239C5.38937 13.8353 5.73024 13.6449 6.00125 13.3739L13.9679 5.40728C14.4152 4.95994 14.6665 4.35323 14.6665 3.72061C14.6665 3.08799 14.4152 2.48128 13.9679 2.03395V2.03261ZM11.3012 2.73928C11.4299 2.61058 11.5827 2.5085 11.7509 2.43885C11.919 2.3692 12.0992 2.33335 12.2812 2.33335C12.4632 2.33335 12.6435 2.3692 12.8116 2.43885C12.9798 2.5085 13.1325 2.61058 13.2612 2.73928C13.3899 2.86798 13.492 3.02076 13.5617 3.18891C13.6313 3.35706 13.6672 3.53728 13.6672 3.71928C13.6672 3.90128 13.6313 4.0815 13.5617 4.24965C13.492 4.4178 13.3899 4.57058 13.2612 4.69928L12.6666 5.29328L10.7066 3.33395L11.3012 2.73995V2.73928ZM9.99991 4.04195L11.9599 6.00061L5.29325 12.6673C5.15325 12.8073 4.97725 12.9053 4.78458 12.9513L2.50724 13.4939L3.04924 11.2166C3.09524 11.0233 3.19391 10.8473 3.33391 10.7073L9.99991 4.04061V4.04195Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={style.btn}>
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
