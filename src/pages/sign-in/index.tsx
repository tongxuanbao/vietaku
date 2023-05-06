import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex flex-1 flex-col items-center py-10">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
