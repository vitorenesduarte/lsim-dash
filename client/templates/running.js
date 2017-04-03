import {Template} from 'meteor/templating';

import './running.html';

Template.Running.helpers({
    getLabelType(status) {
        if(status == 'Running') {
            return 'label-success';
        }

        if(stauts == 'ContainerCreating'){
            return 'label-warning';
        }

        if(status == 'Terminating') {
            return 'label-primary';
        }

        // else
        return 'label-danger';
    }
});
