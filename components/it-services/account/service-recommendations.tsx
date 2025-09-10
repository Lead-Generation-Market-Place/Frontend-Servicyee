'user client '
import { PopularServiceSection } from "../sections/main-page/popular-services-section"
import { LatestServiceSection } from "../sections/main-page/latest-services-section"


export default function ServiceRecommendations(){
	return <div>
		<PopularServiceSection />
		<LatestServiceSection />
	</div>
}