import Footer from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

const Layout = ({ children, hidden }) => {
  return (
    <>
      {!hidden ? (
        <>
          <Header />
          <div className="container mx-auto mt-20">{children}</div>
          <Footer />
        </>
      ) : (
        <div className="container mx-auto mt-5">{children}</div>
      )}
    </>
  );
};

export default Layout;
