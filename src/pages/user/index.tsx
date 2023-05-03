import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex flex-1 flex-col py-10">
    <UserProfile path="/user" routing="path" />
  </div>
);

export default UserProfilePage;
