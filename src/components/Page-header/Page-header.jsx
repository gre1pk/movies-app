import { Tabs } from 'antd'

import './Page-header.css'

const { TabPane } = Tabs

function PageHeader({ onTogleTab }) {
  return (
    <header className="header">
      <Tabs defaultActiveKey="1" centered size="large" onChange={onTogleTab}>
        <TabPane tab="Search" key="search" />
        <TabPane tab="Rated" key="rated" />
      </Tabs>
    </header>
  )
}
export default PageHeader
