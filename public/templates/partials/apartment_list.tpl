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
        <div class="col-sm-4 col-xs-6">
            <div class="businessItem">
                <div data-pid="{posts.pid}" class="clearfix widget-posts">
                    <div class="item-header apartmentType">
                        {posts.data.1}
                    </div>
                    <hr class="first-hr" />
                    <hr class="second-hr" />
                    <div class="item-body">
                        <b>עיר:</b>
                        <span class="address">
                            {posts.data.2}
                        </span>
                        <br />

                        <b>כתובת:</b>
                        <span>
                            {posts.data.3}
                        </span>
                        <br />

                        <b>מס' חדרים:</b>
                        <span>
                            {posts.data.4}
                        </span>
                        <br />

                        <b>מס' מיטות:</b>
                        <span class="bedNum">
                            {posts.data.5}
                        </span>
                        <br />

                        <b>מחיר ללילה:</b>
                        <span>
                            {posts.data.6}
                        </span>
                        <br />

                        <b>ליצירת קשר:</b>
                        <span>
                            {posts.data.7}
                        </span>
                        <br />

                        <b>פרטים נוספים:</b>
                        <span>
                            {posts.data.8}
                        </span>
                        <br />
                        <!-- IF posts.data.9 -->
                        <span>
                            {posts.data.9}
                        </span>
                        <br />
                        <!-- END -->
                        <!-- IF posts.data.10 -->
                        <span>
                            {posts.data.10}
                        </span>
                        <br />
                        <!-- END -->

                        <div class="carouselWrapper">
                            <div id="myCarousel{posts.pid}" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <!-- IF posts.data.11 -->
                                    <div class="item">
                                        {posts.data.11}
                                    </div>
                                    <!-- END -->
                                    <!-- IF posts.data.12 -->
                                    <div class="item">
                                        {posts.data.12}
                                    </div>
                                    <!-- END -->
                                    <!-- IF posts.data.13 -->
                                    <div class="item">
                                        {posts.data.13}
                                    </div>
                                    <!-- END -->
                                    <!-- IF posts.data.14 -->
                                    <div class="item">
                                        {posts.data.14}
                                    </div>
                                    <!-- END -->
                                </div>
                                <a class="left carousel-control" role="button" data-carousel="myCarousel{posts.pid}">
                                    <span class="fa fa-chevron-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" role="button" data-carousel="myCarousel{posts.pid}">
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
                        <div class="popup-body">
                            <div class="carouselWrapper">
                                <div id="myCarousel{posts.pid}2" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                        <!-- IF posts.data.11 -->
                                        <div class="item">
                                            {posts.data.11}
                                        </div>
                                        <!-- END -->
                                        <!-- IF posts.data.12 -->
                                        <div class="item">
                                            {posts.data.12}
                                        </div>
                                        <!-- END -->
                                        <!-- IF posts.data.13 -->
                                        <div class="item">
                                            {posts.data.13}
                                        </div>
                                        <!-- END -->
                                        <!-- IF posts.data.14 -->
                                        <div class="item">
                                            {posts.data.14}
                                        </div>
                                        <!-- END -->
                                    </div>
                                    <a class="left carousel-control" role="button" data-carousel="myCarousel{posts.pid}2">
                                        <span class="fa fa-chevron-left"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="right carousel-control" role="button" data-carousel="myCarousel{posts.pid}2">
                                        <span class="fa fa-chevron-right"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- END posts -->
    </div>
</div>