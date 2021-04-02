import React from 'react'

type ItemAvatarProps = {
  src: string
  name?: string
  subtitle?: string
}

const ItemAvatar: React.FC<ItemAvatarProps> = ({ src, name, subtitle }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
        <div className="avatar-icon">
          <img alt="..." src={src} />
        </div>
      </div>
      <div className="text-primary-text">
        {name && name}
        {subtitle && (
          <>
            <br />
            <span className="color-grey text-uppercase font-size-xs text-secondary-text">
              {subtitle}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default ItemAvatar
