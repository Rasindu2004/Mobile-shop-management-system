import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import DarkModeToggle from '@/Components/DarkModeToggle'; // Aluthen hadapu component eka

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 transition-colors duration-500 dark:bg-gray-900">
            
            {/* Dark Mode Toggle Button */}
            <div className="absolute top-4 right-4">
                <DarkModeToggle />
            </div>

            <div>
                <Link href="/">
                    {/*dark mode logo*/}
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500 dark:text-gray-300" />
                </Link>
            </div>

            {/* Card: Dark mode used bg-gray-800  */}
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800 dark:shadow-gray-700 transition-colors duration-500">
                <div className="dark:text-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
}