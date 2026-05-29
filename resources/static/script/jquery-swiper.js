/**
 * jquery-swiper — Swiper를 jQuery에서 일관되게 붙였다 떼었다 할 때 사용하는 얇은 래퍼
 * 로드 순서: jQuery → swiper-bundle.min.js → 본 파일
 */
(function ($, Swiper) {
    if (!$ || !Swiper) return;

    $.fn.jqSwiperDestroy = function () {
        return this.each(function () {
            if (this.swiper && typeof this.swiper.destroy === 'function') {
                this.swiper.destroy(true, true);
            }
        });
    };

    $.fn.jqSwiper = function (options) {
        return this.each(function () {
            var $track = $(this);
            $track.jqSwiperDestroy();
            new Swiper(this, options || {});
        });
    };
})(typeof jQuery !== 'undefined' ? jQuery : null, typeof Swiper === 'undefined' ? null : Swiper);
