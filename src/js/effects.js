$(document).ready(function() {
    const lineTips = '<div class="test"><div class="SNSTips__section"><p class="SNSTips__text1">■注意事項</p><p class="SNSTips__text2">シェア文言やOGP画像のキャッシュをクリアするツールが存在しないためサイト公開の際には十分に注意。<br>公開後に画像や文言を修正した場合、反映まで1週間以上必要。</p><p class="SNSTips__text3">■修正を早く反映させるための対策</p><p class="SNSTips__text4">ogp画像の場合：　画像名を変更、またはサイトURLを変更する。反映まで約1日。<br>シェア文言の場合：　作成したリンクのURLの末尾にパラメータを付与し以前と別のURLと認識させる。反映まで約1日。</p></div></div>';
    const twitterTips = '<div class="SNSTips__section"><p class="SNSTips__text1">■注意事項</p><p class="SNSTips__text2">twitter:cardオプションを必ず設定すること。</p><p class="SNSTips__text3">■修正を早く反映させるための対策</p><p class="SNSTips__text4">Twitter Card Validatorを使用することでキャッシュを削除できる。basic認証などがかかってる場合は外して実行すること。</p></div>';
    const facebookTips = '<div class="SNSTips__section"><p class="SNSTips__text1">■注意事項</p><p class="SNSTips__text2">基本的にはmetaタグのogプロパティと対応したものがシェア情報に使用されるため、ogプロパティを確認しておくこと。<br>metaプロパティのfb:app_idは必須項目ではないが、設定無しの場合キャッシュクリアの時間が長くなる印象。</p><p class="SNSTips__text3">■修正を早く反映させるための対策</p><p class="SNSTips__text4">facebook developer toolのShare Debuggerを使用することでキャッシュを削除できる。basic認証などがかかってる場合は外して実行すること。</p></div>';
    const twitterMention = '<div class="SNSTips__section"><p class="SNSTips__text2">テキストの後に「@hogehogeさんから」という形でアカウントを付与できる。ここに入力の際には@は不要。<br>「さんから」の文字をつけたくない場合は上のテキストフォーム内に「@hogehoge」の形で記述すればOK</p></div>';
    const twitterFollow = '<div class="SNSTips__section"><p class="SNSTips__text2">ツイート完了後に特定のアカウントをフォローするように促すページを表示します</p></div>';
    $(".tool-tip").on({
        'mouseenter':function(){
            var text = $(this).attr('data-text');
            switch(text){
                case 'copy':
                    chipText = 'Copy'
                    break;
                case 'line':
                    chipText = lineTips
                    break;
                case 'twitter':
                    chipText = twitterTips
                    break;
                case 'facebook':
                    chipText = facebookTips
                    break;
                case 'twitter-mention':
                    chipText = twitterMention
                    break;
                case 'twitter-follow':
                    chipText = twitterFollow
                    break;
            }
            
            if(text === 'copy'){
                $(this).append('<div class="tooltips">' + chipText + '</div>');
            }else{
                $(this).append('<div class="tooltips-SNS">' + chipText + '</div>');
            }

        },
        'mouseleave':function(){
            $(this).find(".tooltips").remove();
            $(this).find(".tooltips-SNS").remove();
        }
    });

    $(window).on('scroll', function(){
        let scrollTop = $(window).scrollTop();
        if(scrollTop >= 96){
            $('.header').slideUp();
        }else{
            $('.header').slideDown();

        }
    });

    $('.header__tag-g-icon-wrap').on('click', function() {
        $('#modal').fadeIn();
        $('.modal__mask').fadeIn();
    });
    $('.modal__close').on('click', function() {
        $('#modal').fadeOut();
        $('.modal__mask').fadeOut();
    });
});
