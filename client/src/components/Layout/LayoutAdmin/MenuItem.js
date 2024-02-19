import LstIcons from "src/components/ListIcons"

export const menuItem = () => {
  return [
    {
      icon: LstIcons.ICON_STATISTIC,
      label: "Statistic",
      key: '/dashboard',
    },
    {
      icon: LstIcons.ICON_USER,
      label: "Users",
      key: '/dashboard/users',
    },
    {
      icon: LstIcons.ICON_GENRES,
      label: "Genres",
      key: '/dashboard/genres',
    },
    {
      icon: LstIcons.ICON_COMIC,
      label: "Comics",
      key: '/dashboard/comics',
    },
    {
      icon: LstIcons.ICON_REPORT,
      label: "Report",
      key: '/dashboard/report',
    },
    {
      icon: <div style={{ marginLeft: '-5px' }}>{LstIcons.ICON_LOGOUT}</div>,
      label: "Log out",
      key: 'logout',
    },
  ]
}