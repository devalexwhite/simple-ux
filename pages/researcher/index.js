import { DefaultTemplate } from "../../templates/defaultTemplate";

const Researcher = () => {
  return (
    <div>
      <DefaultTemplate>
        <article>
          <header className="mb-16">
            <h1 className="text-3xl font-medium max-w-md">
              Welcome to your research dashboard.
            </h1>
          </header>
          <div className="grid grid-cols-2 gap-32">
            <ul className="menu py-3 w-full bg-base-100 border">
              <li className="menu-title mb-4">
                <span>Open studies</span>
              </li>
              <li>
                <a>Card Sort Study 1</a>
              </li>
              <li>
                <a>Card Sort Study 2</a>
              </li>
            </ul>
            <ul className="menu py-3 w-full bg-base-100 border">
              <li className="menu-title mb-4">
                <span>Submissions</span>
              </li>
              <li>
                <a>November 11 10:21 AM</a>
              </li>
              <li>
                <a>November 23 10:42 AM</a>
              </li>
            </ul>
          </div>
        </article>
      </DefaultTemplate>
    </div>
  );
};

export default Researcher;
