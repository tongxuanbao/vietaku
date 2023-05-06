import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="flex flex-1 flex-col items-center py-10">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
