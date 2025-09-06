import SignupForm from '@/components/authentication/SignupForm';

export default function SignupPage() {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-gray-100 flex-col px-4 sm:px-6 lg:px-8">
      <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 my-3">
            Sign Up for your account
          </h2>
        </div>
      <SignupForm />
    </div>
  )
}