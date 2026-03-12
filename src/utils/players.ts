import { PlayersProps } from "@/types";

/**
 * Movie Players
 */
export const getMoviePlayers = (id: string | number, startAt?: number): PlayersProps[] => {
  return [
    // CLEAN / LESS ADS (TOP SERVERS)

    {
      title: "VidKing (Default)",
      source: `https://www.vidking.net/embed/movie/${id}?color=006fee&autoplay=false`,
      recommended: true,
      fast: true,
      resumable: true,
    },
    {
      title: "VidSrc 5",
      source: `https://vidsrc.cc/v3/embed/movie/${id}?autoPlay=false`,
      recommended: true,
      fast: true,
    },
    {
      title: "VidSrc 4",
      source: `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`,
      fast: true,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.to/embed/movie/${id}`,
    },
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/movie/${id}`,
    },

    // MEDIUM ADS

    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
      fast: true,
      ads: true,
    },
    {
      title: "<Embed>",
      source: `https://embed.su/embed/movie/${id}`,
      ads: true,
    },

    // HEAVY ADS (BACKUP SERVERS)

    {
      title: "VidLink",
      source: `https://vidlink.pro/movie/${id}?player=jw&primaryColor=006fee&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
      ads: true,
      resumable: true,
    },
    {
      title: "VidLink 2",
      source: `https://vidlink.pro/movie/${id}?primaryColor=006fee&autoplay=false&startAt=${startAt}`,
      ads: true,
    },
    {
      title: "FilmKu",
      source: `https://filmku.stream/embed/${id}`,
      ads: true,
    },
    {
      title: "NontonGo",
      source: `https://www.nontongo.win/embed/movie/${id}`,
      ads: true,
    },
    {
      title: "AutoEmbed 1",
      source: `https://autoembed.co/movie/tmdb/${id}`,
      ads: true,
    },
    {
      title: "AutoEmbed 2",
      source: `https://player.autoembed.cc/embed/movie/${id}`,
      ads: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embed/${id}`,
      ads: true,
    },
    {
      title: "VidSrc 3",
      source: `https://vidsrc.icu/embed/movie/${id}`,
      ads: true,
    },
    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/movie/${id}`,
      ads: true,
    },
  ];
};

/**
 * TV Show Players
 */
export const getTvShowPlayers = (
  id: string | number,
  season: number,
  episode: number,
  startAt?: number,
): PlayersProps[] => {
  return [
    // CLEAN SERVERS

    {
      title: "VidKing (Default)",
      source: `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=f5a524&autoplay=false`,
      recommended: true,
      fast: true,
      resumable: true,
    },
    {
      title: "VidSrc 5",
      source: `https://vidsrc.cc/v3/embed/tv/${id}/${season}/${episode}?autoPlay=false`,
      recommended: true,
      fast: true,
    },
    {
      title: "VidSrc 4",
      source: `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false`,
      fast: true,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
    },
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`,
    },

    // MEDIUM ADS

    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
      ads: true,
    },
    {
      title: "<Embed>",
      source: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },

    // HEAVY ADS

    {
      title: "VidLink",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=f5a524&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
      ads: true,
    },
    {
      title: "VidLink 2",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=f5a524&autoplay=false&startAt=${startAt}`,
      ads: true,
    },
    {
      title: "FilmKu",
      source: `https://filmku.stream/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
      ads: true,
    },
    {
      title: "NontonGo",
      source: `https://www.nontongo.win/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },
    {
      title: "AutoEmbed 1",
      source: `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
      ads: true,
    },
    {
      title: "AutoEmbed 2",
      source: `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
      ads: true,
    },
    {
      title: "VidSrc 3",
      source: `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },
    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/tv/${id}-${season}-${episode}`,
      ads: true,
    },
  ];
};
