import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react'; 
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    // Get auth data from the page props
    const { auth } = usePage().props;

    // Debugging log to check auth data
    console.log("Auth from usePage:", auth);

    // Safe check for auth and user
    if (!auth || !auth.user) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">Loading User Session...</div>
                    <p className="text-gray-500">පරිශීලක දත්ත පද්ධතියට ලැබෙන තෙක් මඳක් රැඳී සිටින්න.</p>
                    <p className="mt-2 text-xs text-red-400">Auth is still undefined. Please check HandleInertiaRequests.php</p>
                </div>
            </div>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile data reupdate */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* pwd change */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* acc dlet*/}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}