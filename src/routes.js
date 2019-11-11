import DashBoard from '@/pages/DashBoard'
import Trending from '@/pages/Trending'
import BlogList from '@/pages/BlogList'
import About from '@/pages/About'

const routes = [
    {
        path: '/',
        name: 'DashBoard',
        component: DashBoard
      },
      {
          path: '/home',
          name: 'DashBoard',
          component: DashBoard
        },
        {
          path: '/trending',
          name: 'Trending',
          component: Trending
        },
        {
          path: '/blogs',
          name: 'BlogList',
          component: BlogList
        },
        {
          path: '/about',
          name: 'About',
          component: About
        }, 
];

export default routes;