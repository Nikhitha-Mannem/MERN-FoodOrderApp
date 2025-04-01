import Header from "./Header";
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
      <div className="layout-wrapper" style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </div>
    );
  };
  export default MainLayout;