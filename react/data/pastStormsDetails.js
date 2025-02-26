import { basePath } from "@/next.config"

export const pastAtlStorms = [
  {
    title: "Hurricane Juan 2003",
    details: 'On September 29, 2003, Juan made landfall in Nova Scotia as a Category 2 hurricane and brought 165 km/h wind speeds and 50mm of rainfall. (<a href="https://www.cbc.ca/news/canada/nova-scotia/hurricane-juan-dorian-fiona-comparisons-1.6593214" >CBC</a>) The storm traveled north through the province, arriving in Prince Edward Island as a marginal hurricane. In Nova Scotia, weather buoys recorded waves higher than 20m and storm surges of 2m (<a href="https://www.theweathernetwork.com/ca/news/article/this-day-in-weather-history-september-29-2003-juan-batters-the-maritimes" >Weather Network</a>). The hurricane cost an estimated $192 million in structural and vegetation damage across Nova Scotia and Prince Edward Island (<a href="https://www.cbc.ca/news/canada/nova-scotia/fiona-atlantic-canada-insured-damages-660-million-1.6621583#:~:text=The%20storm%20made%20landfall%20in,several%20deaths%2C%20the%20IBC%20said." >CBC</a>). Halifax Regional Municipality was hit particularly hard, receiving extensive damage to trees and power lines. Between 800,000 and 900,000 people lost their power during the storm. ',
    img: basePath + "/about_page/hurricane_juan_2003.png",
    imgAlt: "Storm surge from Hurricane Juan (2003)",
    imgCaption: '<div>Storm surge from Hurricane Juan (2003) washed rail cars into Halifax Harbour.</div><div>&copy; Environment Canada, 2003 Photo: Roger Percy and Andre Laflamme</div>',
    name: "juan",
    year: "2003",
  },
  {
    title: "Hurricane Dorian 2019",
    details: 'Dorian hit Atlantic Canada on September 7, 2019 as a Category 2 hurricane with wind speeds of 155km/h and 140mm of rain. (<a href="https://www.cbc.ca/news/canada/nova-scotia/hurricane-juan-dorian-fiona-comparisons-1.6593214" >CBC</a>) The storm\'s path and transition over land caused the winds to spread out from the center of the storm, becoming much wider than Juan. With a track from southwest to northeast directly through the centre of the Maritimes, the rain and wind impacts were more far reaching than but less severe (<a href="https://www.cbc.ca/news/canada/nova-scotia/snoddon-tropical-weather-1.5277600" >CBC</a>). The hurricane caused damage throughout the Maritimes, including a crane collapse in Halifax and more than 500,000 people without power. Damage was estimated at $102 million.',
    img: basePath + "/about_page/hurricane_dorian_2019.png",
    imgAlt: "Storm surge from Hurricane Dorian (2019)",
    imgCaption: '<div>A shed in Herring Cove shows the impact of the storm. (David Burke/CBC)</div>',
    name: "dorian",
    year: "2019",
  },
  {
    title: "Hurricane Fiona 2022",
    details: 'Fiona hit Atlantic Canada on September 24, 2022 as a Category 2 hurricane with wind speeds of 160km/h and 100mm of rain. Fiona caused $660 million in damage across Atlantic Canada, making it the most costly extreme weather event ever recorded in Atlantic Canada (<a href="https://www.cbc.ca/news/canada/nova-scotia/fiona-atlantic-canada-insured-damages-660-million-1.6621583" >CBC</a>). The storm had an atmospheric pressure of 931.6mb - which is the lowest ever recorded in Canada. Offshore, wave heights reached 17m (<a href="https://www.queensu.ca/gazette/stories/climate-change-means-atlantic-canada-will-see-more-frequent-storms" >Queens University</a>). More than 500,000 people were left without power in the Maritimes. The storm also washed at least 20 homes into the ocean, primarily in Port aux Basques, N.L (<a href="https://www.cbc.ca/news/canada/nova-scotia/fiona-atlantic-canada-insured-damages-660-million-1.6621583#:~:text=The%20storm%20made%20landfall%20in,several%20deaths%2C%20the%20IBC%20said." >CBC</a>). ',
    img: basePath + "/about_page/hurricane_fiona_2022.png",
    imgAlt: "Storm surge from Hurricane Fiona (2022)",
    imgCaption: '<div>Footage shot over Port aux Basques, N.L., shows the damage caused by post-tropical storm Fiona. (CBC)</div>',
    name: "fiona",
    year: '2022',
  },
]