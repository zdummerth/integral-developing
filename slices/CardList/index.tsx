import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `CardList`.
 */
export type CardListProps = SliceComponentProps<Content.CardListSlice>;

/**
 * Component for "CardList" Slices.
 */

const Card = ({ card }: { card: Content.CardListSliceDefaultItem }) => {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col shadow shadow-white">
      <PrismicNextImage
        field={card.card_image}
        // sizes="33vw"
        // sizes="(min-width: 1024px) 33vw, 50vw, 100vw"
        priority={true}
        className="md:h-64 w-full object-cover"
      />
      <div className="bg-black flex-1 flex flex-col justify-between text-white p-4">
        <div>
          <h1
            className={`font-semibold text-xl mb-3 text-transparent bg-clip-text bg-gradient-to-br from-white via-sky-500 to-white`}
          >
            {card.card_title}
          </h1>
          <PrismicRichText
            field={card.card_text}
            components={{
              paragraph: ({ children }) => (
                <p className="text-sm">{children}</p>
              ),
            }}
          />
        </div>
        {card.primary_button_label && (
          <div>
            <PrismicNextLink
              field={card.primary_button_link}
              className="inline-block rounded bg-gradient-to-br from-sky-500 via-white to-sky-500 px-5 py-2 mt-4 font-medium text-black"
            >
              {card.primary_button_label}
            </PrismicNextLink>
            {card.secondary_button_label && (
              <PrismicNextLink
                field={card.secondary_button_link}
                className="inline-block rounded bg-white px-5 py-3 font-medium text-black"
              >
                {card.secondary_button_label}
              </PrismicNextLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const CardList = ({
  slice,
  context,
}: {
  slice: Content.CardListSlice;
  context: Content.SettingsDocumentData;
}): JSX.Element => {
  const bgColors = {
    primary: context.primary_color?.toString(),
    secondary: context.secondary_color?.toString(),
    tertiary: context.tertiary_color?.toString(),
    transparent: "transparent",
  };

  const backgroundColor = slice.primary.custom_background_color
    ? slice.primary.custom_background_color.toString()
    : bgColors[slice.primary.background_color]?.toString();

  const fgColors = {
    primary: context.primary_color?.toString(),
    white: "#ffffff",
    black: "#000000",
  };

  // const foregroundColor = slice.primary.custom_text_color
  //   ? slice.primary.custom_text_color.toString()
  //   : fgColors[slice.primary.text_color]?.toString();

  // console.log("slice: ", slice.primary);

  const itemLength = slice.items.length;
  const gridSettings =
    itemLength === 1
      ? "grid-cols-1"
      : itemLength % 4 === 0
      ? "md:grid-cols-2 lg:grid-cols-4"
      : itemLength % 3 === 0
      ? "md:grid-cols-3"
      : itemLength % 2 === 0
      ? "md:grid-cols-2"
      : "grid-cols-1";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`px-6 py-28 md:px-10 grid gap-8 w-full ${gridSettings}`}
      style={{
        backgroundColor: backgroundColor || "#fff",
        // color: foregroundColor,
        // color: "white",
      }}
    >
      {slice.items.map((item, index) => (
        <Card key={index} card={item} />
      ))}
    </section>
  );
};

export default CardList;
