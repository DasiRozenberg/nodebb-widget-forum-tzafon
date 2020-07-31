<div class="business col-lg-9 col-sm-12" data-isadmin="{isadmin}">
	<div class="businessContainer row" data-cid="{cid}">
		<!-- IF isBusiness -->
			<!-- IMPORT partials/business_header.tpl -->
		<!-- END -->

		<!-- IF isApartment -->
			<!-- IMPORT partials/apartment_header.tpl -->
		<!-- END -->


		<!-- IF isBusiness -->
			<!-- IMPORT partials/business_list.tpl -->
		<!-- END -->

		<!-- IF isApartment -->
			<!-- IMPORT partials/apartment_list.tpl -->
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

			$('.item', html).click(function (e){
				$('.popup', this).show();
			});
			$('.popup-close i').click(function (e){
				$(this).parents('.popup').hide();
				e.stopImmediatePropagation();
			});
			$('.filter-container select', html).change(function (e){
				var subcategory = $('#subcategory').val();
				var city = $('#city').val();
				var items = $('.businessItem').parent();
				if (subcategory) {
					items = items.filter($('.sub:contains('+subcategory+')').parents('.businessItem').parent());
				}
				if (city) {
					items = items.filter($('.address:contains('+city+')').parents('.businessItem').parent());
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
