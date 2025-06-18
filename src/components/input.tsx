import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface inputProps {
  label: string;
  type: string;
  name: string;
  width?: string;
  placeholder: string;
}

export default function Input({
  label,
  type,
  name,
  width,
  placeholder,
}: inputProps) {
  if (type === "password") {
    const [showPassword, setShowPassword] = useState(false);
    function togglePassword() {
      showPassword ? setShowPassword(false) : setShowPassword(true);
    }
    return (
      <div className="input" style={{ width: `${width ? width : "100%"}` }}>
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
      <div className="input" style={{ width: `${width ? width : "100%"}` }}>
        <label className="label">{label}</label>
        <select name={name} className="inputTag" value={""} id="inputSelect">
          <option value="" disabled hidden>
            Select...
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    );
  } else if (type === "file") {
    const [filename, setFilename] = useState<any>("Choose file...");
    const [fileurl, setFileurl] = useState<any>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    function handleBtn() {
      fileInputRef.current?.click();
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      const url = URL.createObjectURL(file ? file : new Blob());
      setFileurl(url);
      setFilename(file?.name);
    }

    return (
      <div className="input" style={{ width: `${width ? width : "100%"}` }}>
        <label className="label">{label}</label>
        <input
          type={type}
          name={name}
          accept="image/*"
          placeholder={placeholder}
          className="inputTag"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <div className="select-image-btn" onClick={handleBtn}>
          {typeof fileurl === "string" ? (
            <img src={fileurl} className="select-image" />
          ) : (
            ""
          )}
          <span className="select-image-text">{filename}</span>
        </div>
      </div>
    );
  } else {
    const [newValue, setValue] = useState<string | undefined>();
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
    }
    return (
      <div className="input" style={{ width: `${width ? width : "100%"}` }}>
        <label className="label">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="inputTag"
          defaultValue={newValue}
          onChange={handleInput}
          autoComplete={
            name === "email" ? "email" : name === "username" ? "username" : ""
          }
        />
      </div>
    );
  }
}
