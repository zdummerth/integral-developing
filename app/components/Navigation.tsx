import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export function Navigation({ navigation }: any) {
  return (
    <nav className="bg-black text-white w-full">
      <ul className="flex gap-4 py-2 justify-center">
        {/* Renders top-level links. */}
        {navigation.data.slices.map((slice: any) => {
          return (
            <li key={slice.id}>
              <PrismicNextLink field={slice.primary.link}>
                {slice.primary.name}
              </PrismicNextLink>

              {/* Renders child links, if present. */}
              {slice.items.length > 0 && (
                <ul>
                  {slice.items.map((item: any) => {
                    return (
                      <li key={JSON.stringify(item)}>
                        <PrismicNextLink field={item.child_link}>
                          {item.child_name}
                        </PrismicNextLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
