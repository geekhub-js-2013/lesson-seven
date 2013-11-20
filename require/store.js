define(['jquery'], function($) {
    return {
        load: function(cb) {
            $.ajax('http://localhost:1337/', {
                type: 'GET',
                dataType: 'json'
            })
                .done(function(data) {
                    cb(null, data);
                })
                .fail(function($xhr, status, err) {
                    console.log('Failed to load', status, err);
                    cb(err);
                });
        },
        save: function(list, cb) {
            $.ajax('http://localhost:1337/', {
                type: 'POST',
                data: JSON.stringify(list.map(function(item) {
                    return {
                        text: item.$el.find('input').val()
                    };
                }))
            })
                .done(function() {
                    cb();
                })
                .fail(function($xhr, status, err) {
                    console.log('Failed to save', status, err);
                    cb(err);
                });
        }
    }
});
