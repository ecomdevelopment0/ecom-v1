import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import eyeIcon from "../../assets/eye-icon.svg";
import { validateEmail } from "../../utils/validation";
import { authProvider } from "../../services/Auth/authProvider";
import Swal from "sweetalert2";
import { ring } from "ldrs";
import { useAppDispatch } from "../../hooks/hooks";
import { addAuthData } from "../../redux/slices/authSlice";
ring.register();

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e: any, setter: any, errorSetter: any) => {
    setter(e.target.value);
    errorSetter("");
  };
  const handleSubmit = async (e:any) => {
    setIsLoading(true);
    e.preventDefault();
    let valid = true;
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      valid = false;
      emailError = "Invalid email address";
    }

    if (password.trim() === "") {
      valid = false;
      passwordError = "Password cannot be empty";
    }

    if (valid) {
      const response = await authProvider.login(
        email,
        password
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
        dispatch(addAuthData(response));
        authProvider.syncAuthProvider();
        Swal.fire({
          icon: "success",
          title: "Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } else {
      setIsLoading(false);
      setIsDisabled(false);
      setEmailError(emailError);
      setPasswordError(passwordError);
    }
  };

  return (
    <div className={style.container}>
      <div>
        <div className={style.sub_container}>
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div
              className={`${style.input_div} ${emailError ? style.error : ""}`}
            >
              <p>Email Address</p>
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
                  onChange={(e) => handleChange(e, setPassword, setPasswordError)}
                  placeholder="********"
                />
                <img
                  src={eyeIcon}
                  alt="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
                {passwordError && <p className={style.errorMsg}>{passwordError}</p>}
            </div>
            <p className={style.p_tag01}>
              By continuing, you agree to cyberguardkeyhub's{" "}
              <span>Conditions of Use</span> and <span>Privacy Notice.</span>
            </p>
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
                  "Login"
                )}
              </button>
            <p className={style.p_tag02}>Don’t have an account ?</p>
            <Link to={"/sign-up"}>
              <p className={style.p_tag03}>Sign up</p>
            </Link>
          </form>
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
