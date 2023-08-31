import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("blog_home");
  const posts = await client.getAllByType("blog_post", {
    orderings: {
      field: "date",
      direction: "desc",
    },
  });

  // console.log(posts);

  return (
    <div className="p-2 bg-gradient-to-t from-zinc-800 to-black min-h-screen text-white">
      <h1 className=" text-2xl text-transparent bg-clip-text bg-gradient-to-br from-white via-[#56c8f2] to-white">
        Integral Developing Blog
      </h1>
      <ul className="p-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          return (
            <li
              key={post.id}
              className="relative border border-white rounded-md overflow-hidden shadow shadow-white"
            >
              <PrismicNextLink document={post}>
                <PrismicNextImage
                  field={post.data.image}
                  sizes="100vw, (min-width: 768px) 50vw, 33vw"
                  priority={true}
                  className="object-cover block"
                />
                <h3 className="text-xl p-2 font-semibold">{post.data.title}</h3>
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("blog_home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
