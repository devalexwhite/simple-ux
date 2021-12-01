import { StatsRow } from "../../components/statsRow";
import { ResearcherLayout } from "../../templates/researcherLayout";

const Researcher = () => {
  return (
    <div>
      <ResearcherLayout>
        <article>
          <header className="mb-16">
            <h1 className="text-3xl font-medium max-w-md">
              Welcome to your research dashboard.
            </h1>
          </header>
          <StatsRow title="Last 24 Hours" />
        </article>
      </ResearcherLayout>
    </div>
  );
};

export default Researcher;
