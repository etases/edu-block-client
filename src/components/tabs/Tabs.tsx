import { Tabs as MTabs, TabsProps } from '@mantine/core'

export function Tabs(props: TabsProps) {
  return <Tabs {...props} />
}

const { List: TabList, Panel: TabPanel, Tab: TabItem } = MTabs

export { TabList, TabPanel, TabItem }
