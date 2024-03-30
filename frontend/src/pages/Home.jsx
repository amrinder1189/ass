import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn
      ? `${authState.user.name}'s tasks`
      : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="bg-indigo-600 text-white h-[40vh] py-8 text-center">
            <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
            <Link
              to="/signup"
              className="mt-8 text-xl font-semibold inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 hover:text-white transition duration-300"
            >
              Join now to manage your tasks{" "}
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl mt-8 mb-4 mx-8 border-b border-gray-300 pb-2">
              Welcome {authState.user.name}
            </h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
