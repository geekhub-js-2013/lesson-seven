$(function() {
    var $list = $('#list'),
        $newBtn = $('#new'),
        $saveBtn,
        $loadBtn,
        list = [],
        id = 0;

    $newBtn.on('click', function() {
        var item = {text: ''};
        list.push(item);
        renderItem(item);
    });

    $list.on('click', '[data-delete]', function() {
        var id;
        if(id = $(this).attr('data-delete')) {
            list.some(function(item, idx) {
                if(item.id == id) {
                    item.$el.remove();
                    list.splice(idx, 1);
                    return true;
                }
            });
        }
    });

    $saveBtn = $('<button></button>');
    $saveBtn.text('Save');
    $saveBtn.on('click', function() {
        $.ajax('http://localhost:1337/', {
            type: 'POST',
            data: JSON.stringify(list.map(function(item) {
                return {
                    text: item.$el.find('input').val()
                };
            }))
        }).done(function() {
            $saveBtn.text('Save');
            $saveBtn.prop('disabled', false);
        }).fail(function($xhr, status, err) {
            console.log('Failed to save', status, err);
        });

        $saveBtn.text('Saving...');
        $saveBtn.prop('disabled', true);
    });
    $newBtn.parent().append($saveBtn);

    $loadBtn = $('<button></button>');
    $loadBtn.text('Load');
    $loadBtn.on('click', load);
    $newBtn.parent().append($loadBtn);

    load();

    function load() {
        $.ajax('http://localhost:1337/', {
            type: 'GET',
            dataType: 'json'
        }).done(function(data) {
            $loadBtn.text('Load');
            $loadBtn.prop('disabled', false);

            list = data;
            $list.html('');
            list.forEach(renderItem);
        }).fail(function($xhr, status, err) {
            console.log('Failed to load', status, err);
        });

        $loadBtn.text('Loading...');
        $loadBtn.prop('disabled', true);
    }

    function renderItem(item) {
        item.id = id++;
        item.$el = $('<div><input type="text"><button data-delete="' + item.id + '">Delete</button></div>');
        item.$el.find('input').val(item.text);
        $list.append(item.$el);
    }
});
