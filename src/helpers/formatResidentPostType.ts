import { ResidentPostsType } from 'src/components/ResidentPosts/types'

export function formatResidentPostType(type: string): string {
  switch (type) {
    case ResidentPostsType.APPRECIATIONS:
      return 'appreciation_title_text'
    case ResidentPostsType.REQUESTS:
      return 'request'
    case ResidentPostsType.SUGGESTIONS:
      return 'Suggestions_live'
    default:
      return ''
  }
}
