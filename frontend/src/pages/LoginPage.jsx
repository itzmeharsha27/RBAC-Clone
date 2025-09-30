import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndPoint";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../Redux/AuthSlice";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({ email: "", password: "" });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const request = await post("/api/auth/login", formData);
			const response = request.data;
			//console.log(response.token);
			const expires = new Date(Date.now() + 36000 * 1000).toUTCString(); // Set expiry to 36000 seconds from now
			document.cookie = `token=${response.token}; path=/; expires=${expires}; secure; SameSite=None`;


			if (request.status === 200) {
				
				if (response.user.role === "HOD") {
					navigate("/");
				} else {
					navigate("/");
				}
				
				toast.success(response.message);
				
				dispatch(SetUser(response.user));
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<motion.div
			className="flex items-center justify-center min-h-screen bg-gray-900"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 max-w-md w-full">
				<h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
					Login
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-400 text-sm font-medium mb-2"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-400 text-sm font-medium mb-2"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
					>
						Login
					</button>
				</form>
				<p className="text-gray-400 text-sm text-center mt-4">
					Don't have an account?{" "}
					<Link to="/signup" className="text-blue-500 hover:text-blue-600">
						Sign Up
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default Login;
