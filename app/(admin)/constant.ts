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

export interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: string
  uploadDate: string
  views: number
  likes: number
}

export const dummyVideos: Video[] = [
  {
    id: '1',
    title: 'Effective Communication with Your Child',
    description:
      'Learn key strategies to improve communication with your children and foster a stronger relationship.',
    thumbnailUrl: 'https://example.com/thumbnails/communication.jpg',
    duration: '15:30',
    uploadDate: '2024-03-10',
    views: 1250,
    likes: 87
  },
  {
    id: '2',
    title: 'Fun Indoor Activities for Kids',
    description:
      'Discover creative and educational indoor activities to keep your children engaged and learning.',
    thumbnailUrl: 'https://example.com/thumbnails/indoor-activities.jpg',
    duration: '12:45',
    uploadDate: '2024-03-15',
    views: 980,
    likes: 65
  },
  {
    id: '3',
    title: 'Healthy Meal Prep for Busy Parents',
    description:
      'Quick and nutritious meal prep ideas for parents on the go, ensuring your family eats well every day.',
    thumbnailUrl: 'https://example.com/thumbnails/meal-prep.jpg',
    duration: '18:20',
    uploadDate: '2024-03-20',
    views: 1500,
    likes: 110
  },
  {
    id: '4',
    title: 'Bedtime Routines for Better Sleep',
    description:
      'Establish effective bedtime routines to help your children get the rest they need for healthy development.',
    thumbnailUrl: 'https://example.com/thumbnails/bedtime-routines.jpg',
    duration: '14:15',
    uploadDate: '2024-03-25',
    views: 2200,
    likes: 156
  },
  {
    id: '5',
    title: 'Managing Sibling Rivalry',
    description:
      'Practical tips and strategies to help manage sibling rivalry and promote harmony in your household.',
    thumbnailUrl: 'https://example.com/thumbnails/sibling-rivalry.jpg',
    duration: '20:00',
    uploadDate: '2024-03-30',
    views: 1800,
    likes: 132
  }
]
