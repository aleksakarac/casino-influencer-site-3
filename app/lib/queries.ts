// GROQ queries for fetching data from Sanity

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  title,
  description,
  ogImage,
  backgroundTheme,
  socialLinks
}`;

export const GALLERY_SETTINGS_QUERY = `*[_type == "gallerySettings"][0]{
  title,
  images[]{
    image,
    alt
  },
  autoPlaySpeed
}`;

export const TOURNAMENTS_QUERY = `*[_type == "tournament" && isActive == true] | order(endDate desc){
  _id,
  name,
  description,
  image,
  prizePool,
  players,
  buyIn,
  winnerPrize,
  tableType,
  endDate,
  joinLink,
  isActive
}`;

export const ACTIVE_TOURNAMENTS_QUERY = `*[_type == "tournament" && isActive == true && endDate > now()] | order(endDate asc){
  _id,
  name,
  description,
  image,
  prizePool,
  players,
  buyIn,
  winnerPrize,
  tableType,
  endDate,
  joinLink,
  isActive
}`;
