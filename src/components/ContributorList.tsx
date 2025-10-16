import { Button } from "@/components/ui/button";
import { useReviewStore } from "@/store/reviewStore";
import { Contributor } from "@/lib/types/review";
import Image from "next/image";

interface ContributorListProps {
  contributors: Contributor[];
}

export const ContributorList = ({ contributors }: ContributorListProps) => {
  const { searchTerm, setSearchTerm, setSelectedContributor } =
    useReviewStore();

  return (
    <>
      <div className="w-full mt-8 flex justify-between items-center mb-3 px-2">
        <h3 className="text-white text-lg font-semibold">
          Select a contributor
        </h3>
        <input
          type="text"
          placeholder="Search contributors..."
          className="bg-gray-900/90 border border-gray-700 rounded-md px-3 py-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="p-3 w-full grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {contributors.length > 0 ? (
          contributors.map((contributor) => (
            <div
              key={contributor.id}
              onClick={() => setSelectedContributor(contributor)}
              className="cursor-pointer bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-xl p-5 flex flex-col items-center text-white shadow-md hover:shadow-lg hover:ring-2 hover:ring-indigo-500 transition-all group"
              title="Click to select contributor"
            >
              <Image
                width={64}
                height={64}
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-16 h-16 rounded-full border-2 border-violet-500 mb-2"
              />
              <div className="font-semibold text-lg group-hover:text-indigo-400">
                {contributor.login}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-indigo-700/30 text-indigo-300 px-3 py-1 rounded-full text-sm">
                  {contributor.contributions} contributions
                </span>
                {!contributor.site_admin && (
                  <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs">
                    User
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                className="mt-4 text-violet-400 hover:text-white hover:bg-violet-800 transition-all"
              >
                Select Contributor
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No contributors match your search.
          </p>
        )}
      </div>
    </>
  );
};
