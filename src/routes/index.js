import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
    //Hash
    //https://google.com/#/search
    history: createWebHashHistory(),
    
    scrollBehavior(){
        return {top: 0 }
    },
    //page
    //https://google.com/about
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path:'/about',
            component: About
        },
        {
            path:'/movie/:id',
            component: Movie
        },
        {
            path:'/:notfound(.*)',
            component: NotFound
        }
    ]

})