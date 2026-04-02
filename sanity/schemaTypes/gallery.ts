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
                        to: [{ type: "category" }], // Points to the schema we created above
                        validation: (Rule) => Rule.required(),
                }),
                defineField({
                        name: "tag",
                        title: "Short Tag (e.g. Sacred Fire)",
                        type: "string",
                }),
                defineField({
                        name: "image",
                        title: "Upload Image",
                        type: "image",
                        options: { hotspot: true },
                        validation: (Rule) => Rule.required(),
                }),
        ],
});