import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "Text" Slices.
 */
const Text = ({ slice }: TextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`max-w-4xl ${
        slice.primary.padding ? "px-4 md:px-10 py-10" : ""
      }`}
    >
      <PrismicRichText
        field={slice.primary.text}
        components={{
          heading1: ({ children }) => (
            <h1 className="max-w-lg text-4xl font-semibold my-4">{children}</h1>
          ),
          heading2: ({ children }) => (
            <h2 className="max-w-lg text-2xl font-semibold mt-6 mb-2">
              {children}
            </h2>
          ),
          heading3: ({ children }) => (
            <h3 className="max-w-lg text-2xl font-semibold">{children}</h3>
          ),
          heading4: ({ children }) => (
            <h4 className="max-w-lg text-xl font-semibold">{children}</h4>
          ),
          heading5: ({ children }) => (
            <h5 className="max-w-lg text-lg font-semibold">{children}</h5>
          ),
          heading6: ({ children }) => (
            <h6 className="text-base font-semibold">{children}</h6>
          ),
          paragraph: ({ children }) => <p className="text-base">{children}</p>,
          preformatted: ({ children }) => (
            <pre className="text-sm">{children}</pre>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      />
    </section>
  );
};

export default Text;
