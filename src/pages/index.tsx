import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const user = useUser();

  return (
    <>
      <Head>
        <title>Vietaku</title>
        <meta name="description" content="Trang chủ của vietaku" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{user.isSignedIn ? <SignOutButton /> : <SignInButton />}</div>
    </>
  );
};

export default Home;
