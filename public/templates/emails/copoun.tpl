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
							<div class="popup" style="display: flex;align-items: center;justify-content: center;">
								<div class="popup-content" style="width: 550px;height: 560px;box-shadow: 0 0 8px black;border-radius: 15px;">
									<div class="popup-close" style="text-align: left;padding: 17px 0 0 20px;">
										<i class="fa fa-close" style="cursor: pointer;"></i>
									</div>
									<div class="popup-header" style="border-bottom: 2px dashed #1D497B;padding: 0;font-weight: bold;font-size: 1.5em;height: 100px;">
										<img src="{postData.2}" />
									</div>
									<div class="popup-body" style="padding: 20px;line-height: 2.25em;text-align: center;">
										<br>

										<span class="adHeader" style="font-size: 1.5em;font-weight: bold;margin: 1rem 0;">
											{postData.3}
											<br>
											{postData.4}
										</span>
										<br>
										<br>

										<span>
											{postData.5}
											<br>
											{postData.6}
											<br>
											{postData.7}
										</span>
										<br>
										<br>
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
