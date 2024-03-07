import LstIcons from "src/components/ListIcons"

export const menuItem = () => {
  return [
    {
      icon: LstIcons.ICON_STATISTIC,
      label: "Statistic",
      key: '/dashboard',
    },
    {
      icon: LstIcons.ICON_PREMIUM,
      label: "Package premium",
      key: '/dashboard/packages',
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
      icon: <div style={{ marginLeft: '-5px' }}>{LstIcons.ICON_LOGOUT}</div>,
      label: "Log out",
      key: 'logout',
    },
  ]
}