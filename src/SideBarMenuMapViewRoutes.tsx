import React from 'react'

import { menus } from 'src/constants/menu'
import { toLowerCaseReplace } from 'src/utils/lowerCaseReplace'

import { ReactComponent as Appreciations } from '../src/assets/svgs/feature_icon_appreciation.svg'
import { ReactComponent as Requests } from '../src/assets/svgs/feature_icon_request.svg'
import { ReactComponent as Social } from '../src/assets/svgs/settingSidebar/feature_icon_socials.svg'
import { ReactComponent as Residents } from '../src/assets/svgs/settingSidebar/residents.svg'
import { ReactComponent as Suggestions } from '../src/assets/svgs/Suggestions.svg'
import { Paths } from './routes/paths'

const { TITLE_MENU, SUB_MENU } = menus
const primaryColor = { fill: '#1976D2' }
const primaryLightColor = { fill: '#A6D7FF' }
const whiteColor = { fill: 'white' }

export const sidebarMapViewRoutes: any = [
  {
    name: TITLE_MENU.Social,
    nameIcon: <Social style={whiteColor} />,
    menu: [
      {
        name: SUB_MENU.Residents,
        type: 'residents',
        icon: <Residents style={whiteColor} />,
        iconBlue: <Residents style={primaryColor} />,
        iconLightBlue: <Residents style={primaryLightColor} />,
        description:
          'What is not measured cannot be improved.  Key performance indicators are visible at a glance to see how things are progressing, and how cities compare to each other.',
        isHideMobile: false,
        isActionAvailable: false,
        routePath: Paths.RESIDENTS,
        checked: true,
      },
      {
        name: SUB_MENU.Requests,
        type: 'requests',
        icon: <Requests style={whiteColor} />,
        iconBlue: <Requests style={primaryColor} />,
        iconLightBlue: <Requests style={primaryLightColor} />,
        description: '',
        isHideMobile: false,
        isActionAvailable: false,
        routePath: toLowerCaseReplace(SUB_MENU.Requests),
        checked: true,
      },
      {
        name: SUB_MENU.Appreciations,
        type: 'appreciations',
        icon: <Appreciations style={whiteColor} />,
        iconBlue: <Appreciations style={primaryColor} />,
        iconLightBlue: <Appreciations style={primaryLightColor} />,
        description: '',
        isHideMobile: false,
        isActionAvailable: false,
        routePath: toLowerCaseReplace(SUB_MENU.Appreciations),
        checked: true,
      },
      {
        name: SUB_MENU.Suggestions,
        type: 'suggestions',
        icon: <Suggestions style={whiteColor} />,
        iconBlue: <Suggestions style={primaryColor} />,
        iconLightBlue: <Suggestions style={primaryLightColor} />,
        description: '',
        isHideMobile: false,
        isActionAvailable: false,
        routePath: toLowerCaseReplace(SUB_MENU.Suggestions),
        checked: true,
      },
    ],
  },
  // {
  //   name: TITLE_MENU.CityPosts,
  //   nameIcon: <CityPosts style={whiteColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.Alerts,
  //       icon: <Alerts style={whiteColor} />,
  //       iconBlue: <Alerts style={primaryColor} />,
  //       iconLightBlue: <Alerts style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Alerts),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Proposals,
  //       icon: <Proposals style={whiteColor} />,
  //       iconBlue: <Proposals style={primaryColor} />,
  //       iconLightBlue: <Proposals style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Proposals),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Events,
  //       icon: <Events style={whiteColor} />,
  //       iconBlue: <Events style={primaryColor} />,
  //       iconLightBlue: <Events style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Events),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Districts,
  //       icon: <Districts style={whiteColor} />,
  //       iconBlue: <Districts style={primaryColor} />,
  //       iconLightBlue: <Districts style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Districts),
  //       checked: false,
  //     },
  //   ],
  // },
  // {
  //   name: TITLE_MENU.Operations,
  //   nameIcon: <Resources style={whiteColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.Tasks,
  //       icon: <Tasks style={whiteColor} />,
  //       iconBlue: <Tasks style={primaryColor} />,
  //       iconLightBlue: <Tasks style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Tasks),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Inspections,
  //       icon: <Inspections style={whiteColor} />,
  //       iconBlue: <Inspections style={primaryColor} />,
  //       iconLightBlue: <Inspections style={primaryLightColor} />,
  //       description:
  //         'Manage the Operating Departments within your City.  Commonly used departments have already been created. Assign directors to each, and they’ll invite their managers and employees.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Inspections),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Worklogs,
  //       icon: <Worklogs style={whiteColor} />,
  //       iconBlue: <Worklogs style={primaryColor} />,
  //       iconLightBlue: <Worklogs style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Worklogs),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Routes,
  //       icon: <Routes style={whiteColor} />,
  //       iconBlue: <Routes style={primaryColor} />,
  //       iconLightBlue: <Routes style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Routes),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Trips,
  //       icon: <Trips style={whiteColor} />,
  //       iconBlue: <Trips style={primaryColor} />,
  //       iconLightBlue: <Trips style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Trips),
  //       checked: false,
  //     },
  //   ],
  // },
  // {
  //   name: TITLE_MENU.Resources,
  //   nameIcon: <Resources style={whiteColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.Employees,
  //       icon: <Employees style={whiteColor} />,
  //       iconBlue: <Employees style={primaryColor} />,
  //       iconLightBlue: <Employees style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Employees),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Vehicles,
  //       icon: <Vehicles style={whiteColor} />,
  //       iconBlue: <Vehicles style={primaryColor} />,
  //       iconLightBlue: <Vehicles style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Vehicles),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.ToolsEquipment,
  //       icon: <ToolsEquipment style={whiteColor} />,
  //       iconBlue: <ToolsEquipment style={primaryColor} />,
  //       iconLightBlue: <ToolsEquipment style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.ToolsEquipment),
  //       checked: false,
  //     },
  //   ],
  // },
  // {
  //   name: TITLE_MENU.Facilities,
  //   nameIcon: <Facilities style={whiteColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.Assets,
  //       icon: <Assets style={whiteColor} />,
  //       iconBlue: <Assets style={primaryColor} />,
  //       iconLightBlue: <Assets style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Assets),
  //       checked: false,
  //     },
  //     {
  //       name: SUB_MENU.Infrastructure,
  //       icon: <Infrastructure style={whiteColor} />,
  //       iconBlue: <Infrastructure style={primaryColor} />,
  //       iconLightBlue: <Infrastructure style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Infrastructure),
  //       checked: false,
  //     },
  //   ],
  // },
]
