import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage() {
  console.log("Onboarding Page - Fetching User Onboarding Status");
  const { isOnboarded } = await getUserOnboardingStatus();
console.log("Onboarding Page - User Onboarding Status:", isOnboarded);
  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}
