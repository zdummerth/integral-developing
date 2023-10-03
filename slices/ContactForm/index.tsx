"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  email: string;
  message: string;
  phone: string;
};

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const errorClassname = "text-red-500 font-semibold";
const inputClassname = "p-1 rounded w-full border border-sky-500 text-black";
const labelClassname = "block mb-1 mt-3";

const ToastMsg = ({ name }: { name?: string }) => {
  return (
    <div className="py-8 text-xl">
      {name
        ? `Thanks for your message ${name}! We will get back to you soon.`
        : `Sorry there was an error submitting your message. Please try again.`}
    </div>
  );
};
/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({
  slice,
  context,
}: {
  slice: Content.ContactFormSlice;
  context: Content.SettingsDocumentData;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.error) throw new Error();
      toast.success(<ToastMsg name={data.name} />);
      reset();
    } catch (e) {
      toast.error(<ToastMsg />, {
        autoClose: false,
      });
      console.error(e);
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full px-6 py-12 md:px-20 md:flex md:gap-6 lg:gap-16 justify-evenly text-white bg-gradient-to-br from-black to-zinc-900"
    >
      <div className="flex flex-col justify-center items-center text-center md:w-1/2">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <h1 className={`max-w-lg py-4 text-5xl `}>{children}</h1>
            ),
            heading2: ({ children }) => (
              <h2 className={`max-w-lg py-4 text-3xl `}>{children}</h2>
            ),
            heading3: ({ children }) => (
              <h3 className={`max-w-lg py-4 text-2xl `}>{children}</h3>
            ),
            heading4: ({ children }) => (
              <h4 className={`max-w-lg py-4 text-xl `}>{children}</h4>
            ),
          }}
        />
        {/* Socials */}
        <div className="flex gap-4 my-6">
          <PrismicNextLink field={context.facebook_link}>
            <PrismicNextImage
              field={context.facebook_icon_light}
              height={50}
              width={50}
            />
          </PrismicNextLink>
          <PrismicNextLink field={context.instagram_link}>
            <PrismicNextImage
              field={context.instagram_icon_light}
              height={50}
              width={50}
            />
          </PrismicNextLink>
        </div>
      </div>
      <form className="md:flex-1" onSubmit={handleSubmit(onSubmit)}>
        <label className={labelClassname} htmlFor="name">
          Name*
        </label>
        {errors.name && (
          <span className={errorClassname}>Name is required</span>
        )}
        <input
          className={inputClassname}
          {...register("name", { required: true })}
        />

        <label className={labelClassname} htmlFor="email">
          Email*
        </label>
        {errors.email && (
          <span className={errorClassname}>Email is required</span>
        )}
        <input
          className={inputClassname}
          type="email"
          {...register("email", { required: true, pattern: emailRegex })}
        />

        <label className={labelClassname} htmlFor="phone">
          Phone
        </label>
        {errors.phone && (
          <span className={errorClassname}>Phone number is required</span>
        )}
        <input
          className={inputClassname}
          type="tel"
          {...register("phone", { required: false })}
        />

        <label className={labelClassname} htmlFor="message">
          Message
        </label>
        {errors.message && (
          <span className={errorClassname}>Message is required</span>
        )}
        <textarea
          className={inputClassname}
          rows={6}
          {...register("message", { required: false })}
        />

        <button className="block bg-gradient-to-br from-white via-[#56c8f2] to-white py-1 px-2 my-2 rounded text-black w-full">
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
