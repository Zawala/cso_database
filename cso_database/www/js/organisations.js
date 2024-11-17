frappe.ready(function() {


    const capsuleCard = document.getElementById('capsule_card');
    const childCount = capsuleCard.children.length;

    console.log(`Number of child elements: ${childCount}`);

    // Initialize allChildren with the correct value
    const allChildren = capsuleCard.children.length;
    frappe.call({
        method: "cso_database.www.organisations.custom_search",
                args: {
                            number:allChildren,
                            search: $("#search_field").val(),
                            thematic_area:$("#thematic").val(),
                            registration_type:$("#registration-type").val(),
                            provice:$("#province").val(),


                },
        callback: function(r){
        posts = r.message;
        const row = document.querySelector('.capsule'); 
        posts.forEach(post => {

            const col = document.createElement('div');
            col.className = 'col';
          
            const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";

            // Update the innerHTML with the conditional thumbnail
            col.innerHTML = `
                    <div class="col-md-3 col-sm-6 wow animated-longer-delay-2 fadeInDown ">
                    <div class="panel">
                        <div class="panel-body">
                        <div class="col-xs-12">
                            <div class="avatar-team-member effects-container effects-enlarge">
                                <a href="#">
                                <img src="${thumbnailSrc}" alt="image">
                                </a>
                            </div>
                        </div>
                                <h3>${post[0].substring(0, 30)}</h3>
                                <div class="text-center">
                                <ul class="list-unstyled list-inline list-social-sq-primary">
                                    <li><a href='/organisation?name=${post[0]}'><i class="fa fa-compass"></i>View</a></li>
                                
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>`;
            
                row.appendChild(col);
          
          });
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
        frappe.call({
            method: "cso_database.www.organisations.custom_search",
                args: {
                            number:allChildren,
                            search: $("#search_field").val(),
                            thematic_area:$("#thematic").val(),
                            registration_type:$("#registration-type").val(),
                            provice:$("#province").val(),


                },
            callback: function(r){
            posts = r.message;
            const row = document.querySelector('.capsule'); 
    
            posts.forEach(post => {

                const col = document.createElement('div');
                col.className = 'col';
              
                const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
    
            // Update the innerHTML with the conditional thumbnail
            col.innerHTML = `
            <div class="col-md-3 col-sm-6 wow animated-longer-delay-2 fadeInDown ">
            <div class="panel">
                <div class="panel-body">
                <div class="col-xs-12">
                    <div class="avatar-team-member effects-container effects-enlarge">
                        <a href="#">
                        <img src="${thumbnailSrc}" alt="image">
                        </a>
                    </div>
                </div>
                        <h3>${post[0].substring(0, 30)}</h3>
                        <div class="text-center">
                        <ul class="list-unstyled list-inline list-social-sq-primary">
                            <li><a href='/organisation?name=${post[0]}'><i class="fa fa-compass"></i>View</a></li>
                        
                        </ul>
                    </div>
                    </div>
                </div>
            </div>`;
              
                row.appendChild(col);
              
              });
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
          
            frappe.call({
                method: "cso_database.www.organisations.custom_search",
                args: {
                            number:allChildren,
                            search: $("#search_field").val(),
                            thematic_area:$("#thematic").val(),
                            registration_type:$("#registration-type").val(),
                            provice:$("#province").val(),


                },
                callback: function(r){
                    posts = r.message;
                    const row = document.querySelector('.capsule'); 
                    posts.forEach(post => {
            
                        const col = document.createElement('div');
                        col.className = 'col';
                      
                        const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
            
                        // Update the innerHTML with the conditional thumbnail
                        col.innerHTML = `
                            <div class="col-md-3 col-sm-6 wow animated-longer-delay-2 fadeInDown ">
                            <div class="panel">
                                <div class="panel-body">
                                <div class="col-xs-12">
                                    <div class="avatar-team-member effects-container effects-enlarge">
                                        <a href="#">
                                        <img src="${thumbnailSrc}" alt="image">
                                        </a>
                                    </div>
                                </div>
                                        <h3>${post[0].substring(0, 30)}</h3>
                                        <div class="text-center">
                                        <ul class="list-unstyled list-inline list-social-sq-primary">
                                            <li><a href='/organisation?name=${post[0]}'><i class="fa fa-compass"></i>View</a></li>
                                        
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            </div>`;
                        
                            row.appendChild(col);
                  });
            }
                });
        
            });