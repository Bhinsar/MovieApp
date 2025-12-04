export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

export const formatReleaseDate = (date: string) => {
  const releaseDate = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = releaseDate.getFullYear();
  const month = months[releaseDate.getMonth()];
  const day = releaseDate.getDate();
  return `${month} ${day}, ${year}`;
};
