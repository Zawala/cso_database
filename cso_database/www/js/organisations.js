
frappe.ready(function() {

    const capsuleCard = document.getElementById('capsule_card');
    const childCount = capsuleCard.children.length;

    console.log(`Number of child elements: ${childCount}`);

    // Initialize allChildren with the correct value
    const allChildren = capsuleCard.children.length;
    $.ajax({
        url: "/api/method/cso_database.www.organisations.custom_search",
        type: "POST",
        data: {
            number: allChildren,
            search: $("#search_field").val(),
            thematic_area: $("#thematic").val(),
            registration_type: $("#registration-type").val(),
            provice: $("#province").val()
        },
        headers: {
            'X-Frappe-CSRF-Token': '{{ csfr_token }}'
        },
        success: function(r) {
            posts = r.message;
            
            console.log(posts);
            posts.forEach(post => {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 col-sm-6';
                
                const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
                const aim = post[1] ? `${post[1]}` : "None";
                col.innerHTML = `
                     
                    <div class="single-cases mb-40">
                        <div class="cases-img">
                            <img src="${thumbnailSrc}" alt="">
                        </div>
                        <div class="cases-caption">
                            <h3><a href="/organisation?name=${post[0]}">${post[0].substring(0, 30)}</a></h3>
                            <!-- Progress Bar -->
                            <div class="single-skill mb-15">
                                <div class="bar-progress">
                                    <div id="bar1" class="barfiller">
                                        <div class="tipWrap">
                                            <span class="tip"></span>
                                        </div>
                                        <span class="fill" data-percentage="70"></span>
                                    </div>
                                </div>
                            </div>
                            <!-- / progress -->
                            <div class="prices d-flex justify-content-between">
                                <p>${aim.substring(0, 160)}</p>
                            </div>
                        </div>
                    </div>
               `;
                
                    capsuleCard.appendChild(col);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });

    });



    $( "#load" ).click(function (event) {
        event.preventDefault();
        console.log("jonny bones");
        const capsuleCard = document.getElementById('capsule_card');
        const childCount = capsuleCard.children.length;
    
        console.log(`Number of child elements: ${childCount}`);
    
        // Initialize allChildren with the correct value
        const allChildren = capsuleCard.children.length;
        $.ajax({
            url: "/api/method/cso_database.www.organisations.custom_search",
            type: "POST",
            data: {
                number: allChildren,
                search: $("#search_field").val(),
                thematic_area: $("#thematic").val(),
                registration_type: $("#registration-type").val(),
                provice: $("#province").val()
            },
            headers: {
                'X-Frappe-CSRF-Token': '{{ csfr_token }}'
            },
            success: function(r) {
                posts = r.message;
                
                console.log(posts);
                posts.forEach(post => {
                    const col = document.createElement('div');
                    col.className = 'col-lg-4 col-md-6 col-sm-6';
                    
                    const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
                    const aim = post[1] ? `${post[1]}` : "None";
                    col.innerHTML = `
                         
                        <div class="single-cases mb-40">
                            <div class="cases-img">
                                <img src="${thumbnailSrc}" alt="">
                            </div>
                            <div class="cases-caption">
                                <h3><a href="/organisation?name=${post[0]}">${post[0].substring(0, 30)}</a></h3>
                                <!-- Progress Bar -->
                                <div class="single-skill mb-15">
                                    <div class="bar-progress">
                                        <div id="bar1" class="barfiller">
                                            <div class="tipWrap">
                                                <span class="tip"></span>
                                            </div>
                                            <span class="fill" data-percentage="70"></span>
                                        </div>
                                    </div>
                                </div>
                                <!-- / progress -->
                                <div class="prices d-flex justify-content-between">
                                    <p>${aim.substring(0, 160)}</p>
                                </div>
                            </div>
                        </div>
                   `;
                    
                        capsuleCard.appendChild(col);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
    
        });


        $( "#search" ).click(function (event) {
            event.preventDefault();  
            $("#capsule_card").empty();
            const capsuleCard = document.getElementById('capsule_card');
            const childCount = capsuleCard.children.length;
        
            console.log(`Number of child elements: ${childCount}`);
        
            // Initialize allChildren with the correct value
            const allChildren = capsuleCard.children.length;
            console.log(allChildren);
          
            $.ajax({
                url: "/api/method/cso_database.www.organisations.custom_search",
                type: "POST",
                data: {
                    number: allChildren,
                    search: $("#search_field").val(),
                    thematic_area: $("#thematic").val(),
                    registration_type: $("#registration-type").val(),
                    provice: $("#province").val()
                },
                headers: {
                    'X-Frappe-CSRF-Token': '{{ csfr_token }}'
                },
                success: function(r) {
                    posts = r.message;
                    
                    console.log(posts);
                    posts.forEach(post => {
                        const col = document.createElement('div');
                        col.className = 'col-lg-4 col-md-6 col-sm-6';
                        
                        const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
                        const aim = post[1] ? `${post[1]}` : "None";
                        col.innerHTML = `
                             
                            <div class="single-cases mb-40">
                                <div class="cases-img">
                                    <img src="${thumbnailSrc}" alt="">
                                </div>
                                <div class="cases-caption">
                                    <h3><a href="/organisation?name=${post[0]}">${post[0].substring(0, 30)}</a></h3>
                                    <!-- Progress Bar -->
                                    <div class="single-skill mb-15">
                                        <div class="bar-progress">
                                            <div id="bar1" class="barfiller">
                                                <div class="tipWrap">
                                                    <span class="tip"></span>
                                                </div>
                                                <span class="fill" data-percentage="70"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- / progress -->
                                    <div class="prices d-flex justify-content-between">
                                        <p>${aim.substring(0, 160)}</p>
                                    </div>
                                </div>
                            </div>
                       `;
                        
                            capsuleCard.appendChild(col);
                    });
                },
                error: function(xhr, status, error) {
                    console.error("Error:", error);
                }
            });
        
            });