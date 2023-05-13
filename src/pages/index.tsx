import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { RouterOutputs, api } from "~/utils/api";

type Anime = RouterOutputs["animes"]["getAll"][number];
// type Manga = RouterOutputs["mangas"]["getAll"][number];
type Media = Anime; // or Manga
function MediaCard(media: Media) {
  const { title, main_picture } = media;
  let pictureLink = "";
  if (
    main_picture &&
    typeof main_picture === "object" &&
    "medium" in main_picture
  ) {
    pictureLink = main_picture?.medium?.toString() ?? "";
  }
  return (
    <div className="aspect-[9/20] overflow-hidden rounded-lg bg-zinc-800 shadow">
      <div className="relative aspect-[9/16] w-auto">
        <Image
          src={pictureLink}
          alt="profilePicture"
          fill
          object-fit="contain"
        />
      </div>
      <div className="px-4 py-5 sm:p-6">{title}</div>
    </div>
  );
}

const Home: NextPage = () => {
  const { data: animes } = api.animes.searchText.useQuery("odd");
  return (
    <>
      <Head>
        <title>Vietaku</title>
        <meta name="description" content="Trang chủ của vietaku" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 ">
        {animes?.map((anime) => (
          <MediaCard key={anime.mal_id} {...anime} />
        ))}
      </div>
    </>
  );
};

export default Home;
