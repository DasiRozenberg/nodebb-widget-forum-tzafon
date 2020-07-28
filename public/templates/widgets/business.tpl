<div class="business col-lg-9 col-sm-12" data-isadmin="{isadmin}">
	<div class="businessContainer row" data-cid="{cid}">
		<div class="col-xs-12">
			<div class="filter-container">
				<select id="subcategory">
					<option value="">בחר תת קטגוריה</option>
					<!-- BEGIN subcategories -->
					<option value="{subcategories}">{subcategories}</option>
					<!-- END subcategories -->
				</select>		
				<select id="city">
					<option value="">בחר עיר</option>
					<!-- BEGIN cities -->
					<option value="{cities}">{cities}</option>
					<!-- END cities -->
				</select>
				<div class="flex-fill"></div>
				<a class="contact" href="/contact?mode=ad">פרסום ועדכון עסק</a>
			</div>
		</div>

		<!-- IMPORT partials/business_list.tpl -->

		<!-- IMPORT partials/apartment_list.tpl -->

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
				var items = $('.item').parent();
				if (subcategory) {
					items = items.filter($('.sub:contains('+subcategory+')').parents('.item').parent());
				}
				if (city) {
					items = items.filter($('.address:contains('+city+')').parents('.item').parent());
				}
				$(".item").parent().not(items).hide();
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
