import { Navbar } from "../../components/navbar";

const DefaultTemplate = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-16">
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export { DefaultTemplate };
