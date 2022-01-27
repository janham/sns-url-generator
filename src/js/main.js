$(document).ready(function() {

    $('#submit-btn').on('click', function(){
        let fText = '';
        let fUrl = '';
        let tAccount1 = '';
        // let tAccount2 = '';
        let encodedParam = '';
        let encodedArr = new Array();
        $('.head-message').removeClass('head-message-copy');

        fText = $('[name=f-text]').val();
        // fUrl = $('#f-url').val();
        tAccount1 = $('#t-account1').val();
        // tAccount2 = $('#t-account2').val();
        tCard = $('[name=card]').val();

        let valArr = new Array(fText, tAccount1);
        for(let i = 0; i < valArr.length; i++){
            encodedParam = encodeURI(valArr[i]);
            encodedArr.push(encodedParam);
        }

        let enFText = encodedArr[0];
        let enTAccount1 = encodedArr[1];
        // let enTAccount2 = encodedArr[2];
        // let enFUrl = encodedArr[3];
        
        // htmlの出力
        // $('.tags__include-url--js').text(fUrl);
        $('.tags__html-code-twitter-card-val---js').text(tCard);


        //url
        // $('.tags__url-title').text('シェアリンクのURL');
        // LINE
        $('.tags__line-url-code').text('http://line.me/R/msg/text/?' + enFText + '');
        // Twitter
        let addTextTwitter = 'https://twitter.com/intent/tweet?text=' + enFText;
        if(!tAccount1.length == 0){
            addTextTwitter = addTextTwitter + '&via=' + enTAccount1;
            console.log(addTextTwitter);
        }
        // if(!tAccount2.length == 0){
        //     addTextTwitter = addTextTwitter + '&related=' + enTAccount2;
        //     console.log(addTextTwitter);
        // } 
        $('.tags__twitter-url-code').text(addTextTwitter);

        // facebook
        $('.tags__facebook-url-code').text('https://www.facebook.com/sharer/sharer.php?u=<URL>');
        // $('.tags__facebook-url-code').text('https://www.facebook.com/sharer/sharer.php?u='+ enFUrl + '');
        
        
        $('.head-message').addClass('head-message-orange');
        $('.head-message__text').text('');
        $('.head-message__text').text('Generated!');
        $('#modal').fadeOut();
        $('.modal__mask').fadeOut();
        setTimeout(function() {
            $('.head-message').slideDown();
        }, 200);
        setTimeout(function() {
            $('.head-message').fadeOut();
        }, 3000);

    });

    // コードをまとめてコピー
    $('.copy-btn').on('click', function(){
        $('.head-message').removeClass('head-message-orange');
        let target = $(this).siblings().children('.copy-area').text();
        let textarea = $('<textarea></textarea>');
        textarea.text(target);
        $(this).append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        
        headMessage();
    });
    // コードを一行ずつコピー
    $('.fa-arrow-circle-right').on('click', function () {
        $('.head-message').removeClass('head-message-orange');

        let distParent = $(this).parent();
        let clickIndex = distParent.children('.fas').index(this) + 1;
        let lineTarget = distParent.siblings().children().children('.copy-area p:nth-child('+ clickIndex + ')').text();
        let textarea = $('<textarea></textarea>');
        textarea.text(lineTarget);
        $(this).append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        headMessage();
    });
    function headMessage (){
        $('.head-message').addClass('head-message-copy');
        $('.head-message__text').text('');
        $('.head-message__text').text('Copied!');
        $('#modal').fadeOut();
        $('.modal__mask').fadeOut();
        setTimeout(function() {
            $('.head-message').slideDown();
        }, 200);
        setTimeout(function() {
            $('.head-message').fadeOut();
        }, 3000);
    }
});

