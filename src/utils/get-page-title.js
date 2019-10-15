import defaultSettings from '@/settings'

const title = defaultSettings.title || '租赁公司管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
