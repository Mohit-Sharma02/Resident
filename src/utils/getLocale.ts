export default (): string => {
  let locale = navigator.language
  locale = locale.substr(0, 2)

  return locale
}
