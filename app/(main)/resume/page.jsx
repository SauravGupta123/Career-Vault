import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import { checkCredits } from "@/actions/user";
export default async function ResumePage() {
  await checkCredits(); // Check if the user has enough credits before rendering the page
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
