import {
    CircleIcon,
    WindmillIcon,
    TypographyIcon,
    ShadowIcon,
    PaletteIcon,
    KeyIcon,
    BugIcon,
    DashboardIcon,
    DeviceWatchStats2Icon,
    UsersGroupIcon,
    BrandChromeIcon,
    HelpIcon,
    DevicesPinIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: object;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: '仪表盘' },
    {
        title: '数据统计',
        icon: DashboardIcon,
        to: '/dashboard/default'
    },
    {
        title: '电量检查',
        icon: DevicesPinIcon,
        to: '/dashboard/devices'
    },
    {
        title: '用户管理',
        icon: UsersGroupIcon,
        to: '/dashboard/users',
    },
    {
        title: 'MQTT管理',
        icon: DeviceWatchStats2Icon,
        to: '/dashboard/mqtt'
    },
    { divider: true },
    { header: 'Pages' },
    {
        title: 'Authentication',
        icon: KeyIcon,
        to: '/auth',
        children: [
            {
                title: 'Login',
                icon: CircleIcon,
                to: '/auth/login'
            },
            {
                title: 'Register',
                icon: CircleIcon,
                to: '/auth/register'
            }
        ]
    },
    /*
    {
      title: 'Error 404',
      icon: BugIcon,
      to: '/pages/error'
    },
    
    { divider: true },
    { header: 'Utilities' },
    {
      title: 'Typography',
      icon: TypographyIcon,
      to: '/utils/typography'
    },
    {
      title: 'Shadows',
      icon: ShadowIcon,
      to: '/utils/shadows'
    },
    {
      title: 'Colors',
      icon: PaletteIcon,
      to: '/utils/colors'
    },
  
    {
      title: 'Icons',
      icon: WindmillIcon,
      to: '/forms/radio',
      children: [
        {
          title: 'Tabler Icons',
          icon: CircleIcon,
          to: '/icons/tabler'
        },
        {
          title: 'Material Icons',
          icon: CircleIcon,
          to: '/icons/material'
        }
      ]
    },
    { divider: true },
    {
      title: 'Sample Page',
      icon: BrandChromeIcon,
      to: '/starter'
    },
    {
      title: 'Documentation',
      icon: HelpIcon,
      to: 'https://codedthemes.gitbook.io/berry-vuetify/',
      type: 'external'
    }*/
];

export default sidebarItem;
