import { EmptyStateAction } from "../../../components/emptyStateAction";
import { ResearcherLayout } from "../../../templates/researcherLayout";

const Studies = () => {
  return (
    <ResearcherLayout pageTitle="Studies">
      <div className="my-16">
        <EmptyStateAction
          title={"No studies yet"}
          subtitle={"Create a study to get started"}
          actionText={"Create Study"}
          href="/researcher/studies/new"
        />
      </div>
    </ResearcherLayout>
  );
};

export default Studies;
