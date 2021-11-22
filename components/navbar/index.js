const Navbar = () => {
  return (
    <div className="navbar mb-2 shadow-lg bg-secondary text-secondary-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <div className="flex flex-col">
          <div className="text-lg font-bold block">SimpleUX</div>
          <div className="text-xs italic font-light block">
            Bullshit-free UX tools
          </div>
        </div>
      </div>
      <div className="flex-none"></div>
    </div>
  );
};

export { Navbar };
