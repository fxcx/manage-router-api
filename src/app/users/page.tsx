import UsersPage from "@/sectionsPages/users/usersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "User management page",
};

export default function UsersIPage() {
  return (
    <main >
      <UsersPage />
      <h2 className="text-2xl font-bold mt-4">User Management</h2>
    </main>
  );
}