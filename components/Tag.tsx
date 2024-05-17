import Link from "next/link";

export const Tag = (props: { tag: { name: string; slug: string | null } }) => {
  return (
    <Link
      href={`/tag/${props.tag?.slug}`}
      className="flex px-6 py-2 text-xs sm:text-base rounded-full whitespace-nowrap border border-white active:bg-gray-700 transition-all duration-300 ease-in-out"
      scroll={false}
      passHref
    >
      {props.tag?.name}
    </Link>
  );
};
