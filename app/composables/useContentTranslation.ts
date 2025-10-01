export const useContentTranslation = () => {
  const { locale } = useI18n()

  const supportedLanguages = ['en', 'ar', 'tr']

  const isLanguageSupported = (lang: string) => {
    return supportedLanguages.includes(lang)
  }

  const getTranslatedField = (data: any, field: string): any => {
    if (!data) return ''

    if (data.translations && isLanguageSupported(locale.value)) {
      const translation = data.translations[locale.value]
      if (translation?.[field] !== undefined && translation[field] !== '') {
        return translation[field]
      }
    }
    const altKey = `${field}Translations`
    if (data[altKey] && isLanguageSupported(locale.value)) {
      const translation = data[altKey][locale.value]
      if (translation !== undefined && translation !== '') {
        return translation
      }
    }

    return data[field] || ''
  }

  const getTranslatedItem = (item: any): any => {
    if (!item) return null

    if (Array.isArray(item)) {
      return item.map(i => getTranslatedItem(i))
    }

    if (typeof item === 'object') {
      const translated: any = {}

      for (const [key, value] of Object.entries(item)) {
        if (key.endsWith('Translations')) continue

        if (key === 'translations') {
          continue
        }

        if (Array.isArray(value)) {
          translated[key] = value.map(v => getTranslatedItem(v))
        } else if (typeof value === 'object' && value !== null) {
          translated[key] = getTranslatedItem(value)
        } else {
          translated[key] = getTranslatedField(item, key)
        }
      }

      return translated
    }

    return item
  }

  const getTranslatedImage = (image: any) => {
    if (!image) return null
    return {
      src: image.src,
      alt: getTranslatedField(image, 'alt') || image.alt
    }
  }

  const getTranslatedLink = (link: any) => {
    if (!link) return null
    return {
      ...link,
      label: getTranslatedField(link, 'label') || link.label
    }
  }

  const getTranslatedAuthor = (author: any) => {
    if (!author) return null
    return {
      ...author,
      name: getTranslatedField(author, 'name') || author.name,
      description: getTranslatedField(author, 'description') || author.description
    }
  }

  const translateField = (data: any, field: string) => {
    if (!data) return ''

    if (data.translations?.[locale.value]?.[field]) {
      return data.translations[locale.value][field]
    }

    const altKey = `${field}Translations`
    if (data[altKey]?.[locale.value]) {
      return data[altKey][locale.value]
    }

    return data[field] || ''
  }

  return {
    getTranslatedField,
    getTranslatedItem,
    getTranslatedImage,
    getTranslatedLink,
    getTranslatedAuthor,
    locale,
    supportedLanguages,
    isLanguageSupported,
    translateField
  }
}
