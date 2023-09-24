"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchuser() {
      const response = await axios.get("/api/users/userdata");
      console.log("data user", response);
      if(response.data.status == 201){
        setUser({})
        setIsLoggedIn(false);
      }
      else if (response.data.data && response.data.data._id) {
        setIsLoggedIn(true);
        setUser(response.data.data);
      }
    }
    fetchuser();
  }, []);

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push("/login")
    }, 1000); 
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message)
      setIsLoggedIn(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div className="w-100 d-flex justify-content-between px-4">
          <h4 className="">Next Authentication with Me</h4>
          {isLoggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      {isLoading ? (
        <div className="w-100 d-flex justify-content-center my-4 pt-4">
          <BallTriangle
            height={200}
            width={200}
            radius={5}
            color="#03e9f4"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <h1 className="text-primary text-center mt-5 pt-5">
            Hello &nbsp;
            <span className="text-warning text-decoration-underline">
              {isLoggedIn ? user.userName && user.userName : "Guest"}
            </span>
          </h1>
          <div className="w-100 d-flex justify-content-center pt-5">
            {isLoggedIn ? (
              <button className="btn btn-light" onClick={()=> router.push(`/user/${user._id}`)}>
                Click here for more details
              </button>
            ) : (
              <p className="text-white">Pls login to see more</p>
            )}
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </>
  );
}
