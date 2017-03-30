Router.configure({
    layoutTemplate: 'Main',
    notFoundTemplate: 'NotFound',
    subscriptions: function () {
        return [
            Meteor.subscribe('running'),
            Meteor.subscribe('done')
        ];
    },
});

Router.route('/', {
    name: 'home',
    template: 'Home',
    controler: 'HomeController'
});

Router.route('/running', {
    name: 'running',
    template: 'Running',
    controler: 'RunningController'
});

Router.route('/done', {
    name: 'done',
    template: 'Done',
    controler: 'DoneController'
});