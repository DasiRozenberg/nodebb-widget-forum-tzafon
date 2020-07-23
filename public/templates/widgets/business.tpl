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
		<div class="col-xs-12">
		<!-- BEGIN posts -->
			<div class="col-sm-3">
				<div class="item">
					<div data-pid="{posts.pid}" class="clearfix widget-posts">
						<div class="item-header">
							{posts.data.1}
						</div>
						<hr class="first-hr" />
						<hr class="second-hr" />
						<div class="item-body">
							<i class="fa fa-th-large"></i>
							{posts.data.2}
							<!-- IF !posts.data.2 --><i class="no-data">אין נתונים</i><!-- END -->
							<br />

							<i class="fa fa-map-marker"></i>
							{posts.data.4}, {posts.data.5}
							<!-- IF !posts.data.5 --><i class="no-data">אין נתונים</i><!-- END -->
							<br />

							<i class="fa fa-clock-o"></i>
							{posts.data.6}
							<!-- IF !posts.data.6 --><i class="no-data">אין נתונים</i><!-- END -->
							<br />
						</div>
					</div>
					<div class="popup" style="display:none">
						<div class="popup-content">
							<div class="popup-close">
								<span>X</span>
							</div>
							<div class="popup-header">
								{posts.data.1}
							</div>
							<div class="popup-body">
								<i class="fa fa-th-large"></i>
								{posts.data.2}
								<!-- IF !posts.data.2 --><i class="no-data">אין נתונים</i><!-- END -->
								<br />
								
								<i class="fa fa-map-marker"></i>
								{posts.data.4}, {posts.data.5}
								<!-- IF !posts.data.5 --><i class="no-data">אין נתונים</i><!-- END -->
								<br />
								
								<i class="fa fa-clock-o"></i>
								{posts.data.6}
								<!-- IF !posts.data.6 --><i class="no-data">אין נתונים</i><!-- END -->
								<br />

								<i class="fa fa-phone"></i>
								{posts.data.7}
								<!-- IF !posts.data.7 --><i class="no-data">אין נתונים</i><!-- END -->
								<br />
								
								<div class="notes">הערות</div>
								{posts.data.8}
								<!-- IF !posts.data.8 --><i class="no-data">אין נתונים</i><!-- END -->
								<br />
							</div>
						</div>
					</div>
				</div>
			</div>
		<!-- END posts -->
		</div>
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
				category.show();
			}

			html.insertAfter(category);

			$('.item', html).click(function (e){
				$('.popup', this).show();
			});
			$('.popup-close span').click(function (e){
				$(this).parents('.popup').hide();
				e.stopImmediatePropagation();
			});
			$('.filter-container select', html).change(function (e){
				var subcategory = $('#subcategory').val();
				var city = $('#city').val();
				var items = $(".item").parent();
				if (subcategory) {
					items = items.filter(":contains('" + subcategory + "')");
				}
				if (city) {
					items = items.filter(":contains('" + city + "')");
				}
				$(".item").parent().not(items).hide();
				items.show();
			});
		}
	}


	if (window.jQuery) {
		onLoad();
	} else {
		window.addEventListener('load', onLoad);
	}
})();
</script>
