import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({
  slice,
  context,
}: {
  slice: Content.HeroSlice;
  context: Content.SettingsDocumentData;
}) => {
  const bgColors = {
    primary: context.primary_color?.toString(),
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

  const foregroundColor = slice.primary.custom_text_color
    ? slice.primary.custom_text_color.toString()
    : fgColors[slice.primary.text_color]?.toString();

  console.log("foreground color", slice.primary.text_color);

  const textGradient =
    "text-transparent bg-clip-text bg-gradient-to-br from-white via-[#56c8f2] to-white";
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 py-14 md:px-10 w-full relative"
      style={{
        backgroundColor: backgroundColor || "fff",
        color: foregroundColor,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/75 z-20" />
      {slice.primary.background_image && (
        <PrismicNextImage
          field={slice.primary.background_image}
          sizes="100vw"
          fill={true}
          priority={true}
          className="absolute z-10 object-cover hidden lg:block"
        />
      )}
      {slice.primary.mobile_background_image && (
        <PrismicNextImage
          field={slice.primary.mobile_background_image}
          sizes="100vw"
          fill={true}
          priority={true}
          className="absolute z-10 object-cover block lg:hidden"
        />
      )}
      <div className="relative z-30 mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <div
          className={`grid gap-6 ${slice.primary.image_first && "md:order-2"}`}
        >
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading3: ({ children }) => (
                <h3
                  className={`text-xl font-semibold uppercase tracking-widest ${textGradient}}`}
                >
                  {children}
                </h3>
              ),
              heading2: ({ children }) => (
                <h2
                  className={`text-2xl md:text-4xl font-bold ${textGradient}`}
                >
                  {children}
                </h2>
              ),
              heading1: ({ children }) => (
                <h1
                  className={`max-w-lg py-4 text-4xl md:text-6xl font-extrabold ${textGradient}`}
                >
                  {children}
                </h1>
              ),
              paragraph: ({ children }) => (
                <p
                  className="text-lg md:text-xl"
                  style={{
                    color: foregroundColor,
                  }}
                >
                  {children}
                </p>
              ),
            }}
          />
          {slice.items.length > 0 ? (
            <ul className="flex flex-wrap gap-4">
              {slice.items.map((item) => (
                <li key={item.button_label}>
                  <PrismicNextLink
                    field={item.button_link}
                    className="inline-block rounded bg-white px-5 py-3 font-medium text-black"
                  >
                    {item.button_label}
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          sizes="100vw"
          priority={true}
          className="w-full rounded-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
