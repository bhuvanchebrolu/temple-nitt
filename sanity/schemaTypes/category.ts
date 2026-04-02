import { defineType, defineField } from "sanity";

export const category = defineType({
        name: "category",
        title: "Gallery Category",
        type: "document",
        fields: [
                defineField({
                        name: "title",
                        title: "Category Title",
                        type: "string",
                        description: "e.g., Temple, Kumbabishekam, Navaratri 2025",
                        validation: (Rule) => Rule.required(),
                }),
        ],
});