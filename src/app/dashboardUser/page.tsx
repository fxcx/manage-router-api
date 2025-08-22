import AdminVerify  from '@/sectionsPages/dashboarUser/dashboardUser'


export const metadata = {
  title: 'Dashboard Users',
  description: 'Manage users in the dashboard',
};

export default function DashboardUser() {
  return (
    <main>
      <AdminVerify />
    </main>
  );
}