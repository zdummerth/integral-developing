import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ColorStop`.
 */
export type ColorStopProps = SliceComponentProps<Content.ColorStopSlice>;

/**
 * Component for "ColorStop" Slices.
 */
const ColorStop = ({ slice }: ColorStopProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for color_stop (variation: {slice.variation}) Slices
    </section>
  );
};

export default ColorStop;
