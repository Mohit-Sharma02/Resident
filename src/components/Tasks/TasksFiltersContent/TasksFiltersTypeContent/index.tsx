import React, { useCallback, useState } from 'react'

import {
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  Tab,
  Tabs,
} from '@material-ui/core'

import CheckboxField from 'src/components/FilterDrawer/fields/CheckboxField'

const ResidentPostsFiltersTypeContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const getFieldClass = useCallback((active: boolean) => {
    return active ? 'd-block' : 'd-none'
  }, [])

  return (
    <>
      <Paper square>
        <Tabs
          value={activeTab}
          onChange={(e, tab) => setActiveTab(tab)}
          className="mb-4"
          centered
        >
          <Tab label="Residents" />
          <Tab label="Suggestions" />
          <Tab label="Appreciations" />
        </Tabs>
      </Paper>
      <div className={getFieldClass(activeTab === 0)}>
        <FormControl component="fieldset" className="mb-4" fullWidth>
          <FormLabel component="legend">Select status</FormLabel>
          <FormGroup>
            <CheckboxField name="type.requests.status.open" label="Open" />
            <CheckboxField name="type.requests.status.read" label="Read" />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Select Categories</FormLabel>
          <FormGroup>
            <CheckboxField
              name="type.requests.categories.strayAnimal"
              label="Stray Animal"
            />
            <CheckboxField
              name="type.requests.categories.wasteCollection"
              label="Waste Collection"
            />
          </FormGroup>
        </FormControl>
      </div>
      <div className={getFieldClass(activeTab === 1)}>suggestions</div>
      <div className={getFieldClass(activeTab === 2)}>appreciations</div>
    </>
  )
}

export default ResidentPostsFiltersTypeContent
