import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface inputProps {
  label: string;
  value: any;
  type: string;
  name: string;
  placeholder: string;
}

export default function Input({
  label,
  value,
  type,
  name,
  placeholder,
}: inputProps) {
  if (type === "password") {
    const [showPassword, setShowPassword] = useState(false);
    function togglePassword() {
      showPassword ? setShowPassword(false) : setShowPassword(true);
    }
    return (
      <div className="input">
        <label className="label">{label}</label>
        <div className="password">
          <input
            type={showPassword ? "text" : type}
            name={name}
            placeholder={placeholder}
            className="inputTag"
            autoComplete="current-password"
          />
          <span className="showPassword" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="input">
        <label className="label">{label}</label>
        <select name={name} className="inputTag" defaultValue={value}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    );
  } else {
    return (
      <div className="input">
        <label className="label">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="inputTag"
          defaultValue={value}
          autoComplete={
            name === "email" ? "email" : name === "username" ? "username" : ""
          }
        />
      </div>
    );
  }
}
