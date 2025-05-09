import { 
  Banner, 
  Education, 
  Events, 
  IslamicAcademySlider,
  PartnerUniversitiesSlider,
  LinkSlider, 
  News, 
  SliderHome 
} from "../../widgets"

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <News />
      <Education />
      <Events />
      <IslamicAcademySlider />
      <PartnerUniversitiesSlider />
      <LinkSlider />
      <SliderHome />
      
    </div>
  )
}
