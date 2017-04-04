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

Router.route('/graph/:_timestamp', {
    name: 'graph',
    template: 'Graph',
    controller: 'GraphController'
});

Router.route('/done', {
    name: 'done',
    template: 'Done',
    controler: 'DoneController'
});