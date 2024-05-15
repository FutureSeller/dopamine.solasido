import Link from "next/link";

export const Tag = (props: { tag: { name: string; slug: string | null } }) => {
  return (
    <Link
      href={`/tag/${props.tag?.slug}`}
      className="flex px-6 py-2 rounded-full whitespace-nowrap border border-white"
      scroll={false}
      passHref
    >
      {props.tag?.name}
    </Link>
  );
};
