import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatScore(score: number, total: number) {
  const percentage = Math.round((score / total) * 100)
  return `${score}/${total} (${percentage}%)`
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
    case 'intermediate':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
    case 'advanced':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900'
  }
}

export function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case 'warning':
      return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900'
    case 'regulatory':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
    case 'mandatory':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900'
    case 'informational':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
    case 'directional':
      return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900'
    case 'roadwork':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
    case 'others':
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900'
    case 'supplementary':
      return 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900'
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900'
  }
}
