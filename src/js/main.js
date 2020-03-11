$(document).ready(function() {
    

    $('#submit-btn').on('click', function(){
        let fText = '';
        let fUrl = '';
        let tAccount1 = '';
        let tAccount2 = '';
        let tHashtag = '';
        let encodedParam = '';
        let encodedArr = new Array();

        fText = $('[name=f-text]').val();
        fUrl = $('#f-url').val();
        tAccount1 = $('#t-account1').val();
        tAccount2 = $('#t-account2').val();
        tHashtag = $('#t-hashtag').val();

        let valArr = new Array(fText, fUrl, tAccount1, tAccount2, tHashtag);
        for(let i = 0; i < valArr.length; i++){
            encodedParam = encodeURI(valArr[i]);
            encodedArr.push(encodedParam);
        }

        let enFText = encodedArr[0];
        let enFUrl = encodedArr[1];
        let enTAccount1 = encodedArr[2];
        let enTAccount2 = encodedArr[3];
        let enTHashtag = encodedArr[4];
        
        // htmlの出力
        $('.tags__html-title').text('HTML');
        $('.tags__html-code-url').text('<meta property="og:url" content="' + fUrl + '" />');
        $('.tags__html-code-title').text('<meta property="og:title" content="ページのタイトル" />');
        $('.tags__html-code-type').text('<meta property="og:type" content="ページのタイプ">');
        $('.tags__html-code-description').text('<meta property="og:description" content="' + fText + '" />');
        $('.tags__html-code-image').text('<meta property="og:image" content="画像のURL" />');
        $('.tags__html-code-site_name').text('<meta property="og:site_name" content="サイト名" />');
        $('.tags__html-code-local').text('<meta property="og:locale" content="ja_JP" />');
        $('.tags__html-code-app_id').text('<meta property="fb:app_id" content="appIDを入力" />');
        $('.tags__html-code-twitter-card').text('<meta name="twitter:card" content="カード種類" />');
        $('.tags__html-code-twitter-site').text('<meta name="twitter:site" content="@ユーザー名" />');
        //pug
        $('.tags__pug-title').text('Pug');
        $('.tags__pug-code-url').text('meta(property="og:url", content="' + fUrl + '")');
        $('.tags__pug-code-title').text('meta(property="og:title", content="ページのタイトル")');
        $('.tags__pug-code-type').text('meta(property="og:type", content="ページのタイプ")');
        $('.tags__pug-code-description').text('meta(property="og:description", content="' + fText + '")');
        $('.tags__pug-code-image').text('meta(property="og:image", content="画像のURL")');
        $('.tags__pug-code-site_name').text('meta(property="og:site_name", content="サイト名")');
        $('.tags__pug-code-local').text('meta(property="og:locale", content="ja_JP")');
        $('.tags__pug-code-app_id').text('meta(property="fb:app_id", content="appIDを入力")');
        $('.tags__pug-code-twitter-card').text('meta(name="twitter:card", content="カード種類")');
        $('.tags__pug-code-twitter-site').text('meta(name="twitter:site", content="@ユーザー名")');
        //url
        $('.tags__url-title').text('シェアリンクのURL');
        
        $('.tags__line-title').text('LINE');
        $('.tags__line-url-code').text('line://msg/text/' + enFText + enFUrl + '');
        
        $('.tags__twitter-title').text('Twitter');
        $('.tags__twitter-url-code').text('https://twitter.com/intent/tweet?url=' + enFUrl + '&text=' + enFText + '&via=' + enTAccount1 + '&hashtags=' + enTHashtag + '&related=' + enTAccount2 + '');

        $('.tags__facebook-title').text('Facebook');
        $('.tags__facebook-url-code').text('https://www.facebook.com/sharer/sharer.php?u='+ enFUrl + '');
        
    });
});