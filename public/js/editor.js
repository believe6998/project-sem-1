$('.item-list').click(function () {
    $(this).parent().addClass('hidden');
    $(this).parent().next().removeClass('hidden');
});
$('.btn-primary').click(function () {
    $(this).parent().parent().addClass('hidden');
    $(this).parent().parent().prev().removeClass('hidden');
});
