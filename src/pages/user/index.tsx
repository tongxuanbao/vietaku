import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex flex-1 flex-col items-center py-10">
    <UserProfile path="/user" routing="path" />
  </div>
);

export default UserProfilePage;
