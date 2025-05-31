"use client"

export const SideBar = () => {
  const toggleSidebar = () => {
    const sidebar: any = document.getElementById("sidebar");
    const overlay: any = document.querySelector(".sidebar-overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  const closeSidebar = () => {
    const sidebar: any = document.getElementById("sidebar");
    const overlay: any = document.querySelector(".sidebar-overlay");

    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="sidebar-overlay" onClick={closeSidebar}></div>
    </>
  );
};
