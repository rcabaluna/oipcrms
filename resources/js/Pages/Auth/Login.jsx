import { LoginForm } from "@/Components/auth/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-lg flex-col gap-6 items-center">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-md"
                    />
                </a>
                <div className="flex items-center justify-center w-full">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
