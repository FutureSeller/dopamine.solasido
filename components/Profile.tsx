import { Database } from "@/types/supabase";
import Link from "next/link";

export const Profile = ({
  profile,
}: {
  profile: Database["public"]["Tables"]["PROFILE"]["Row"] | null;
}) => {
  return (
    <div className="flex items-center border-b py-4">
      <Link
        className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden mr-8 sm:mr-8 hover:brightness-75 transition-all duration-300"
        href={"/"}
      >
        <img
          className="object-cover absolute z-10 top-0 left-0 apsect-squre"
          src={profile?.profile}
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300" />
      </Link>
      <div>
        <h1 className="text-base font-semibold text-2xl">
          <Link
            href={profile?.link!}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-500"
          >
            {profile?.title}
          </Link>
        </h1>
        <Link
          href={profile?.link!}
          target="_blank"
          rel="noreferrer"
          className="inline-block hover:text-amber-500 mb-1"
        >
          @solasido.pamine
        </Link>
        <div>
          {profile?.description.split("\n").map((v, index) => (
            <p key={index} className="text-sm sm:text-sm">
              {v}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
