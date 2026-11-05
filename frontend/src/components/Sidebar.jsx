import {
  Building2, GraduationCap, BookOpen, Wallet, Briefcase,
  MapPin, Package, LifeBuoy, LogOut,
} from "lucide-react";

const MAIN_LINKS = [
  { label: "Franchise Management", icon: Building2, active: true },
  { label: "Student Management", icon: GraduationCap },
  { label: "LMS", icon: BookOpen },
  { label: "Finance", icon: Wallet },
  { label: "HRMS", icon: Briefcase },
  { label: "Centers", icon: MapPin },
];

const SECONDARY_LINKS = [
  { label: "Assets", icon: Package },
  { label: "Support", icon: LifeBuoy },
];

function NavItem({ label, icon: Icon, active }) {
  return (
    <a href="#" className={`nav-item ${active ? "active" : ""}`} onClick={(e) => e.preventDefault()}>
      <Icon size={16} />
      <span>{label}</span>
    </a>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        {MAIN_LINKS.map((link) => <NavItem key={link.label} {...link} />)}
        <hr />
        {SECONDARY_LINKS.map((link) => <NavItem key={link.label} {...link} />)}
      </nav>
      <button type="button" className="logout">
        <LogOut size={16} /> Log Out
      </button>
    </aside>
  );
}
