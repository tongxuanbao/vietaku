import { useState, type ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { type RouterOutputs, api } from "~/utils/api";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

type Anime = RouterOutputs["animes"]["getAll"][number];
// type Manga = RouterOutputs["mangas"]["getAll"][number];
// type Media = Anime; // or Manga
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { data: animes, isFetching } = api.animes.searchText.useQuery(query);
  const foundAnime = () => {
    return query !== "" && animes && animes?.length > 0;
  };

  return (
    <div className="flex flex-1 items-center px-2">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Combobox
          as="div"
          onChange={(anime: Anime) =>
            (window.location.href = `anime/${anime.mal_id}`)
          }
        >
          <div className="relative">
            <div className="relative flex flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-zinc-400"
                  aria-hidden="true"
                />
              </div>
              <Combobox.Input
                className="block w-full rounded-md border-0 bg-zinc-800 py-1.5 pl-10 pr-3 text-white placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Tìm kiếm..."
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuery(event.target.value)
                }
              />
            </div>
            {query !== "" && (
              <Combobox.Options className="absolute z-10 my-1 flex w-full flex-1 scroll-py-2 flex-col rounded-md bg-zinc-800 py-2 text-sm text-zinc-400">
                {animes &&
                  animes.map((anime) => (
                    <Combobox.Option
                      key={anime.mal_id}
                      value={anime}
                      className={({ active }) =>
                        classNames(
                          "cursor-default select-none px-4 py-2",
                          active && "bg-zinc-700 text-white"
                        )
                      }
                    >
                      {anime.title}
                    </Combobox.Option>
                  ))}
                {animes && animes.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">
                    Không có kết quả tìm kiếm.
                  </p>
                )}
                {isFetching && (
                  <p className="p-4 text-sm text-gray-500">Đang tìm kiếm...</p>
                )}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
    </div>
  );
}
