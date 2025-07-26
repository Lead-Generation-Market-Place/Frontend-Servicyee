import LoginForm from "@/components/users/auth/login/LoginForm";


export default function LoginPage() {
  return (
    <div className="flex  flex-col items-center justify-center gap-6 p-6 md:p-10 bg-white dark:bg-gray-900  px-2">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
