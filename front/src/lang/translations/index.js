export default {
  en: {
    name: 'English',
    load: () => {
      return import('./en.json')
    }
  },
  fr: {
    name: 'Français',
    load: () => {
      return import('./fr.json')
    }
  }
}
