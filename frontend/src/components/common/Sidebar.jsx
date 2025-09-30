import { BarChart2, GraduationCap, Menu, Settings, ShoppingBag, School, Notebook, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 

const SIDEBAR_ITEMS = [
	{
		name: "Dashboard",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{ name: "Schedule", icon: ShoppingBag, color: "#8B5CF6", href: "/schedule" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Teachers", icon: GraduationCap, color: "#10B981", href: "/teachers" },
	{ name: "Students", icon: Notebook, color: "#F59E0B", href: "/students" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {

	const user = useSelector((state) => state.Auth.user);
	const userRole = user ? user.role : null;
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	
	const filteredSidebarItems = SIDEBAR_ITEMS.filter((item) => {
		if (userRole === 'HOD') {
			return true;
		}
		if (userRole === 'Teacher') {
			return item.name === 'Dashboard' || item.name === 'Students' || item.name === 'Settings';
		}
		if (userRole === 'Student') {
			return item.name === 'Dashboard' || item.name === 'Settings';
		}
		return false; 
	});

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{filteredSidebarItems.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
