export function formatAction(action: string): string {
  switch (action) {
    case 'add':
      return 'added a'
    default:
      return ''
  }
}

export function formatType(type: string): string {
  switch (type) {
    case 'todo':
      return 'To-do'
    default:
      return ''
  }
}
