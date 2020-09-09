<div class="business col-lg-9 col-sm-12" data-isadmin="{isadmin}">
	<div class="row" data-cid="{cid}">
		<!-- IF isBusiness -->
			<!-- IMPORT partials/business_header.tpl -->
		<!-- END -->

		<!-- IF isApartment -->
			<!-- IMPORT partials/apartment_header.tpl -->
		<!-- END -->

		<!-- IF isAdWithFilter -->
			<!-- IMPORT partials/ad_header.tpl -->
		<!-- END -->


		<!-- IF isBusiness -->
			<!-- IMPORT partials/business_list.tpl -->
		<!-- END -->

		<!-- IF isApartment -->
			<!-- IMPORT partials/apartment_list.tpl -->
		<!-- END -->

		<!-- IF isAd -->
			<!-- IMPORT partials/ad_list.tpl -->
		<!-- END -->

		<!-- IF isAdWithFilter -->
			<!-- IMPORT partials/ad_list.tpl -->
		<!-- END -->

		<!-- IF isCopouns -->
			<!-- IMPORT partials/copoun_list.tpl -->
		<!-- END -->

	</div>
</div>

<script>
'use strict';
/* globals app, socket, translator, templates*/
(function() {
	function onLoad() {
		var business = $('.business');

		processHtml(business);

		function processHtml(html) {
			var isadmin = business.attr('data-isadmin');
			var category = $('.container>.row>.category');
			if (isadmin === 'true') {
				category.children().show();
			}

			//$('.container>.row>').show();
			html.removeClass('col-lg-9 col-sm-12').appendTo(category);

			html.find('.item-header').each(function (){
				var $this = $(this);
				$this.attr('title', $this.text());
			});
			html.find('.carousel').each(function (){
				var $this = $(this);
				$this.find('.item:first-child').addClass('active');
			});
			$('.businessContainer .businessItem .item-body, .apartmentContainer .businessItem .item-body .carouselWrapper', html).click(function (e){
				if ($(e.target).parents('.left, .right').length === 0) {
					$(this).parents('.businessItem').find('.popup').show();
				}
			});
			$('.popup-close i').click(function (e){
				$(this).parents('.popup').hide();
				e.stopImmediatePropagation();
			});

			$('.filter-container select', html).change(function (e){
				var filters = {};
				filters.sub = $('#subcategory').val();
				filters.address = $('#city').val();
				filters.apartmentType = $('#apartmentType').val();
				filters.bedNum = $('#bedNum').val();

				var items = $('.businessItem').parent();

				for (var filter in filters) {
					if (filters[filter]) {
						items = items.filter($('.'+filter+':contains('+filters[filter]+')').parents('.businessItem').parent());
					}
				}
				$(".businessItem").parent().not(items).hide();
				items.show();
			});
		}
	}


	function tryToLoad() {
		if (window.jQuery) {
			onLoad();
		}
		else {
			setTimeout(function() {
				tryToLoad();
			});
		}
	}

	tryToLoad();
})();
</script>
