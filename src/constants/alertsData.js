import image from 'src/assets/images/valeria.png'

export const AlertsData = {
  head: [
    {
      type: 'id',
      title: 'Id',
      key: 'id',
    },
    {
      type: 'avatar',
      title: 'Publisher',
      key: 'publisher',
    },
    {
      type: 'text',
      title: 'Subject',
      key: 'subject',
    },
    {
      type: 'avatar',
      title: 'Assignee',
      key: 'assignee',
    },
    {
      type: 'status',
      title: 'Priority',
      key: 'priority',
    },
    {
      type: 'status',
      title: 'Status',
      key: 'status',
    },
    {
      type: 'date',
      title: 'Posted',
      key: 'posted',
    },
    {
      type: 'date',
      title: 'Last Responded',
      key: 'lastResponded',
    },
    {
      type: 'action',
      title: 'Actions',
      key: 'action',
    },
  ],
  data: [
    {
      id: '455',
      publisher: {
        avatar: image,
        name: 'Valérie Plante',
      },
      subject:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do consectetur eiusmod tempor i aliqua.',
      assignee: {
        avatar: image,
      },
      priority: 'High',
      status: 'Open',
      posted: '09/09/2020',
      lastResponded: '11/11/2020',
    },
    {
      id: '455',
      publisher: {
        avatar: image,
        name: 'Valérie Plante',
      },
      subject:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do consectetur eiusmod tempor i aliqua.',
      assignee: {
        avatar: image,
      },
      priority: 'High',
      status: 'Open',
      posted: '09/09/2020',
      lastResponded: '11/11/2020',
    },
    {
      id: '455',
      publisher: {
        avatar: image,
        name: 'Valérie Plante',
      },
      subject:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do consectetur eiusmod tempor i aliqua.',
      assignee: {
        avatar: image,
      },
      priority: 'High',
      status: 'Open',
      posted: '09/09/2020',
      lastResponded: '11/11/2020',
    },
  ],
}
