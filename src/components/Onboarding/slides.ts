export interface Slide {
  id: string
  title: string
  highlight?: string
  highlightIndexStart: number
  highlightIndexEnd: number
  description: string
  image: number
}

export const slides: Slide[] = [
  {
    id: '1',
    title: 'Solusi Nutrisi Terpecaya Untuk Anak!',
    highlight: 'Anak!',
    highlightIndexStart: 4,
    highlightIndexEnd: 4,
    description:
      'NutriWise memudahkan ibu hamil dan pengasuh dalam merencanakan makanan bergizi untuk anak.',
    image: require('../../assets/images/onboarding/onboarding-1.png')
  },
  {
    id: '2',
    title: 'Mendukung Kesehatan Mental Ibu!',
    highlight: 'Kesehatan Mental',
    highlightIndexStart: 1,
    highlightIndexEnd: 2,
    description:
      'Temukan ketenangan dalam setiap langkah dengan WiseGuard, panduan dan dukungan kesehatan mental bagi ibu.',
    image: require('../../assets/images/onboarding/onboarding-2.png')
  },
  {
    id: '3',
    title: 'Semua ada dalam satu genggaman!',
    highlight: 'satu',
    highlightIndexStart: 3,
    highlightIndexEnd: 3,
    description:
      'Dengan ragam fitur Little Steps, setiap langkah perjalanan sebagai orang tua akan terasa lebih mudah.',
    image: require('../../assets/images/onboarding/onboarding-3.png')
  }
]
