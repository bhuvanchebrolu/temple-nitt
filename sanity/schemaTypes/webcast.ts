import { defineType, defineField } from "sanity";

export const webcast = defineType({
  name: "webcast",
  title: "Webcast URL",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      description:
        'Groups entries together, e.g. "Kumbabishekam", "Mandala Poojai"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "DD MMMM YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      description: "e.g. Friday, Saturday",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "session",
      title: "Session",
      type: "string",
      options: {
        list: [
          { title: "Morning", value: "Morning" },
          { title: "Afternoon", value: "Afternoon" },
          { title: "Evening", value: "Evening" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description:
        "Optional — shown below the date, e.g. Thiruvanandal Kumbabishekam",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in the table",
      initialValue: 1,
    }),
    defineField({
      name: "url",
      title: "Webcast URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
