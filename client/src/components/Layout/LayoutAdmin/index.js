import Header from "src/components/Header"

const LayoutAdmin = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayoutAdmin;