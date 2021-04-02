import { ThemeOptionsActionType } from '../types'
import {
  SET_PAGE_TITLE_BACKGROUND,
  SET_PAGE_TITLE_DESCRIPTION,
  SET_PAGE_TITLE_ICON_BOX,
  SET_PAGE_TITLE_SHADOW,
  SET_PAGE_TITLE_STYLE,
} from '../types/page-title'

export function setPageTitleStyle(
  pageTitleStyle: string,
): ThemeOptionsActionType {
  return {
    type: SET_PAGE_TITLE_STYLE,
    pageTitleStyle,
  }
}

export function setPageTitleBackground(
  pageTitleBackground: string,
): ThemeOptionsActionType {
  return {
    type: SET_PAGE_TITLE_BACKGROUND,
    pageTitleBackground,
  }
}

export function setPageTitleShadow(
  pageTitleShadow: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_PAGE_TITLE_SHADOW,
    pageTitleShadow,
  }
}

export function setPageTitleIconBox(
  pageTitleIconBox: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_PAGE_TITLE_ICON_BOX,
    pageTitleIconBox,
  }
}

export function setPageTitleDescription(
  pageTitleDescription: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_PAGE_TITLE_DESCRIPTION,
    pageTitleDescription,
  }
}
