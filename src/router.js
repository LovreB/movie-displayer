import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteNames } from "@/utils/strings";
import MovieView from "@/views/MovieView";
import BrowseView from "@/views/BrowseView";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "*", redirect: '/'},
        { path: '/', name: RouteNames.BROWSE, component: BrowseView},
        { path: '/movie/:imdbId', name: RouteNames.MOVIE, component: MovieView},
    ]
})

export default router;