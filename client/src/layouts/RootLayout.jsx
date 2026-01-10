import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}
