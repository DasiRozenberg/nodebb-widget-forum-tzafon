<div class="col-xs-12">
    <div class="itemsContainer apartmentContainer">
    <!-- IF !posts.length -->
        <a class="no-posts-container" href="/contact">
            <div class="no-posts-header">
                העמוד יעלה בקרוב
            </div>
            <div class="no-posts-body">
                אם יש לך דירות לפרסום/ מודעות דרושים/ מתווכים/ עסקים
                <br />
                או כל מידע רלוונטי אחר ניתן להשאיר פרטים כאן וניצור איתכם קשר
            </div>
        </div>
    <!-- END -->

    <!-- BEGIN posts -->
        <div class="col-sm-4">
            <div class="item">
                <div data-pid="{posts.pid}" class="clearfix widget-posts">
                    <div class="item-header">
                        {posts.data.1}
                    </div>
                    <hr class="first-hr" />
                    <hr class="second-hr" />
                    <div class="item-body">
                        <b>עיר:</b>
                        <span class="sub">
                            {posts.data.2}
                        </span>
                        <br />

                        <b>כתובת:</b>
                        <span class="sub">
                            {posts.data.3}
                        </span>
                        <br />

                        <b>מס' חדרים:</b>
                        <span class="sub">
                            {posts.data.4}
                        </span>
                        <br />

                        <b>מס' מיטות:</b>
                        <span class="sub">
                            {posts.data.5}
                        </span>
                        <br />

                        <b>מחיר ללילה:</b>
                        <span class="sub">
                            {posts.data.6}
                        </span>
                        <br />

                        <b>טלפון ליצירת קשר:</b>
                        <span class="sub">
                            {posts.data.7}
                        </span>
                        <br />

                        <b>פרטים נוספים:</b>
                        <span class="sub">
                            {posts.data.8}
                        </span>
                        <br />
                        <!-- IF !posts.data.9 -->
                        <span class="sub">
                            {posts.data.9}
                        </span>
                        <br />
                        <!-- END -->
                        <!-- IF !posts.data.10 -->
                        <span class="sub">
                            {posts.data.10}
                        </span>
                        <br />
                        <!-- END -->

                        <div>
                        <div class="homepage-header">
                            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="item active">
                                        {posts.data.11}
                                    </div>
                                    <!-- IF !posts.data.12 -->
                                    <div class="item">
                                        {posts.data.12}
                                    </div>
                                    <!-- END -->
                                    <!-- IF !posts.data.13 -->
                                    <div class="item">
                                        {posts.data.13}
                                    </div>
                                    <!-- END -->
                                    <!-- IF !posts.data.14 -->
                                    <div class="item">
                                        {posts.data.14}
                                    </div>
                                    <!-- END -->
                                </div>
                                <a class="left carousel-control" role="button">
                                    <span class="fa fa-chevron-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" role="button">
                                    <span class="fa fa-chevron-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup" style="display:none">
                    <div class="popup-content">
                        <div class="popup-close">
                            <i class="fa fa-close"></i>
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
                            {posts.data.9}
                            {posts.data.10}
                            {posts.data.11}
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