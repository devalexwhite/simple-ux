import { CardSortOnboardTemplate } from "../../../templates/cardSortOnboard";
import Link from "next/link";

const OnboardParticipant1 = () => {
  const introTitle = `Thank you for participating in this research exercise.`;
  const introParagraph = `The purpose of this exercise is for us to learn how you think about
  and relate a set of terms. You will be asked to combine terms together
  into any number of groups that make sense to you. There is no right or
  wrong answer, simply do what makes the most sense.`;

  return (
    <CardSortOnboardTemplate>
      <ul className="steps w-full mb-16">
        <li className="step step-primary">Introduction</li>
        <li className="step">Instructions</li>
      </ul>

      <article className="prose mx-auto mb-16">
        <h1>{introTitle}</h1>
        <p>{introParagraph}</p>
      </article>

      <div className="text-center">
        <Link href="/card-sort/onboard-participant/2">
          <a className="btn btn-lg btn-primary">Next</a>
        </Link>
      </div>
    </CardSortOnboardTemplate>
  );
};

export default OnboardParticipant1;
