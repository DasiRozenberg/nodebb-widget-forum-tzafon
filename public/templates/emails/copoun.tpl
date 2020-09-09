<!-- IMPORT emails/partials/header.tpl -->

<!-- Email Body : BEGIN -->
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" dir="rtl" width="100%" style="max-width: 600px;">

	<!-- 1 Column Text : BEGIN -->
	<tr>
		<td bgcolor="#efeff0">
			<table role="presentation" cellspacing="0" cellpadding="0" border="0" dir="rtl" width="100%">
				<tr>
					<td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; direction: rtl;">
					    <h1 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 20px; line-height: 27px; color: #333333; font-weight: normal;">{title}</h1>
						<p style="margin: 0;">
							<div class="popup" style="display:none">
								<div class="popup-content">
									<div class="popup-close">
										<i class="fa fa-close"></i>
									</div>
									<div class="popup-header">
										{postData.1}
									</div>
									<div class="popup-body">
										{postData.2}
										<br />

										<span class="adHeader">
											{postData.3}
											<br />
											{postData.4}
										</span>
										<br />
										<br />

										<span>
											{postData.5}
											<br />
											{postData.6}
											<br />
											{postData.7}
										</span>
										<br />
										<br />
									</div>
								</div>
							</div>
						</p>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<!-- 1 Column Text : END -->

</table>
<!-- Email Body : END -->

<!-- IMPORT emails/partials/footer.tpl -->
