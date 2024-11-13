"use client";  // Đảm bảo đây là một Client Component
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../public/EyeSlashFilledIcon";
import { useState, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import apiClient from "../lib/api-client";
import { LOGIN_ROUTES } from "../utils/constants";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [maNV, setMaNV] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post(LOGIN_ROUTES, {
        NV_Ma: maNV,  // Chuyển sang maNV thay vì email
        NV_MatKhau: password,
      });
      login(response.data);  // Lưu thông tin đăng nhập từ API
      setError("");
    } catch (err) {
      setError("Sai mã nhân viên hoặc mật khẩu");  // Thông báo lỗi nếu có
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-slate-400">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <Input
          type="text"
          label="Mã Nhân Viên"
          variant="bordered"
          value={maNV}
          onChange={(e) => setMaNV(e.target.value)}
          className="max-w-xs"
          required
        />
        
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-white pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-white pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="max-w-xs"
          required
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>  // Hiển thị lỗi nếu có
        )}

        <Button
          type="submit"
          color="primary"
          isLoading={loading}  // Hiển thị trạng thái loading khi đang gửi
          disabled={loading}
          className="w-full max-w-xs mt-4"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
}
