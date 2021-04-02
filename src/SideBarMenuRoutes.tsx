import React from 'react'

import { menus } from 'src/constants/menu'

import { ReactComponent as Departments } from '../src/assets/svgs/departments.svg'
import { ReactComponent as Activity } from '../src/assets/svgs/feature_icon_activity.svg'
import { ReactComponent as Dashboard } from '../src/assets/svgs/feature_icon_dashboard.svg'
import { ReactComponent as Resources } from '../src/assets/svgs/settingSidebar/feature_icon_resources.svg'
import { ReactComponent as Social } from '../src/assets/svgs/settingSidebar/feature_icon_socials.svg'
import { ReactComponent as Residents } from '../src/assets/svgs/settingSidebar/residents.svg'
import { ReactComponent as ResidentPosts } from '../src/assets/svgs/settingSidebar/send_icon.svg'
import { ReactComponent as Employees } from '../src/assets/svgs/settingSidebar/user_colleague_icon.svg'
import { ReactComponent as SuggestFeature } from '../src/assets/svgs/suggest_feature.svg'
import { ReactComponent as ReportBug } from '../src/assets/svgs/support_icon_bug-white.svg'
import { ReactComponent as Support } from '../src/assets/svgs/support.svg'
import { Paths } from './routes/paths'

const { TITLE_MENU, MAIN_MENU, SUB_MENU } = menus

const whiteColor = { fill: 'white' }
const blackColor = { fill: '#4F4F4F' }
const primaryColor = { fill: '#1976D2' }
const primaryLightColor = { fill: '#A6D7FF' }

export const sidebarRoutes: any = [
  {
    name: TITLE_MENU.Activity,
    nameIcon: <Activity style={whiteColor} />,
    nameIconBlack: <Activity style={blackColor} />,
    menu: [
      {
        name: MAIN_MENU.Dashboard,
        icon: <Dashboard style={whiteColor} />,
        iconBlue: <Dashboard style={primaryColor} />,
        iconLightBlue: <Dashboard style={primaryLightColor} />,
        isActionAvailable: false,
        isWorking: true, // route is working then flag is true otherwise false
        isHideMobile: false,
        description: 'whatisnotmeasured',
        routePath: Paths.DASHBOARD,
      },
      // {
      //   name: MAIN_MENU.Calendar,
      //   isHideMobile: false,
      //   icon: <Calendar style={whiteColor} />,
      //   iconBlue: <Calendar style={primaryColor} />,
      //   iconLightBlue: <Calendar style={primaryLightColor} />,
      //   description: '',
      //   isWorking: true,
      //   routePath: Paths.CALENDAR,
      // },
      // {
      //   name: MAIN_MENU.Chat,
      //   isHideMobile: true,
      //   icon: <Chat style={whiteColor} />,
      //   iconBlue: <Chat style={primaryColor} />,
      //   iconLightBlue: <Chat style={primaryLightColor} />,
      //   description: '',
      //   isWorking: true,
      //   routePath: Paths.CHAT,
      // },
    ],
  },
  {
    name: TITLE_MENU.Social,
    nameIcon: <Social style={whiteColor} />,
    nameIconBlack: <Social style={blackColor} />,
    menu: [
      {
        name: SUB_MENU.Residents,
        icon: <Residents style={whiteColor} />,
        iconBlue: <Residents style={primaryColor} />,
        iconLightBlue: <Residents style={primaryLightColor} />,
        description: 'whatisnotmeasured',
        isHideMobile: false,
        isActionAvailable: false,
        isWorking: true,
        routePath: Paths.RESIDENTS,
      },
      {
        name: SUB_MENU.ResidentPosts,
        icon: <ResidentPosts style={whiteColor} />,
        iconBlue: <ResidentPosts style={primaryColor} />,
        iconLightBlue: <ResidentPosts style={primaryLightColor} />,
        description: 'whatisnotmeasured',
        isHideMobile: false,
        isActionAvailable: false,
        isWorking: true,
        routePath: Paths.RESIDENT_POSTS,
      },
      // {
      //   name: SUB_MENU.Alerts,
      //   icon: <Alerts style={whiteColor} />,
      //   iconBlue: <Alerts style={primaryColor} />,
      //   iconLightBlue: <Alerts style={primaryLightColor} />,
      //   description:
      //     'City managers can quickly inform geographically affected residents of urgent, time sensitive and location specific information.',
      //   isHideMobile: false,
      //   isActionAvailable: false,
      //   isWorking: true,
      //   routePath: Paths.ALERTS,
      // },
      // {
      //   name: SUB_MENU.Proposals,
      //   icon: <Proposals style={whiteColor} />,
      //   iconBlue: <Proposals style={primaryColor} />,
      //   iconLightBlue: <Proposals style={primaryLightColor} />,
      //   description:
      //     'Cities can measure public support for new proposals by allowing Elected Officials to invite affected residents to submit their level of support with the tap of a finger.',
      //   isHideMobile: false,
      //   isActionAvailable: false,
      //   isWorking: false,
      //   routePath: toLowerCaseReplace(SUB_MENU.Proposals),
      // },
      // {
      //   name: SUB_MENU.Events,
      //   icon: <Events style={whiteColor} />,
      //   iconBlue: <Events style={primaryColor} />,
      //   iconLightBlue: <Events style={primaryLightColor} />,
      //   description:
      //     'Cities can measure public support for new proposals by allowing Elected Officials to invite affected residents to submit their level of support with the tap of a finger.',
      //   isHideMobile: false,
      //   isActionAvailable: false,
      //   isWorking: false,
      //   routePath: toLowerCaseReplace(SUB_MENU.Events),
      // },
    ],
  },
  // {
  //   name: TITLE_MENU.Operations,
  //   nameIcon: <Operations style={whiteColor} />,
  //   nameIconBlack: <Operations style={blackColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.Tasks,
  //       icon: <Tasks style={whiteColor} />,
  //       iconBlue: <Tasks style={primaryColor} />,
  //       iconLightBlue: <Tasks style={primaryLightColor} />,
  //       description:
  //         'Making it easier for residents to express their needs creates more expectation, and more work. Managers can assign tasks to employees and follow them to completion within the Resident app.  Tasks can even be associated to Requests and Suggestions made by residents using the app, to make sure they are completed.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: true,
  //       routePath: toLowerCaseReplace(SUB_MENU.Tasks),
  //     },
  //     {
  //       name: SUB_MENU.Inspections,
  //       icon: <Inspections style={whiteColor} />,
  //       iconBlue: <Inspections style={primaryColor} />,
  //       iconLightBlue: <Inspections style={primaryLightColor} />,
  //       description:
  //         'Assets of all types (Infrastructure, Vehicles, Tools, Equipment) require regular inspection & maintenance. The Resident app alerts employees when they are requried and tracks when they are completed.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Inspections),
  //     },
  //     {
  //       name: SUB_MENU.Worklogs,
  //       icon: <Worklogs style={whiteColor} />,
  //       iconBlue: <Worklogs style={primaryColor} />,
  //       iconLightBlue: <Worklogs style={primaryLightColor} />,
  //       description:
  //         'Delighting residents requires that cities employ a rather large and qualified workforce. The Resident app helps track and measure time & attendance, facilitating payroll.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: true,
  //       routePath: toLowerCaseReplace(SUB_MENU.Worklogs),
  //     },
  //     {
  //       name: SUB_MENU.Routes,
  //       icon: <Routes style={whiteColor} />,
  //       iconBlue: <Routes style={primaryColor} />,
  //       iconLightBlue: <Routes style={primaryLightColor} />,
  //       description:
  //         'Cities can provide essential services such Waste & Recycling colleciton, Snow removal, Street Cleaning more efficiently by allowing employees to navigate planned and optimized routes from their smartphones.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Routes),
  //     },
  //     {
  //       name: SUB_MENU.Trips,
  //       icon: <Trips style={whiteColor} />,
  //       iconBlue: <Trips style={primaryColor} />,
  //       iconLightBlue: <Trips style={primaryLightColor} />,
  //       description:
  //         'Cities can provide essential services such Waste & Recycling colleciton, Snow removal, Street Cleaning more efficiently by allowing employees to navigate planned and optimized routes from their smartphones.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Trips),
  //     },
  //     {
  //       name: SUB_MENU.Playbooks,
  //       icon: <Playbooks style={whiteColor} />,
  //       iconBlue: <Playbooks style={primaryColor} />,
  //       iconLightBlue: <Playbooks style={primaryLightColor} />,
  //       description:
  //         'Operations managers can program automated response plans to mobilize their resources when responses to exterme weather events such as snow storms, floods, earthquakes and other natural occurances are required.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Playbooks),
  //     },
  //   ],
  // },
  {
    name: TITLE_MENU.Resources,
    nameIcon: <Resources style={whiteColor} />,
    nameIconBlack: <Resources style={blackColor} />,
    menu: [
      {
        name: SUB_MENU.Employees,
        icon: <Employees style={whiteColor} />,
        iconBlue: <Employees style={primaryColor} />,
        iconLightBlue: <Employees style={primaryLightColor} />,
        description: 'whatisnotmeasured',
        isHideMobile: false,
        isActionAvailable: false,
        isWorking: true,
        routePath: Paths.EMPLOYEES,
      },
      {
        name: SUB_MENU.Departments,
        icon: <Departments style={whiteColor} />,
        iconBlue: <Departments style={primaryColor} />,
        iconLightBlue: <Departments style={primaryLightColor} />,
        isActionAvailable: false,
        description: 'manage_the_operating_department',
        isWorking: true,
        routePath: Paths.DEPARTMENTS,
      },
      // {
      //   name: SUB_MENU.Vehicles,
      //   icon: <Vehicles style={whiteColor} />,
      //   iconBlue: <Vehicles style={primaryColor} />,
      //   iconLightBlue: <Vehicles style={primaryLightColor} />,
      //   description: '',
      //   isHideMobile: false,
      //   isActionAvailable: false,
      //   isWorking: false,
      //   routePath: toLowerCaseReplace(SUB_MENU.Vehicles),
      // },
      // {
      //   name: SUB_MENU.ToolsEquipment,
      //   icon: <ToolsEquipment style={whiteColor} />,
      //   iconBlue: <ToolsEquipment style={primaryColor} />,
      //   iconLightBlue: <ToolsEquipment style={primaryLightColor} />,
      //   description: '',
      //   isHideMobile: false,
      //   isActionAvailable: false,
      //   isWorking: false,
      //   routePath: 'tools-equipment',
      // },
    ],
  },
  // {
  //   name: TITLE_MENU.Facilities,
  //   nameIcon: <Facilities style={whiteColor} />,
  //   nameIconBlack: <Facilities style={blackColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.Assets,
  //       icon: <Assets style={whiteColor} />,
  //       iconBlue: <Assets style={primaryColor} />,
  //       iconLightBlue: <Assets style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Assets),
  //     },
  //     {
  //       name: SUB_MENU.Infrastructure,
  //       icon: <Infrastructure style={whiteColor} />,
  //       iconBlue: <Infrastructure style={primaryColor} />,
  //       iconLightBlue: <Infrastructure style={primaryLightColor} />,
  //       description:
  //         'Residents need their cities to provide them with purposeful, modern and maintained infrastructure. This feature allows cities to meet those needs, and residents to know it.',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.Infrastructure),
  //     },
  //   ],
  // },
  // {
  //   name: TITLE_MENU.Services,
  //   nameIcon: <Services style={whiteColor} />,
  //   nameIconBlack: <Services style={blackColor} />,
  //   menu: [
  //     {
  //       name: SUB_MENU.MUNICIPALTAXES,
  //       icon: <MTaxes style={whiteColor} />,
  //       iconBlue: <MTaxes style={primaryColor} />,
  //       iconLightBlue: <MTaxes style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.MUNICIPALTAXES),
  //     },
  //     {
  //       name: SUB_MENU.PARKINGFINES,
  //       icon: <Parking style={whiteColor} />,
  //       iconBlue: <Parking style={primaryColor} />,
  //       iconLightBlue: <Parking style={primaryLightColor} />,
  //       description: '',
  //       isHideMobile: false,
  //       isActionAvailable: false,
  //       isWorking: false,
  //       routePath: toLowerCaseReplace(SUB_MENU.PARKINGFINES),
  //     },
  //   ],
  // },
  {
    name: TITLE_MENU.Support,
    nameIcon: <Support style={whiteColor} />,
    nameIconBlack: <Support style={blackColor} />,
    menu: [
      {
        name: SUB_MENU.Report_Bug,
        icon: <ReportBug style={whiteColor} />,
        iconBlue: <ReportBug style={primaryColor} />,
        iconLightBlue: <ReportBug style={primaryLightColor} />,
        description: '',
        isHideMobile: false,
        isActionAvailable: false,
        isRedirect: true,
        isWorking: true,
        routePath: 'https://citycarebugs.ideas.aha.io/ideas/new',
      },
      {
        name: SUB_MENU.Suggest_Feature,
        icon: <SuggestFeature style={whiteColor} />,
        iconBlue: <SuggestFeature style={primaryColor} />,
        iconLightBlue: <SuggestFeature style={primaryLightColor} />,
        isActionAvailable: false,
        description: '',
        isRedirect: true,
        isWorking: true,
        routePath: 'https://citycare.ideas.aha.io/ideas/new',
      },
    ],
  },
]
