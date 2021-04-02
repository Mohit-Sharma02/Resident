import React from 'react'

import CheckboxIconField from 'src/components/FilterDrawer/fields/CheckboxIconField'
import HiddenContent from 'src/components/FilterDrawer/HiddenContent'

import { ReactComponent as AnimalControlIcon } from './icons/animal-control.svg'
import { ReactComponent as HousingIcon } from './icons/housing.svg'
import { ReactComponent as IdeasForTheAppIcon } from './icons/ideas-for-the-app.svg'
import { ReactComponent as PublicEventsIcon } from './icons/public-events.svg'
import { ReactComponent as PublicParksAndSpacesIcon } from './icons/public-parks-and-spaces.svg'
import { ReactComponent as PublicTransitIcon } from './icons/public-transit.svg'
import { ReactComponent as PublicWifiIcon } from './icons/public-wifi.svg'
import { ReactComponent as RoadsIcon } from './icons/roads.svg'
import { ReactComponent as WasteCollectionIcon } from './icons/waste-collection.svg'
import { ReactComponent as WaterworksIcon } from './icons/waterworks.svg'

const ResidentPostsCategoriesFilters: React.FC = () => {
  return (
    <HiddenContent label="Categories">
      <CheckboxIconField
        name="categories.ideasForTheApp"
        label="Ideas for the App"
        icon={<IdeasForTheAppIcon />}
      />
      <CheckboxIconField
        name="categories.publicWifi"
        label="Public Wifi"
        icon={<PublicWifiIcon />}
      />
      <CheckboxIconField
        name="categories.publicParksAndSpaces"
        label="Public Parks &amp; Spaces"
        icon={<PublicParksAndSpacesIcon />}
      />
      <CheckboxIconField
        name="categories.publicEvents"
        label="Public Events"
        icon={<PublicEventsIcon />}
      />
      <CheckboxIconField
        name="categories.publicTransit"
        label="Public Transit"
        icon={<PublicTransitIcon />}
      />
      <CheckboxIconField
        name="categories.roads"
        label="Roads"
        icon={<RoadsIcon />}
      />
      <CheckboxIconField
        name="categories.wasteCollection"
        label="Waste Collection"
        icon={<WasteCollectionIcon />}
      />
      <CheckboxIconField
        name="categories.waterworks"
        label="Waterworks"
        icon={<WaterworksIcon />}
      />
      <CheckboxIconField
        name="categories.housing"
        label="Housing"
        icon={<HousingIcon />}
      />
      <CheckboxIconField
        name="categories.animalControl"
        label="Animal Control"
        icon={<AnimalControlIcon />}
      />
    </HiddenContent>
  )
}

export default ResidentPostsCategoriesFilters
