import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}
