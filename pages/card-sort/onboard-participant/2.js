import { DefaultTemplate } from "../../../templates/defaultTemplate";
import Link from "next/link";

const OnboardParticipant2 = () => {
  return (
    <DefaultTemplate>
      <ul className="steps w-full mb-16">
        <li className="step step-primary">Introduction</li>
        <li className="step step-primary">Instructions</li>
      </ul>

      <article className="prose mx-auto mb-16">
        <h1>{`Here's how it will work:`}</h1>

        <p>
          <span className="badge badge-lg badge-primary mr-3">1</span>
          {`On the next screen you will be presented with a group of cards at the
          top of the screen.`}
        </p>
        <p>
          <span className="badge badge-lg badge-primary mr-3">2</span>
          {`Drag and drop these terms into the middle of the screen to create
          groups. You can also drag cards between groups.`}
        </p>
        <p>
          <span className="badge badge-lg badge-primary mr-3">3</span>
          {`After creating a group, click the title at the top to name the group.`}
        </p>
        <p>
          <span className="badge badge-lg badge-primary mr-3">4</span>
          {`Click "I'm Finished" to end the study. Don't worry if you couldn't
          group all of the terms!`}
        </p>
      </article>

      <div className="text-center">
        <Link href="/card-sort">
          <a className="btn btn-lg btn-primary">Get Started!</a>
        </Link>
      </div>
    </DefaultTemplate>
  );
};

export default OnboardParticipant2;
