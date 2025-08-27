import AdditionalProfileBadge from "@/components/home-services/dashboard/profile/AdditionalProfileBadge";
import BackgroundCheck from "@/components/home-services/dashboard/profile/BackgroundCheck";
import FAQs from "@/components/home-services/dashboard/profile/FAQs";
import FeaturedProject from "@/components/home-services/dashboard/profile/FeaturedProject";
import MediaGallary from "@/components/home-services/dashboard/profile/MediaGallery";
import PaymentMethod from "@/components/home-services/dashboard/profile/PaymentMethod";
import PersonalDetails from "@/components/home-services/dashboard/profile/PersonalDetails";
import Reviews from "@/components/home-services/dashboard/profile/Reviews";

const ProfessionalProfile = () => {
  return (
    <div className="">
      <PersonalDetails />
      <Reviews />
      <BackgroundCheck />
      <PaymentMethod />
      <MediaGallary />
      <AdditionalProfileBadge />
      <FeaturedProject />
      <FAQs />
    </div>
  );
};
export default ProfessionalProfile;
