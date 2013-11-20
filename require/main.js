require.config({
    paths: {
        jquery: 'bower_components/jquery/jquery',
        text: 'bower_components/requirejs-text/text',
    }
});

require(['jquery', 'store', 'text!item.html'], function($, store, itemT) {
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
            var id = $(this).attr('data-delete');
            list.some(function(item, idx) {
                if(item.id == id) {
                    item.$el.remove();
                    list.splice(idx, 1);
                    return true;
                }
            });
        });

        $saveBtn = $('<button></button>');
        $saveBtn.text('Save');
        $saveBtn.on('click', function() {
            store.save(list, function(err) {
                $saveBtn.text('Save');
                $saveBtn.prop('disabled', false);
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
            store.load(function(err, data) {
                $loadBtn.text('Load');
                $loadBtn.prop('disabled', false);
                if(data) {
                    list = data;
                    $list.html('');
                    list.forEach(renderItem);
                }
            });

            $loadBtn.text('Loading...');
            $loadBtn.prop('disabled', true);
        }

        function renderItem(item) {
            item.id = id++;
            item.$el = $(itemT);
            item.$el.find('[data-delete]').attr('data-delete', item.id);
            item.$el.find('input').val(item.text);
            $list.append(item.$el);
        }
    });
});
