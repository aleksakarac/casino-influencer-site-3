export const gameCardsQuery = `{
  "bonusCards": *[_type == "bonusCard" && isActive == true] | order(order asc) {
    _id,
    title,
    "backgroundImage": backgroundImage.asset->url,
    "tag": tag->{name, "color": color.hex, "textColor": textColor.hex},
    activationsCount,
    bonusCode,
    order
  },
  "playCards": *[_type == "playCard" && isActive == true] | order(order asc) {
    _id,
    title,
    "gameImage": gameImage.asset->url,
    "tag": tag->{name, "color": color.hex, "textColor": textColor.hex},
    order
  },
  "welcomeCards": *[_type == "welcomeCard" && isActive == true] | order(order asc) {
    _id,
    "backgroundImage": backgroundImage.asset->url,
    "tag": tag->{name, "color": color.hex, "textColor": textColor.hex},
    bonusCode,
    benefits,
    order
  },
  "cardConfig": *[_type == "cardTypeConfig"][0] {
    "bonusBorder": bonusCardBorderColor.hex,
    "playBorder": playCardBorderColor.hex,
    "welcomeBorder": welcomeCardBorderColor.hex
  },
  "vavadaLink": *[_type == "siteSettings"][0].vavadaRefLink
}`;

export const leaderboardQuery = `{
  "prizes": *[_type == "tournamentPrize" && isActive == true] | order(order asc) [0...4] {
    _id,
    prizeNumber,
    "prizeImage": prizeImage.asset->url,
    prizeTitle,
    prizeDescription,
    order
  },
  "entries": *[_type == "leaderboardEntry" && isActive == true] | order(place asc) [0...10] {
    _id,
    place,
    viewerName,
    watchtime,
    watchTimeHours
  },
  "settings": *[_type == "leaderboardSettings"][0] {
    title,
    subtitle,
    isActive
  }
}`;
