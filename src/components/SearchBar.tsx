import { useState, type ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { type RouterOutputs, api } from "~/utils/api";

// const people = [
//   { id: 1, name: "Leslie Alexander1", url: "/alex1" },
//   { id: 2, name: "Leslie Alexander2", url: "/alex2" },
//   { id: 3, name: "Leslie Alexander3", url: "/alex3" },
//   { id: 4, name: "Leslie Alexander4", url: "/alex4" },
//   { id: 5, name: "Leslie Alexander5", url: "/alex5" },
//   { id: 6, name: "Leslie Alexander6", url: "/alex6" },
//   { id: 7, name: "Leslie Alexander7", url: "/alex7" },
//   { id: 8, name: "Leslie Alexander8", url: "/alex8" },
//   // More people...
// ];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

type Anime = RouterOutputs["animes"]["getAll"][number];
// type Manga = RouterOutputs["mangas"]["getAll"][number];
// type Media = Anime; // or Manga
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { data: animes } = api.animes.searchText.useQuery(query);

  // const filteredPeople =
  //   query === ""
  //     ? []
  //     : people.filter((person) => {
  //         return person.name.toLowerCase().includes(query.toLowerCase());
  //       });

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
          {({ open }) => (
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
                  placeholder="Search..."
                  onInput={(event: ChangeEvent<HTMLInputElement>) =>
                    setQuery(event.target.value)
                  }
                />
              </div>
              {open && (
                <Combobox.Options
                  static
                  className="absolute z-10 my-1 flex w-full flex-1 scroll-py-2 flex-col rounded-md bg-zinc-800 py-2 text-sm text-zinc-400"
                >
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
                </Combobox.Options>
              )}
            </div>
          )}
        </Combobox>
      </div>
    </div>
  );
}
