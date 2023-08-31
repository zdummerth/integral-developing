import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export const dynamicParams = false;

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  const date = new Date(page.last_publication_date).toDateString();
  const contentWidth = "w-3/4 max-w-4xl mx-auto";
  const textMaxWidth = "lg:pr-24";

  return (
    <div className="">
      <div className="bg-gradient-to-t from-zinc-500 to-black w-screen">
        <div className="mx-auto">
          <h1
            className={`text-2xl text-white py-6 md:text-4xl font-semibold ${contentWidth} ${textMaxWidth}`}
          >
            {page.data.title}
          </h1>
          <div className="relative">
            <div className="bg-gradient-to-b h-1/2 lg:h-1/4 w-screen absolute bottom-0" />
            <PrismicNextImage
              field={page.data.image}
              sizes="100vw"
              priority={true}
              className={`rounded-md ${contentWidth} relative z-10`}
            />
          </div>
        </div>
      </div>
      <div className={`${contentWidth} py-4 mb-4 border-b-2 border-black`}>
        {date}
      </div>
      <div className={`${contentWidth} ${textMaxWidth}`}>
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("blog_post", params.uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
