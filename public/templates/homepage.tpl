<div widget-area="hp-header">
	<!-- BEGIN widgets.hp-header -->
	{{widgets.hp-header.html}}
	<!-- END widgets.hp-header -->
</div>
<div widget-area="header">
	<!-- BEGIN widgets.header -->
	{{widgets.header.html}}
	<!-- END widgets.header -->
</div>

<div class="row">
	<div class="<!-- IF widgets.sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.sidebar.length -->">
		<div widget-area="hp-content">
			<!-- BEGIN widgets.hp-content -->
			{{widgets.hp-content.html}}
			<!-- END widgets.hp-content -->
		</div>
	</div>
	<div widget-area="sidebar" class="col-md-3 col-xs-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
		<!-- BEGIN widgets.sidebar -->
		{widgets.sidebar.html}
		<!-- END widgets.sidebar -->
	</div>
</div>

<div widget-area="footer">
	<!-- BEGIN widgets.footer -->
	{widgets.footer.html}
	<!-- END widgets.footer -->
</div>
