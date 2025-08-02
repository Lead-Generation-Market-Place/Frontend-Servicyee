import { ProgressBar } from '@/components/home-services/dashboard/onboarding/ProgressBar';

export default function Page() {
  return (
    <div>
      <ProgressBar currentStep={2} totalSteps={4} />
    </div>
  );
}
