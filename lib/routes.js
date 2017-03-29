Router.configure({
    layoutTemplate: 'Main',
    notFoundTemplate: 'NotFound',
});

Router.route('/', {
    name: 'home',
    template: 'Home',
    controler: 'HomeController'
});
