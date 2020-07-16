<div class="business" data-isadmin="{isadmin}">
	<div class="businessContainer container" data-numposts="{numPosts}" data-cid="{cid}">
		<div class="row">
		<!-- BEGIN posts -->
			<div class="item col-sm-3">
				<div data-pid="{posts.pid}" class="clearfix widget-posts">
					<div class="item-header">
						{posts.data.1}
					</div>
					<hr class="first-hr" />
					<hr class="second-hr" />
					<div class="item-body">
						<i class="fa fa-th-large"></i>{posts.data.2}<br />
						<i class="fa fa-map-marker"></i>{posts.data.4}<br />
						<i class="fa fa-list"></i>{posts.data.5}<br />
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
							<i class="fa fa-th-large"></i>{posts.data.2}<br />
							<i class="fa fa-map-marker"></i>{posts.data.4}<br />
							<i class="fa fa-clock-o"></i>{posts.data.5}<br />
							<i class="fa fa-phone"></i>{posts.data.6}<br />
							
							<div class="notes">הערות</div>
							{posts.data.7}<br />
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
			if (isadmin === 'true') {
				$('[component="category"], .subcategory, .clearfix, hr, p', '.category').show();
			}

			html.insertAfter($('.category'));

			$('.item', html).click(function (e){
				$('.popup', this).show();
			});
			$('.popup-close span').click(function (e){
				$(this).parents('.popup').hide();
				e.stopImmediatePropagation()
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
