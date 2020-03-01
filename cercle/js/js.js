var current = 0;
$('.gallery .container .row img').on('click',function(event){
    event.preventDefault() 
    $('#myModal').modal("show")
    $('#myModal').find('.modal-body img').attr('src',$(this).attr('src'))
    current = $(this)
    console.log(current);
})
$('#myModal').find('.change span').eq(1).click(function(){
    if(current.parent().next().find('img')[0]){
        //如若发现没有图片就不执行
        current = current.parent().next().find('img')
    }
    $('#myModal').find('.modal-body img').attr('src',current.attr('src'))
})
$('#myModal').find('.change span').eq(0).click(function(){
    if(current.parent().prev().find('img')[0]){
        current = current.parent().prev().find('img')
    }
    $('#myModal').find('.modal-body img').attr('src',current.attr('src'))
})
$('footer.last .container-fluid').find('img').click(function(){
   window.scrollTo(0,0)
})