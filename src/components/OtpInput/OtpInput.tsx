import React, { useRef, useState } from "react";
import style from "./otpInput.module.scss";
import Swal from "sweetalert2";
import { authProvider } from "../../services/Auth/authProvider";
import { useNavigate } from "react-router-dom";
import { ring } from "ldrs";
import { useAppDispatch } from "../../hooks/hooks";
import { addAuthData } from "../../redux/slices/authSlice";
ring.register();

export default function OtpInput({ data }: any) {
  let length = 6;
  const inputRefs = Array.from({ length }, () =>
    useRef<HTMLInputElement | null>(null)
  );
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setError(null);
    if (!isNaN(Number(value))) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < length - 1 && value !== "") {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleInputKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (!isNaN(Number(value))) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits.");
    } else {
      setIsLoading(true);
      setIsDisabled(true);
      setError(null);
      let response: any = await authProvider.verifyOtp(
        // otp.join(""), // TODO uncomment this and remove data.otp
        data.otp,
        data.otp_token,
        data.email
      );
      if (response.error) {
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
          title: "Sign Up successfull",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/");
      }
    }
  };

  return (
    <div className={style.otp_inputs_container}>
      <div className={style.otp_inputs}>
        {otp.map((digit, index) => (
          <input
            className={style.otp_input}
            key={index}
            ref={inputRefs[index]}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleInputKeyDown(index, e)}
            onPaste={handleInputPaste}
          />
        ))}
      </div>
      <button
        disabled={isDisabled}
        type="submit"
        className={style.submitButton}
        onClick={handleSubmit}
      >
        {isLoading ? (
          <l-ring
            size="20"
            stroke="3"
            bg-opacity="0"
            speed="2"
            color="white"
          ></l-ring>
        ) : (
          "Submit"
        )}
      </button>
      {error && <p className={style.errorMessage}>{error}</p>}
    </div>
  );
}
