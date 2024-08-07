export interface Article {
  id: string
  title: string
  content: string
  author: string
  publishDate: string
}

export const dummyArticles: Article[] = [
  {
    id: '1',
    title: 'The Importance of Early Childhood Education',
    content: "Early childhood education plays a crucial role in a child's development...",
    author: 'Jane Doe',
    publishDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'Nutrition Tips for Growing Kids',
    content: 'Proper nutrition is essential for the healthy growth and development of children...',
    author: 'John Smith',
    publishDate: '2024-03-20'
  },
  {
    id: '3',
    title: 'Balancing Screen Time in the Digital Age',
    content:
      "In today's digital world, managing children's screen time has become a crucial parenting task...",
    author: 'Emily Johnson',
    publishDate: '2024-03-25'
  },
  {
    id: '4',
    title: 'The Power of Positive Reinforcement',
    content:
      "Positive reinforcement is a powerful tool in shaping children's behavior and building their self-esteem...",
    author: 'Michael Brown',
    publishDate: '2024-03-30'
  },
  {
    id: '5',
    title: 'Encouraging Creativity in Children',
    content:
      'Fostering creativity in children can have long-lasting benefits for their cognitive and emotional development...',
    author: 'Sarah Wilson',
    publishDate: '2024-04-05'
  }
]
