import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardCards from '../../components/DashboardCards';

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: 16 }}>
        <h1>Dashboard</h1>
        <DashboardCards />
      </main>
      <Footer />
    </div>
  );
}

