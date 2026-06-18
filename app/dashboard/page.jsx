import AccountDashboard from "@/components/AccountDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AccountDashboard />
    </ProtectedRoute>
  );
}
