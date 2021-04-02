import React, { useEffect, useState } from 'react'

import { Button, Tab, Tabs, withStyles } from '@material-ui/core'
import { useQuery } from 'react-query'

import { Icon } from 'src/components/Icon'
import { formatDate, getDaysAgo } from 'src/helpers/formatDate'
import { useTranslate } from 'src/locale'
import { getComments } from 'src/services/firebase/social/getComments'
import { getHistory } from 'src/services/firebase/social/getHistory'
import { getInternalNotes } from 'src/services/firebase/social/getInternalNotes'
import { ResidentPostItem } from 'src/services/firebase/social/getResidentPosts'
import { getToDolists } from 'src/services/firebase/social/getToDolists'

import AvatarName from './AvatarName'
import CommentContent from './CommentContent'
import HistoryTabContent from './HistoryTabContent'
import NotesTabContent from './NotesTabContent'
import OverviewTabContent from './OverviewTabContent'
import ToDoTabContent from './ToDoTabContent'

import './ToDoTabContent/styles.scss'
import '../../../assets/custom/_postContent.scss'

type ResidentPostContentProps = {
  data?: ResidentPostItem
  postStatus?: any
  type: string
  updated?: any
  isPopover?: boolean
}

const StyledTabs = withStyles({
  root: {
    borderBottom: '2px solid #ddd',
  },
  indicator: {
    height: '2px !important',
    minHeight: '0 !important',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    marginTop: -2,
    '& > span': {
      width: '100%',
      backgroundColor: '#333',
    },
  },
})(Tabs)

const StyledTab = withStyles({
  root: {},
})(Tab)

const ResidentPostContent: React.FC<ResidentPostContentProps> = ({
  data,
  type,
  postStatus,
  isPopover,
  updated,
}) => {
  const translate = useTranslate()
  const [tab, setTab] = useState<number>(0)
  const [role, setRole] = useState<string>()
  const [userDepartmentId, setUserDepartmentId] = useState<string>()
  const [departmentId, setDepartmentId] = useState<string>()
  const [showComment, setShowComment] = useState<boolean>(false)

  const {
    data: todoLists,
    isLoading: isLoadingToDoList,
    isFetching: isFetchingToDoList,
  } = useQuery(['toDolists', type, data?.id], ({ queryKey }) =>
    getToDolists({ type: queryKey[1], postId: queryKey[2] }),
  )

  const {
    data: internalNotes,
    isLoading: isLoadingInternalNotes,
    isFetching: isFetchingInternalNotes,
  } = useQuery(['internalNotes', type, data?.id], ({ queryKey }) =>
    getInternalNotes({ type: queryKey[1], postId: queryKey[2] }),
  )

  const { data: history, isLoading: isLoadingHistory } = useQuery(
    ['history', type, data?.id],
    ({ queryKey }) => getHistory({ postId: queryKey[2], type: queryKey[1] }),
  )

  const { data: comments, isLoading: isLoadingComments } = useQuery(
    ['comments', type, data?.id],
    ({ queryKey }) => getComments({ postId: queryKey[2], type: queryKey[1] }),
  )

  const getUserData = () => {
    const storage: any = window.localStorage
    const user = storage.getItem('user')

    return JSON.parse(user)
  }

  useEffect(() => {
    if (!data) {
      return
    }

    const user = getUserData()
    setRole(user?.role)
    setUserDepartmentId(user?.department)
    setDepartmentId(data?.assignee?.department?.id)
  }, [data])

  if (!data) {
    return <></>
  }

  const fixMarkerImage = (status, icon) => {
    const type = status.split('_')[status.split('_').length - 1]

    return icon.replace('black', type)
  }

  const statusIcon = fixMarkerImage(
    data.status?.current?.status,
    data.type?.icon,
  )

  const disableActions = () => {
    if (role === 'ElectedOfficial') return false

    if (role === 'Employee') return true

    if (departmentId === '' || userDepartmentId === '') return true

    if (role === 'DepartmentManager') {
      if (departmentId === userDepartmentId) return false
    }

    return true
  }

  const disableComments = () => {
    if (role === 'ElectedOfficial') return false

    if (departmentId === '' || userDepartmentId === '') return true

    if (role === 'DepartmentManager' || role === 'Employee') {
      if (departmentId === userDepartmentId) return false
    }

    return true
  }

  return (
    <>
      <div
        className="py-2 px-4 mb-4 d-flex flex-row"
        style={{
          backgroundColor: '#F9FBFD',
          marginLeft: -15,
          marginRight: -25,
        }}
      >
        <div className="mr-1" style={{ flex: 1 }}>
          <AvatarName
            src={data.resident.avatar}
            name={data.resident.name}
            date={formatDate(data.createdDate)}
          />
        </div>
        <div className="d-flex flex-orow align-items-center justfy-content-center">
          <div className="text-right">
            <div className="font-size-md title-color font-weight bold">
              {translate(data.status?.current?.status)}
            </div>
            <div
              style={{ fontSize: '10px' }}
              className="font-size-xs text-secondary-text"
            >
              {getDaysAgo(data.status?.current?.date)}
            </div>
          </div>
          <div
            style={{ backgroundColor: '#EFF3F4' }}
            className="ml-2 rounded-circle p-1"
          >
            {statusIcon && (
              <Icon height="25" name={`svg_icons/${statusIcon}`} />
            )}
          </div>
        </div>
      </div>
      <div className="font-weight-600 title-color font-size-sm mb-2">
        {data.formattedAddress}
      </div>
      <p className="font-size-sm title-color font-weight-500 mb-4">
        {data.description}
      </p>
      <img
        src={data.image}
        className={`${isPopover ? `pop-img` : `mb-0`}`}
        style={{
          marginLeft: -25,
          marginRight: -25,
          width: 'calc(100% + 65px)',
        }}
      />
      <div
        style={{ marginLeft: -25, marginRight: -25 }}
        className="d-flex flex-row  align-items-center justfy-content-center bg-secondary mb-0 p-4"
      >
        <div className="like-dislike d-flex flex-row flex-1 mt-1">
          <div className="btn-link mr-4">
            <span className="total-like">{data.likesCount}</span>
            <Icon name={'svg_icons/action_like_icon'} />
          </div>
          <div className="btn-link">
            <span className="total-like">{data.dislikesCount}</span>
            <Icon name={'svg_icons/action_dislike_icon'} />
          </div>
        </div>
        <Button
          onClick={() => setShowComment(true)}
          className="btn-link font-size-sm text-first font-weight-bold border py-1 px-3 rounded-lg m-0 border-first"
        >
          {data.commentCount}
          {data.commentCount !== 1 && (
            <span className="ml-2">{translate('comments')}</span>
          )}
          {data.commentCount === 1 && (
            <span className="ml-2">{translate('Comment_live')}</span>
          )}
        </Button>
      </div>
      {showComment && (
        <div style={{ marginLeft: -25, marginRight: -25, marginTop: -10 }}>
          <CommentContent
            items={comments || []}
            postId={data.id}
            type={type}
            isLoading={isLoadingComments}
            callBack={() => setShowComment(false)}
          />
        </div>
      )}

      {!isPopover && (
        <>
          <StyledTabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            className="mb-4"
            TabIndicatorProps={{
              children: <span className="currentTabIndicator" />,
            }}
            centered
          >
            <StyledTab label={translate('overview')} value={0} />
            <StyledTab
              label={`${translate('notes')} (${data.internalNotesCount})`}
              value={1}
            />
            <StyledTab
              label={`${translate('todo_key')} (${
                (todoLists && todoLists.length) || 0
              })`}
              value={2}
            />
            <StyledTab label={translate('history')} value={3} />
          </StyledTabs>

          <div className="fix_height" hidden={tab !== 0}>
            <OverviewTabContent
              postStatus={postStatus}
              data={data}
              type={type}
              disabled={disableActions()}
              update={() => {
                if (updated) {
                  updated()
                }
              }}
            />
          </div>

          <div className="fix_height" hidden={tab !== 1}>
            <NotesTabContent
              disabled={disableComments()}
              items={internalNotes || []}
              postId={data.id}
              type={type}
              isLoading={isLoadingInternalNotes || isFetchingInternalNotes}
            />
          </div>

          <div className="fix_height" hidden={tab !== 2}>
            <ToDoTabContent
              items={todoLists || []}
              postId={data.id}
              type={type}
              isLoading={isLoadingToDoList || isFetchingToDoList}
            />
          </div>

          <div className="fix_height" hidden={tab !== 3}>
            <HistoryTabContent
              items={history || []}
              postId={data.id}
              type={type}
              isLoading={isLoadingHistory}
            />
          </div>
        </>
      )}
    </>
  )
}

export default ResidentPostContent
