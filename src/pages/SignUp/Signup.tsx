import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./signup.module.scss";
import eyeIcon from "../../assets/eye-icon.svg";
import { validateEmail } from "../../utils/validation";
import { authProvider } from "../../services/Auth/authProvider";
import OtpInput from "../../components/OtpInput/OtpInput";
import Swal from "sweetalert2";
import { ring } from "ldrs";
ring.register();

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [onOtpScreen, setOnOtpScreen] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [responseData, setResponseData] = useState({});
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e: any, setter: any, errorSetter: any) => {
    setter(e.target.value);
    errorSetter("");
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    let valid = true;
    let emailError = "";
    let confirmPasswordError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      valid = false;
      emailError = "Invalid email address";
    }

    if (password !== confirmPassword) {
      valid = false;
      confirmPasswordError = "Passwords do not match";
    }

    if (password.trim() === "") {
      valid = false;
      passwordError = "Password cannot be empty";
    }

    if (valid) {
      const response = await authProvider.signup(
        fullName,
        email,
        mobile,
        password,
        state,
        city
      );
      setIsDisabled(true);
      if (response.error) {
        setIsDisabled(false);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: response.error,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setResponseData(response);
        setOnOtpScreen(true);
        Swal.fire({
          icon: "success",
          title: "Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      setIsLoading(false);
      setEmailError(emailError);
      setConfirmPasswordError(confirmPasswordError);
      setPasswordError(passwordError);
    }
  };

  return (
    <div className={style.container}>
      <div>
        <div className={style.sub_container}>
          {onOtpScreen ? (
            <div className={style.otp_container}>
              <h3>Enter the OTP</h3>
              <OtpInput data={{ email, ...responseData }} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Create an account</h3>
              <div className={style.input_div}>
                <p>Full name</p>
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => handleChange(e, setFullName, () => {})}
                    placeholder="eg. Kashif Sheikh"
                  />
                </div>
              </div>
              <div
                className={`${style.input_div} ${
                  emailError ? style.error : ""
                }`}
              >
                <p>Email address</p>
                <div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => handleChange(e, setEmail, setEmailError)}
                    placeholder="eg. cyberguardkeyhub@gmail.com"
                  />
                  {emailError && <p className={style.errorMsg}>{emailError}</p>}
                </div>
              </div>
              <div className={style.input_div}>
                <p>Mobile number</p>
                <div>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => handleChange(e, setMobile, () => {})}
                    placeholder="eg. 0123456789"
                  />
                </div>
              </div>
              <div className={style.input_div}>
                <p>State</p>
                <div>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => handleChange(e, setState, () => {})}
                    placeholder="Enter your state"
                  />
                </div>
              </div>
              <div className={style.input_div}>
                <p>City</p>
                <div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => handleChange(e, setCity, () => {})}
                    placeholder="Enter your city"
                  />
                </div>
              </div>
              <div
                className={`${style.input_div} ${
                  passwordError ? style.error : ""
                }`}
              >
                <p>Password</p>
                <div className={style.eye_pass_div}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      handleChange(e, setPassword, setPasswordError)
                    }
                    placeholder="********"
                  />
                  <img
                    src={eyeIcon}
                    alt="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {passwordError && (
                  <p className={style.errorMsg}>{passwordError}</p>
                )}
              </div>
              <div
                className={`${style.input_div} ${
                  confirmPasswordError ? style.error : ""
                }`}
              >
                <p>Confirm Password</p>
                <div className={style.eye_pass_div}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setConfirmPassword,
                        setConfirmPasswordError
                      )
                    }
                    placeholder="********"
                  />
                  <img
                    src={eyeIcon}
                    alt="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
                {confirmPasswordError && (
                  <p className={style.errorMsg}>{confirmPasswordError}</p>
                )}
              </div>
              <button disabled={isDisabled} type="submit">
                {isLoading ? (
                  <l-ring
                    size="20"
                    stroke="3"
                    bg-opacity="0"
                    speed="2"
                    color="white"
                  ></l-ring>
                ) : (
                  "SignUp"
                )}
              </button>
              <p className={style.p_tag02}>Already have an account ?</p>
              <Link to={"/login"}>
                <p className={style.p_tag03}>Login</p>
              </Link>
            </form>
          )}
        </div>
        <div className={style.down_conatiner}>
          <p>Continue as a Guest</p>
          <Link to={"/"}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
