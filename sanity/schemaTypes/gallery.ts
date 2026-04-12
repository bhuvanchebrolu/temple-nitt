import { defineType, defineField } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Image Title",
      type: "string",
      description: "English and Tamil title (e.g. Navagraham நவக்கிரகம்)",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tag",
      title: "Short Tag (e.g. Sacred Fire)",
      type: "string",
    }),

    
    defineField({
      name: "media",
      title: "Media (Image or Video)",
      type: "array",
      of: [
        { type: "image", options: { hotspot: true } },
        {
          name: "video",
          type: "file",
          title: "Video File",
          options: { accept: "video/*" },
        },
      ],
      validation: (Rule) => Rule.length(1).required(), // exactly one item
    }),

    
    defineField({
      name: "image",
      title: "Legacy Image",
      type: "image",
      options: { hotspot: true },
      hidden: true, 
    }),
  ],
});