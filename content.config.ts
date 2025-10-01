import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          images: z.array(createImageSchema())
        }),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          description: z.string().nonempty(),
          items: z.array(z.object({
            date: z.date(),
            position: z.string()
          }))
        }),
        stage: z.object({
          title: z.string().nonempty(),
          stages: z.array(z.object({
            stage: z.string().nonempty(),
            description: z.string().nonempty()
          }))
        })
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema())
      })
    })
  }
})
