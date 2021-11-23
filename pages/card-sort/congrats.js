import { DefaultTemplate } from "../../templates/defaultTemplate";

const CompletePage = () => {
  const congratsTitle = `Congratulations!`;
  const congratsBody = `Thank you for completing this research study! Your feedback is incredibly valuable and will be used to shape the future of our products.`;

  return (
    <div>
      <DefaultTemplate>
        <article className="prose mx-auto">
          <h1>{congratsTitle}</h1>
          <p className="mb-6">{congratsBody}</p>
          <div className="alert alert-info">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <label>You may now close this window.</label>
            </div>
          </div>
        </article>
      </DefaultTemplate>
    </div>
  );
};

export default CompletePage;
