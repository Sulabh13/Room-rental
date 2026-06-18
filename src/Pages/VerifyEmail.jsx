import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await API.get(
          `/auth/verify-email/${token}`
        );

        setMessage(res.data.message);
      } catch (error) {
        setMessage(
          error?.response?.data?.message ||
          "Verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[400px]">

        <h1 className="text-2xl font-bold mb-4">
          Email Verification
        </h1>

        {loading ? (
          <p>Verifying...</p>
        ) : (
          <>
            <p className="mb-5">
              {message}
            </p>

            <Link
              to="/login"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Go To Login
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;