if (localStorage.getItem('listAdded') != null) {
    var listAddedString = localStorage.getItem('listAdded');
    var listAdded = JSON.parse(listAddedString);
    var htmlContent = '';
    var all = 0;
    for (key in listAdded) {
        var total = listAdded[key].count * listAdded[key].price;
        htmlContent += '<tr>';
        htmlContent += '   <td width="100px" height="100px" class="package-img-cart">';
        htmlContent += '       <img width="100%" height="100%" src=\'' + listAdded[key].thumbnail + '\' alt="">';
        htmlContent += '   </td>';
        htmlContent += '   <td class="text-center package-name-cart">' + listAdded[key].name + '</td>';
        htmlContent += '   <td class="text-center package-price-cart">' + listAdded[key].price + '</td>';
        htmlContent += '   <td class="text-center">';
        htmlContent += '    <a class="mr-2 cart-add" style="text-decoration: none" href>+</a>';
        htmlContent += '   <span class="d-none package-id-cart">' + listAdded[key].id + '</span>'
        htmlContent += '    <input class="text-center package-quantity-cart" id="quantity" readonly autocomplete="off" type="text" size="1" name="count" value="' + listAdded[key].count + '">';
        htmlContent += '    <a class="ml-2 cart-minus" style="text-decoration: none" href="">-</a>';
        htmlContent += '   </td>';
        htmlContent += '   <td class="text-center ">' + total + ' VND</td>';
        htmlContent += '   <td class="text-center "><a href="" class="del-cart"><i class="fas fa-trash-alt"></i></a></td>';
        htmlContent += '</tr>';
        all = all + total

    }
    htmlContent += '<td colspan="3">Mã giảm giá/ Quà tặng:</td>';
    htmlContent += ' <td colspan="3" class="text-center font-weight-bold"> Tổng tiền: ' + all + ' VND</td>';
    $('#list-cart').html(htmlContent);
} else {
    alert('Chưa thêm gói tập nào!');
}
$('#btn-pay').click(function () {
    var listAddedString = localStorage.getItem('listAdded');
    if (listAddedString != null) {
        var listAdded = JSON.parse(listAddedString);
        $.ajax({
            url: '/cart/complete',
            data: listAdded,
            method: 'POST',
            success: function (data, textStatus, jqXHR) {
                alert(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
});

$('#btn-pay').prev().click(function () {
    location.reload();
});

$('.cart-add').click(function () {
    var id = $(this).next().text();
    var name = $(this).parent().parent().find('.package-name-cart').text();
    var price = $(this).parent().parent().find('.package-price-cart').text();
    var thumbnail = $(this).parent().parent().find('.package-img-cart img').attr("src");
    var count = $(this).next().next().val();
    var package = {
        'id': id,
        'thumbnail': thumbnail,
        'price': price,
        'name': name,
        'count': count
    }
    var listAdded = {};
    if (localStorage.getItem('listAdded') != null) {
        var listAddedString = localStorage.getItem('listAdded');
        listAdded = JSON.parse(listAddedString);
        package.count++;
    }
    listAdded[package.id] = package;
    // đưa map vào local storage.
    localStorage.setItem('listAdded', JSON.stringify(listAdded));
});
$('.cart-minus').click(function () {
    var id = $(this).prev().prev().text();
    var name = $(this).parent().parent().find('.package-name-cart').text();
    var price = $(this).parent().parent().find('.package-price-cart').text();
    var thumbnail = $(this).parent().parent().find('.package-img-cart img').attr("src");
    var count = $(this).prev().val();
    var package = {
        'id': id,
        'thumbnail': thumbnail,
        'price': price,
        'name': name,
        'count': count
    }
    var listAdded = {};
    if (localStorage.getItem('listAdded') != null) {
        var listAddedString = localStorage.getItem('listAdded');
        listAdded = JSON.parse(listAddedString);
        if (count > 1) {
            package.count--;
        }
    }
    listAdded[package.id] = package;
    localStorage.setItem('listAdded', JSON.stringify(listAdded));
});
$('.del-cart').click(function () {
    var id = $(this).parent().prev().prev().find('.package-id-cart').text();
    var name = $(this).parent().parent().find('.package-name-cart').text();
    var price = $(this).parent().parent().find('.package-price-cart').text();
    var thumbnail = $(this).parent().parent().find('.package-img-cart img').attr("src");
    var count = $(this).parent().prev().prev().find('.package-quantity-cart').val();
    var package = {
        'id': id,
        'thumbnail': thumbnail,
        'price': price,
        'name': name,
        'count': count
    }
    var listAdded = {};
    if (localStorage.getItem('listAdded') != null) {
        var listAddedString = localStorage.getItem('listAdded');
        listAdded = JSON.parse(listAddedString);
        delete listAdded[package.id];
    }

    localStorage.setItem('listAdded', JSON.stringify(listAdded));
});