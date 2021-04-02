const isIpad = (): boolean => {
  if (navigator.userAgent.match(/iPad/i)) {
    return true
  }

  return false
}

export default isIpad
