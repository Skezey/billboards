import React from 'react';
import UserIndex from '../users/UserIndex';
import { Header, Tab} from 'semantic-ui-react';
import EventIndex from '../events/EventIndex'

const panes = [
  { menuItem: 'Manage Users', render: () => <Tab.Pane><UserIndex /></Tab.Pane> },
  { menuItem: 'Manage Events', render: () => <Tab.Pane><EventIndex /></Tab.Pane> },
]

const AdminTabs = () => <Tab panes={panes} />

const AdminDashboard = () => (

  <div style={{backgroundColor: 'white'}}>
    <Header style={{color:'white'}}>Admin Dashboard</Header>
    <AdminTabs />
  </div>
)

export default AdminDashboard;
